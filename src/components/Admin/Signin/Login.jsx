import React, { useState } from 'react';
import { auth } from '../../../firebase/firebaseConfig'; // Adjust path as needed
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../../context/AdminContext';
import './Login.css';  // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setAdmin } = useAdminContext();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log("Email-->",email,"password-->",password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Sign in successful');
      setAdmin(email);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error("Firebase Login Error:", err); 
      toast.error(err.message); 
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
