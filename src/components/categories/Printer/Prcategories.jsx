import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import { useMetadata } from "../../../context/Metadatacontext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faPhone } from "@fortawesome/free-solid-svg-icons";

const Prcategories = () => {
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const location = useLocation();
  const { setSelectedAntiv, setCatenav } = useProduct();
  const { categoryMetadata } = useMetadata();

  useEffect(() => {
    document.title = `Brands | ${webinfo.name}`;
  }, []);

  const categories = [
    { id: "21", name: "HP", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738937195/HP-Logo_jkkkni.png", route: "/hp" },
    { id: "22", name: "Canon", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738937079/Canon-Logo_ucilpk.png", route: "/canon" },
    { id: "23", name: "Epson", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738937126/Epson-Logo_hjzall.png", route: "/epson" }
];


  const handleCategoryNavigation = (category) => {
    setCatenav(true);
    setSelectedAntiv(category.name);
    navigate(`/printer${category.route}`);
  };

  return (
    <>
      <div className="categories-container"
        style={{
          marginTop: location.pathname === '/printer' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
          height: location.pathname === '/printer' ?  window.innerWidth <= 768 ? "" : '100%' : ''
        }}
      >
        <h1 className="categories-title">Top Printer Brands</h1>
        <p className="categories-description">
  Discover the best printers for your home and office needs. Explore our selection of high-quality printers from leading brands like HP, Canon, and Epson. Whether you need fast laser printing, vibrant color inkjet prints, or eco-friendly ink tank technology, we have the perfect printer for you. Upgrade today for seamless performance, wireless connectivity, and cost-effective printing solutions!
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
        {location.pathname === '/printer' && (
  <div className="categories-extra-feature">
    {/* Info Section */}
    <div className="info-block">
      <h2>Why Choose Our Printer Services?</h2>
      <p>
        Whether you're using inkjet or laser printers, our services are designed to ensure optimal setup, connectivity, and print quality. We work with all major brands—HP, Canon, Epson, Brother, and more—to deliver smooth printing experiences at home and in offices.
      </p>
    </div>

    {/* Printer Service Highlights */}
    <div className="highlight-grid">
      <div className="highlight-card">
        <h3>Printer Setup & Installation</h3>
        <p>We help install and configure printers via USB, network, or Wi-Fi, ensuring compatibility and performance.</p>
      </div>
      <div className="highlight-card">
        <h3>Wireless Connectivity Support</h3>
        <p>Resolve connection issues and set up wireless printing across all devices—PC, Mac, mobile, and tablets.</p>
      </div>
      <div className="highlight-card">
        <h3>Driver & Error Troubleshooting</h3>
        <p>Get help fixing driver errors, paper jams, spooler issues, and unresponsive printer problems in no time.</p>
      </div>
    </div>

    {/* Call to Action */}
    <div className="cta-section">
      <h2>Need Help with Your Printer?</h2>
      <p>From simple setup to complex issues, our printer experts are here to provide quick and reliable solutions.</p>

      <div className="cta-actions">
        <a href={`tel:${webinfo.phonecall}`} className="cta-call-button">
          <FontAwesomeIcon icon={faHeadset} /> <span>Call Now: {webinfo.phone}</span>
        </a>
        <p className="cta-note">Expert Support | Multi-brand Assistance | 24/7 Help Desk</p>
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
};

export default Prcategories;
