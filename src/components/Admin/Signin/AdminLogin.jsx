import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import { useAdminContext } from '../../../context/AdminContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAdmin } = useAdminContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const adminRef = doc(db, 'admin', uid);
      const adminDoc = await getDoc(adminRef);
      if (!adminDoc.exists() || adminDoc.data().role !== 'all') {
        throw new Error('Access denied');
      }
      toast.success('Login successful');
      setAdmin(email);
      localStorage.setItem('admin', email);
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-left-panel">
        <img src="https://res.cloudinary.com/dcf3mojai/image/upload/v1746119244/Najis_pfxwjp.png" alt="Bailey and Co." className="login-logo" />
        <h1>Hcvatron and Co.</h1>
      </div>
      <div className="admin-right-panel">
        <form className="admin-login-form" onSubmit={handleLogin}>
          <h2>Welcome</h2>
          <p className="form-subtitle">Please login to Admin Dashboard.</p>

          <input
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit">Login</button>

          <p className="forgot-password">Forgotten your password?</p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
