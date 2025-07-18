// src/components/AdminDashboard.jsx
import React from 'react';
import '../pages/AdminDashboard.css'; 
import BookingsList from './BookingsList';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Bookings</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Job Applications</h3>
          <p>0</p>
        </div>
        <div className="card">
          <h3>Revenue</h3>
          <p>₹0</p>
        </div>
      </div>
    </div>
  );
}
