# TRD: One-Page "Link-in-Bio" Website for POS Software Business

**Document owner:** Subhajit
**Status:** Draft
**Related doc:** POS-LinkInBio-Website-PRD.md
**Last updated:** 2026-09-22

---

## 1. Purpose

This document translates the PRD into concrete technical specifications for building the "FlavorOS POS" one-page link-in-bio site, based on the approved visual reference (logo, colors, button layout, social row).

## 2. Reference Design Breakdown

**Header**
- Logo: circular badge, fork + knife crossed icon with a plate/"F" monogram in the center, orange/tan color
- Brand wordmark below logo: "FlavorOS POS"
- Page title: business name (large, bold) — placeholder text "[Your POS Brand Name]" to be replaced with final copy
- Tagline: "Smart billing for smarter restaurants" (gray, smaller text, centered)

**Button stack** — 7 full-width rounded-pill buttons, stacked vertically, each with a colored icon circle on the left and centered/left-aligned label text:

| Order | Background color | Icon | Label |
|---|---|---|---|
| 1 | Pastel green | Bar chart | See Live Demo |
| 2 | Pastel blue | ₹ (rupee) | View Pricing Plans |
| 3 | Pastel orange | Calendar | Book a Free Consultation |
| 4 | White | Google "G" logo | Leave a Google Review |
| 5 | Pastel purple | Chat bubble | Talk to Support |
| 6 | Pastel yellow | Document | Download Product Brochure |
| 7 | Pastel pink/red | Briefcase | We're Hiring |

**Social icon row** — 6 circular black icon buttons, evenly spaced, single row, bottom of page:
YouTube, Facebook, Instagram, Reddit, LinkedIn, Google Business Profile

## 3. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (React) or plain static HTML/CSS/JS | Next.js preferred if we want easy config-driven buttons + future analytics/CMS integration |
| Styling | Tailwind CSS | Matches rounded-pill, pastel-card aesthetic quickly |
| Icons | lucide-react or Heroicons (outline style) + brand SVGs for Google/social logos | Use official brand marks for Google, YouTube, etc. (see Section 7) |
| Hosting | Vercel (if Next.js) or Netlify/GitHub Pages (if static) | Fast global CDN, free tier sufficient |
| Domain | Subdomain or path off existing eZentix/Charubala domain, or a new dedicated domain | Final decision pending (open question in PRD) |
| Analytics | Plausible or Google Analytics 4 + custom click events | Needed to track button-level engagement (PRD Section 9) |

## 4. Component Architecture

```
/app or /src
 ├── components/
 │   ├── Header.tsx          → logo + wordmark + tagline
 │   ├── ActionButton.tsx    → reusable pill button (icon, label, href, bgColor)
 │   ├── ButtonStack.tsx     → maps buttons.json into ActionButton list
 │   ├── SocialRow.tsx       → maps socials.json into circular icon links
 │   └── Layout.tsx          → page wrapper, mobile-first container (max-w-sm, centered)
 ├── data/
 │   ├── buttons.json        → editable config (see Section 5)
 │   └── socials.json        → editable config (see Section 5)
 └── styles/
     └── globals.css         → Tailwind base + design tokens
```

## 5. Data Config Schema

Buttons and social links are data-driven so they can be reordered/edited without touching component code.

**`buttons.json`**
```json
[
  {
    "id": "demo",
    "label": "See Live Demo",
    "icon": "bar-chart",
    "bgColor": "#C9EEDD",
    "href": "https://example.com/demo",
    "order": 1
  },
  {
    "id": "pricing",
    "label": "View Pricing Plans",
    "icon": "rupee",
    "bgColor": "#C7E3F7",
    "href": "https://example.com/pricing",
    "order": 2
  }
]
```

**`socials.json`**
```json
[
  { "id": "youtube", "href": "https://youtube.com/@flavorospos" },
  { "id": "facebook", "href": "https://facebook.com/flavorospos" },
  { "id": "instagram", "href": "https://instagram.com/flavorospos" },
  { "id": "reddit", "href": "https://reddit.com/r/flavorospos" },
  { "id": "linkedin", "href": "https://linkedin.com/company/flavorospos" },
  { "id": "gbp", "href": "https://g.page/flavorospos" }
]
```

