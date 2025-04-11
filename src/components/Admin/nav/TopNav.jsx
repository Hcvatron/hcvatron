import React, { useState, useEffect } from 'react';
import './TopNav.css';

const TopNav = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="top-nav">
      <div className="logo">Hcvatron</div> {/* Replace with your logo */}
      <div className="admin-info">
        <span>Welcome, Admin!</span>
        <span>{currentTime}</span>
        <span style={{cursor:"pointer"}}>Logout</span>
      </div>
    </div>
  );
};

export default TopNav;
