import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // We removed the options object entirely here
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);

    // Exit process if DB fails
    process.exit(1);
  }
};

export default connectDB;