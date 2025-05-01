import React from "react";
import "./WebDevCate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faPalette,
  faRocket,
  faEnvelope,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const WebDevCate = () => {
  return (
    <div className="webdev-main">
      {/* HERO */}
      <section className="webdev-main-hero-section">
        <div className="webdev-main-hero-text">
          <p className="tagline">WEB DEVELOPMENT AGENCY</p>
          <h1>
            Build <span>Modern</span> & <span>Scalable</span> Web Apps
          </h1>
          <p>
            We specialize in full-stack development, responsive design, and performance-driven digital solutions tailored for your business growth.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="outline-btn">View Projects</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506054/learn-smo-course-in-madurai_cfqddh.webp"
            alt="Web Dev"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="services-overview">
        <div className="service-box">
          <FontAwesomeIcon icon={faCode} />
          <h4>Full Stack Development</h4>
          <p>
            Robust frontends & powerful backends with React, Node.js, Next.js, MongoDB & more.
          </p>
        </div>
        <div className="service-box">
          <FontAwesomeIcon icon={faPalette} />
          <h4>Creative UI/UX</h4>
          <p>
            Beautiful interfaces and intuitive user experiences that convert visitors to customers.
          </p>
        </div>
        <div className="service-box">
          <FontAwesomeIcon icon={faRocket} />
          <h4>SEO & Optimization</h4>
          <p>
            Faster loading, improved performance, and higher visibility across search platforms.
          </p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section">
        <div className="experience-image">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506521/pexels-photo-3184360_od8ixe.jpg"
            alt="Team Collaboration"
          />
        </div>
        <div className="experience-text">
          <h2>Why Work With Us?</h2>
          <ul>
            <li><FontAwesomeIcon icon={faCheckCircle} /> 5+ Years of Proven Experience</li>
            <li><FontAwesomeIcon icon={faCheckCircle} /> Agile Development Process</li>
            <li><FontAwesomeIcon icon={faCheckCircle} /> Affordable Pricing & Transparency</li>
            <li><FontAwesomeIcon icon={faCheckCircle} /> Ongoing Support & Maintenance</li>
          </ul>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="consultation-form">
        <h2>Let’s Discuss Your Project</h2>
        <p>
          Drop your email and we’ll get in touch to schedule a free consultation with our experts.
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

export default WebDevCate;
