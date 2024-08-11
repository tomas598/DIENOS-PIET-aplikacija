const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/admin", require("./routes/adminauth"));
app.use("/api/posts", require("./routes/posts")); // Add this line for posts routes

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
