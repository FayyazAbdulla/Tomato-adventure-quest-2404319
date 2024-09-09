// scoreboardSchema.js
const mongoose = require('mongoose');

const scoreboardSchema = new mongoose.Schema({
  email: { type: String, required: true },
  score: { type: Number, default: 0 },
});

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);

module.exports = Scoreboard;
 