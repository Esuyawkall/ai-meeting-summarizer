// src/config/db.ts
import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("✅ MongoDB connected");
  } catch (error: unknown) {
    // Type-safe way to handle unknown errors
    if (error instanceof Error) {
      console.error("❌ MongoDB connection failed:", error.message);
    } else {
      console.error("❌ MongoDB connection failed:", error);
    }
    process.exit(1);
  }
};

export default connectDB;
