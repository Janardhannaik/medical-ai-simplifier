const express = require("express");
const multer = require("multer");
const Tesseract = require("tesseract.js");
const { simplifyText } = require("../controllers/simplifyController");

const router = express.Router();

// Allow memory buffer upload
const upload = multer({ storage: multer.memoryStorage() });

// OCR from uploaded file (image or camera capture)
router.post("/ocr", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const {
      data: { text },
    } = await Tesseract.recognize(req.file.buffer, "eng");
    res.json({ extractedText: text.trim() });
  } catch (error) {
    console.error("OCR Error:", error);
    res.status(500).json({ error: "OCR failed" });
  }
});

router.post("/simplify", simplifyText);

module.exports = router;
