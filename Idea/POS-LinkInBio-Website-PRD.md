# PRD: One-Page "Link-in-Bio" Website for POS Software Business

**Document owner:** Subhajit
**Status:** Draft
**Last updated:** 2026-09-22

---

## 1. Overview

We run a POS (Point-of-Sale) software business that builds billing/ordering systems for restaurants and cafes. We want to create a single-page "link-in-bio" style website — similar in concept to the Linktree-style page shown in a reference screenshot (Barlow & Fields example) — that acts as the central hub for anyone who discovers our brand (via ads, QR codes on flyers, social bio links, referrals, etc.).

Instead of a traditional multi-page marketing site, the page presents a vertical stack of tappable buttons, each routing to a key destination (demo, pricing, consultation booking, etc.), followed by a row of social media icons linking to our public profiles.

## 2. Problem Statement

Prospective restaurant/cafe clients who hear about us (from a flyer, Instagram bio, WhatsApp share, etc.) currently have no single, mobile-friendly place to quickly see what we offer and take an action (book a demo, check pricing, message us). A full website is overkill for this "first touch" moment — we need something fast, mobile-first, and conversion-focused.

## 3. Goals

- Give every marketing channel (social bios, QR codes, ads) one consistent link to point to
- Let a restaurant/cafe owner understand what we offer and take action within seconds, on mobile
- Centralize all our social/profile links in one place
- Look credible and professional on first glance (screenshot-worthy for reels/shorts)

### Non-goals
- This is not a replacement for a full company website — no blog, no detailed case studies, no multi-page navigation
- No account creation, login, or backend business logic on this page (pure static/marketing page)

## 4. Target Users

- Restaurant and cafe owners/managers discovering us for the first time
- Existing clients looking for a quick way to reach support or leave a review
- Social media followers wanting to explore our other platforms

## 5. Page Structure

### 5.1 Header
- Circular logo badge
- Business name (bold, large)
- Short tagline (e.g., "Smart billing for smarter restaurants")

### 5.2 Action Buttons (vertical stack, rounded cards with icon + label)
| # | Icon | Label | Destination |
|---|------|-------|-------------|
| 1 | Bar chart | See Live Demo | Demo video / booking link |
| 2 | Price tag | View Pricing Plans | Pricing page/PDF |
| 3 | Calendar | Book a Free Consultation | Calendar booking tool (Calendly-style) |
| 4 | Google "G" | Leave a Google Review | Google Business Profile review link |
| 5 | Chat bubble | Talk to Support | WhatsApp/contact link |
| 6 | Document | Download Product Brochure | PDF download |
| 7 | Briefcase | We're Hiring | Careers form/page (optional) |

*(Buttons are configurable — order and count can change based on current priorities, e.g., promoting a limited-time offer.)*

### 5.3 Social Media Row
Row of icons linking out to:
- YouTube
- Facebook
- Instagram
- Reddit
- LinkedIn
- Google Business Profile

## 6. Functional Requirements

- Single responsive page, mobile-first (majority of traffic expected from phones/social apps)
- Each button is a tappable card that opens the linked destination (external link, new tab)
- Page load time should be fast (static site, no heavy backend)
- Buttons and social icons should be easy to reorder/edit without a full redeploy (e.g., via a simple config file or lightweight CMS)
- Analytics: track clicks per button to see which links get the most engagement

## 7. Design Requirements

- Clean, minimal UI — white background, soft shadows on cards, pastel icon backgrounds
- Consistent brand colors and logo placement at top
- Fully responsive: looks correct on mobile (primary) and desktop (secondary)
- Should look good as a screen-recording/reel thumbnail, since this format is often shared as a "check this out" style video

## 8. Tech Considerations

- Static site (HTML/CSS/JS or a simple React/Next.js single page) — no heavy backend needed
- Hosting: can be deployed cheaply (Vercel/Netlify/GitHub Pages) or on existing Charubala/eZentix infrastructure
- Button config should be easy to update (JSON config, CMS, or simple code edit) since links/offers may change often

## 9. Success Metrics

- Number of clicks on "Book a Free Consultation" (primary conversion action)
- Total page visits vs. click-through rate per button
- Number of new Google reviews generated via the review button
- Social follow-throughs from the icon row

## 10. Open Questions

- Final business name/branding to use on the page
- Which link/booking tool to use for "Book a Free Consultation" (Calendly, WhatsApp, custom form?)
- Whether this page lives under a new domain or a subpage of an existing site (e.g., eZentix or Charubala)
- Final button list/order — priorities may shift based on current campaign goals

## 11. Timeline (draft)

| Milestone | Target |
|---|---|
| Finalize copy, branding, button list | TBD |
| Design mockup approved | TBD |
| Build & deploy | TBD |
| Launch + start sharing link across channels | TBD |
