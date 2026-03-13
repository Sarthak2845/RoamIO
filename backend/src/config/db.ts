import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env");
    }

    await mongoose.connect(uri);

    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("Error connecting to MongoDB", { error });
    process.exit(1);
  }
};