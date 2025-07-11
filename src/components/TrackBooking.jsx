// src/components/TrackBooking.jsx
import React, { useState } from 'react';
import '../pages/TrackBooking.css'; 

function TrackBooking() {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState(null);

  const handleTrack = () => {
    // Dummy logic (replace with real API or database lookup)
    if (trackingId === '12345') {
      setStatus('🚚 Your truck is en route to pickup location.');
    } else {
      setStatus('❌ No booking found with this ID.');
    }
  };

  return (
    <div className="track-container">
      <h2>Track Your Booking</h2>
      <input
        type="text"
        placeholder="Enter Tracking ID or Phone Number"
        value={trackingId}
        onChange={(e) => setTrackingId(e.target.value)}
      />
      <button onClick={handleTrack}>Track</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

export default TrackBooking;