// const express = require("express");
// const router = express.Router();
// const { saveHistory, getHistory } = require("../controllers/historyController");

// router.post("/save", saveHistory);
// router.get("/all", getHistory);

// module.exports = router;

const express = require("express");
const router = express.Router();
const History = require("../models/History");

// Save history
router.post("/save", async (req, res) => {
  try {
    const { imageUrl, result } = req.body;
    if (!result) return res.status(400).json({ error: "Result is required" });

    const history = new History({ imageUrl: imageUrl || "", result });
    await history.save();

    res.json({ message: "History saved successfully" });
  } catch (error) {
    console.error("Save history error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all history
router.get("/all", async (req, res) => {
  try {
    const data = await History.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    console.error("Get history error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
