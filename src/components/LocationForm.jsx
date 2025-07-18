import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';


export default function LocationForm({ nextStep, goBack, update}) {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropSuggestions, setDropSuggestions] = useState([]);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  const autocompleteService = useRef(null);

  
  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();

      const options = {
        fields: ['formatted_address', 'geometry'],
        types: ['geocode'],
        componentRestrictions: { country: 'in' },
      };

      const pickupInput = pickupRef.current;
      const dropInput = dropRef.current;

      if (pickupInput) {
        const auto = new window.google.maps.places.Autocomplete(pickupInput, options);
        auto.addListener('place_changed', () => {
          const place = auto.getPlace();
          if (place && place.formatted_address) {
            setPickup(place.formatted_address);
            setPickupSuggestions([]);
            update('pickup', place.formatted_address);
          }
        });
      }

      if (dropInput) {
        const auto = new window.google.maps.places.Autocomplete(dropInput, options);
        auto.addListener('place_changed', () => {
          const place = auto.getPlace();
          if (place && place.formatted_address) {
            setDrop(place.formatted_address);
            setDropSuggestions([]);
            update('drop', place.formatted_address);
          }
        });
      }
    }
  }, [update]);

  const handleFallbackSuggestions = (input, setter) => {
    if (autocompleteService.current && input) {
      autocompleteService.current.getPlacePredictions(
        { input, componentRestrictions: { country: 'in' } },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
            setter(predictions);
          } else {
            setter([]);
          }
        }
      );
    }
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    update('pickup', value);
    handleFallbackSuggestions(value, setPickupSuggestions);
  };

  const handleDropChange = (e) => {
    const value = e.target.value;
    setDrop(value);
    update('drop', value);
    handleFallbackSuggestions(value, setDropSuggestions);
  };

  const selectPickupSuggestion = (suggestion) => {
    setPickup(suggestion.description);
    setPickupSuggestions([]);
    update('pickup', suggestion.description);
  };

  const selectDropSuggestion = (suggestion) => {
    setDrop(suggestion.description);
    setDropSuggestions([]);
    update('drop', suggestion.description);
  };

  const handleNext = () => {
    if (!pickup || !drop) {
      alert("Please fill in both pickup and drop locations.");
      return;
    }
    
    
  



    navigate('/truck-selection');
  };

  const handleGoBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="form-section-with-video">
      <div className="form-section-content">
        <h2>Pickup & Drop Location</h2>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            ref={pickupRef}
            value={pickup}
            onChange={handlePickupChange}
            placeholder="Enter Pickup Location"
            autoComplete="off"
          />
          {pickupSuggestions.length > 0 && (
            <ul className="suggestions">
              {pickupSuggestions.map((s, idx) => (
                <li key={idx} onClick={() => selectPickupSuggestion(s)}>
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            ref={dropRef}
            value={drop}
            onChange={handleDropChange}
            placeholder="Enter Drop Location"
            autoComplete="off"
          />
          {dropSuggestions.length > 0 && (
            <ul className="suggestions">
              {dropSuggestions.map((s, idx) => (
                <li key={idx} onClick={() => selectDropSuggestion(s)}>
                  {s.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="button-group" style={{ marginTop: '1rem' }}>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>

      {/* Background video */}
      <video className="video-bg" autoPlay loop muted playsInline>
        <source src="/moving-truck.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Styles */}
      <style>{`
        .form-section-with-video {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 40vh;
          object-fit: cover;
          z-index: 0;
        }

        .form-section-content {
          position: relative;
          color: white;
          z-index: 1;
          background: rgba(214, 112, 112, 0.95);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(2, 2, 2, 0.2);
          width: 90%;
          max-width: 500px;
        }

        .suggestions {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          width: 100%;
          z-index: 10;
          max-height: 200px;
          overflow-y: auto;
          margin-top: -1px;
        }

        .suggestions li {
          padding: 0.5rem;
          cursor: pointer;
        }

        .suggestions li:hover {
          background: #f0f0f0;
        }
      `}</style>
    </div>
  );
}
