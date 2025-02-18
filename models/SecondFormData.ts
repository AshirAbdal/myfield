


import mongoose from "mongoose";

const SecondFormDataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    requestUrl: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.models.SecondFormData ||
  mongoose.model("SecondFormData", SecondFormDataSchema);

