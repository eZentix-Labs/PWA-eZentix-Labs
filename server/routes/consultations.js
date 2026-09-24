import { Router } from "express";
import Booking from "../models/Booking.js";
import { slotConfig, availableDates, isValidSlot } from "../data/slots.js";
import { appendBooking } from "../lib/googleSheet.js";
import { sendWhatsApp } from "../lib/whatsapp.js";

const router = Router();

export const BUSINESS_TYPES = [
  "Restaurant",
  "Cafe",
  "Cloud Kitchen",
  "Bakery / Sweet Shop",
  "Bar / Lounge",
  "Retail Store",
  "Other"
];

// GET /api/consultations/slots -> the fixed dates/times, minus what's taken
router.get("/slots", async (_req, res) => {
  const dates = availableDates();
  let taken = [];
  try {
    taken = await Booking.find({ date: { $in: dates } }, "date time").lean();
  } catch {
    // DB down: still show the full calendar rather than an empty one
  }
  const takenSet = new Set(taken.map((b) => `${b.date} ${b.time}`));

  res.json({
    businessTypes: BUSINESS_TYPES,
    times: slotConfig.times,
    dates: dates.map((date) => ({
      date,
      times: slotConfig.times.filter((t) => !takenSet.has(`${date} ${t}`))
    }))
    .filter((d) => d.times.length > 0)
  });
});

// POST /api/consultations -> save, push to Google Sheet, notify on WhatsApp
router.post("/", async (req, res) => {
  const { name, businessName, businessType, phone, date, time, notes } = req.body || {};

  const required = { name, businessName, businessType, phone, date, time };
  const missing = Object.keys(required).filter((k) => !String(required[k] || "").trim());
  if (missing.length) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(", ")}` });
  }
  if (!/^[0-9+\-\s()]{8,20}$/.test(phone)) {
    return res.status(400).json({ error: "Please enter a valid phone or WhatsApp number." });
  }
  if (!isValidSlot(date, time)) {
    return res.status(400).json({ error: "That slot is no longer available. Please pick another." });
  }

  const booking = {
    name: String(name).trim(),
    businessName: String(businessName).trim(),
    businessType: String(businessType).trim(),
    phone: String(phone).trim(),
    date,
    time,
    notes: String(notes || "").trim()
  };

  // 1. Persist first — the booking must not be lost if an integration fails.
  let saved;
  try {
    saved = await Booking.create(booking);
  } catch (err) {
    if (err?.code === 11000) {
      return res.status(409).json({ error: "That slot was just taken. Please pick another." });
    }
    return res.status(503).json({ error: "Could not save your booking. Please try again." });
  }

  // 2. Google Sheet + 3. WhatsApp — run both, report either failure server-side.
  const [sheet, wa] = await Promise.allSettled([appendBooking(booking), sendWhatsApp(booking)]);
  if (sheet.status === "rejected") console.error("Sheet sync failed:", sheet.reason?.message);
  if (wa.status === "rejected") console.error("WhatsApp notify failed:", wa.reason?.message);

  await Booking.updateOne(
    { _id: saved._id },
    { sheetSynced: sheet.status === "fulfilled", whatsappSent: wa.status === "fulfilled" }
  ).catch(() => {});

  res.status(201).json({ ok: true });
});

export default router;
