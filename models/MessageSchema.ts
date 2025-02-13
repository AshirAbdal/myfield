import mongoose from "mongoose";

// Define the schema for the message data
const MessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }, // Add message field
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model for Message
export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
