// Pricing plans — edit here to change copy, numbers or features.
// Amounts are in paise-free rupees (whole numbers), formatted for display
// with formatINR() in Pricing.jsx.
export const plans = [
  {
    id: "basic",
    name: "Basic",
    tagline: "For a single counter",
    chip: "Chai stall, sweet shop, takeaway counter",
    monthly: 999,
    yearly: 9990,
    stats: [
      { label: "Tables", value: "8" },
      { label: "Menu items", value: "50" },
      { label: "Staff logins", value: "2" },
      { label: "Outlets", value: "1" }
    ],
    included: [
      "Owner Console",
      "Billing Counter (1 login)",
      "Bill & KOT printing",
      "Dining + Takeaway",
      "WhatsApp bill delivery",
      "Google Business listing, set up and managed",
      "Daily sales summary",
      "Complimentary agency access"
    ],
    excluded: ["Waiter App", "Live Floor View", "Home delivery", "Trend analytics"],
    featured: false,
    cta: "Choose Basic"
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For a restaurant with floor staff",
    chip: "Dine-in restaurant, café, cloud kitchen",
    monthly: 2499,
    yearly: 24990,
    badge: "Most restaurants pick this",
    stats: [
      { label: "Tables", value: "25" },
      { label: "Menu items", value: "200" },
      { label: "Staff logins", value: "8" },
      { label: "Outlets", value: "1" }
    ],
    included: [
      "Everything in Basic",
      "Waiter App (up to 5 waiters)",
      "Live Floor View — real-time table map",
      "Home delivery module",
      "Instagram + Facebook management",
      "Menu microsite on your own page",
      "WhatsApp order updates + review requests",
      "Trend analytics — peak hours, best sellers, week-on-week",
      "Basic inventory tracking"
    ],
    excluded: ["Multi-outlet console", "Managed ad campaigns", "Procurement"],
    featured: true,
    cta: "Choose Pro"
  },
  {
    id: "pro-plus",
    name: "Pro Plus",
    tagline: "For an owner who wants us running growth",
    chip: "Multi-outlet, or scaling fast",
    monthly: 4999,
    yearly: 49990,
    stats: [
      { label: "Tables", value: "Unlimited" },
      { label: "Menu items", value: "Unlimited" },
      { label: "Staff logins", value: "Unlimited" },
      { label: "Outlets", value: "Unlimited" }
    ],
    included: [
      "Everything in Pro",
      "Multi-outlet console — every branch in one view",
      "Full business intelligence — margins, wastage, staff performance",
      "Your own .com domain, included",
      "Managed ad campaigns — Google, Facebook, WhatsApp",
      "Raw material procurement + inventory management",
      "Home delivery partner integration",
      "Priority support with a named contact",
      "Quarterly business review with the founder"
    ],
    excluded: [],
    featured: false,
    cta: "Choose Pro Plus"
  }
];
