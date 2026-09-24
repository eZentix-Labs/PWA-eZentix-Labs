import { sheetUrl } from "./googleSheet.js";

const IST = { timeZone: "Asia/Kolkata" };

function prettySlot(date, time) {
  const d = new Date(`${date}T${time}:00+05:30`);
  return d.toLocaleString("en-IN", {
    ...IST,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });
}

// Short summary the owner can read at a glance.
export function buildMessage(booking) {
  const bookedAt = new Date().toLocaleString("en-IN", {
    ...IST,
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  });

  const lines = [
    "New consultation booked",
    `Name: ${booking.name}`,
    `Business: ${booking.businessName}`,
    `Slot: ${prettySlot(booking.date, booking.time)}`,
    `Booked at: ${bookedAt}`
  ];
  const url = sheetUrl();
  if (url) lines.push(`Details: ${url}`);
  return lines.join("\n");
}

// Sends via the Meta WhatsApp Cloud API.
export async function sendWhatsApp(booking) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const to = process.env.WHATSAPP_NOTIFY_TO;
  if (!token || !phoneId || !to) throw new Error("WhatsApp is not configured");

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { preview_url: false, body: buildMessage(booking) }
    })
  });

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`WhatsApp API ${res.status}: ${detail.slice(0, 200)}`);
  }
}
