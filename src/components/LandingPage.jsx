import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

// ✅ Public path reference (file must be in public/assets/icons/)
const bg = "/assets/icons/conference-bg1.jpg";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="overlay">
        <div className="landing-content">
          <h1 className="landing-header">Welcome to Blizz Hotel!</h1>
          <p className="landing-subtitle">Plan your next major event with us!</p>

          <button
            className="get-started"
            onClick={() => navigate("/planner")}
          >
            GET STARTED
          </button>

          <div className="landing-description">
            <h2 className="hotel-name">Blizz Hotel</h2>
            <p>
              Your trusted partner in simplifying budget management and financial
              solutions. At Blizz Hotel, we understand the importance of effective
              cost control and offer intuitive, user-friendly solutions to meet the
              diverse needs of our clients.
            </p>
            <p>
              With a commitment to efficiency and innovation, we empower individuals
              and businesses to take control of their finances and achieve their goals.
            </p>
            <p>
              Whether you're a small business owner, a busy professional, or an
              individual looking to manage your personal finances, we're here to
              streamline your budgeting process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}