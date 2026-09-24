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
1. Start MongoDB (default `mongodb://127.0.0.1:27017/stv-web`).
2. API:
```bash
cd server && npm install && cp .env.example .env && npm run seed && npm run dev
```
3. Client (new terminal):
```bash
cd client && npm install && npm run dev
```
Open http://localhost:5173 — Vite proxies `/api` to the API on port 5000.

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
1. Saves the booking to MongoDB (so a booking is never lost if step 2 or 3 fails)
2. Appends a row to the Google Sheet
3. Sends the WhatsApp summary

Steps 2 and 3 run together; if either fails it is logged and recorded on the booking (`sheetSynced` / `whatsappSent`) while the visitor still sees the success message.

### Setup — Google Sheet
1. Sign in as **ezentixlabs@gmail.com** and create a sheet (a tab named `Bookings`). Headers are written automatically on first use.
2. In Google Cloud Console: create a project → enable the **Google Sheets API** → create a **Service Account** → create a **JSON key**.
3. **Share the sheet** with the service account's email address, giving it **Editor** access.
4. Fill in `server/.env`:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` — from the JSON key
   - `GOOGLE_PRIVATE_KEY` — from the JSON key, wrapped in quotes, newlines kept as `\n`
   - `GOOGLE_SHEET_ID` — the long id in the sheet URL

### Setup — WhatsApp notification
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
