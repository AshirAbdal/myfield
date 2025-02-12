import mongoose from "mongoose";

const FirstFormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields.

export default mongoose.models.FirstFormData || mongoose.model("FirstFormData", FirstFormDataSchema);
