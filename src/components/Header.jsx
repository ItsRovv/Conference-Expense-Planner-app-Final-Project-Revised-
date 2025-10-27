import React from "react";
import "./Header.css";

function Header({ onShowDetails }) {
  return (
    <nav className="navbar">
      <h2 className="logo">Blizz Hotel Planner</h2>
      <div className="nav-links">
        <button onClick={onShowDetails} className="details-btn">
          Show Details
        </button>
      </div>
    </nav>
  );
}

export default Header;
