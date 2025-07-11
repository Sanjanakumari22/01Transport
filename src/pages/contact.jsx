// src/pages/Contact.jsx
import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
    // Optionally send data to backend or email API
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h2>📞 Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-info">
          <p><strong>Email:</strong> support@quickloaders.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Office:</strong> 123 Transport Lane, Delhi, India</p>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
