import React from 'react';
import './AboutTeam.css';

const teamMembers = [
  { name: 'Anmol Anand', role: 'CEO & Founder', image: 'https://img.icons8.com/ios-filled/100/donald-trump.png' },
  { name: 'Raja Kumar', role: 'CTO', image: 'https://img.icons8.com/ios-filled/100/donald-trump.png' },
  { name: 'Najish Umar', role: 'Head of Security', image: 'https://img.icons8.com/ios-filled/100/donald-trump.png' },
  { name: 'Sara Johnson', role: 'Product Manager', image: 'https://img.icons8.com/ios-filled/100/donald-trump.png' },
];

const AboutTeam = () => {
  return (
    <div className="aboutTeam">
      <h2>Our Team</h2>
      <p className="aboutTeam__subtitle">
        We are a group of innovative, experienced, and proficient professionals. You will love to collaborate with us.
      </p>
      <div className="aboutTeam__grid">
        {teamMembers.map((member, index) => (
          <div className="aboutTeam__card" key={index}>
            <img src={member.image} alt={member.name} />
            <div className="aboutTeam__info">
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutTeam;
