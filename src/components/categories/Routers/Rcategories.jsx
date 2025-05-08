import React,{useEffect} from 'react'
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import { useMetadata } from "../../../context/Metadatacontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPhone } from "@fortawesome/free-solid-svg-icons";

const Rcategories = () => {
    const navigate = useNavigate();
    const { webinfo } = useLocalContext();
    const location = useLocation();
    const { setSelectedAntiv, setCatenav } = useProduct();
    const { categoryMetadata } = useMetadata();
  
    const categories = [
      { id: "16", name: "Netgear", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500792/Netgear-Logo.wine_wiehvt.png", route: "/netgear" },
      { id: "17", name: "TP-Link", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500857/TP-Link-Logo.wine_fdplj8.png", route: "/tplink" },
      { id: "19", name: "ASUS", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500941/Asus-Logo_pindua.png", route: "/asus" },
      { id: "20", name: "D-Link", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740500998/D-Link-Logo.wine_b2amaw.svg", route: "/dlink" },
      { id: "21", name: "Cisco", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1740584434/Cisco-logo_mttz72.png", route: "/cisco" }
    ];
    
  
    const handleCategoryNavigation = (category) => {
      setCatenav(true);
      setSelectedAntiv(category.name);
      navigate(`/router${category.route}`);
    };
  
    return (
      <>
        <div className="categories-container"
          style={{
            marginTop: location.pathname === '/router' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
            height: location.pathname === '/router'  ?  window.innerWidth <= 768 ? "" : '100%' : ''
          }}
        >
          <h1 className="categories-title">Top Router Brands</h1>
          <p className="categories-description">
  Discover top-quality routers for fast and reliable internet connectivity. Explore our selection of high-performance routers, ensuring seamless browsing, gaming, and streaming with enhanced security and coverage. Upgrade your network today!
</p>
          <div className="categories-grid">
            {categories.map((category) => (
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
          {location.pathname === '/router' && (
  <div className="categories-extra-feature">
    {/* Info Section */}
    <div className="info-block">
      <h2>Why Choose Our Router Services?</h2>
      <p>
        Whether you're setting up a new home Wi-Fi or managing multiple networks at work, our router services offer expert guidance, seamless configuration, and ongoing support. We handle brands like TP-Link, Netgear, ASUS, D-Link, and more.
      </p>
    </div>

    {/* Router Service Highlights */}
    <div className="highlight-grid">
      <div className="highlight-card">
        <h3>Router Setup & Configuration</h3>
        <p>Quick installation, IP configuration, SSID naming, and password protection for reliable wireless connectivity.</p>
      </div>
      <div className="highlight-card">
        <h3>Speed & Range Optimization</h3>
        <p>Boost internet speed and coverage with channel tuning, antenna positioning, and dual-band setup.</p>
      </div>
      <div className="highlight-card">
        <h3>Security & Access Control</h3>
        <p>Enhance network safety with firewall setup, parental controls, and guest access restrictions.</p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="cta-section">
      <h2>Need Help with Your Router?</h2>
      <p>Our networking experts are just a call away to assist with installation, speed issues, or advanced configurations.</p>

      <div className="cta-actions">
        <a href={`tel:${webinfo.phonecall}`} className="cta-call-button">
          <FontAwesomeIcon icon={faHeadset} /> <span>Talk to a Router Expert: {webinfo.phone}</span>
        </a>
        <p className="cta-note">Fast Setup | Secure Networks | 24/7 Support</p>
      </div>
    </div>
  </div>
)}

        </div>
       {location.pathname === '/categories' ? (
        <p></p>
       ):(
        <>
        {/* {location.pathname==='/brands' && <TopSeller />} */}
        {location.pathname==='/brands' && <Disclaimer />}
        </>
       )} 
      </>
    );
}

export default Rcategories