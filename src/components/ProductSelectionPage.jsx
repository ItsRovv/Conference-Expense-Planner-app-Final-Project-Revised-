import React, { useState, useMemo } from "react";
import "./ProductSelectionPage.css";
import Header from "./Header";
import AddonsAndMeals from "./AddonsAndMeals";

/*
  Put these files into: public/assets/icons/
  Filenames (exact/case-sensitive):
    auditorium.jpg
    conference-room.jpg
    presentation-room.jpg
    large-meeting.jpg
    small-meeting.jpg
    breakfast.jpg
    lunch.jpg
    hightea.jpg
    dinner.jpg
*/

const auditoriumImg = "/assets/icons/auditorium.jpg";
const conferenceRoomImg = "/assets/icons/conference-room.jpg";
const presentationRoomImg = "/assets/icons/presentation-room.jpg";
const largeMeetingImg = "/assets/icons/large-meeting.jpg";
const smallMeetingImg = "/assets/icons/small-meeting.jpg";

const breakfastImg = "/assets/icons/breakfast.jpg";
const lunchImg = "/assets/icons/lunch.jpg";
const highteaImg = "/assets/icons/hightea.jpg";
const dinnerImg = "/assets/icons/dinner.jpg";

function ProductSelectionPage({ onShowDetails }) {
  const [step, setStep] = useState("rooms");

  const [rooms, setRooms] = useState([
    { id: "room-aud", name: "Auditorium Hall", capacity: 200, price: 5500, qty: 0, image: auditoriumImg },
    { id: "room-conf", name: "Conference Room", capacity: 15, price: 3500, qty: 0, image: conferenceRoomImg },
    { id: "room-pres", name: "Presentation Room", capacity: 50, price: 700, qty: 0, image: presentationRoomImg },
    { id: "room-large", name: "Large Meeting Room", capacity: 10, price: 900, qty: 0, image: largeMeetingImg },
    { id: "room-small", name: "Small Meeting Room", capacity: 5, price: 1100, qty: 0, image: smallMeetingImg },
  ]);

  const [addons, setAddons] = useState([
    { id: "projector", name: "Projector", description: "HD projector", price: 200, active: false },
    { id: "speaker", name: "Speaker", description: "Wireless speaker", price: 35, active: false },
    { id: "mic", name: "Microphones", description: "Handheld mics", price: 45, active: false },
    { id: "whiteboard", name: "Whiteboard", description: "Magnetic board", price: 80, active: false },
    { id: "signage", name: "Signage", description: "Event signage", price: 80, active: false }
  ]);

  const [meals, setMeals] = useState({
    people: 0,
    breakfast: false,
    lunch: false,
    highTea: false,
    dinner: false
  });

  const mealOptions = [
    { key: "breakfast", name: "Breakfast", price: 50, image: breakfastImg },
    { key: "lunch", name: "Lunch", price: 60, image: lunchImg },
    { key: "highTea", name: "High Tea", price: 25, image: highteaImg },
    { key: "dinner", name: "Dinner", price: 70, image: dinnerImg }
  ];

  const increment = (index) => {
    setRooms(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: copy[index].qty + 1 };
      return copy;
    });
  };

  const decrement = (index) => {
    setRooms(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], qty: Math.max(0, copy[index].qty - 1) };
      return copy;
    });
  };

  const toggleAddon = (id) => {
    setAddons(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const toggleMeal = (key) => {
    setMeals(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const updatePeople = (e) => {
    const value = parseInt(e.target.value, 10);
    setMeals(prev => ({ ...prev, people: isNaN(value) ? 0 : value }));
  };

  const anyRoomSelected = rooms.some(r => r.qty > 0);

  const roomRowsForSummary = useMemo(() =>
    rooms
      .filter(r => r.qty > 0)
      .map(r => ({
        name: `${r.name} (Capacity: ${r.capacity})`,
        unitCents: Math.round(r.price * 100),
        quantity: r.qty,
        subtotalCents: Math.round(r.price * 100) * r.qty
      }))
  , [rooms]);

  const selectedAddons = addons.filter(a => a.active);
  const addonsSubtotalCents = selectedAddons.reduce((s, a) => s + a.price * 100, 0);

  const mealsSubtotalCents = mealOptions.reduce((s, m) => {
    return meals[m.key] && meals.people > 0 ? s + m.price * 100 * meals.people : s;
  }, 0);

  const roomsTotalCents = roomRowsForSummary.reduce((s, r) => s + r.subtotalCents, 0);
  const combinedTotalCents = roomsTotalCents + addonsSubtotalCents + mealsSubtotalCents;
  const totalCost = combinedTotalCents / 100;

  const buildCombinedRows = () => {
    const combinedRows = [...roomRowsForSummary];

    selectedAddons.forEach(a => {
      combinedRows.push({
        name: a.name,
        unitCents: a.price * 100,
        quantity: 1,
        subtotalCents: a.price * 100
      });
    });

    mealOptions.forEach(m => {
      if (meals[m.key] && meals.people > 0) {
        combinedRows.push({
          name: m.name,
          unitCents: m.price * 100,
          quantity: `For ${meals.people} people`,
          subtotalCents: m.price * 100 * meals.people
        });
      }
    });

    return combinedRows;
  };

  const handleShowDetails = () => {
    const rows = buildCombinedRows();
    if (typeof onShowDetails === "function") onShowDetails(rows, combinedTotalCents);
  };

  return (
    <div className="product-selection">
      <Header onShowDetails={handleShowDetails} />

      {step === "rooms" && (
        <>
          <header className="selection-header">
            <h1>Room Selection</h1>
            <p>Choose your preferred rooms for your next event</p>
          </header>

          <div className="room-list">
            {rooms.map((room, index) => (
              <div className="room-card" key={room.id}>
                <img src={room.image} alt={room.name} className="room-image" />
                <h3>{room.name}</h3>
                <p>Capacity: {room.capacity} guests</p>
                <p>Price: ${room.price}</p>

                <div className="quantity-controls" aria-label={`${room.name} quantity`}>
                  <button
                    type="button"
                    onClick={() => decrement(index)}
                    className="qty-btn qty-decrement"
                    aria-label={`Decrease ${room.name}`}
                  >
                    −
                  </button>

                  <span className="qty-number" aria-live="polite">{room.qty}</span>

                  <button
                    type="button"
                    onClick={() => increment(index)}
                    className="qty-btn qty-increment"
                    aria-label={`Increase ${room.name}`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="total-section">
            <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
            <button
              className="proceed-btn"
              onClick={() => setStep("addons")}
              disabled={!anyRoomSelected}
            >
              Next: Add-ons
            </button>
          </div>
        </>
      )}

      {step === "addons" && (
        <>
          <div className="addons-header">
            <h1>Add-ons & Meals</h1>
            <p>Select equipment and meals for your event</p>
          </div>

          <div className="addons-wrapper">
            <AddonsAndMeals items={addons} onToggle={toggleAddon} />
          </div>

          <div className="meals-section">
            <h2>Meal Selection</h2>
            <label className="people-label">
              Number of People:
              <input
                type="number"
                min="0"
                value={meals.people}
                onChange={updatePeople}
                className="people-input"
              />
            </label>

            <div className="meal-list">
              {mealOptions.map(meal => (
                <div key={meal.key} className={`meal-card ${meals[meal.key] ? "active" : ""}`}>
                  <img src={meal.image} alt={meal.name} className="meal-image" />
                  <h3>{meal.name}</h3>
                  <p>₱{meal.price} per person</p>
                  <button
                    type="button"
                    className={`toggle-btn ${meals[meal.key] ? "active" : ""}`}
                    onClick={() => toggleMeal(meal.key)}
                    aria-pressed={!!meals[meal.key]}
                  >
                    {meals[meal.key] ? "Selected" : "Add"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="total-section">
            <h2>Total Cost: ${totalCost.toFixed(2)}</h2>
            <div className="actions-row">
              <button onClick={() => setStep("rooms")} className="proceed-btn secondary">Back</button>
              <button onClick={handleShowDetails} className="proceed-btn">Review Summary</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProductSelectionPage;