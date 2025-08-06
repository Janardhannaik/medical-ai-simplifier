require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const fetch = require("node-fetch");
const History = require("./models/History");
const historyRoutes = require("./routes/historyRoutes");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/medical-ai", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

const upload = multer({ storage: multer.memoryStorage() });

app.post("/api/ocr", upload.single("image"), async (req, res) => {
  try {
    const { buffer } = req.file;
    const {
      data: { text },
    } = await Tesseract.recognize(buffer, "eng");
    res.json({ extractedText: text.trim() });
  } catch (error) {
    console.error("OCR error:", error);
    res.status(500).json({ error: "OCR failed" });
  }
});

app.post("/api/simplify", async (req, res) => {
  try {
    const { prescriptionText, targetLanguage, imageUrl } = req.body;

    if (!prescriptionText) {
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = `Simplify this medical instruction for a patient in ${targetLanguage}.
    Also list its benefits and possible side effects clearly in numbered points (1, 2, 3...) without using asterisks or hashtags.
    Text: ${prescriptionText}`;

    const deepSeekRes = await fetch(
      "https://api.deepseek.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ADD the API KEy`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    const data = await deepSeekRes.json();
    console.log("🔍 DeepSeek API Response:", data);

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    let simplifiedText = data.choices?.[0]?.message?.content?.trim();
    if (!simplifiedText) {
      return res.status(500).json({ error: "Empty response from DeepSeek" });
    }

    // Remove * and # symbols
    simplifiedText = simplifiedText.replace(/[*#]/g, "").trim();

    // Save to history
    await History.create({
      imageUrl: imageUrl || "",
      result: simplifiedText,
    });

    res.json({ simplifiedText });
  } catch (error) {
    console.error("Simplify error:", error);
    res.status(500).json({ error: "Simplification failed" });
  }
});

app.use("/api/history", historyRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
