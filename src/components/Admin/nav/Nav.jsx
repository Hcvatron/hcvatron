import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faHome, faFileAlt, faImage, faCopy, faComments, 
  faPaintBrush, faPlug, faUsers, faCogs, faTools, 
  faPeopleGroup,
  faReorder,
  faPhotoFilm,
  faSort
} from "@fortawesome/free-solid-svg-icons"; 
import "./Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: faHome },
    { name: "SEO", path: "/admin/seo", icon: faSort },
    { name: "Blogs", path: "/admin/blog", icon: faFileAlt },
    { name: "Media", path: "/admin/media", icon: faImage },
    { name: "Orders", path: "/admin/orders", icon: faReorder },
    { name: "Users", path: "/admin/manage-user", icon: faPeopleGroup },
    { name: "Banner", path: "/admin/manage-banner", icon: faPhotoFilm },
    // { name: "Appearance", path: "/admin/appearance", icon: faPaintBrush },
    // { name: "Plugins", path: "/admin/plugins", icon: faPlug },
    // { name: "Users", path: "/admin/users", icon: faUsers },
    // { name: "Settings", path: "/admin/settings", icon: faCogs },
    // { name: "Tools", path: "/admin/tools", icon: faTools },
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
