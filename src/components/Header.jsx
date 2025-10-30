import React from "react";
import "./Header.css";

export default function Header({
  onShowDetails = () => {},
  activeTab = "venue",
  onTabChange = () => {},
}) {
  const tabs = [
    { id: "venue", label: "Venue" },
    { id: "addons", label: "Add‑Ons" },
    { id: "meals", label: "Meals" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">Blizz Hotel Planner</h2>
      </div>

      <div className="navbar-center" role="tablist" aria-label="Main sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="navbar-right">
        <button onClick={onShowDetails} className="details-btn">
          Show Details
        </button>
      </div>
    </nav>
  );
}