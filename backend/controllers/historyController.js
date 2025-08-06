const History = require("../models/History");

exports.saveHistory = async (req, res) => {
  try {
    let { imageUrl, result } = req.body;

    if (!result) {
      return res.status(400).json({ error: "Result text is required" });
    }

    if (!imageUrl) {
      imageUrl = ""; // Fallback if no image uploaded
    }

    const history = new History({ imageUrl, result });
    await history.save();
    res.json({ message: "History saved successfully" });
  } catch (error) {
    console.error("Error saving history:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const data = await History.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ error: error.message });
  }
};
