import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    businessName: { type: String, required: true, trim: true },
    businessType: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    date: { type: String, required: true },   // YYYY-MM-DD
    time: { type: String, required: true },   // HH:mm (24h)
    notes: { type: String, default: "", trim: true },
    // delivery status of the two side-effects, so a failure is visible later
    sheetSynced: { type: Boolean, default: false },
    whatsappSent: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// one booking per slot
bookingSchema.index({ date: 1, time: 1 }, { unique: true });

export default mongoose.model("Booking", bookingSchema);
