import React, { useEffect } from "react";
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import TopSeller from "./TopSeller/TopSeller";
import { useMetadata } from "../../../context/Metadatacontext";

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
          marginTop: location.pathname === '/categories/antivirus' ? window.innerWidth <= 768 ? "5rem" :  '12rem' : '0rem',
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
