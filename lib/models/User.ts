import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  sobrietyStartDate: { type: Date, default: Date.now },
  mood: { type: String, default: null },
  substances: { type: [String], default: [] }, // e.g., ["alcohol", "nicotine"]
  reasonsForUse: { type: [String], default: [] }, // e.g., ["stress", "loneliness"]
  copingStrategies: { type: [String], default: [] }, // e.g., ["exercise", "calling a friend"]
});

// Prevent model overwrite in dev
export default mongoose.models.User || mongoose.model("User", userSchema);
