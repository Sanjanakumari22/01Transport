// src/components/LocationForm.jsx
import React, { useState } from 'react';

export default function LocationForm({ nextStep, update }) {
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  const handleNext = () => {
    update('pickup', pickup); // ✅ Must call update for 'pickup'
    update('drop', drop);
    nextStep();
  };

  return (
    <div className="form-section">
      <h2>Enter Pickup and Drop Locations</h2>
      <input
        type="text"
        placeholder="Pickup Location"
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
      />
      <input
        type="text"
        placeholder="Drop Location"
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
      />
      <button onClick={handleNext}>Next</button>
    </div>
  );
}


