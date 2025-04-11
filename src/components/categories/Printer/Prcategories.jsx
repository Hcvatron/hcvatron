import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import { useMetadata } from "../../../context/Metadatacontext";

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
          marginTop: location.pathname === '/categories/printer' ? '12rem' : '0rem',
          height: location.pathname === '/categories/printer' ? '60vh' : ''
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
