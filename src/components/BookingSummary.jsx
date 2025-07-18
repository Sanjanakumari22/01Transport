// src/components/BookingSummary.jsx
import React, { useEffect, useState } from 'react';
import { calculateFare } from '../utils/calculateFare';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

function BookingSummary({ goBack, nextStep }) {
  const [fare, setFare] = useState(0);
  const [loading, setLoading] = useState(false);
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  // Redirect to previous step if booking data is missing
  useEffect(() => {
    if (!bookingData?.pickup || !bookingData?.drop || !bookingData?.truck) {
      navigate('/goods-selection');
    }
  }, [bookingData, navigate]);

  // Calculate fare on mount
  useEffect(() => {
    const fetchFare = async () => {
      try {
        setLoading(true);
        const estimated = await calculateFare(
          bookingData.pickup,
          bookingData.drop,
          bookingData.truck,
          90 // fuel price
        );
        setFare(estimated);
      } catch (err) {
        console.error('Error calculating fare:', err);
        setFare('Error');
      } finally {
        setLoading(false);
      }
    };

    if (bookingData.pickup && bookingData.drop && bookingData.truck) {
      fetchFare();
    }
  }, [bookingData]);

  const handleNext = async () => {
    if (fare === 'Error' || fare === 0) {
      alert('Unable to proceed. Fare not calculated properly.');
      return;
    }

    const bookingToSave = {
      name: bookingData.name || 'Guest',
      pickup: bookingData.pickup,
      drop: bookingData.drop,
      truck: bookingData.truck,
      goods: bookingData.goods,
      fare: fare,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, 'bookings'), bookingToSave);
      console.log('Booking saved successfully.');
      navigate('/payment'); // Navigate only after successful save
    } catch (error) {
      console.error('Error saving booking:', error);
      alert('Failed to save booking. Please try again.');
    }
  };

  const handleBookingComplete = () => {
    // Save to Firestore or complete payment first
    navigate('/dashboard');
  };

  return (
    <div className="summary">
      <h2>Booking Summary</h2>
      <p><strong>Name:</strong> {bookingData.name}</p>
      <p><strong>Pickup:</strong> {bookingData.pickup}</p>
      <p><strong>Drop:</strong> {bookingData.drop}</p>
      <p><strong>Truck:</strong> {bookingData.truck}</p>
      <p><strong>Goods:</strong> {bookingData.goods}</p>
      <p><strong>Estimated Fare:</strong> {loading ? 'Calculating...' : `₹${fare}`}</p>

      <div className="button-group" style={{ marginTop: '20px' }}>
        <button className="confirm" onClick={handleNext} disabled={loading || fare === 'Error'}>
          ✅ Proceed to Payment
        </button>
        <button className="callback" onClick={() => alert('Callback request submitted!')}>
          Request Callback
        </button>
        <button className="back" onClick={() => (goBack ? goBack() : navigate('/goods-selection'))}>
          Go Back
        </button>
      </div>
    </div>
  );
}

export default BookingSummary;
