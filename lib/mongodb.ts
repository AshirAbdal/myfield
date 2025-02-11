import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable.");
}

let isConnected = false; // Track the connection status

export const connectDB = async () => {
  if (isConnected) {
    console.log("Using existing MongoDB connection.");
    return;
  }

  try {
    const { connection } = await mongoose.connect(MONGODB_URI);
    isConnected = connection.readyState === 1;
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("MongoDB connection failed.");
  }
};
