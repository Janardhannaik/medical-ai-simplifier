import React, { useRef, useState } from "react";
import axios from "axios";
import "./ResultDisplay.css";

export default function ResultDisplay({ result, imagePreview, onBack }) {
  const outputRef = useRef(null);
  const [showHistory, setShowHistory] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);

  const speakText = (text) => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/history/all");
      setHistoryData(res.data);
      setShowHistory(true);
    } catch (err) {
      console.error("❌ Error fetching history:", err);
    }
  };

  const viewFullHistory = (history) => {
    setSelectedHistory(history);
  };

  const backToHistoryList = () => {
    setSelectedHistory(null);
  };

  return (
    <div className="result-layout">
      {/* Normal output view */}
      {!showHistory && (
        <div className="card-box">
          {imagePreview && (
            <div className="uploaded-image-box">
              <img src={imagePreview} alt="Uploaded" />
            </div>
          )}
          <div ref={outputRef} className="scrollable-content">
            {result || "No output yet"}
          </div>
          <div className="action-row">
            <button onClick={() => speakText(result)} className="gradient-btn">
              🔊 Speak
            </button>
            <button onClick={fetchHistory} className="gradient-btn">
              📜 History
            </button>
            <button onClick={onBack} className="gradient-btn">
              ⬅ Back
            </button>
          </div>
        </div>
      )}

      {/* History list view */}
      {showHistory && !selectedHistory && (
        <div className="card-box">
          <div className="scrollable-content">
            {historyData.length === 0 && <p>No history found.</p>}
            {historyData.map((item) => (
              <div
                className="history-item gradient-moving"
                key={item._id}
                onClick={() => viewFullHistory(item)}
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt="history"
                    className="history-thumb"
                  />
                )}
                <p className="history-text">
                  {item.result.substring(0, 80)}...
                </p>
                <small>{new Date(item.date).toLocaleString()}</small>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowHistory(false)}
            className="gradient-btn"
          >
            ⬅ Back to Result
          </button>
        </div>
      )}

      {/* Full history detail view */}
      {showHistory && selectedHistory && (
        <div className="card-box gradient-moving">
          {selectedHistory.imageUrl && (
            <div className="uploaded-image-box">
              <img src={selectedHistory.imageUrl} alt="history-full" />
            </div>
          )}
          <div className="scrollable-content">{selectedHistory.result}</div>
          <div className="action-row">
            <button
              onClick={() => speakText(selectedHistory.result)}
              className="gradient-btn"
            >
              🔊 Speak
            </button>
            <button onClick={backToHistoryList} className="gradient-btn">
              ⬅ Back to History
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
