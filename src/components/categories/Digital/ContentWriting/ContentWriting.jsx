import React from "react";
import "./ContentWriting.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenNib,
  faBookOpen,
  faSearch,
  faEnvelope,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ContentWriting = () => {
  const navigate = useNavigate();

  return (
    <div className="content-main">
      {/* Hero Section */}
      <section className="content-hero-section">
        <div className="content-hero-text">
          <p className="tagline">CONTENT WRITING AGENCY</p>
          <h1>
            Crafting <span>Compelling</span> & <span>SEO-Rich</span> Content
          </h1>
          <p>
            We provide high-quality content that captivates, educates, and converts. From blog posts and website copy to product descriptions and technical writing — we do it all.
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/contact")}>
              Let's Talk
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1746198416/unnamed-2_nlqvr6.png"
            alt="Content Writing"
          />
        </div>
      </section>

      {/* Services */}
      <section className="services-overview">
        <div className="service-box">
          <FontAwesomeIcon icon={faPenNib} />
          <h4>SEO Blog Writing</h4>
          <p>
            Drive traffic with keyword-optimized, value-driven blogs that engage your target audience and improve SERP rankings.
          </p>
        </div>
        <div className="service-box">
          <FontAwesomeIcon icon={faBookOpen} />
          <h4>Website Copywriting</h4>
          <p>
            From homepage to about page – we craft persuasive content that reflects your brand voice and connects with users.
          </p>
        </div>
        <div className="service-box">
          <FontAwesomeIcon icon={faSearch} />
          <h4>Product Descriptions</h4>
          <p>
            Convert browsers into buyers with compelling, SEO-optimized product content that highlights features and benefits.
          </p>
        </div>
      </section>

      {/* Experience */}
      <section className="experience-section">
        <div className="experience-image">
          <img
            src="https://res.cloudinary.com/dcf3mojai/image/upload/v1745506521/pexels-photo-3184360_od8ixe.jpg"
            alt="Writers Team"
          />
        </div>
        <div className="experience-text">
          <h2>Why Choose Our Writers?</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> 100% Original & Plagiarism-Free Content
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> Experienced Writers Across Niches
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> Fast Turnaround & Unlimited Revisions
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} /> SEO-Friendly, Readable & Conversion-Focused
            </li>
          </ul>
        </div>
      </section>

      {/* Consultation */}
      <section className="consultation-form">
        <h2>Need Content That Converts?</h2>
        <p>
          Leave your email and let’s get started with content that builds trust and drives results.
        </p>
        <form>
          <div className="input-wrapper">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <input type="email" placeholder="Enter your email address" />
          </div>
          <button type="submit">Request a Quote</button>
        </form>
      </section>
    </div>
  );
};

export default ContentWriting;
