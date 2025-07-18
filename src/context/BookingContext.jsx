import React, { createContext, useContext, useState, useEffect } from 'react';

const BookingContext = createContext(null);

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }) {
  const [bookingData, setBookingData] = useState(() => {
    const stored = localStorage.getItem('quickloaders-booking');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem('quickloaders-booking', JSON.stringify(bookingData));
  }, [bookingData]);

  // ✅ This function updates parts of booking data
  const updateBooking = (newData) => {
  setBookingData((prev) => ({ ...prev, ...newData }));
};

  useEffect(() => {
    // keep a copy in localStorage for hard refreshes
    localStorage.setItem('quickloaders-booking', JSON.stringify(bookingData));
  }, [bookingData]);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData, updateBooking }}>
      {children}
    </BookingContext.Provider>
  );
}
