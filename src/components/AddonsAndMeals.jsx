import React, { useState, useEffect } from "react";
import "./AddonsAndMeals.css";

// Public paths for add-on images (must exist in public/assets/icons/)
const projectorImg = "/assets/icons/projector.jpg";
const speakerImg = "/assets/icons/speaker.jpg";
const micImg = "/assets/icons/microphone.jpg";
const whiteboardImg = "/assets/icons/whiteboard.jpg";
const signageImg = "/assets/icons/signage.jpg";

/*
 Props:
  - items: array of addon objects { id, name, description, price, active } (optional image)
  - onToggle: function(id) called when user toggles selection (keeps compatibility)
  - onQuantityChange: function(id, qty) called when user changes quantity (optional)
*/
export default function AddonsAndMeals({ items = [], onToggle = () => {}, onQuantityChange = () => {} }) {
  // attach images if not present
  const itemsWithImages = items.map((item) => {
    switch (item.id) {
      case "projector":
        return { ...item, image: item.image || projectorImg };
      case "speaker":
        return { ...item, image: item.image || speakerImg };
      case "mic":
        return { ...item, image: item.image || micImg };
      case "whiteboard":
        return { ...item, image: item.image || whiteboardImg };
      case "signage":
        return { ...item, image: item.image || signageImg };
      default:
        return item;
    }
  });

  // local quantities mirror incoming items (so UI is responsive). Parent can control via onQuantityChange.
  const initialQtyMap = {};
  itemsWithImages.forEach(it => { initialQtyMap[it.id] = typeof it.qty === "number" ? it.qty : 0; });
  const [qtyMap, setQtyMap] = useState(initialQtyMap);

  // keep local qty synced if parent updates items
  useEffect(() => {
    const map = {};
    itemsWithImages.forEach(it => { map[it.id] = typeof it.qty === "number" ? it.qty : (qtyMap[it.id] || 0); });
    setQtyMap(map);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const increment = (id) => {
    setQtyMap(prev => {
      const next = { ...prev, [id]: (prev[id] || 0) + 1 };
      onQuantityChange(id, next[id]);
      return next;
    });
    // ensure selected when qty > 0
    const item = itemsWithImages.find(i => i.id === id);
    if (item && !item.active) onToggle(id);
  };

  const decrement = (id) => {
    setQtyMap(prev => {
      const newQty = Math.max(0, (prev[id] || 0) - 1);
      const next = { ...prev, [id]: newQty };
      onQuantityChange(id, newQty);
      return next;
    });
  };

  return (
    <section className="addons-and-meals">
      <h2 className="section-title">Add-ons</h2>

      {itemsWithImages.length === 0 ? (
        <p className="empty">No add-ons available.</p>
      ) : (
        <ul className="addons-list">
          {itemsWithImages.map((item) => (
            <li key={item.id} className="addon-item">
              <img src={item.image} alt={item.name} className="addon-image" />

              <div className="addon-body">
                <div className="addon-info">
                  <strong className="addon-name">{item.name}</strong>
                  {item.description && <div className="addon-desc">{item.description}</div>}
                  <div className="addon-price">${item.price?.toFixed(2) ?? "—"}</div>
                </div>

                <div className="addon-controls">
                  <div className="qty-controls" aria-label={`${item.name} quantity`}>
                    <button
                      type="button"
                      className="qty-btn qty-decrement"
                      onClick={() => decrement(item.id)}
                      aria-label={`Decrease ${item.name}`}
                    >
                      −
                    </button>

                    <span className="qty-number" aria-live="polite">{qtyMap[item.id] || 0}</span>

                    <button
                      type="button"
                      className="qty-btn qty-increment"
                      onClick={() => increment(item.id)}
                      aria-label={`Increase ${item.name}`}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className={`toggle-btn ${item.active ? "active" : ""}`}
                    onClick={() => onToggle(item.id)}
                    aria-pressed={!!item.active}
                  >
                    {item.active ? "Selected" : "Add"}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}