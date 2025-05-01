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
    <>
      <div className="digital-cate-main">
        {/* Hero Section */}
        <section className="digital-cate-container comp">
          <div className="digital-cate-text">
            <p className="digital-cate-subtitle">DIGITAL AGENCY</p>
            <h1 className="digital-cate-title">
              Creating You <br />
              from <span className="digital-cate-highlight">Your Brand</span>
            </h1>
            <p className="digital-cate-description">
              An advertising agency is a free proficient association that works
              in playing out the assignment of advertising.
            </p>
            <button className="digital-cate-button">Call Us For Enquiry</button>
          </div>

          <div className="digital-cate-image-box">
            <div className="digital-cate-image-circle">
              <img
                src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506054/learn-smo-course-in-madurai_cfqddh.webp"
                alt="Woman with Tablet"
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
                <p className="digital-cate-stat-number">100+</p>
                <p className="digital-cate-stat-label">Active Members</p>
              </div>
              <div className="digital-cate-stat-divider"></div>
              <div className="digital-cate-skills">
                <p>Skills</p>
                <div className="digital-cate-skill-bars">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="digital-cate-services">
          <h2 className="section-heading">We Offer That About the Agency</h2>
          <p className="section-subheading">
            A place where ideas grow. So, for that purpose, choose catchy.
          </p>
          <div className="digital-cate-cards">
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="icon blue" />
              </div>
              <h4>Digital Marketing Training</h4>
              <p>
                We are a group of young professionals experts on web development and data science.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faLayerGroup} className="icon purple" />
              </div>
              <h4>Interface Design</h4>
              <p>
                We are a group of young professionals experts on web development and data science.
              </p>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <FontAwesomeIcon icon={faSearchDollar} className="icon green" />
              </div>
              <h4>SEO Consultancy</h4>
              <p>
                We are a group of young professionals experts on web development and data science.
              </p>
            </div>
          </div>
        </section>

        {/* Collaboration Section */}
        <section className="digital-cate-collaboration">
          <div className="collab-text">
            <h2>
              Working together, to create something{" "}
              <span className="digital-cate-highlight">younique</span>.
            </h2>
            <p>
              We are a group of young professionals experts on web development and data science.
              Our company offers affordable services focused on web & app development.
            </p>
            <button className="digital-cate-button">Call Us For Enquiry</button>
          </div>
          <div className="collab-images">
            <img
              src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506459/pexels-photo-3184325_ky5ni6.jpg"
              alt="Team"
            />
            <img
              src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506521/pexels-photo-3184360_od8ixe.jpg"
              alt="Discussion"
            />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
          <div className="newsletter-content">
          <h2>Enquire About Our Digital Marketing Services</h2>
<p>
  Looking to elevate your brand online? Get in touch with us to learn how our digital marketing experts can help you grow through SEO, social media, paid ads, and more.
</p>

            <form className="newsletter-form">
              <div className="input-group">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <input type="email" placeholder="Your Email Address" />
              </div>
              <button type="submit" className="newsletter-button">
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default DigitalCate;
