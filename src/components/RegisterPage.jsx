// src/components/RegisterPage.jsx
import React, { useState } from 'react';

export default function RegisterPage({ onSelectRole }) {
  const [choice, setChoice] = useState('');

  const handleContinue = () => {
    if (!choice) {
      alert('Please select a role');
      return;
    }
    onSelectRole(choice);
  };

  return (
    <div className="form-section">
      <h2>Register as:</h2>
      <label>
        <input
          type="radio"
          name="role"
          value="customer"
          onChange={(e) => setChoice(e.target.value)}
        />
        Customer
      </label>
      
      <label>
        <input
          type="radio"
          name="role"
          value="job"
          onChange={(e) => setChoice(e.target.value)}
        />
        Job Applyer
      </label>
      <br /><br />
      <button onClick={handleContinue}>Continue</button>
    </div>
  );
}
