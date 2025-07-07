// src/BookingFlow.jsx
import React, { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import LocationForm from './components/LocationForm';
import TruckSelection from './components/TruckSelection';
import GoodsSelection from './components/GoodsSelection';
import BookingSummary from './components/BookingSummary';
import './index.css';

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    pickup: 'delhi',
    drop: '',
    truck: '',
    goods: '',
    weight: '',
    name: '',
  });

  const updateBooking = (key, value) => {
    setBookingData({ ...bookingData, [key]: value });
  };

  return (
    <div className="main-container">
      <h1 className="title">🚚 Book Your Truck Easily</h1>
      <div className="card-container">
        {step === 0 && <RegisterForm nextStep={() => setStep(1)} update={updateBooking} />}
        {step === 1 && <LocationForm nextStep={() => setStep(2)} update={updateBooking} />}
        {step === 2 && <TruckSelection nextStep={() => setStep(3)} update={updateBooking} />}
        {step === 3 && <GoodsSelection nextStep={() => setStep(4)} update={updateBooking} />}
        {step === 4 && <BookingSummary data={bookingData} goBack={() => setStep(3)} />}
      </div>
    </div>
  );
}
