import React from 'react';
import './UnderDevelopment.css';
import { Link } from 'react-router-dom';

const UnderDevelopment = () => {
  return (
    <div className="under-dev-wrapper">
      <div className="under-dev-box">
        <h1>🚧 Page Under Development</h1>
        <p>
          We’re working hard to bring you this feature soon. <br />
          Stay tuned for updates!
        </p>
        <Link to="/" className="back-home-btn">← Go Back Home</Link>
      </div>
    </div>
  );
};

export default UnderDevelopment;
