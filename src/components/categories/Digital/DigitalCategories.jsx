import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
// import TopSeller from "./TopSeller/TopSeller";
import { useMetadata } from "../../../context/Metadatacontext";

const DigitalCategories = () => {
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const location = useLocation();
  const { setSelectedAntiv, setCatenav } = useProduct();
  const { categoryMetadata } = useMetadata();


  useEffect(() => {
    document.title = `Brands | ${webinfo.name}`;
  }, []);




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
          marginTop: location.pathname === '/categories/digital' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
        }}
      >
        <h1 className="categories-title">Top Digital Services</h1>
        <p className="categories-description">
        Discover expert digital solutions tailored for your business. From marketing to app development, explore top-tier services trusted by clients worldwide for innovation and performance.
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
