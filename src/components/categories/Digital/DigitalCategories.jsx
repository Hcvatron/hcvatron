import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
// import TopSeller from "./TopSeller/TopSeller";
import { useMetadata } from "../../../context/Metadatacontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPhone } from "@fortawesome/free-solid-svg-icons";

const DigitalCategories = () => {
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const location = useLocation();
  const { setSelectedAntiv, setCatenav } = useProduct();
  const { categoryMetadata } = useMetadata();




  const services = [
    // Existing antivirus services...
    {
      id: "13",
      name: "Digital Marketing",
      img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1745506581/digital-marketing-illustration-download-in-svg-png-gif-file-formats--template-computer-email-pack-business-illustrations-3092463_odngyv.webp",
      route: "/digital-marketing",
    },
    {
      id: "14",
      name: "Web Development",
      img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1745506665/male-web-developer-doing-research-on-development-illustration-download-in-svg-png-gif-file-formats--thinking-researching-and-pack-design-illustrations-4759504_s2f5kj.webp",
      route: "/web-development",
    },
    {
      id: "15",
      name: "Content Writing",
      img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1745506736/content-writing-illustration-download-in-svg-png-gif-file-formats--news-article-blog-writer-journalist-loopy-01-pack-people-illustrations-6059221_xoptpb.png",
      route: "/content-writing",
    },
    {
      id: "16",
      name: "App Development",
      img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1745506864/mobile-app-development-illustration-download-in-svg-png-gif-file-formats--application-programming-developer-pack-people-illustrations-3874584_wdjiml.png",
      route: "/app-development",
    },
  ];
  

  const handleCategoryNavigation = (category) => {
    setCatenav(true);
    setSelectedAntiv(category.name);
    navigate(`/digital${category.route}`);
  };

  return (
    <>
      <div  className="categories-container"
        style={{
          marginTop: location.pathname === '/digital' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
        }}
      >
        <h1 className="categories-title">Top Digital Services</h1>
        <p className="categories-description">
  Discover expert digital solutions tailored for your business. From marketing to app development, explore top-tier services trusted by clients worldwide for innovation and performance.  
  Our team specializes in delivering measurable results through data-driven strategies, sleek user experiences, and scalable technology.
</p>
        <div className="categories-grid">
          {services.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryNavigation(category)}
            >
              <div className={`category-image ${category.name}` }>
                <img src={category.img} alt={category.name} />
              </div>
              <h3 className="category-name">{category.name}</h3>
              {/* <button className="explore-button">Explore</button> */}
            </div>
          ))}
        </div>
        {location.pathname === '/digital' && (
  <div className="categories-extra-feature">
    {/* Info Section */}
    <div className="info-block">
      <h2>Why Choose Our Digital Services?</h2>
      <p>
        From startups to global brands, businesses trust us to power their growth through high-impact digital strategies. Our expertise spans marketing, development, content, and apps—each service designed to boost visibility, user engagement, and long-term results.
      </p>
    </div>

    {/* Service Highlights */}
    <div className="highlight-grid">
      <div className="highlight-card">
        <h3>Result-Oriented Marketing</h3>
        <p>SEO, paid ads, and social media strategies that deliver qualified leads and measurable ROI.</p>
      </div>
      <div className="highlight-card">
        <h3>Modern Web & App Development</h3>
        <p>Responsive, scalable, and fast—built using the latest frameworks for seamless user experiences.</p>
      </div>
      <div className="highlight-card">
        <h3>Creative Content Writing</h3>
        <p>Convert readers into customers with persuasive blogs, landing pages, and brand messaging.</p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="cta-section">
      <h2>Want to Transform Your Digital Presence?</h2>
      <p>Let’s discuss your goals. Our team will guide you through services that suit your business best.</p>
      
      <div className="cta-actions">
        <a href={`tel:${webinfo.phonecall}`} className="cta-call-button">
          <FontAwesomeIcon icon={faHeadset} /> <span>Talk to Us: {webinfo.phone}</span>
        </a>
        <p className="cta-note">Free consultation | Proven expertise | Friendly support</p>
      </div>
    </div>
  </div>
)}

        
      </div>
      
     {location.pathname === '/all-categories' ? (
      <p></p>
     ):(
      <>
      {/* {location.pathname==='/brands' && <TopSeller />} */}
      {/* {location.pathname==='/brands' && <Disclaimer />} */}
      </>
     )} 
    </>
  );
};

export default DigitalCategories;
