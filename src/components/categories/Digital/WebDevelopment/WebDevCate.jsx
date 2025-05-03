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
import { useNavigate } from "react-router-dom";

const WebDevCate = () => {

  const navigate = useNavigate();
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
            We specialize in full-stack web development, crafting responsive websites and high-performance applications tailored to your business needs. From concept to deployment, we ensure quality, speed, and scalability.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={()=>navigate('/contact')}>Reach Out To Us</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1746183842/male-web-developer-doing-research-on-development-illustration-download-in-svg-png-gif-file-formats--thinking-researching-and-pack-design-illustrations-4759504_sqr4hx.webp"
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
            End-to-end development with cutting-edge frameworks like React, Next.js, and Node.js. We create seamless digital ecosystems that are fast, secure, and feature-rich.
          </p>
        </div>
        <div className="service-box">
          <FontAwesomeIcon icon={faPalette} />
          <h4>Creative UI/UX</h4>
          <p>
            We blend creativity and usability to deliver intuitive, visually stunning designs that enhance user engagement and drive conversions.
          </p>
        </div>
        <div className="service-box">
          <FontAwesomeIcon icon={faRocket} />
          <h4>SEO & Optimization</h4>
          <p>
            Improve your website’s speed, visibility, and ranking with our strategic SEO implementation and performance enhancements.
          </p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section">
        <div className="experience-image">
          <img
            src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?q=80&w=2047&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Team Collaboration"
          />
        </div>
        <div className="experience-text">
          <h2>Why Work With Us?</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> 5+ Years of Proven Experience in delivering robust web applications across industries.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> Agile Development Process for faster turnarounds, transparency, and flexibility.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> Affordable Pricing & Transparent Quotes with no hidden charges.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> Ongoing Support & Maintenance ensuring your site remains up-to-date and bug-free.
            </li>
          </ul>
        </div>
      </section>

      {/* CONSULTATION FORM */}
      <section className="consultation-form">
        <h2>Let’s Discuss Your Project</h2>
        <p>
          Want to bring your digital idea to life? Share your email and our experts will reach out to explore your goals, challenges, and how we can help.
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
