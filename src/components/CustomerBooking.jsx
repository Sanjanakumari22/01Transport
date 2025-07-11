// src/components/RegisterForm.jsx
import React, { useState } from 'react';

function CustomerBooking({ nextStep, update, goBack}) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (form.name && form.email && form.phone && form.password) {
      update('name', form.name); // update bookingData
      nextStep();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="form-section">
      <h2>Register</h2>
      <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
      
      <div className="button-group">
        <button onClick={handleNext}>Register & Next</button>
        <button onClick={() => nextStep('back')}>Back</button>
        
        
      </div>
    </div>
  );
}

export default CustomerBooking;
