import mongoose from "mongoose";

const medicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String, required: true }, // e.g., "500mg"
    frequency: { type: String, required: true }, // e.g., "Twice a day"
    time: [{ type: String, required: true }], // e.g., ["08:00 AM", "08:00 PM"]
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Links medicine to a user
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // Optional, if the medicine has a fixed course
    notes: { type: String }, // Optional field for additional instructions
  });
  

export const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);