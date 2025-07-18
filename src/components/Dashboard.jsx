import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeSection, setActiveSection] = useState('welcome');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        const q = query(collection(db, 'bookings'), where('userId', '==', currentUser.uid));
        const unsubscribeFirestore = onSnapshot(q, (snapshot) => {
          const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setBookings(data);
        });

        return () => unsubscribeFirestore();
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const goToHome = () => navigate('/');
  const goToLocationForm = () => navigate('/location');
  const goToTrackBooking = () => navigate('/track-booking');
  const showHistory = () => setActiveSection('history');
  const showWelcome = () => setActiveSection('welcome');

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
      {/* Navbar */}
      <nav className="navbar" style={{ backgroundColor: '#cc5a5a', display: 'flex', justifyContent: 'space-between', padding: '10px 20px', alignItems: 'center' }}>
        <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/logo.png" alt="Truck Logo" style={{ height: '40px', marginRight: '10px' }} />
          <span className="brand-name" style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>QuickLoaders</span>
        </div>
        <div>
          <button onClick={goToHome} style={navButton}>Home</button>
          <button onClick={goToLocationForm} style={navButton}>Book Truck</button>
          <button onClick={goToTrackBooking} style={navButton}>Track Booking</button>
          <button onClick={showHistory} style={navButton}>History</button>
        </div>
        <div>
          {user ? (
            <button onClick={handleLogout} style={navButton}>Logout</button>
          ) : (
            <button onClick={() => navigate('/login')} style={navButton}>Login</button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: '2rem' }}>
        {activeSection === 'welcome' && (
          <div className='welcome-section' style={{ textAlign: 'center', color: 'black' }}>
            <h1>Welcome to Your QuickLoaders</h1>
            <p>You are logged in successfully.</p>
            <button onClick={showHistory} style={buttonStyle}>Show My Booking History</button>
          </div>
        )}

        {activeSection === 'history' && (
          <div className='history-section' style={{ textAlign: 'center', color: 'black' }}>
            <h2>Your Booking History</h2>
            {bookings.length === 0 ? (
              <p>No bookings found.</p>
            ) : (
              <ul>
                {bookings.map((b, i) => (
                  <li key={b.id} style={{ color: 'black', textAlign: 'left' }}>
                    <strong>Booking #{i + 1}:</strong> {b.pickup} → {b.drop} | Truck: {b.truck} | Goods: {b.goods}
                  </li>
                ))}
              </ul>
            )}
            <button onClick={showWelcome} style={buttonStyle}>Back to Welcome</button>
          </div>
        )}
      </div>
    </div>
  );
}

const navButton = {
  background: 'transparent',
  color: 'white',
  border: 'none',
  marginRight: '1rem',
  fontSize: '1rem',
  cursor: 'pointer',
};

const buttonStyle = {
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  marginTop: '1rem',
  cursor: 'pointer',
};

