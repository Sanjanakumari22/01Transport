// src/BookingFlow.jsx
import React, { useState } from 'react';
import RegisterPage from './components/RegisterPage';
import JobApplication from './components/JobApplication';
import CustomerBooking from './components/CustomerBooking';
import LocationForm from './components/LocationForm';
import TruckSelection from './components/TruckSelection';
import GoodsSelection from './components/GoodsSelection';
import BookingSummary from './components/BookingSummary';
import PaymentForm from './components/PaymentForm';
import { addBookingFS } from './utils/dbHelpers';
import { BookingProvider } from './context/BookingContext';
import './index.css';
import { useNavigate } from 'react-router-dom';

export default function BookingFlow() {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState('');
  const [bookingData, setBookingData] = useState({
    pickup: '',
    drop: '',
    truck: '',
    goods: '',
    name: '',
  });

  const navigate = useNavigate();

  // Handle booking save before payment
  const handleSummaryNext = async () => {
    try {
      const id = await addBookingFS(bookingData);
      console.log('✅ Booking saved to Firestore:', id);
      setStep(7); // go to payment
    } catch (err) {
      alert('❌ Failed to save booking: ' + err.message);
    }
  };

  // Booking field updater
  const updateBooking = (key, value) =>
    setBookingData(prev => ({ ...prev, [key]: value }));

  // Reset all
  const resetToStart = () => {
    setRole('');
    setStep(0);
    setBookingData({
      pickup: '',
      drop: '',
      truck: '',
      goods: '',
      name: '',
    });
  };

  return (
    <BookingProvider>
      <div className="main-container">
        <h1 className="title">
          <img src="/logo.png" alt="Logo" className="title-logo" />
          QuickLoaders Registration
        </h1>

        <div className="card-container">
          {/* Step 0 – Choose role */}
          {step === 0 && !role && (
            <RegisterPage
              onSelectRole={(selectedRole) => {
                setRole(selectedRole);
                setStep(selectedRole === 'job' ? 1 : 2);
              }}
            />
          )}

          {/* Job Apply */}
          {role === 'job' && step === 1 && (
            <JobApplication
              goBack={resetToStart}
            />
          )}

          {/* Customer flow steps */}
          {role === 'customer' && step === 2 && (
            <CustomerBooking
              nextStep={() => setStep(3)}
              goBack={resetToStart}
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
              nextStep={handleSummaryNext}
              goBack={() => setStep(5)}
            />
          )}

          {role === 'customer' && step === 7 && (
            <PaymentForm
              data={bookingData}
              goBack={() => setStep(6)}
              onPayment={() => {
                localStorage.removeItem('quickloaders-booking');
                alert('🎉 Booking complete!');
                resetToStart();         // restart flow
                navigate('/dashboard'); // ✅ redirect after booking
              }}
            />
          )}
        </div>
      </div>
    </BookingProvider>
  );
}
