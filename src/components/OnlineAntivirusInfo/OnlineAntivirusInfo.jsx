import React from "react";
import { useLocalContext } from "../../context/LocalContext";
import './OnlineAntivirusInfo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldAlt, faLock, faCheckCircle, faUserShield, faShoppingCart, faHeadset } from '@fortawesome/free-solid-svg-icons';

const OnlineAntivirusInfo = () => {
  const { webinfo } = useLocalContext();

  return (
    <div className="online-antivirus-info">
      <h2 className="section-title">Secure Your Digital World with {webinfo.name}</h2>

      {/* Section Content */}
      <div className="online-antivirus-info-content">
        
        <div className="info-box">
          <FontAwesomeIcon icon={faCheckCircle} className="info-icon" />
          <p>
            <strong>Top-Notch Cybersecurity:</strong> Protect your devices with <strong>{webinfo.name}</strong>, offering the most advanced antivirus solutions at affordable prices. Get real-time protection against malware, ransomware, and phishing attacks.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faShieldAlt} className="info-icon" />
          <p>
            <strong>Easy Online Purchase:</strong> With <strong>{webinfo.name}</strong>, buying antivirus software has never been easier. Simply browse, compare, and purchase in a few clicks. No physical delivery, no hassle—just instant digital access.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faLock} className="info-icon" />
          <p>
            <strong>Secure Transactions:</strong> Your safety is our priority. All purchases on <strong>{webinfo.name}</strong> are 100% secure, processed with encrypted payments, and delivered as digital downloads to your registered email.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faShoppingCart} className="info-icon" />
          <p>
            <strong>Flexible Pricing & Exclusive Discounts:</strong> Choose from a range of subscription plans and enjoy seasonal discounts on top antivirus brands. Whether you're looking for a basic security plan or enterprise-grade protection, we have you covered.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faUserShield} className="info-icon" />
          <p>
            <strong>Enhanced Privacy & Data Protection:</strong> With rising cyber threats, protecting your sensitive information is crucial. Our antivirus solutions provide built-in VPNs, firewall protection, and anti-phishing tools to keep your data safe from cybercriminals.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faHeadset} className="info-icon" />
          <p>
            <strong>24/7 Customer Support:</strong> Need assistance? Our dedicated support team is available 24/7 to answer your questions and help with installation, activation, and troubleshooting.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faShieldAlt} className="info-icon" />
          <p>
            <strong>Comprehensive Protection for All Devices:</strong> Whether you’re using Windows, macOS, Android, or iOS, we offer multi-device antivirus licenses so you can secure your PC, laptop, and mobile devices with one subscription.
          </p>
        </div>

        <div className="info-box">
          <FontAwesomeIcon icon={faLock} className="info-icon" />
          <p>
            <strong>Stay Protected Today:</strong> Cyber threats are evolving—don’t wait until it's too late! Get the best security from {webinfo.name} and safeguard your devices instantly! 🚀
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineAntivirusInfo;
