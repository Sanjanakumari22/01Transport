// src/components/GoodsSelection.jsx
import React, { useState } from 'react';

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

export default function GoodsSelection({ nextStep, update, goBack}) {
  const [goods, setGoods] = useState('');

  const handleNext = () => {
    update('goods', goods);
    nextStep();
  };

  return (
    <div className="form-section">
      <h2>Select Goods Type</h2>
      <select value={goods} onChange={(e) => setGoods(e.target.value)}>
        <option value="">Select goods type</option>
        {goodsOptions.map((item, idx) => (
          <option key={idx} value={item}>{item}</option>
        ))}
      </select>
      <div className="button-group">
        <button onClick={handleNext}>Next</button>
        <button className="back" onClick={goBack}>Go Back</button>
        
        
      </div>
    </div>
  );
}
