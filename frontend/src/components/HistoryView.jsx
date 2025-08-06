import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HistoryView.css";

export default function HistoryView({ onBack }) {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/history/all")
      .then((res) => setHistoryData(res.data))
      .catch((err) => console.error("Error fetching history:", err));
  }, []);

  return (
    <div>
      <h2>📜 History</h2>
      <div className="history-container">
        {historyData.map((item) => (
          <div className="history-card" key={item._id}>
            <img src={item.imageUrl} alt="history" />
            <p>{item.result.substring(0, 80)}...</p>
            <small>{new Date(item.date).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <button onClick={onBack} className="gradient-btn">
        ⬅ Back
      </button>
    </div>
  );
}
