import React from 'react';
import './AppDevelopment.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faLayerGroup, faShieldAlt, faEnvelope,faCheckCircle, } from '@fortawesome/free-solid-svg-icons';

const AppDevelopment = () => {
  return (
    <div className="appdev-main">
      {/* Hero Section */}
      <section className="appdev-hero">
        <div className="hero-content">
        <p className="tagline">APP DEVELOPMENT AGENCY</p>
          <h1>
            Build <span>Powerful</span> & <span>Scalable</span> Mobile Apps
          </h1>
          <p>
            We develop intuitive, performance-driven mobile apps that work seamlessly across devices. Whether you're launching a startup, building an internal tool, or scaling a SaaS product, our team ensures high-quality delivery from concept to deployment.
          </p>
          <ul className="hero-bullets">
            <li> Native & Hybrid App Development</li>
            <li> Agile Process with Regular Updates</li>
            <li> Post-launch Support & Maintenance</li>
          </ul>
          <button className="hero-btn">Start a Project</button>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1746199121/mobileApp-overviewsvg_atcfos.svg"
            alt="App Development"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="appdev-features">
        <h2>Our Mobile App Development Services</h2>
        <p className="features-description">
          We create apps that are fast, secure, user-friendly, and aligned with your business goals. Every app we build is customized to solve real-world challenges for your users.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <FontAwesomeIcon icon={faMobileAlt} className="icon" />
            <h4>iOS & Android Development</h4>
            <p>Build highly performant apps tailored for both iOS and Android platforms using Swift, Kotlin, and React Native.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faLayerGroup} className="icon" />
            <h4>Cross-Platform Solutions</h4>
            <p>Write once, deploy everywhere. Save time and cost with Flutter, React Native, and hybrid stacks.</p>
          </div>
          <div className="feature-card">
            <FontAwesomeIcon icon={faShieldAlt} className="icon" />
            <h4>Security & Testing</h4>
            <p>From code encryption to real-time analytics, we implement security-first development with automated & manual QA testing.</p>
          </div>
        </div>
      </section>

      <section className="appdev-whyus">
  <h2 className="whyus-heading">Why Work With Us?</h2>
  <p className="whyus-subtext">
    Our approach combines cutting-edge tech with real-world insight. Here's what sets us apart:
  </p>
  <div className="whyus-grid">
    <div className="whyus-card">
      <FontAwesomeIcon icon={faCheckCircle} className="whyus-icon" />
      <h4>Proven Experience</h4>
      <p>5+ years delivering high-quality mobile apps for diverse industries.</p>
    </div>
    <div className="whyus-card">
      <FontAwesomeIcon icon={faCheckCircle} className="whyus-icon" />
      <h4>Agile Development</h4>
      <p>We follow agile workflows for faster releases, collaboration, and iteration.</p>
    </div>
    <div className="whyus-card">
      <FontAwesomeIcon icon={faCheckCircle} className="whyus-icon" />
      <h4>Transparent Pricing</h4>
      <p>No hidden costs. You receive a clear, upfront quote and timeline.</p>
    </div>
    <div className="whyus-card">
      <FontAwesomeIcon icon={faCheckCircle} className="whyus-icon" />
      <h4>Dedicated Support</h4>
      <p>Post-launch updates, bug fixes, and performance tracking come standard.</p>
    </div>
  </div>
</section>


      {/* Consultation Section */}
      <section className="appdev-consultation">
        <h2>Let’s Build Something Great Together</h2>
        <p>
          Share your email and we’ll connect with you to understand your business, your vision, and how we can build an app that delivers real value.
        </p>
        <form>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button type="submit">Send Request</button>
        </form>
      </section>
    </div>
  );
};

export default AppDevelopment;
