// src/components/CustomerBooking.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { saveUserFS } from '../utils/saveUserFS';

function CustomerBooking({ goBack }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, phone, password } = form;

    if (!name || !email || !phone || !password) {
      setRegistered(true);
      return alert('Please fill in all fields');
       
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await saveUserFS(user.uid, {
        name,
        email,
        phone,
        createdAt: new Date(),
      });

      alert('✅ Registration successful!');
      setRegistered(true);
    } catch (error) {
      console.error('Signup Error:', error.code, error.message);
      if (error.code === 'auth/email-already-in-use') {
        alert('This email is already registered. Please log in instead.');
      } else {
        alert('Signup failed: ' + error.message);
      }
    }
  };

  const handleNext = () => {
    if (!registered) {
      return alert('⚠️ Please register first before proceeding.');
    }
    navigate('/dashboard'); // ✅ Navigate to dashboard
  };

  return (
    <div className="form-section">
      <h2>Sign up</h2>
      <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} />

      <div className="button-group">
        <button onClick={handleRegister}>Register</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={goBack}>Back</button>
      </div>
    </div>
  );
}

export default CustomerBooking;
