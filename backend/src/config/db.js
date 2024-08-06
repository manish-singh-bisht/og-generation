const mongoose = require("mongoose");
const { DB_URI } = require("./index");

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const conn = await mongoose.connect(DB_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
