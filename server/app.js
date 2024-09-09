// app.js

require('dotenv').config(); // Load environment variables 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const registerRoute = require("./routes/registerRoutes");
const loginRoute = require("./routes/loginRoutes");
const scoreRoute = require("./routes/scoreRoutes");
const ScoreboardRoutes = require("./routes/scoreboardRoutes");
const ProfileScoreRoutes = require("./routes/profileScoreRoutes");
// const emailVerifyRoutes = require("./routes/emailVerifyRoutes");


const app = express(); // Express setup


app.use(cors());
app.use(express.json());

// Database connection
const dbURI = "mongodb://localhost:27017/TomatoDB";
mongoose
  .connect(dbURI, {
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  }); 

// Register routes
app.use("/register", registerRoute);
// Login Routes 
app.use("/login", loginRoute);
// Saving Score Routes 
app.use("/score", scoreRoute);
// Mounting the scoreboard routes
app.use("/scoreboardRoutes", ScoreboardRoutes);
// Mounting the profile score routes
app.use("/profile-score", ProfileScoreRoutes); // Mount profileScoreRoutes under /profile-score path
// Email verification route
// app.use("/verify-email", emailVerifyRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
