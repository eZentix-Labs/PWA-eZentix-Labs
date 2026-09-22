import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    type: { type: String, enum: ["button", "social"], required: true },
    label: { type: String, default: "" },
    icon: { type: String, required: true },
    bgColor: { type: String, default: "#FFFFFF" },
    href: { type: String, required: true },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
