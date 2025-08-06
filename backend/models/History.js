const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
  imageUrl: { type: String, default: "" },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("History", HistorySchema);
