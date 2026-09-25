# eZentix Labs — Link-in-Bio Page (MERN)

One-page link-in-bio site built per `POS-LinkInBio-Website-PRD.md` / `POS-LinkInBio-Website-TRD.md`.

## Stack
- **MongoDB + Mongoose** — stores link config and click analytics
- **Express** — REST API
- **React (Vite)** — mobile-first single page
- **Node.js**

## Structure
```
server/                 Express + Mongoose API
  models/Link.js        button/social link config
  models/Click.js       per-click analytics record
  routes/links.js       GET  /api/links
  routes/clicks.js      POST /api/clicks, GET /api/clicks/stats
  data/links.seed.js    default config (also used as API fallback)
  seed.js               loads defaults into MongoDB
client/                 React front end
  src/pages/            Home (link stack), Social (social profiles page)
  src/components/       Header, ButtonStack, ActionButton, Icons
  src/data/fallback.json  offline copy of config for instant first paint
  src/lib/api.js        fetch links + fire-and-forget click tracking
```

## Run locally
Run these from the project root (`F:\eZentix Labs\STV Web`). The root holds no app code — its `package.json` just forwards to `server/` and `client/`.

1. Start MongoDB (default `mongodb://127.0.0.1:27017/stv-web`).
2. First time only — installs both packages, copies the env template, seeds the links:
```bash
npm install && npm run install:all && npm run seed
```
3. Start the API and the site together:
```bash
npm run dev
```
Open http://localhost:5173 — Vite proxies `/api` to the API on port 5000.

To run them separately instead, use `npm run dev` inside `server/` and inside `client/` in two terminals. Note `server/.env` must exist — copy it from `server/.env.example`.

## Editing links
Edit documents in the `links` collection, or change `server/data/links.seed.js` and re-run `npm run seed`. No front-end code change or redeploy needed for label/href/order/color edits. If MongoDB is unreachable, the API and the client both fall back to the static config so the page never goes blank.

## Pages
- `/` — the 6 action tabs
- `/social` — social media profiles, reached by tapping the "Social Media Profiles" tab

Routing uses react-router-dom. A link whose `href` starts with `/` is treated as an internal route; everything else opens in a new tab. Static hosts need an SPA rewrite so `/social` resolves on a hard refresh — `client/vercel.json` (Vercel) and `client/public/_redirects` (Netlify) are included.

## Analytics
Every button and social tap posts `{ key, type }` to `POST /api/clicks` via `sendBeacon`. Totals per link: `GET /api/clicks/stats`.

## Build
```bash
cd client && npm run build   # outputs client/dist
```

## Note
The peacock logo at `client/public/logo.svg` is a hand-drawn approximation of the reference mark. Replace it with the official vector when design provides it (TRD §7).

---

## Consultation booking

The "Book a Free Consultation" tab opens `/consultation` (an in-app page, no longer Calendly).

**Fields:** Your Name*, Business Name*, What Kind of Business*, Phone/WhatsApp*, Date*, Time*, and an optional "biggest thing slowing you down".

**Date & time are fixed by us.** Availability lives in `server/data/slots.js` — edit `weekdays`, `times`, `daysAhead`, `leadTimeDays` and `blockedDates` there. `GET /api/consultations/slots` builds the calendar from that config and hides slots already booked, so the same slot can never be taken twice.

**On submit** (`POST /api/consultations`) the server, in order:
1. Saves the booking to MongoDB (so a booking is never lost if step 2 fails)
2. Hands off notification to **n8n** if `N8N_WEBHOOK_URL` is set (recommended — see below); otherwise falls back to the direct Google Sheets + WhatsApp Cloud API code built into the server

Either way the outcome is recorded on the booking (`sheetSynced` / `whatsappSent`) and logged server-side if it fails, while the visitor still sees the success message — a failed notification never blocks the booking.

### Setup — n8n automation (recommended)
This is the easiest way to wire up the Sheet + WhatsApp notification: no service-account JSON, no Meta developer app, everything is a visual workflow you can edit yourself later (add an email, a Slack ping, a CRM row — whatever — without touching code).

1. In n8n, create a workflow starting with a **Webhook** node (method `POST`). Copy its Production URL.
2. Add a **Google Sheets** node (Append Row) — connects via OAuth in n8n's own UI, no key files. Point it at a sheet owned by **ezentixlabs@gmail.com**.
3. Add a **WhatsApp Business Cloud** node (Send Message) to `918436299320`.
4. Wire `Webhook → Google Sheets` and `Webhook → WhatsApp` (two branches off the same trigger).
5. Activate the workflow, then set in `server/.env`:
   - `N8N_WEBHOOK_URL` — the webhook URL from step 1
   - `N8N_WEBHOOK_SECRET` — any random string (optional but recommended)

**Payload posted to the webhook** (`server/lib/n8n.js`):
```json
{
  "bookingId": "6ab6866940194aff34e02a34",
  "bookedAt": "2026-09-25T14:34:17.905Z",
  "name": "Ravi Kumar",
  "businessName": "Spice Garden",
  "businessType": "Cafe",
  "phone": "9876500002",
  "date": "2026-09-28",
  "time": "11:30",
  "notes": "slow queue at lunch"
}
```
Map these fields onto the Sheet columns and the WhatsApp message text in n8n. If `N8N_WEBHOOK_SECRET` is set, every request carries an `X-Webhook-Signature` header — an HMAC-SHA256 of the raw JSON body using that secret. Verify it in n8n with a **Crypto** node before trusting the payload, if the webhook URL might ever be guessed or shared.

Setting `N8N_WEBHOOK_URL` fully replaces the two integrations below — only one path runs per booking, so the owner is never notified twice.

### Setup — Google Sheet (direct, no n8n)
1. Sign in as **ezentixlabs@gmail.com** and create a sheet (a tab named `Bookings`). Headers are written automatically on first use.
2. In Google Cloud Console: create a project → enable the **Google Sheets API** → create a **Service Account** → create a **JSON key**.
3. **Share the sheet** with the service account's email address, giving it **Editor** access.
4. Fill in `server/.env`:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — from the JSON key
   - `GOOGLE_PRIVATE_KEY` — from the JSON key, wrapped in quotes, newlines kept as `\n`
   - `GOOGLE_SHEET_ID` — the long id in the sheet URL

### Setup — WhatsApp notification (direct, no n8n)
Uses the **Meta WhatsApp Cloud API**. At developers.facebook.com create an app → add WhatsApp → then fill in `server/.env`:
- `WHATSAPP_TOKEN` — access token
- `WHATSAPP_PHONE_NUMBER_ID` — the sending number's id
- `WHATSAPP_NOTIFY_TO` — already set to `918436299320`

The recipient must have messaged the business number within the last 24h, or the message must use an approved template — that is Meta's rule, not ours. For a business-initiated alert like this, register a template and switch `lib/whatsapp.js` from `type: "text"` to `type: "template"`.

Message sent:
```
New consultation booked
Name: <name>
Business: <business>
Slot: 25 Sep, 11:30 AM
Booked at: 24 Sep, 3:42 PM
Details: <google sheet link>
```

Without these credentials the form still works and still saves bookings — only the sheet row and the WhatsApp alert are skipped, with a line in the server log.
