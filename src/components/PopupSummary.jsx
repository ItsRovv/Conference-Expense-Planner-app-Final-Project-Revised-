// src/components/PopupSummary.jsx
import React, { useEffect, useState } from "react";
import "./PopupSummary.css";

function formatCents(centsVal) {
  return (centsVal / 100).toLocaleString(undefined, { style: "currency", currency: "USD" });
}

export default function PopupSummary({ rows = [], totalCents = 0, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!rows || rows.length === 0) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [rows]);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      if (typeof onClose === "function") onClose();
    }, 400);
  };

  if (!rows || rows.length === 0) {
    return (
      <div className={`popup-overlay ${closing ? "fade-out" : ""}`}>
        <div className={`popup-content ${closing ? "fade-out" : ""}`}>
          <h2>Your Selection Summary</h2>
          <p>No items selected yet.</p>
          <button className="close-btn" onClick={handleClose}>Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`popup-overlay ${closing ? "fade-out" : ""}`}>
      <div className={`popup-content ${closing ? "fade-out" : ""}`}>
        <h2>Your Selection Summary</h2>

        <table className="summary-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Unit Cost</th>
              <th>Quantity</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.name}</td>
                <td style={{ textAlign: "right" }}>{formatCents(r.unitCents)}</td>
                <td style={{ textAlign: "right" }}>{r.quantity}</td>
                <td style={{ textAlign: "right" }}>{formatCents(r.subtotalCents)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3 style={{ textAlign: "right" }}>Total: {formatCents(totalCents)}</h3>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button className="close-btn" onClick={handleClose}>Close</button>
        </div>
      </div>
    </div>
  );
}