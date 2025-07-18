// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Link added



export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = form;
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCred.user);
       navigate('/dashboard');
    } catch (err) {
      console.error('Login Error:', err.code, err.message);
      alert(err.message);
    }
  };

  return (
    <div className="form-section">
      <h2>Login to QuickLoaders</h2>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        
      </form>

      {/* ✅ Forgot Password link */}
      <p style={{ marginTop: '10px' }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
}
