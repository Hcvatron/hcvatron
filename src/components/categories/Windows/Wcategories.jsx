import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import { useMetadata } from "../../../context/Metadatacontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPhone } from "@fortawesome/free-solid-svg-icons";

const Wcategories = () => {
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const location = useLocation();
  const { setSelectedAntiv, setCatenav } = useProduct();
  const { categoryMetadata } = useMetadata();


  const categories = [
    { id: "13", name: "Windows 7", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738666314/windows-7-logo_t9g361.png", route: "/windows7" },
    { id: "14", name: "Windows 8", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738666084/Windows_8-Logo.wine_nk2l9e.png", route: "/windows8" },
    { id: "15", name: "Windows XP", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738666532/2560px-Unofficial_fan_made_Windows_XP_logo_variant.svg_kfdcut.png", route: "/windowsxp" }
  ];

  const handleCategoryNavigation = (category) => {
    setCatenav(true);
    setSelectedAntiv(category.name);
    navigate(`/windows${category.route}`);
  };

  return (
    <>
      <div className="categories-container"
        style={{
          marginTop: location.pathname === '/windows' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
          height: location.pathname === '/windows' ?  window.innerWidth <= 768 ? "" : '100%' : '',
        }}
      >
        <h1 className="categories-title">Top Windows OS</h1>
        <p className="categories-description">
        Get the best Windows operating systems for your needs. Explore our selection of genuine Windows OS versions, including Windows 7, Windows 8, and Windows XP, for seamless performance, security, and reliability. Upgrade today and experience the power of Windows!
        </p>
        <div className="categories-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryNavigation(category)}
            >
              <div className={`category-image ${category.name}` }>
                <img src={category.img} alt={category.name} />
              </div>
              <h3 className="category-name">{category.name}</h3>
              {/* <button className="explore-button">Explore</button> */}
            </div>
          ))}
        </div>
        {location.pathname === '/windows' && (
  <div className="categories-extra-feature">
    {/* Info Section */}
    <div className="info-block">
      <h2>Why Choose Our Windows Services?</h2>
      <p>
        We specialize in delivering genuine Windows operating system support—whether you're upgrading, installing, or resolving system issues. Our certified experts ensure smooth, secure, and hassle-free experiences for individuals and businesses.
      </p>
    </div>

    {/* Windows Service Highlights */}
    <div className="highlight-grid">
      <div className="highlight-card">
        <h3>Official Licensing & Activation</h3>
        <p>We provide genuine Windows 10 & 11 licenses with activation support to ensure full OS functionality.</p>
      </div>
      <div className="highlight-card">
        <h3>Professional Installation Support</h3>
        <p>From clean installations to OS upgrades, our technicians assist with bootable setup, partitions & recovery.</p>
      </div>
      <div className="highlight-card">
        <h3>Troubleshooting & Optimization</h3>
        <p>Fix errors, boost performance, and ensure your Windows system runs securely and efficiently at all times.</p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="cta-section">
      <h2>Need Help with Your Windows System?</h2>
      <p>Our support team is available to assist with any Windows-related issue—activation, speed, errors, and more.</p>
      
      <div className="cta-actions">
        <a href={`tel:${webinfo.phonecall}`} className="cta-call-button">
          <FontAwesomeIcon icon={faHeadset} /> <span>Call Now: {webinfo.phone}</span>
        </a>
        <p className="cta-note">Certified Support | Quick Resolution | 24/7 Availability</p>
      </div>
    </div>
  </div>
)}

      </div>
     {location.pathname === '/categories' ? (
      <p></p>
     ):(
      <>
      {/* {location.pathname==='/brands' && <TopSeller />} */}
      {location.pathname==='/brands' && <Disclaimer />}
      </>
     )} 
    </>
  );
};

export default Wcategories;
