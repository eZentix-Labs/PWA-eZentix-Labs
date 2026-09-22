import { Router } from "express";
import Click from "../models/Click.js";

const router = Router();

// POST /api/clicks -> record one button/social click
router.post("/", async (req, res) => {
  const { key, type } = req.body || {};
  if (!key || !["button", "social"].includes(type)) {
    return res.status(400).json({ error: "key and valid type are required" });
  }
  try {
    await Click.create({
      key,
      type,
      referrer: req.get("referer") || "",
      userAgent: req.get("user-agent") || ""
    });
  } catch {
    // analytics must never block the outbound link
  }
  res.status(204).end();
});

// GET /api/clicks/stats -> clicks grouped by key
router.get("/stats", async (_req, res) => {
  try {
    const stats = await Click.aggregate([
      { $group: { _id: { key: "$key", type: "$type" }, count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(stats.map((s) => ({ key: s._id.key, type: s._id.type, count: s.count })));
  } catch {
    res.status(503).json({ error: "stats unavailable" });
  }
});

export default router;
