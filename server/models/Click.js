import mongoose from "mongoose";

const clickSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    type: { type: String, enum: ["button", "social"], required: true },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

export default mongoose.model("Click", clickSchema);
