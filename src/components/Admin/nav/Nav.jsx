import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faFileAlt, faImage, faCopy, faComments, 
  faPaintBrush, faPlug, faUsers, faCogs, faTools 
} from "@fortawesome/free-solid-svg-icons"; 
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: faHome },
    { name: "Blogs", path: "/admin/blog", icon: faFileAlt },
    { name: "Media", path: "/admin/media", icon: faImage },
    { name: "Pages", path: "/admin/pages", icon: faCopy },
    { name: "Comments", path: "/admin/comments", icon: faComments },
    { name: "Appearance", path: "/admin/appearance", icon: faPaintBrush },
    { name: "Plugins", path: "/admin/plugins", icon: faPlug },
    { name: "Users", path: "/admin/users", icon: faUsers },
    { name: "Settings", path: "/admin/settings", icon: faCogs },
    { name: "Tools", path: "/admin/tools", icon: faTools },
  ];

  return (
    <div className="admin-side-nav">
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
    </div>
  );
};

export default Nav;
