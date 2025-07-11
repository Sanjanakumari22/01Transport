// src/components/LocationForm.jsx
import React, { useEffect, useRef, useState } from 'react';

export default function LocationForm({ nextStep, update, goBack }) {
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');

  useEffect(() => {
    const initAutocomplete = () => {
      if (!window.google || !window.google.maps || !window.google.maps.places) return;

      const options = {
        fields: ['formatted_address', 'geometry'],
        types: ['geocode'],
        componentRestrictions: { country: 'in' },
      };

      if (pickupRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, options);
        pickupAutocomplete.addListener('place_changed', () => {
          const place = pickupAutocomplete.getPlace();
          const address = place.formatted_address || pickupRef.current.value;
          setPickup(address);
          update('pickup', address);
        });
      }

      if (dropRef.current) {
        const dropAutocomplete = new window.google.maps.places.Autocomplete(dropRef.current, options);
        dropAutocomplete.addListener('place_changed', () => {
          const place = dropAutocomplete.getPlace();
          const address = place.formatted_address || dropRef.current.value;
          setDrop(address);
          update('drop', address);
        });
      }
    };

    const waitForGoogle = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        clearInterval(waitForGoogle);
        initAutocomplete();
      }
    }, 300);

    return () => clearInterval(waitForGoogle);
  }, [update]);

  const handleNext = () => {
    if (!pickup || !drop) {
      alert("Please fill in both pickup and drop locations.");
      return;
    }
    update('pickup', pickup);
    update('drop', drop);
    nextStep();
  };

  return (
    <div className="form-section">
      <h2>Pickup & Drop Location</h2>
      <input
        type="text"
        ref={pickupRef}
        value={pickup}
        onChange={(e) => setPickup(e.target.value)}
        placeholder="Enter Pickup Location"
      />
      <input
        type="text"
        ref={dropRef}
        value={drop}
        onChange={(e) => setDrop(e.target.value)}
        placeholder="Enter Drop Location"
      />
      <div className="button-group">
        <button onClick={handleNext}>Next</button>
        <button onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
}
