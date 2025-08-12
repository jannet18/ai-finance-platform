const mongoose = require("mongoose");
const { Env } = require("./envConfig");

const connectDB = async () => {
  try {
    // console.log("Attempting to connect to MongoDB...");
    // console.log("MongoDB URI exists:", !!Env.MONGO_URI);
    // console.log(
    //   "MongoDB URI starts with mongodb:",
    //   Env.MONGO_URI?.startsWith("mongodb")
    // );
    const connect = await mongoose.connect(Env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully: ${connect.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB database:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
