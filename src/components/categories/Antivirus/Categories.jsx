import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import TopSeller from "./TopSeller/TopSeller";
import { useMetadata } from "../../../context/Metadatacontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPhone } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const location = useLocation();
  const { setSelectedAntiv, setCatenav } = useProduct();
  const { categoryMetadata } = useMetadata();


  useEffect(() => {
    document.title = `Brands | ${webinfo.name}`;
  }, []);



  const categories = [
    { id: "01", name: "McAfee", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737531060/McAfee-Logo_ueh5ul.png", route: "/mcafee" },
    { id: "02", name: "Norton", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737470578/Norton-Logo-2010-500x281_cvjvjr.png", route: "/norton" },
    { id: "03", name: "Webroot", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738063553/Webroot-logo-global-icon-color_1200x600-840x420_sqwoix.webp", route: "/webroot" },
    { id: "04", name: "Kaspersky", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738152316/Kaspersky_aumabf_nvxrwt.svg", route: "/kaspersky" },
    { id: "05", name: "AVG", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737748597/AVG-Logo_eepdxp.jpg", route: "/avg" },
    { id: "06", name: "Avast", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738150954/Avast_tgbsoz_po3bvv.png", route: "/avast" },
    { id: "07", name: "Bitdefender", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737748913/04rk8yqu2cixbmdjvdlqrnz-28-1595951943-fit-scale-size-1028x578_fyjpmu.png", route: "/bitdefender" },
    { id: "08", name: "TotalAV", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1737749048/403534-security-suites-totalav-internet-security-10019614_xwy8i3.png", route: "/totalav" },
    { id: "09", name: "Avira", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738567802/Avira_logo_udx5be.svg", route: "/avira" },
    { id: "10", name: "PCMatic", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738340692/pc_matic-logo_uossrg.png", route: "/pcmatic" },
    { id: "11", name: "BullGuard", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738567888/bullguard-logo_uerusx.png", route: "/bullguard" },
    { id: "12", name: "TrendMicro", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738567995/Trend_Micro_Logo_2023_adnhlu.png", route: "/trendmicro" }
  ];

  const handleCategoryNavigation = (category) => {
    setCatenav(true);
    setSelectedAntiv(category.name);
    navigate(`/antivirus${category.route}`);
  };

  return (
    <>
      <div  className="categories-container"
        style={{
          marginTop: location.pathname === '/antivirus' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
        }}
      >
        <h1 className="categories-title">Top Antivirus Brands</h1>
        <p className="categories-description">
          Stay protected with the most reliable antivirus solutions. Explore our curated selection of top brands trusted by millions worldwide for cutting-edge security and performance.
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
        {location.pathname === '/antivirus' && (
  <div className="categories-extra-feature">
    {/* Info Section */}
    <div className="info-block">
      <h2>Why Choose Trusted Antivirus Brands?</h2>
      <p>
        Our featured antivirus products are globally trusted for their unmatched protection,
        lightning-fast performance, and comprehensive security. Whether you're an individual
        user or managing devices across an organization, these solutions are tailored to
        keep your digital life safe.
      </p>
    </div>

    {/* Security Highlights */}
    <div className="highlight-grid">
      <div className="highlight-card">
        <h3>Real-Time Threat Detection</h3>
        <p>Blocks malware, ransomware, and phishing attempts before they cause harm.</p>
      </div>
      <div className="highlight-card">
        <h3>Multi-Device Protection</h3>
        <p>Protect all your devices — Windows, macOS, Android, and iOS — from one dashboard.</p>
      </div>
      <div className="highlight-card">
        <h3>Secure Online Privacy</h3>
        <p>Encrypt your data and guard your identity while browsing, shopping, or banking.</p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="cta-section">
      <h2>Need Help Choosing an Antivirus?</h2>
      <p>Our security advisors can help you pick the perfect solution for your home or business.</p>
      
      <div className="cta-actions">
        <a href={`tel:${webinfo.phonecall}`} className="cta-call-button">
        <FontAwesomeIcon icon={faHeadset} />   <span>Call Now: {webinfo.phone}</span>
        </a>
        <p className="cta-note">Available 24/7 | Expert guidance | Free consultation</p>
      </div>
    </div>
  </div>
)}


    </div>
   

     {location.pathname === '/all-categories' ? (
      <p></p>
     ):(
      <>
      {location.pathname==='/brands' && <TopSeller />}
      {location.pathname==='/brands' && <Disclaimer />}
      </>
     )} 
    </>
  );
};

export default Categories;
