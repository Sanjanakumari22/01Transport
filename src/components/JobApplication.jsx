// src/components/JobApplicationForm.jsx
import React, { useState } from 'react';

  function JobApplication() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    resume: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Job Application:', form);
    alert('Thanks for applying! We’ll contact you soon.');
  };

  return (
    <div className="form-section">
      <h2>Job Application</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
      />
      <textarea
        name="resume"
        placeholder="Your Experience or Resume Link"
        value={form.resume}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default JobApplication;