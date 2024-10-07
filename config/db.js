const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Connected Successfully to MongoDB`.bgBlue.white);
  } catch (error) {
    console.error(`Error: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

module.exports = connectDB;
