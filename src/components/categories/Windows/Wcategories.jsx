import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import { useMetadata } from "../../../context/Metadatacontext";

const Wcategories = () => {
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const location = useLocation();
  const { setSelectedAntiv, setCatenav } = useProduct();
  const { categoryMetadata } = useMetadata();

  useEffect(() => {
    document.title = `Brands | ${webinfo.name}`;
  }, []);

  const categories = [
    { id: "13", name: "Windows 7", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738666314/windows-7-logo_t9g361.png", route: "/windows7" },
    { id: "14", name: "Windows 8", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738666084/Windows_8-Logo.wine_nk2l9e.png", route: "/windows8" },
    { id: "15", name: "Windows XP", img: "https://res.cloudinary.com/dcf3mojai/image/upload/v1738666532/2560px-Unofficial_fan_made_Windows_XP_logo_variant.svg_kfdcut.png", route: "/windowsxp" }
  ];

  const handleCategoryNavigation = (category) => {
    setCatenav(true);
    setSelectedAntiv(category.name);
    navigate(`/windows${category.route}`);
  };

  return (
    <>
      <div className="categories-container"
        style={{
          marginTop: location.pathname === '/categories/windows' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
          height: location.pathname === '/categories/windows' ?  window.innerWidth <= 768 ? "" : '60vh' : '',
        }}
      >
        <h1 className="categories-title">Top Windows OS</h1>
        <p className="categories-description">
        Get the best Windows operating systems for your needs. Explore our selection of genuine Windows OS versions, including Windows 7, Windows 8, and Windows XP, for seamless performance, security, and reliability. Upgrade today and experience the power of Windows!
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

export default Wcategories;
