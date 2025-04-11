import React,{useEffect} from 'react'
import "../Categories.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useProduct } from "../../../context/ProductContext";
import Disclaimer from "../../T&C/Disclaimer";
import { useLocalContext } from "../../../context/LocalContext";
import { useMetadata } from "../../../context/Metadatacontext";

const Rcategories = () => {
    const navigate = useNavigate();
    const { webinfo } = useLocalContext();
    const location = useLocation();
    const { setSelectedAntiv, setCatenav } = useProduct();
    const { categoryMetadata } = useMetadata();
  
    useEffect(() => {
      document.title = `Brands | ${webinfo.name}`;
    }, []);
  
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
            marginTop: location.pathname === '/categories/router' ? '12rem' : '0rem',
            height: location.pathname === '/categories/router' ? '70vh' : ''
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