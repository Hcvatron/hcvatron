import React, { useState } from 'react';
import { auth } from '../../../firebase/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../../context/AdminContext';
import './Login.css';  
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';


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
      const userEmail = userCredential.user.email;
  
      // Check if the user exists in the admin collection
      const adminDocRef = doc(db, 'admin', userCredential.user.uid); 
      const adminDoc = await getDoc(adminDocRef);
  
      if (!adminDoc.exists()) {
        throw new Error('Access denied: Not an admin');
      }
  
      const adminData = adminDoc.data();
      if (adminData.email !== userEmail || adminData.role !== 'all') {
        throw new Error('Access denied: Unauthorized role');
      }
  
      toast.success('Sign in successful');
      setAdmin(userEmail);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      toast.error(err.message);
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='adminbtn' type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
