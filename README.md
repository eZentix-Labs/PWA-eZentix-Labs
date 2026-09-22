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
