import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const goodsOptions = [
  'Household Goods',
  'Industrial Machinery',
  'Fruits & Vegetables',
  'FMCG Products',
  'Healthcare / Pharmacy Products / Medicines',
  'Chemicals Powder / Liquid Barrels',
  'Electronic Goods / Home Appliances',
  'Paper / Packaging / Printed Material',
  'Construction Materials / Cement / Steel',
];

export default function GoodsSelection() {
  const navigate = useNavigate();
  const [goods, setGoods] = useState('');
  const { updateBooking } = useBooking();

  const handleNext = () => {
    if (!goods) {
      alert('Please select a type of goods to continue.');
      return;
    }

    updateBooking({ goods });
    console.log('✅ Booking updated with goods:', goods);
    navigate('/payment'); // Go directly to payment
  };

  const handleBack = () => {
    navigate('/truck-selection');
  };

  return (
    <div className="goods-form-container">
      <div className="form-section-content">
        <h2>Select Goods Type</h2>

        <select
          value={goods}
          onChange={(e) => {
            setGoods(e.target.value);
            console.log('Selected goods:', e.target.value);
          }}
        >
          <option value="">Select goods type</option>
          {goodsOptions.map((item, idx) => (
            <option key={idx} value={item}>{item}</option>
          ))}
        </select>

        <div className="button-group" style={{ marginTop: '1rem' }}>
          <button onClick={handleNext}>Next</button>
          <button onClick={handleBack}>Back</button>
        </div>
      </div>

      <video className="bottom-video-bg" autoPlay loop muted playsInline>
        <source src="/moving-truck.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <style>{`
        .goods-form-container {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .form-section-content {
          position: relative;
          z-index: 1;
          background: rgba(241, 151, 151, 0.95);
          padding: 2rem;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
          width: 90%;
          max-width: 500px;
        }

        .bottom-video-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 50vh;
          object-fit: cover;
          z-index: 0;
        }
      `}</style>
    </div>
  );
}
