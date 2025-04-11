import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faShoppingCart, faAddressCard, faUser, faKey, faSignOutAlt 
} from "@fortawesome/free-solid-svg-icons";
import "./DashNav.css";

const DashNav = ({ isScrolled }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/user/dashboard", icon: faHome },
    { name: "My Orders", path: "/user/orders", icon: faShoppingCart },
    { name: "My Address", path: "/user/address", icon: faAddressCard },
    { name: "Change Password", path: "/user/change-password", icon: faKey },
  ];

  return (
    <div className={`user-side-nav ${isScrolled ? "scrolled" : ""}`}>
      {/* Profile Section */}
      <div className="profile-section">
        <h3>My Account</h3>
      </div>

      {/* Navigation List */}
      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.path} className={`nav-item ${location.pathname === item.path ? "active" : ""}`}>
            <button onClick={() => navigate(item.path)} className="nav-link">
              <FontAwesomeIcon icon={item.icon} size="lg" className="nav-icon" />
              <span>{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <button className="logout-button" onClick={() => navigate("/logout")}>
        <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
        Logout
      </button>
    </div>
  );
};

export default DashNav;
