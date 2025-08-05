import mongoose from "mongoose";
import { Env } from "./envConfig";

const connectDB = async () => {
  try {
    await mongoose.connect(Env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
