// src/pages/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div
      className="home-page"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/free-vector-3d-workers-unloading-boxes-from-truck_883906-3043.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100vw',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      {/* ✅ NAVIGATION BAR START */}
      <nav className="navbar" style={{ backgroundColor: '#cc5a5a', display: 'flex', justifyContent: 'space-between', padding: '10px 20px', alignItems: 'center' }}>
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Truck Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span className="brand-name" style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>QuickLoaders</span>
        </div>

        <div className="nav-links" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button className="home" onClick={() => handleNavigation('/')}>Home</button>
          <button className="register" onClick={() => handleNavigation('/book')}>Register Now</button>
          <button className="login" onClick={() => handleNavigation('/login')}>Login</button>
          <button className="job" onClick={() => handleNavigation('/apply-job')}>Apply for Job</button>
          <button className="admin" onClick={() => handleNavigation('/admin')}>Admin</button>
          <button className="track" onClick={() => handleNavigation('/track')}>Track Booking</button>
          <button className="contact" onClick={() => handleNavigation('/contact')}>Contact Us</button>
        </div>
      </nav>
      {/* ✅ NAVIGATION BAR END */}

      {/* Hero section */}
      <div className="hero" style={{ marginTop: '60px' }}>
        <h1 style={{ color: 'black' }}>Welcome to Truck Booking Service</h1>
        <p style={{ color: 'blue' }}>Book reliable trucks online across India</p>
        <button
          className="hero-button"
          onClick={() => handleNavigation('/book')}
          style={{
            backgroundColor: '#004a99',
            padding: '10px 20px',
            borderRadius: '8px',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginTop: '20px',
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