## 6. Design Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-text-primary` | `#111111` | Headings, button labels |
| `--color-text-secondary` | `#6B7280` | Tagline |
| `--btn-green` | `#C9EEDD` | Demo button |
| `--btn-blue` | `#C7E3F7` | Pricing button |
| `--btn-orange` | `#FBDDC2` | Consultation button |
| `--btn-white` | `#FFFFFF` (with 1px border `#E5E7EB`) | Google review button |
| `--btn-purple` | `#DCD3F5` | Support button |
| `--btn-yellow` | `#FBEBB0` | Brochure button |
| `--btn-pink` | `#F7CBCB` | Hiring button |
| `--radius-pill` | `9999px` | Button and icon border radius |
| `--font-family` | Inter / system-ui sans-serif | Matches reference typography |
| `--container-max-width` | `420px` | Mobile-first single-column layout |

## 7. Icon & Brand Asset Requirements

- Generic icons (bar chart, calendar, chat bubble, document, briefcase, rupee): use an open icon set (Lucide/Heroicons), colored to match each pill's accent
- Brand logos (Google "G", YouTube, Facebook, Instagram, Reddit, LinkedIn, Google Business Profile): must use official brand SVGs at correct proportions — do **not** recolor or distort per each platform's brand guidelines
- Custom "FlavorOS POS" logo (fork + knife + plate monogram): needs a vector (SVG) source file from design; PNG fallback for social sharing/OG image

## 8. Responsive Behavior

- Mobile (< 480px): single column, full-width buttons, container padding 16px — this is the primary target (reference screenshot is a phone screen)
- Tablet/Desktop (≥ 480px): center the same mobile-width card (max 420px) in the viewport rather than stretching buttons full-width, to preserve the "phone-native" feel
- Touch targets: minimum 44px height per button for accessibility/tap accuracy

## 9. Functional Requirements

- Each button and social icon is an `<a>` tag opening in a new tab (`target="_blank" rel="noopener"`) for external destinations (demo, pricing PDF, brochure)
- "Book a Free Consultation" links to a booking tool (Calendly or similar) — embed or external link, TBD per PRD open question
- "Talk to Support" links to WhatsApp (`wa.me/<number>`) or a contact form — TBD
- Page must render correctly with JS disabled where possible (progressive enhancement) if using static export
- No cookies/tracking beyond the chosen analytics tool; comply with basic privacy expectations (no login, no PII collection on this page)

## 10. Analytics & Tracking

- Fire a click event per button with `button_id` as a property (e.g., `demo`, `pricing`, `consultation`) to measure which action drives the most engagement (PRD Section 9)
- Fire a click event per social icon with `platform` property
- Track page views and referrer source (helps determine which marketing channel — QR code, Instagram bio, etc. — drives traffic)

## 11. Performance & SEO

- Target Lighthouse mobile score ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- Static generation (SSG) preferred over server rendering — page content changes infrequently
- Add Open Graph + Twitter Card meta tags with logo/preview image so shared links (WhatsApp, Instagram bio) render a nice preview card
- Add `favicon` using the FlavorOS logo

## 12. Deployment & Config Updates

- Deploy via Git-based CI (Vercel/Netlify auto-deploy on push to `main`)
- Non-technical team members should be able to update button text/links/order by editing `buttons.json` (or via a lightweight CMS like Tina CMS / Sanity if editing JSON directly isn't practical long-term)
- Environment: single environment (production) is sufficient for a page this size; no staging required unless the team wants to preview changes before going live

## 13. Out of Scope (Technical)

- No backend database — all data is static config, no user accounts
- No payment processing on this page (pricing plans link out to a separate pricing page/PDF, not a checkout flow)
- No multi-language support in v1

## 14. Open Technical Questions

- Final hosting domain/subdomain decision
- Booking tool integration method (embed vs. external link) for "Book a Free Consultation"
- Support channel: WhatsApp link vs. contact form vs. live chat widget
- Whether button config should be a flat JSON file (dev-managed) or a lightweight CMS (non-dev editable)
