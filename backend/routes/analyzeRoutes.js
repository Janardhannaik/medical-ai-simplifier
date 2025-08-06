const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL is required" });
    }

    // Call DeepSeek API (replace with your real API endpoint & key)
    const deepseekRes = await axios.post(
      "https://api.deepseek.com/v1/analyze",
      { image_url: imageUrl },
      { headers: { Authorization: `Bearer YOUR_DEEPSEEK_API_KEY` } }
    );

    res.json({ result: deepseekRes.data.result || "No result found" });
  } catch (error) {
    console.error("Analyze API Error:", error.message);
    res.status(500).json({ error: "Failed to process image" });
  }
});

module.exports = router;
