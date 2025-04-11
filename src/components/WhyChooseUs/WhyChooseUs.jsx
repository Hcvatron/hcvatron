import React from "react";
import "./WhyChooseUs.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faTools, faHeadset, faTags } from "@fortawesome/free-solid-svg-icons";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Unmatched Security",
      description: "State-of-the-art antivirus solutions for ultimate protection.",
      icon: faShieldAlt,
    },
    {
      id: 2,
      title: "Seamless Setup",
      description: "Install and secure your devices in just a few clicks.",
      icon: faTools,
    },
    {
      id: 3,
      title: "24/7 Expert Help",
      description: "Always-on support from our knowledgeable professionals.",
      icon: faHeadset,
    },
    {
      id: 4,
      title: "Value for Money",
      description: "Affordable plans tailored to meet all your security needs.",
      icon: faTags,
    },
  ];

  return (
    <>
    <section className="why-choose-us">
      <div className="why-choose-content">
        {/* Section Header */}
        <div className="why-choose-header">
          <h2>Why Choose Us</h2>
          <p>Secure your digital life with confidence and ease.</p>
        </div>

        {/* Features Section */}
        <div className="features-container">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-icon">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default WhyChooseUs;
