// src/pages/TruckManagement.jsx
import React, { useState } from 'react';

export default function TruckManagement() {
  const [trucks, setTrucks] = useState([]);
  const [form, setForm] = useState({
    truckId: '',
    driverName: '',
    truckType: '',
    licensePlate: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.truckId || !form.driverName) {
      alert('Please fill in required fields');
      return;
    }
    setTrucks([...trucks, form]);
    setForm({ truckId: '', driverName: '', truckType: '', licensePlate: '' });
  };

  return (
    <div className="truck-management">
      <h2>Add Truck Details</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
        <input name="truckId" placeholder="Truck ID" value={form.truckId} onChange={handleChange} required />
        <input name="driverName" placeholder="Driver Name" value={form.driverName} onChange={handleChange} required />
        <input name="truckType" placeholder="Truck Type" value={form.truckType} onChange={handleChange} />
        <input name="licensePlate" placeholder="License Plate" value={form.licensePlate} onChange={handleChange} />
        <button type="submit">Add Truck</button>
      </form>

      <h3>All Trucks</h3>
      <ul>
        {trucks.map((truck, index) => (
          <li key={index}>
            <strong>ID:</strong> {truck.truckId} | <strong>Driver:</strong> {truck.driverName} | <strong>Type:</strong> {truck.truckType} | <strong>Plate:</strong> {truck.licensePlate}
          </li>
        ))}
      </ul>
    </div>
  );
}
