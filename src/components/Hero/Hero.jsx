import React from "react";
import "./Hero.css";
import { useLocalContext } from "../../context/LocalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faShieldAlt, faTrophy, faUserShield, faLaptopCode, faGlobe, faFingerprint } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  const { webinfo } = useLocalContext();
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Content */}
        <div className="hero-text">
          <h1>Stay <span>Secure</span> with {webinfo.name}</h1>
          <p>Defend against cyber threats with AI-powered antivirus protection, real-time security, and advanced privacy solutions. Stay ahead of hackers, malware, and phishing attacks with proactive threat detection and automatic updates. Experience seamless performance while ensuring your devices, personal data, and online activities remain fully secured.</p>
          
          {/* Call-to-Action Buttons */}
          <div className="hero-buttons">
            <button className="cta-btn primary-btn" onClick={()=>navigate('/antivirus')}>Get Protected</button>
            <button className="cta-btn secondary-btn" onClick={()=>navigate('/about')}>Learn More</button>
          </div>
        </div>

        {/* Right Content */}
        <div className="hero-image-container">
          <img src="https://res.cloudinary.com/dcf3mojai/image/upload/v1739250740/pngtree-computer-antivirus-concept-illustration-vector-png-image_6628655_vuc8ai.png" alt="Antivirus Software" className="hero-image" />

          {/* Floating Stats */}
          <div className="floating-card top-left">
            <FontAwesomeIcon icon={faTrophy} className="icon" />
            <p><strong>5M+</strong><br />Devices Secured</p>
          </div>
          <div className="floating-card bottom-right">
            <FontAwesomeIcon icon={faUserShield} className="icon" />
            <p><strong>100%</strong><br />Privacy Protection</p>
          </div>
        </div>
      </div>

      {/* Service Highlights */}
      <div className="service-section">
        <h3>Key Security Features</h3>
        <div className="service-list">
          <div className="service-box">
            <FontAwesomeIcon icon={faShieldAlt} className="service-icon" />
            <p>Real-Time Protection</p>
          </div>
          <div className="service-box">
            <FontAwesomeIcon icon={faLaptopCode} className="service-icon" />
            <p>Safe Web Browsing</p>
          </div>
          <div className="service-box">
            <FontAwesomeIcon icon={faGlobe} className="service-icon" />
            <p>Global Threat Defense</p>
          </div>
          <div className="service-box">
            <FontAwesomeIcon icon={faFingerprint} className="service-icon" />
            <p>Identity Theft Shield</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
