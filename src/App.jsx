// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookingFlow from './BookingFlow';
import JobApplication from './components/JobApplication';
import CustomerBooking from './components/CustomerBooking';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import TrackBooking from './components/TrackBooking';
import Contact from './pages/contact';
import ErrorBoundary from './components/ErrorBoundary';


export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book" element={<BookingFlow />} />
      <Route path="/apply-job" element={<JobApplication />} />
      <Route path="/customer-booking" element={<CustomerBooking />} />
      <Route path="/login" element={<LoginPage />} /> 
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/track-booking" element={<TrackBooking />} />
      <Route path="/contact" element={<Contact />} /> 
    </Routes>
    </ErrorBoundary>
  );
}
