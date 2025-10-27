import React from "react";
import "./QuantityControl.css";

export default function QuantityControl({ value, onIncrement, onDecrement, ariaLabel }) {
  return (
    <div className="quantity-controls" aria-label={ariaLabel}>
      <button
        onClick={onDecrement}
        className="quantity-btn"
        aria-label={`Decrease ${ariaLabel}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      <span className="quantity-value">{value}</span>

      <button
        onClick={onIncrement}
        className="quantity-btn"
        aria-label={`Increase ${ariaLabel}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}