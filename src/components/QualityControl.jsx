// src/components/QuantityControl.jsx
import React from "react";

export default function QuantityControl({
  value,
  onIncrement,
  onDecrement,
  min = 0,
  max = 999,
  ariaLabel,
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <button
        type="button"
        aria-label={`decrease ${ariaLabel || "quantity"}`}
        onClick={onDecrement}
        disabled={value <= min}
      >
        -
      </button>

      <div aria-live="polite" style={{ minWidth: 32, textAlign: "center" }}>
        {value}
      </div>

      <button
        type="button"
        aria-label={`increase ${ariaLabel || "quantity"}`}
        onClick={onIncrement}
        disabled={value >= max}
      >
        +
      </button>
    </div>
  );
}