import React from 'react';
import { FaShieldAlt, FaWindows, FaPrint, FaLaptop, FaHeadset, FaLock } from 'react-icons/fa';
import './AboutValues.css';

const values = [
  { icon: <FaShieldAlt />, title: 'Reliable Antivirus Protection', description: 'Stay protected from malware, ransomware, and cyber threats with our trusted antivirus solutions.' },
  { icon: <FaWindows />, title: 'Genuine Windows OS', description: 'Get original Windows operating systems with lifetime validity and seamless performance.' },
  { icon: <FaPrint />, title: 'High-Quality Printers', description: 'Find the best printers for home and business use, ensuring high-speed and durable prints.' },
  { icon: <FaLaptop />, title: 'Laptops & Accessories', description: 'Explore a wide range of laptops, accessories, and components to enhance your productivity.' },
  { icon: <FaHeadset />, title: '24/7 Customer Support', description: 'Our expert team is available 24/7 to assist you with any technical or purchase-related queries.' },
  { icon: <FaLock />, title: 'Secure Digital Solutions', description: 'We provide encrypted and secure digital solutions to protect your data and transactions.' },
];

const AboutValues = () => {
  return (
    <div className="aboutValues">
      <h2>Why Choose Us?</h2>
      <p className="aboutValues__subtitle">
        The one-stop destination for antivirus, Windows OS, and printer solutions.
      </p>
      <div className="values__list">
        {values.map((value, index) => (
          <div className="value__card" key={index}>
            <div className="icon">{value.icon}</div>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutValues;
