// src/components/BookingsList.jsx
import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { app } from '../firebase'; // adjust if needed

const db = getDatabase(app);

export default function BookingsList() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const bookingsRef = ref(db, 'bookings');

    const unsubscribe = onValue(bookingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const bookingArray = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setBookings(bookingArray);
      } else {
        setBookings([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="form-section">
      <h2>All Customer Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <strong>Name:</strong> {booking.name}<br />
              <strong>Pickup:</strong> {booking.pickup}<br />
              <strong>Drop:</strong> {booking.drop}<br />
              <strong>Goods:</strong> {booking.goods}<br />
              <strong>Truck:</strong> {booking.truck}<br />
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
