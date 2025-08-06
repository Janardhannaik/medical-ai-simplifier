import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import "./UploadForm.css";

export default function UploadForm({ setResult, onProcessStart }) {
  const [language, setLanguage] = useState("English");
  const [text, setText] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef(null);

  const API_BASE = "http://localhost:5000/api";

  const processAndSend = async (finalText) => {
    const res = await axios.post(`${API_BASE}/simplify`, {
      prescriptionText: finalText,
      targetLanguage: language,
    });
    setResult(res.data.simplifiedText);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    onProcessStart(imageUrl);

    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(`${API_BASE}/ocr`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    processAndSend(res.data.extractedText);
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onProcessStart(imageSrc);

    const blob = await fetch(imageSrc).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blob, "capture.jpg");

    const res = await axios.post(`${API_BASE}/ocr`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    processAndSend(res.data.extractedText);
    setShowCamera(false);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    onProcessStart();
    processAndSend(text);
  };

  return (
    <div className="form-container">
      <label htmlFor="file-upload" className="file-upload gradient-btn">
        ⬆ Choose a file
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
      />

      <form onSubmit={handleTextSubmit}>
        <textarea
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="text-input"
          rows="4"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="select-language"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Kannada</option>
          <option>Spanish</option>
        </select>
        <button type="submit" className="gradient-btn">
          Simplify Instructions
        </button>
      </form>

      {!showCamera && (
        <button className="gradient-btn" onClick={() => setShowCamera(true)}>
          📷 Scan with Camera
        </button>
      )}
      {showCamera && (
        <div>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
          <button onClick={captureImage} className="gradient-btn">
            Capture & Process
          </button>
          <button onClick={() => setShowCamera(false)} className="cancel-btn">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
