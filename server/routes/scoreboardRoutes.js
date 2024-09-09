// Inside scoreboardRoutes.js

const express = require("express");
const Scoreboard = require("../models/scoreboardSchema"); // Assuming you have a mongoose model defined

const router = express.Router();

// Endpoint to get all scores
router.get("/", async (req, res) => {
  try {
    const allScores = await Scoreboard.find();
    res.status(200).json(allScores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
