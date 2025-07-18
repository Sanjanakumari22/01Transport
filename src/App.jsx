import { useLocation } from 'react-router-dom'; 
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookingFlow from './BookingFlow';
import RegisterPage from './components/RegisterPage';
import JobApplication from './components/JobApplication';
import CustomerBooking from './components/CustomerBooking';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';
import TrackBooking from './components/TrackBooking';
import Contact from './pages/contact';
import ErrorBoundary from './components/ErrorBoundary';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import LocationForm from './components/LocationForm';
import TruckSelection from './components/TruckSelection';
import GoodsSelection from './components/GoodsSelection';
import BookingSummary from './components/BookingSummary';
import PaymentForm from './components/PaymentForm';
import ProtectedRoute from './components/ProtectedRoute';
import TruckManagement from './pages/TruckManagement';
import { LoadScript } from '@react-google-maps/api';


// ✅ Declare this outside the component
const googleLibraries = ['places'];

export default function App() {
  const location = useLocation();
  console.log('📍 Current URL:', location.pathname); // Debug

  return (
    <ErrorBoundary>
      {/* ✅ Fix the warning by using static array */}
      <LoadScript googleMapsApiKey="AIzaSyDlNPB21MTMfA-a4IktkCjAbJk4Nld0f4M" libraries={googleLibraries}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<ProtectedRoute><RegisterPage /></ProtectedRoute>} />
          <Route path="/apply-job" element={<JobApplication />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/track-booking" element={<TrackBooking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/book" element={<BookingFlow />} />
          <Route path="/book/customer-details" element={<ProtectedRoute><CustomerBooking /></ProtectedRoute>} />
          <Route path="/location" element={<ProtectedRoute><LocationForm /></ProtectedRoute>} />
          <Route path="/truck-selection" element={<ProtectedRoute><TruckSelection /></ProtectedRoute>} />
          <Route path="/goods-selection" element={<ProtectedRoute><GoodsSelection /></ProtectedRoute>} />
          <Route path="/booking-summary" element={<ProtectedRoute><BookingSummary /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><PaymentForm /></ProtectedRoute>} />
          <Route path="/truck-management" element={<ProtectedRoute><TruckManagement /></ProtectedRoute>} />
        </Routes>
      </LoadScript>
    </ErrorBoundary>
  );
}
