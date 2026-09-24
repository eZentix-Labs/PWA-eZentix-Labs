import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import linksRouter from "./routes/links.js";
import clicksRouter from "./routes/clicks.js";
import consultationsRouter from "./routes/consultations.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1 }));
app.use("/api/links", linksRouter);
app.use("/api/clicks", clicksRouter);
app.use("/api/consultations", consultationsRouter);

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stv-web")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.warn("MongoDB unavailable, serving static config:", err.message));

app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
