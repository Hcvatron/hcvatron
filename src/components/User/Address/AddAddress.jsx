import React, { useState } from "react";
import "./AddAddress.css";
import { useUserContext } from "../../../context/UserContext";
import { toast } from "react-toastify";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const AddAddress = ({ setAddAddress }) => {
  const [address, setAddress] = useState({
    title: "",
    street: "",
    suburb: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  });

  const { isUserLoggedIn, fetchUser } = useUserContext();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isUserLoggedIn?.uid) {
      toast.error("User not found! Please log in again.");
      return;
    }

    try {
      const userRef = doc(db, "antivirus_user", isUserLoggedIn.uid);
      const userSnapshot = await getDoc(userRef); // Fetch the user document

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const existingAddresses = userData?.address || [];

        const existingTitles = existingAddresses.map((addr) => addr.title.toLowerCase());
        if (existingTitles.includes(address.title.toLowerCase())) {
          toast.warning("Address title must be unique!");
          return;
        }
      }

      // Add new address
      await updateDoc(userRef, {
        address: arrayUnion(address),
      });

      toast.success("Address Added Successfully! ✅");
      setAddAddress(false);
      fetchUser(isUserLoggedIn.uid); // Refresh user data

    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("Failed to add address. Please try again.");
    }
  };

  return (
    <div className="add-address-container">
      <div className="add-address-form">
        <h3 className="close" onClick={() => setAddAddress(false)}>X</h3>
        <h2>Add Address ↓</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Address Title</label>
            <input
              type="text"
              name="title"
              placeholder="Home, Office, etc."
              value={address.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Street</label>
            <input
              type="text"
              name="street"
              placeholder="123 Main St"
              value={address.street}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Suburb</label>
            <input
              type="text"
              name="suburb"
              placeholder="Downtown"
              value={address.suburb}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              placeholder="New York"
              value={address.city}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              placeholder="NY"
              value={address.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Postcode</label>
            <input
              type="text"
              name="postcode"
              placeholder="10001"
              value={address.postcode}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              placeholder="USA"
              value={address.country}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Save Address</button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
