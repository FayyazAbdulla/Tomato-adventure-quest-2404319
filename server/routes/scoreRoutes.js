// Inside your Express.js routes
const express = require("express");
const Scoreboard = require("../models/scoreboardSchema");

const router = express.Router();

// Endpoint to save score
router.post("/", async (req, res) => {
  const { email, score } = req.body;

  console.log("Received score details:");
  console.log("Email:", email);
  console.log("Score:", score);

  try {
    // Create a new scoreboard entry
    const newScoreboardEntry = new Scoreboard({
      email,
      score,
    });
    await newScoreboardEntry.save();
    res.status(200).json({ message: "Score saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
