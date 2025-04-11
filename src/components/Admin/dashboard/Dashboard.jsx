import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig'; 
// import './Dashboard.css';
import BlogList from '../blog/BlogList';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [visitCount, setVisitCount] = useState(123); // Placeholder for visit count
  const [tfnClicks, setTfnClicks] = useState(15); // Placeholder for TFN Clicks
  const navigate = useNavigate();  


  return (
    <div className="dashboard-container">
      {/* Top Section */}
      <div className="top-section">
        <div className="stats-container">
          <div className="stat-item">
            <h3>User Visited</h3>
            <p>{visitCount}</p>
          </div>
          <div className="stat-item">
            <h3>TFN Clicks</h3>
            <button className="tfn-clicks-btn" onClick={() => setTfnClicks(tfnClicks + 1)}>
              {tfnClicks} Clicks
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Latest Blogs */}
      <div className="bottom-section">
        <h3>Latest Blogs</h3>
        <div className="latest-blogs">
         <BlogList count={4} />
        </div>
        {/* See More Button */}
        <button className="see-all-btn" onClick={()=>navigate('/admin/blog')}>See All Blogs</button>
      </div>
    </div>
  );
};

export default Dashboard;
