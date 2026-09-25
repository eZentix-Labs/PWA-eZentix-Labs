import crypto from "crypto";

// Hands the whole notification job (Sheet row + WhatsApp alert, or anything
// else you wire up later) to an n8n workflow instead of doing it in code.
// Configure N8N_WEBHOOK_URL and this becomes the only integration path;
// leave it unset and the direct Google Sheets / WhatsApp Cloud API calls
// in googleSheet.js / whatsapp.js are used instead.

function sign(body, secret) {
  return crypto.createHmac("sha256", secret).update(body).digest("hex");
}

export function isConfigured() {
  return Boolean(process.env.N8N_WEBHOOK_URL);
}

export async function notifyN8n(booking, meta) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) throw new Error("n8n webhook is not configured");

  const payload = {
    bookingId: String(meta.id),
    bookedAt: meta.bookedAt, // ISO string, UTC
    name: booking.name,
    businessName: booking.businessName,
    businessType: booking.businessType,
    phone: booking.phone,
    date: booking.date, // YYYY-MM-DD
    time: booking.time, // HH:mm, 24h
    notes: booking.notes || ""
  };
  const body = JSON.stringify(payload);

  const headers = { "Content-Type": "application/json" };
  const secret = process.env.N8N_WEBHOOK_SECRET;
  if (secret) headers["X-Webhook-Signature"] = sign(body, secret);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { method: "POST", headers, body, signal: controller.signal });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(`n8n webhook ${res.status}: ${detail.slice(0, 200)}`);
    }
  } finally {
    clearTimeout(timeout);
  }
}
