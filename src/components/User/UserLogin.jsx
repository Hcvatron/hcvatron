import React, { useState } from "react";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  doc,
  getDoc
} from "../../firebase/firebaseConfig";
import "./UserLogin.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useUserContext } from "../../context/UserContext";
import { useLocalContext } from "../../context/LocalContext";

const UserLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const { setIsUserLoggedIn } = useUserContext();
  const { toPayment } = useLocalContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: ""
  });
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (isSignup && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await setDoc(doc(db, "_user", user.uid), {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dob: formData.dob,
          address: [],
          orders: [],
          createdAt: new Date(),
        });

        toast.success("Account created successfully!");
        setIsSignup(false);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const userDocRef = doc(db, "_user", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = { uid: user.uid, ...userDocSnap.data() };
          setIsUserLoggedIn(userData);
          if(toPayment){
             navigate("/cart");
          }else{
            navigate("/");
          }
          toast.success(`Welcome ${userData.firstName}!`);
          
        } else {
          toast.warning("User record not found.");
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-page-wrapper user-login">
      <div className="login-container">
        <div className="login-left">
          <h1>Stay Protected with Hcvatron</h1>
          <p>Defend against cyber threats with AI-powered antivirus and real-time security. Sign up or log in to manage your protection plan.</p>
          <img src="https://www.datastore365.co.uk/wp-content/uploads/2020/04/Disaster-Recovery-Illustration-1.png" alt="Cybersecurity illustration" />
        </div>

        <div className="login-box">
          <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>
          <p className="login-sub">{isSignup ? "Join Hcvatron for Secure Access" : "Login to continue"}</p>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleAuth}>
            <div className="form-top">
              {isSignup && (
                <>
                  <div className="form-group double">
                    <div>
                      <label>First Name</label>
                      <input type="text" name="firstName" onChange={handleChange} placeholder="John" required />
                    </div>
                    <div>
                      <label>Last Name</label>
                      <input type="text" name="lastName" onChange={handleChange} placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <PhoneInput
                    className="phoneinput"
                      country={'in'}
                      value={formData.phone}
                      onChange={(phone) => setFormData({ ...formData, phone })}
                      inputStyle={{ width: '100%' }}
                      inputProps={{
                        name: 'phone',
                        required: true
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" name="dob" onChange={handleChange} required />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" onChange={handleChange} placeholder="you@example.com" required />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} placeholder="Enter password" required />
              </div>

              {isSignup && (
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" onChange={handleChange} placeholder="Re-enter password" required />
                </div>
              )}
            </div>

            <button className="login-btn-main" type="submit">
              {isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p className="switch-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span onClick={toggleForm}> {isSignup ? "Login" : "Sign Up"}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
