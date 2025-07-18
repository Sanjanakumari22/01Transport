import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext'; // ✅ Add this

export default function TruckSelection({ nextStep, update, goBack }) {
  const [selectedTruck, setSelectedTruck] = useState('');
  const navigate = useNavigate();

  const { bookingData, setBookingData } = useBooking(); // ✅ Add this
  const updateBooking = (newData) => {                  // ✅ Add this helper
    setBookingData({ ...bookingData, ...newData });
  };

  // ... rest of the code remains the same

  const handleSelect = (type) => {
    setSelectedTruck(type);
    if (update) update('truck', type);  // Only if update is passed
  };

  const handleNext = () => {
    if (!selectedTruck) {
      alert('Please select a truck');
      return;
    }
    updateBooking({ truck:selectedTruck});

    if (nextStep) {
      nextStep(); // Used in BookingFlow
    } else {
      // Default: go to next page (e.g., /goods-selection)
      navigate('/goods-selection');
    }
  };

  const handleGoBack = () => {
    if (goBack) {
      goBack(); // Used in BookingFlow
    } else {
      navigate('/dashboard'); // Go back in browser history
    }
  };

  const trucks = [
    {
      type: 'Small',
      image: './trucks/truck1.jpg',
      label: 'ACE / DOST / PICKUP (1.5 TON)',
    },
    {
      type: 'Medium',
      image: './trucks/truck2.avif',
      label: 'EICHER 14FT (3.5 TON)',
    },
    {
      type: 'Large-5Ton',
      image: './trucks/truck3.jpg',
      label: 'EICHER 17FT (5 TON)',
    },
    {
      type: 'Large',
      image: './trucks/truck4.avif',
      label: 'EICHER 19FT (7 TON)',
    },
    {
      type: 'Extra Large',
      image: './trucks/truck5.jpg',
      label: '20FT CONTAINER (6.5 TON)',
    },
    {
      type: 'Extra Large 2',
      image: './trucks/truck6.avif',
      label: 'EICHER PRO 22FT (10 TON)',
    },
    {
      type: 'Extra Large 3',
      image: './trucks/truck5.jpg',
      label: 'EICHER 21FT (9 TON)',
    },
    {
      type: 'Extra Large 4',
      image: './trucks/truck6.avif',
      label: '32FT CONTAINER (16 TON)',
    },
  ];

  return (
    <div className="truck-selection-container">
      <h2>Select Truck Type</h2>
      <div className="truck-grid">
        {trucks.map((truck) => (
          <div
            key={truck.type}
            className={`truck-card ${selectedTruck === truck.type ? 'selected' : ''}`}
            onClick={() => handleSelect(truck.type)}
          >
            <img src={truck.image} alt={truck.label} className="truck-image" />
            <p>{truck.label}</p>
          </div>
        ))}
      </div>

      <div className="button-group">
         <button onClick={handleNext} disabled={!selectedTruck}>Next</button>
        <button onClick={handleGoBack}>Go Back</button>
       
      </div>
    </div>
  );
}