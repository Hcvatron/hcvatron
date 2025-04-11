import { useMetadata } from "../../context/Metadatacontext";
import { useProduct } from "../../context/ProductContext";
import "./Brandfeature.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadset,
  faEnvelope,
  faGlobe,
  faCheckCircle,
  faQuoteLeft, faUserCircle
} from "@fortawesome/free-solid-svg-icons";

const Brandfeature = () => {
  const { selectedAntiv } = useProduct();
  const categoryMetadata = useMetadata();
  const brandData = categoryMetadata[selectedAntiv] || {};

  console.log("Selected Antiv-->",selectedAntiv);
  if (!brandData) {
    return <div className="brand-not-found">Brand not found</div>;
  }

  return (
    <div className="brand-feature">
      {/* Header Section */}
      <div className="brand-header">
        <img src={brandData.logo || ""} alt={`${brandData.title} logo`} className="brand-logo" />
        <h1 className="brand-title">{brandData.title || ""}</h1>
        <p className="brand-description">{brandData.whyChoose || ""}</p>
      </div>

      {/* Benefits Section */}
      <div className="brand-benefits">
        {brandData.benefits?.map((benefit, index) => (
          <div key={index} className="benefit-card">
            <img src={benefit.icon || ""} alt={benefit.title || ""} className="benefit-icon" />
            <h3 className="benefit-title">{benefit.title || ""}</h3>
            <p className="benefit-description">{benefit.desc || ""}</p>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="brand-features">
        <h2 className="section-title">🚀 Key Benefits of This Antivirus</h2>
        <ul className="feature-list">
          {brandData.features?.map((feature, index) => (
            <li key={index} className="feature-item"><FontAwesomeIcon icon={faCheckCircle} className="feature-icon" /> {feature || ""}</li>
          ))}
        </ul>
      </div>

      {/* Testimonials Section */}
      <div className="brand-testimonials">
  <h2 className="section-title">💬 What Our Users Say</h2>

  <div className="testimonial-container">
    {brandData.testimonials?.slice(0, 6).map((testimonial, index) => (
      <div key={index} className="testimonial-card">
        <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
        <p className="testimonial-quote">"{testimonial.quote}"</p>
        <div className="testimonial-author">
          <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
          <span>{testimonial.author}</span>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* Contact Section */}
      {brandData.contact && (
        <div className="brand-contact">
          <h2 className="section-title">Official Contact Information</h2>
          <p className="contact-intro">
            Need assistance? Reach out to <strong>{brandData.title}</strong> through the official channels below.
            Whether you need technical support, subscription inquiries, or general assistance, 
            the support team is here to help.
          </p>
          <div className="contact-details">
            {brandData.contact.supportPhone && (
              <div className="contact-item">
                <FontAwesomeIcon icon={faHeadset} className="contact-icon" />
                <div>
                  <span className="contact-label">{brandData.title} :   </span>
                  <a href={`tel:${brandData.contact.supportPhone}`}>{brandData.contact.supportPhone}</a>
                </div>
              </div>
            )}
            {brandData.contact.supportEmail && (
              <div className="contact-item">
                <FontAwesomeIcon icon={faEnvelope} className="contact-icon" />
                <div>
                  <span className="contact-label">Support Email:   </span>
                  <a href={`mailto:${brandData.contact.supportEmail}`}>{brandData.contact.supportEmail}</a>
                </div>
              </div>
            )}
            {brandData.contact.website && (
              <div className="contact-item">
                <FontAwesomeIcon icon={faGlobe} className="contact-icon" />
                <div>
                  <span className="contact-label">Official Website:   </span>
                  <a href={brandData.contact.website} target="_blank" rel="noopener noreferrer">{brandData.contact.website}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Brandfeature;
