import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export default function PaymentForm({ onPayment }) {
  const { bookingData } = useBooking();
  const navigate = useNavigate();

  const [method, setMethod] = useState('');
  const [details, setDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    upiId: '',
  });

  // ✅ Redirect user back to goods selection if previous steps not completed
  useEffect(() => {
    if (!bookingData?.pickup || !bookingData?.drop || !bookingData?.truckType || !bookingData?.goodsType) {
      navigate('/goods-selection');
    }
  }, [bookingData, navigate]);

  const handlePay = () => {
    alert('🎉 Payment successful!');
    if (onPayment) {
      onPayment();
    } else {
      navigate('/dashboard');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePay();
  };

  return (
    <div className="form-section">
      <h2>Select Payment Method</h2>

      <label>
        <input
          type="radio"
          name="method"
          value="card"
          checked={method === 'card'}
          onChange={(e) => setMethod(e.target.value)}
        />
        Card Payment
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="method"
          value="upi"
          checked={method === 'upi'}
          onChange={(e) => setMethod(e.target.value)}
        />
        UPI
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="method"
          value="cash"
          checked={method === 'cash'}
          onChange={(e) => setMethod(e.target.value)}
        />
        Cash on Delivery
      </label>

      {method && (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          {method === 'card' && (
            <>
              <input
                type="text"
                placeholder="Card Number"
                value={details.cardNumber}
                onChange={(e) => setDetails({ ...details, cardNumber: e.target.value })}
                required
              />
              <input
                type="text"
                placeholder="Name on Card"
                value={details.cardName}
                onChange={(e) => setDetails({ ...details, cardName: e.target.value })}
                required
              />
              <input
                type="month"
                placeholder="Expiry Date"
                value={details.expiry}
                onChange={(e) => setDetails({ ...details, expiry: e.target.value })}
                required
              />
            </>
          )}

          {method === 'upi' && (
            <input
              type="text"
              placeholder="UPI ID (e.g. user@bank)"
              value={details.upiId}
              onChange={(e) => setDetails({ ...details, upiId: e.target.value })}
              required
            />
          )}

          {method === 'cash' && (
            <p style={{ marginTop: '10px' }}>
              You will pay upon delivery. No further details required.
            </p>
          )}

          <button type="submit" style={{ marginTop: '20px' }}>Pay</button>
        </form>
      )}
    </div>
  );
}
