// backend/db.js
require("dotenv").config();
const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("Missing MONGODB_URI environment variable.");
  process.exit(1);
}

mongoose.connect(uri, {
  // These options are fine to omit on modern drivers, but harmless:
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});

module.exports = mongoose;
