// src/components/BookingSummary.jsx

import React, { useEffect, useState } from 'react';
import { calculateFare } from '../utils/calculateFare';


function BookingSummary({ data, goBack, nextStep }) {
    const [fare, setFare] = useState(0);
    
    useEffect(() => {
    const fetchFare = async () => {
      try {
        const estimated = await calculateFare(data.pickup, data.drop, data.truck, 90); // ₹90/litre fuel price
        setFare(estimated);
      } catch (err) {
        setFare('Error calculating fare');
      }
    };
    fetchFare();
  }, [data]);




  return (
    <div className="summary">
      <h2>Booking Summary</h2>
      <p><strong>Name:</strong> {data.name}</p>
    <p><strong>Pickup:</strong> {data.pickup}</p>
      <p><strong>Drop:</strong> {data.drop}</p>
      <p><strong>Truck:</strong> {data.truck}</p>
      <p><strong>Goods:</strong> {data.goods}</p>
      <p><strong>Estimated Fare:</strong> ₹{fare}</p>

      <div className="button-group">
        <button className="confirm" onClick={nextStep}>✅ Proceed to Payment</button>
        <button className="callback">Request Callback</button>
        <button className="back" onClick={goBack}>Go Back</button>
      </div>
    </div>
  );
}
export default BookingSummary;
