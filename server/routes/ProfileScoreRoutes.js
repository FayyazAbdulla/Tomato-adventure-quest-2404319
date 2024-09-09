// Inside profileScoreRoutes.js

const express = require("express");
const Scoreboard = require("../models/scoreboardSchema");

const router = express.Router();

// Endpoint to get score by username (Profile Card)
router.get("/", async (req, res) => {
  const { username } = req.query;

  console.log("Fetching score for username:", username);

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const userScore = await Scoreboard.findOne({ email: username });
    console.log("User Score:", userScore);
    if (!userScore) {   
      console.log("User not found");
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ score: userScore.score });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
