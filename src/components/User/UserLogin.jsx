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
import { useUserContext } from "../../context/UserContext";


const UserLogin = () => {
  const [isSignup, setIsSignup] = useState(false);
  const {setIsUserLoggedIn} = useUserContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: [],
    orders: [],
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

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await setDoc(doc(db, "antivirus_user", user.uid), {
          name: formData.name,
          email: formData.email,
          address: [],
          orders: [],
          createdAt: new Date(),
        });

        toast.success("Account Created Successfully! ✅");
        setIsSignup(true);
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        // Fetch user data from Firestore
        const userDocRef = doc(db, "antivirus_user", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData ={ uid: user.uid, ...userDocSnap.data()};
            setIsUserLoggedIn(userData);  
            toast.success("Login Successfully! ✅");
            toast.success(`Welcome! ${userData.name} ✅`);
        } else {
            toast.warning("User not found! ❌");
        }
       
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="user-auth-container">
      <div className="auth-box">
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleAuth}>
          {isSignup && (
            <>
              <div className="input-group">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Enter your name" required onChange={handleChange} />
              </div>
            </>
          )}
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" required onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" placeholder="Enter your password" required onChange={handleChange} />
          </div>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="toggle-text">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span onClick={toggleForm} className="toggle-link">
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
