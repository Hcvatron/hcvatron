import React from 'react';
import { FaRocket, FaUsers, FaAward, FaChartLine, FaHandshake, FaStore } from 'react-icons/fa';
import './AboutJourney.css';

const milestones = [
    { icon: <FaRocket />, title: 'Founded in 2015', description: 'Started our journey with a mission to provide top-quality digital solutions.', color: '#FFEBEE' },
    { icon: <FaUsers />, title: '10,000+ Customers', description: 'Gained the trust of over 10,000 satisfied customers worldwide.', color: '#E3F2FD' },
    { icon: <FaAward />, title: 'Industry Recognition', description: 'Recognized as a trusted provider of antivirus, Windows OS, and tech accessories.', color: '#FFF3E0' },
    { icon: <FaChartLine />, title: 'Rapid Growth', description: 'Expanded our product range and enhanced our services over the years.', color: '#E8F5E9' },
    { icon: <FaHandshake />, title: 'Strong Partnerships', description: 'Collaborated with leading brands to bring the best digital products.', color: '#FCE4EC' },
    { icon: <FaStore />, title: 'One-Stop Tech Shop', description: 'Became a go-to platform for software, hardware, and tech support.', color: '#F3E5F5' },
  ];

const AboutJourney = () => {
  return (
    <div className="ourJourney">
      <h2>Our Journey</h2>
      <p className="journey__subtitle">A decade of excellence in providing digital solutions.</p>
      <div className="journey__list">
        {milestones.map((milestone, index) => (
          <div className="journey__card" key={index} style={{ backgroundColor: milestone.color }}>
            <div className="icon">{milestone.icon}</div>
            <div className="journey__content">
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutJourney;
