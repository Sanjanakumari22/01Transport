// src/components/PaymentForm.jsx
import React, { useState } from 'react';

export default function PaymentForm({ onPayment }) {
  const [method, setMethod] = useState('');
  const [details, setDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    upiId: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!method) {
      alert('Please select a payment method');
      return;
    }
    alert(`Payment Successful via ${method}`);
    onPayment && onPayment(); // callback to parent if needed
  };

  return (
    <div className="form-section">
      <h2>Select Payment Method</h2>

      <label>
        <input
          type="radio"
          name="method"
          value="card"
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
          onChange={(e) => setMethod(e.target.value)}
        />
        Cash on Delivery
      </label>

      <form onSubmit={handleSubmit}>
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
          <>
            <input
              type="text"
              placeholder="UPI ID (e.g. user@bank)"
              value={details.upiId}
              onChange={(e) => setDetails({ ...details, upiId: e.target.value })}
              required
            />
          </>
        )}

        {/* No inputs needed for cash payment */}
        {method && <button type="submit" style={{ marginTop: '20px' }}>Pay</button>}
      </form>
    </div>
  );
}
