// src/components/TruckSelection.jsx
import React, { useState } from 'react';

const trucks = [
  'ACE / DOST / PICKUP (1.5 TON)',
  'EICHER 14FT (3.5 TON)',
  'EICHER 17FT (5 TON)',
  'EICHER 19FT (7 TON)',
  '20FT CONTAINER (6.5 TON)',
  'EICHER PRO 22FT (10 TON)',
  '32FT CONTAINER (7/8 TON)',
  '32FT CONTAINER (16 TON)',
  '32FT CONTAINER (18 TON)',
  'LORRY/TAURUS (18 TON)',
  '20 / 32 / 40 FT All Side Open TRAILER',
  'PARTLOAD & PARCEL SERVICE',
];

export default function TruckSelection({ nextStep, update, goBack }) {
  const [selectedTruck, setSelectedTruck] = useState('');

  const handleNext = () => {
    update('truck', selectedTruck);
    nextStep();
  };

  return (
    <div className="form-section">
      <h2>Select Truck Type</h2>
      <select value={selectedTruck} onChange={(e) => setSelectedTruck(e.target.value)}>
        <option value="">Select a truck</option>
        {trucks.map((truck, idx) => (
          <option key={idx} value={truck}>{truck}</option>
        ))}
      </select>
      <div className="button-group">
        <button onClick={handleNext}>Next </button>
        <button className="back" onClick={goBack}>Go Back</button>

        

      </div>
    </div>
  );
}
