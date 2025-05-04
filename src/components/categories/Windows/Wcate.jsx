import React, { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
// import "./Wcate.css";
import { useLocalContext } from "../../../context/LocalContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
  faCreditCard,
  faStar,
  faDownload,
  faShieldAlt,
  faCheckCircle,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import WhyChooseUs from "../../WhyChooseUs/WhyChooseUs";
import { useCatedata } from "../../../context/CategorydataContext";

const Wcate = () => {
  const { products, selectedAntiv, cart, setCart, setProductToShow } = useProduct();
  const { webinfo } = useLocalContext();
  const categoryData = useCatedata();
  const navigate = useNavigate();

  const selectedProducts = products[selectedAntiv] || [];
  const { title, bannerImg, backgroundImage, logo, whyChoose, features, testimonials } =
    categoryData[selectedAntiv] || { title: "", bannerImg: "" };

  useEffect(() => {
    document.title = `${selectedAntiv} | ${webinfo.name}`;
  }, [selectedAntiv, webinfo.name]);

  if (!selectedProducts.length) {
    return <p className="mid">Currently Not Available, We are Adding Soon!! 🙂</p>;
  }

  const handleNavigation = (value) => {
    setProductToShow(value);
    navigate(`${value.name.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleCart = (item) => {
    if (!cart.some((bagItem) => bagItem.id === item.id)) {
      setCart((prevBag) => [...prevBag, item]);
      toast.success(`${item.name} Added to Cart`);
    } else {
      toast.warning(`${item.name} is already in the Cart`);
    }
  };

  return (
    <>
      <div className="windows comp">
        {/* Banner Section */}
        {/* <div className="windowsBanner">
          <div className="windowsBannerContainer">
           
            <div className="windowsBannerLeft">
              <h2>{title}</h2>
              <p>{features?.[0]}</p>
              <div className="customersupportbox">
                <h3>24/7 Customer Support</h3>
                <a href={`tel:${webinfo.phonecall}`}>{webinfo.phone}</a>
              </div>
            </div>

        
            <div className="windowsBannerRight">
              <img src={bannerImg} alt={title} className="bannerImage" />
            </div>
          </div>

        
          <div className="windowsLogoContainer">
            <img src={logo} alt="Logo" className="windowsLogo" />
          </div>
        </div> */}

        {/* Product List */}
        <div className="windowslist">
          <div className="windowslisthead">
            <h2>Explore Our Windows OS Collection</h2>
            <p className="windowslistdescription">
              Get genuine Windows operating systems for seamless performance and security.
            </p>
          </div>

          <div className="windowslistmain">
            {selectedProducts.map((product) => (
              <div className="windowslistitem" key={product.id}>
                <div className="windowslistitemtop" onClick={() => handleNavigation(product)}>
                  <img src={product.img} alt={product.name} className="product-image" />
                </div>

                <div className="windowslistiteminfo">
                  <div className="windowsiteminfohead">
                    <h3 onClick={() => handleNavigation(product)}>{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                  </div>

                  <div className="windowsiteminfobtn">
                    {cart.some((prev) => prev.id === product.id) ? (
                      <button className="added-to-cart">
                        <span>✔ Added</span>
                      </button>
                    ) : (
                      <button className="add-to-cart" onClick={() => handleCart(product)}>
                        <FontAwesomeIcon icon={faShoppingBag} size="1x" /> <span>Add to Cart</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Buy and Install Section */}
        <div className="how-to-section">
          <h2>🔸 Quick & Easy Steps to Get Your Windows OS</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faShoppingCart} className="step-icon" />
              <strong>Step 1:</strong> Choose your preferred Windows OS version.
            </li>
            <li>
              <FontAwesomeIcon icon={faCreditCard} className="step-icon" />
              <strong>Step 2:</strong> Click "Add to Cart" and proceed to checkout.
            </li>
            <li>
              <FontAwesomeIcon icon={faLock} className="step-icon" />
              <strong>Step 3:</strong> Securely complete your payment.
            </li>
            <li>
              <FontAwesomeIcon icon={faDownload} className="step-icon" />
              <strong>Step 4:</strong> Receive an email with your download link & activation key.
            </li>
            <li>
              <FontAwesomeIcon icon={faShieldAlt} className="step-icon" />
              <strong>Step 5:</strong> Install the Windows OS and activate using your key.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="step-icon" />
              <strong>Step 6:</strong> Enjoy a seamless Windows experience!
            </li>
          </ul>
        </div>

        {/* <Brandfeature /> */}

        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="why-choose">
            <h2>🔸 Why Buy Windows OS from Us?</h2>
            <p>
              {whyChoose ||
                "We offer 100% genuine Windows licenses with instant delivery and dedicated support."}
            </p>
          </div>
        </div>
      </div>
      <WhyChooseUs />
    </>
  );
};

export default Wcate;
