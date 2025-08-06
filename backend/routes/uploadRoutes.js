const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Store images in uploads/ folder
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Upload route
router.post("/", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({
    imageUrl: `http://localhost:5000/${req.file.path}`,
  });
});

module.exports = router;
