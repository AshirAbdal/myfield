import mongoose from "mongoose";

const FirstFormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

export default mongoose.models.FirstFormData || mongoose.model("FirstFormData", FirstFormDataSchema);