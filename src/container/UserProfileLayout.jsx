import React, { useState, useEffect, useRef } from "react";
import DashNav from "../components/User/Profile/DashNav";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "../components/User/Profile/Profile";
import { useUserContext } from "../context/UserContext";
import "./UserProfileLayout.css";
import Footer from "../components/Footer/Footer";
import OrderList from "../components/User/order/OrderList";
import AddressList from "../components/User/Address/AddressList";
import PrivateRoute from "./PrivateRoute";


const UserProfileLayout = () => {
  const { isUserLoggedIn } = useUserContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const dashRightRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      if (dashRightRef.current) {
        setIsScrolled(dashRightRef.current.scrollTop > 400);
      }
    };

    if (dashRightRef.current) {
      dashRightRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (dashRightRef.current) {
        dashRightRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <>
      <div style={{ width: "100%", display: "flex", flexDirection: "row", height: "calc(100vh - 32px)", zIndex: "1" }}>
        <DashNav isScrolled={isScrolled} />
        <div ref={dashRightRef} style={{ width: '100%', padding: "20px", overflowY: "auto" }} className={`dashright  ${isScrolled ? "scrolled" : ""}`}>
          <Routes>
            
          <Route path="/user/account" element={<Navigate to="/user/dashboard" />} />
  
  <Route
    path="/user/dashboard"
    element={
      <PrivateRoute>
        <Profile isScrolled={isScrolled} />
      </PrivateRoute>
    }
  />



  <Route
    path="/user/orders"
    element={
      <PrivateRoute>
        <OrderList />
      </PrivateRoute>
    }
  />

  <Route
    path="/user/address"
    element={
      <PrivateRoute>
        <AddressList />
      </PrivateRoute>
    }
  />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfileLayout;
