import mongoose from "mongoose";

const feedBackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  topic: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const feedBack = mongoose.model("feedBack", feedBackSchema);
export default feedBack;
