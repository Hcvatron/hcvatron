import React from "react";
import "./DigitalCate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faLayerGroup,
  faSearchDollar,
  faLightbulb,
  faChartColumn,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const DigitalCate = () => {
  return (
    <div className="digital-cate-main">
      {/* Hero Section */}
      <section className="digital-cate-container">
        <div className="digital-cate-text">
          <p className="digital-cate-subtitle">DIGITAL MARKETING AGENCY</p>
          <h1 className="digital-cate-title">
            Accelerate Your <span className="digital-cate-highlight">Growth</span> with Expert <span>Digital Marketing</span>
          </h1>
          <p className="digital-cate-description">
          From SEO and paid ads to social media marketing, branding, email campaigns, and performance analytics — we offer end-to-end, result-driven digital marketing solutions designed to elevate your brand visibility, attract qualified leads, and convert traffic into measurable revenue. Our data-first approach ensures every campaign is tailored to your unique goals and delivers maximum ROI.
          </p>
          <button className="digital-cate-button">Talk to an Expert</button>
        </div>

        <div className="digital-cate-image-box">
          <div className="digital-cate-image-circle">
            <img
              src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506054/learn-smo-course-in-madurai_cfqddh.webp"
              alt="Digital Expert"
            />
          </div>
          <div className="digital-cate-icon digital-cate-top-left">
            <FontAwesomeIcon icon={faLightbulb} className="digiicon" size="2xl" />
          </div>
          <div className="digital-cate-icon digital-cate-top-right">
            <FontAwesomeIcon icon={faChartColumn} className="digiicon" size="2xl" />
          </div>

          <div className="digital-cate-stat-box">
            <div className="digital-cate-stat">
              <p className="digital-cate-stat-number">250+</p>
              <p className="digital-cate-stat-label">Successful Campaigns</p>
            </div>
            <div className="digital-cate-stat-divider"></div>
            <div className="digital-cate-skills">
              <p>Growth Metrics</p>
              <div className="digital-cate-skill-bars">
                <span></span><span></span><span></span><span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="digital-cate-services">
        <h2 className="section-heading">What We Offer</h2>
        <p className="section-subheading">
          End-to-end digital marketing services that fuel business visibility, engagement, and conversions.
        </p>
        <div className="digital-cate-cards">
          <div className="service-card">
            <div className="service-icon">
              <FontAwesomeIcon icon={faSearchDollar} className="icon green" />
            </div>
            <h4>Search Engine Optimization (SEO)</h4>
            <p>
              Improve organic search visibility, boost traffic, and rank higher on Google through proven SEO strategies.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <FontAwesomeIcon icon={faLayerGroup} className="icon purple" />
            </div>
            <h4>Paid Advertising (PPC)</h4>
            <p>
              Run targeted ad campaigns across Google, Facebook, and Instagram to drive instant traffic and leads.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <FontAwesomeIcon icon={faChalkboardTeacher} className="icon blue" />
            </div>
            <h4>Social Media Marketing</h4>
            <p>
              Grow and engage your audience on platforms like Instagram, Facebook, and LinkedIn with strategic content & ads.
            </p>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="digital-cate-collaboration">
      <div className="collab-text">
  <h2>
    Partner with Us for <span className="digital-cate-highlight">Next-Level Growth</span>
  </h2>
  <p>
    Whether you're a startup or scaling enterprise, we’ll help build your digital presence through powerful campaigns, detailed analytics, and constant optimization.
  </p>
  <p>
    Our team collaborates closely with you to understand your unique goals and challenges, crafting digital strategies that resonate with your audience and drive measurable success.
  </p>
  <p>
    From brand positioning to multi-channel execution, we bring a full-spectrum approach to elevate your marketing impact. Our data-driven mindset ensures every decision leads to progress.
  </p>
  <p>
    Let's unlock new opportunities together—through clarity, creativity, and continuous improvement.
  </p>
  <button className="digital-cate-button">Start Your Project</button>
</div>

        <div className="collab-images">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506459/pexels-photo-3184325_ky5ni6.jpg"
            alt="Team"
          />
          <img
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhbXxlbnwwfDB8MHx8fDA%3D"
            alt="Discussion"
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
  <div className="newsletter-content">
    <h2>Subscribe for Marketing Insights</h2>
    <p>
      Join our community of 10,000+ marketers and business owners. Receive actionable tips, real case studies, and trend forecasts that help you grow faster.
    </p>
    <form className="newsletter-form">
      <div className="input-group">
        <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
        <input type="email" placeholder="Your Email Address" required />
      </div>
      <button type="submit" className="newsletter-button">Subscribe Now</button>
    </form>
  </div>
</section>

    </div>
  );
};

export default DigitalCate;
