require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjust path if necessary

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

const createAdmin = async () => {
  await connectDB();

  try {
    const admin = new User({
      name: "admin",
      email: "admin@admin.com",
      password: "admin",
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created");
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

createAdmin();
