import React from "react";
import "./AddonsAndMeals.css";

// Public paths for add-on images (must exist in public/assets/icons/)
const projectorImg = "/assets/icons/projector.jpg";
const speakerImg = "/assets/icons/speaker.jpg";
const micImg = "/assets/icons/microphone.jpg";
const whiteboardImg = "/assets/icons/whiteboard.jpg";
const signageImg = "/assets/icons/signage.jpg";

export default function AddonsAndMeals({ items = [], onToggle = () => {} }) {
  // If items don’t already have images, map them here
  const itemsWithImages = items.map((item) => {
    switch (item.id) {
      case "projector":
        return { ...item, image: projectorImg };
      case "speaker":
        return { ...item, image: speakerImg };
      case "mic":
        return { ...item, image: micImg };
      case "whiteboard":
        return { ...item, image: whiteboardImg };
      case "signage":
        return { ...item, image: signageImg };
      default:
        return item;
    }
  });

  return (
    <section className="addons-and-meals">
      <h2 className="section-title">Add-ons</h2>

      {itemsWithImages.length === 0 ? (
        <p className="empty">No add-ons available.</p>
      ) : (
        <ul className="addons-list">
          {itemsWithImages.map((item) => (
            <li key={item.id} className="addon-item">
              <img
                src={item.image}
                alt={item.name}
                className="addon-image"
              />
              <div className="addon-details">
                <strong className="addon-name">{item.name}</strong>
                {item.description && (
                  <span className="addon-desc">{item.description}</span>
                )}
                <span className="addon-price">
                  ${item.price?.toFixed(2) ?? "—"}
                </span>
              </div>

              <div className="addon-controls">
                <button
                  type="button"
                  className={`toggle-btn ${item.active ? "active" : ""}`}
                  onClick={() => onToggle(item.id)}
                  aria-pressed={!!item.active}
                >
                  {item.active ? "Selected" : "Add"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}