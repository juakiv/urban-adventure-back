const mongoose = require("mongoose");

const Score = mongoose.model("Score", {
  name: String,
  score: Number
});

module.exports = Score;