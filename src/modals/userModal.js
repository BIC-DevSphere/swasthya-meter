import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, 
  dob: { type: Date},
  location: {type: String, enum: ['Itahari', 'Dharan', 'Kathmandu']},
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }], 
  healthSuggestions: {type: Array, default: []},

});

export const User = mongoose.models.User || mongoose.model('User', UserSchema);
