import React, { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import DashNav from "../components/User/Profile/DashNav";

const UserProfileLayout = () => {
  const { isUserLoggedIn } = useUserContext();
  const [isScrolled, setIsScrolled] = useState(false);
  const dashRightRef = useRef(null);
  const location = useLocation();
  const scrollPositions = useRef({});

  // Save scroll position before navigation
  useEffect(() => {
    return () => {
      if (dashRightRef.current) {
        scrollPositions.current[location.pathname] = dashRightRef.current.scrollTop;
      }
    };
  }, [location.pathname]);

  // Restore scroll position AFTER DOM is painted
  useEffect(() => {
    const savedScroll = scrollPositions.current[location.pathname] || 0;

    const restoreScroll = () => {
      if (dashRightRef.current) {
        dashRightRef.current.scrollTop = savedScroll;
      }
    };

    const frame = requestAnimationFrame(() => {
      setTimeout(restoreScroll, 100); // Wait for content layout
    });

    return () => cancelAnimationFrame(frame);
  }, [location.pathname]);

  // Track scroll for UI feedback
  useEffect(() => {
    const handleScroll = () => {
      if (dashRightRef.current) {
        setIsScrolled(dashRightRef.current.scrollTop > 400);
      }
    };

    const ref = dashRightRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => ref?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <DashNav isScrolled={isScrolled} />
      <div
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          height: "100%",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
  
};

export default UserProfileLayout;
