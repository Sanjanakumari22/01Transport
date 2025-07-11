// src/BookingFlow.jsx
import React, { useState } from 'react';
import RegisterPage     from './components/RegisterPage';
import JobApplication   from './components/JobApplication';
import CustomerBooking  from './components/CustomerBooking';
import LocationForm     from './components/LocationForm';
import TruckSelection   from './components/TruckSelection';
import GoodsSelection   from './components/GoodsSelection';
import BookingSummary   from './components/BookingSummary';
import PaymentForm      from './components/PaymentForm';
import '../src/index.css';

export default function BookingFlow() {
  const [step, setStep]   = useState(0);
  const [role, setRole]   = useState('');
  const [bookingData, setBookingData] = useState({
    pickup: '',
    drop:   '',
    truck:  '',
    goods:  '',
    name:   '',
  });

  /* Update helper */
  const updateBooking = (key, value) =>
    setBookingData(prev => ({ ...prev, [key]: value }));

  /* Reset to first screen (used on Back from step 2) */
  const resetToStart = () => {
    setRole('');
    setStep(0);
  };

  return (
    <div className="main-container">
      <h1 className="title">🚛 QuickLoaders Registration</h1>

      <div className="card-container">
        {/* Step 0 – Choose role */}
        {step === 0 && !role && (
          <RegisterPage
            onSelectRole={selectedRole => {
              setRole(selectedRole);
              setStep(selectedRole === 'job' ? 1 : 2);
            }}
          />
        )}

        {/* Job‑apply flow */}
        {role === 'job' && step === 1 && <JobApplication />}

        {/* Customer flow */}
        {role === 'customer' && step === 2 && (
          <CustomerBooking
            nextStep={() => setStep(3)}
            goBack={resetToStart}         /* ✅ Back now returns to role‑select */
            update={updateBooking}
          />
        )}

        {role === 'customer' && step === 3 && (
          <LocationForm
            nextStep={() => setStep(4)}
            goBack={() => setStep(2)}
            update={updateBooking}
          />
        )}

        {role === 'customer' && step === 4 && (
          <TruckSelection
            nextStep={() => setStep(5)}
            goBack={() => setStep(3)}
            update={updateBooking}
          />
        )}

        {role === 'customer' && step === 5 && (
          <GoodsSelection
            nextStep={() => setStep(6)}
            goBack={() => setStep(4)}
            update={updateBooking}
          />
        )}

        {role === 'customer' && step === 6 && (
          <BookingSummary
            data={bookingData}
            nextStep={() => setStep(7)}
            goBack={() => setStep(5)}
          />
        )}

        {role === 'customer' && step === 7 && (
          <PaymentForm
            data={bookingData}
            goBack={() => setStep(6)}
            onPayment={() => {
              alert('🎉 Booking complete!');
              resetToStart();             /* restart flow after payment */
            }}
          />
        )}

        {/* Fallback – reset if no route matched */}
        {(!role && step !== 0) && resetToStart()}
      </div>
    </div>
  );
}
