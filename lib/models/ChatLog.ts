import mongoose from "mongoose";

const chatLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  prompt: { type: String, required: true },
  response: { type: String, required: true },
  mood: { type: String, default: null },
  timestamp: { type: Date, default: Date.now },
});

// Prevent model overwrite during hot reloads
export default mongoose.models.ChatLog ||
  mongoose.model("ChatLog", chatLogSchema);
