const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express(); // ✅ MUST come before app.use

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", testRoutes); // ✅ now correct
app.use("/api", taskRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});