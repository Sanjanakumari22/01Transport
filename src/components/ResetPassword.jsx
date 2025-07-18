// src/components/ResetPassword.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const oobCode = new URLSearchParams(location.search).get('oobCode');

  useEffect(() => {
    if (oobCode) {
      verifyPasswordResetCode(auth, oobCode)
        .then(() => setVerified(true))
        .catch((err) => setError('Invalid or expired reset code.'));
    }
  }, [oobCode]);

  const handleReset = async () => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      alert('Password has been reset!');
      navigate('/login');
    } catch (err) {
      setError('Failed to reset password: ' + err.message);
    }
  };

  if (!verified) return <p>{error || 'Verifying reset link...'}</p>;

  return (
    <div className="form-section">
      <h2>Set New Password</h2>
      <input
        type="password"
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}
