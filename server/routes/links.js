import { Router } from "express";
import Link from "../models/Link.js";
import { seedLinks } from "../data/links.seed.js";

const router = Router();

// GET /api/links -> { buttons: [], socials: [] }
router.get("/", async (_req, res) => {
  try {
    const links = await Link.find({ active: true }).sort({ order: 1 }).lean();
    const source = links.length ? links : seedLinks;
    res.json({
      buttons: source.filter((l) => l.type === "button"),
      socials: source.filter((l) => l.type === "social")
    });
  } catch (err) {
    // DB down -> still serve the page from static config
    res.json({
      buttons: seedLinks.filter((l) => l.type === "button"),
      socials: seedLinks.filter((l) => l.type === "social")
    });
  }
});

export default router;
