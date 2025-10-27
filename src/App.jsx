// src/App.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ProductSelectionPage from "./components/ProductSelectionPage";
import PopupSummary from "./components/PopupSummary";

export default function App() {
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [summaryRows, setSummaryRows] = useState([]);
  const [summaryTotalCents, setSummaryTotalCents] = useState(0);

  const handleShowDetails = (rows, totalCents) => {
    setSummaryRows(rows || []);
    setSummaryTotalCents(totalCents || 0);
    setSummaryOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/planner"
        element={
          <>
            <ProductSelectionPage onShowDetails={handleShowDetails} />
            {summaryOpen && (
              <PopupSummary
                rows={summaryRows}
                totalCents={summaryTotalCents}
                onClose={() => setSummaryOpen(false)}
              />
            )}
          </>
        }
      />
    </Routes>
  );
}