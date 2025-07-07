// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div
      className="home-page"
      style={{
        backgroundImage: "url('https://img.freepik.com/premium-vector/free-vector-3d-workers-unloading-boxes-from-truck_883906-3043.jpg')",
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '70vw',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
      }}>


      <nav className="navbar">
  <div className="logo-container"> 
    <img src="../logo.webp" alt="Truck Logo" className="logo" style={{ height: "50px", width: "60px" }} />
    <span className="brand-name"><strong>QuickLoaders</strong></span>
  </div>
  <div className="nav-links">
    <Link to="/">Home</Link>
    <Link to="/book">Register Now</Link>
  </div>
</nav>

      <div className="hero">
        <h1><span style={{ color: 'black' }}>Welcome to Truck Booking Service</span></h1>
        <p><span style={{ color: 'blue' }}>Book reliable trucks online across India</span></p>
        <Link to="/book" className="hero-button">Book Now</Link>
      </div>
    </div>
  );
}
