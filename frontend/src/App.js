import React, { useState } from "react";
import UploadForm from "./components/UploadForm";
import ResultDisplay from "./components/ResultDisplay";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState("input"); // "input", "output", "about", "contact"
  const [imagePreview, setImagePreview] = useState(null);

  const handleProcessStart = (imageUrl) => {
    setImagePreview(imageUrl || null);
    setLoading(true);
  };

  const handleProcessComplete = (text) => {
    setResult(text);
    setLoading(false);
    setView("output");
  };

  return (
    <div className="app-container">
      <div className={`card ${loading ? "blur-card" : ""}`}>
        {/* Nav Bar */}
        <div className="nav-bar">
          <div className="nav-left">⚙️</div>
          <div className="nav-right">
            <button className="nav-btn" onClick={() => setView("input")}>
              🏠
            </button>
            <button className="nav-btn" onClick={() => setView("about")}>
              ℹ️
            </button>
            <button className="nav-btn" onClick={() => setView("contact")}>
              📞
            </button>
          </div>
        </div>

        {/* Loader inside card */}
        {loading && <Loader />}

        {/* Views */}
        {view === "input" && !loading && (
          <>
            <h1 className="title">AI Medical Instruction Simplifier</h1>
            <p className="subtitle">
              Upload or paste your prescription or doctor’s notes
            </p>
            <UploadForm
              setResult={handleProcessComplete}
              onProcessStart={handleProcessStart}
            />
          </>
        )}

        {view === "output" && !loading && (
          <ResultDisplay
            result={result}
            imagePreview={imagePreview}
            onBack={() => setView("input")}
          />
        )}

        {view === "about" && !loading && (
          <div className="page-content">
            <h2>About</h2>
            <p>
              This AI tool helps simplify medical prescriptions and doctor's
              notes into patient-friendly instructions in your preferred
              language.
            </p>
          </div>
        )}

        {view === "contact" && !loading && (
          <div className="page-content">
            <h2>Contact</h2>
            <p>Email: support@medicalai.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
