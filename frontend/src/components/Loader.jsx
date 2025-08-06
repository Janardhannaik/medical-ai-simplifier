import React from "react";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-overlay-card">
      <div className="loader-spinner"></div>
      <p className="loader-text">Processing...</p>
    </div>
  );
}
