// src/components/LoginPage.jsx
import React, { useState } from 'react';
 // optional, for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    // Dummy login check (replace with real authentication)
    alert('Login successful!');
  };

  return (
    <div className="form-section">
      <h2>Login to QuickLoaders</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;