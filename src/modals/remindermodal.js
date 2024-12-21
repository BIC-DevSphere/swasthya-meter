import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
    reminderTime: { type: Date, required: true }, // The exact time of the reminder
    status: { type: String, enum: ['Pending', 'Sent', 'Acknowledged'], default: 'Pending' },
  });

export const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);``