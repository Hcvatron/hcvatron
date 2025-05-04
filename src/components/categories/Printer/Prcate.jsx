import React, { useEffect } from "react";
import { useProduct } from "../../../context/ProductContext";
import "./Prcate.css";
import { useLocalContext } from "../../../context/LocalContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faShoppingCart,
  faCreditCard,
  faBox,
  faTruck,
  faCheckCircle,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import WhyChooseUs from "../../WhyChooseUs/WhyChooseUs";
import Brandfeature from "../../productPage/Brandfeature";
import { useCatedata } from "../../../context/CategorydataContext";

const Prcate = () => {
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
      <div className="printer comp">
        {/* Banner Section */}
        {/* <div className="printerBanner">
          <div className="printerBannerContainer">
           
            <div className="printerBannerLeft">
              <h2>{title}</h2>
              <p>{features?.[0]}</p>
              <div className="customersupportbox">
                <h3>24/7 Customer Support</h3>
                <a href={`tel:${webinfo.phonecall}`}>{webinfo.phone}</a>
              </div>
            </div>

            <div className="printerBannerRight">
              <img src={bannerImg} alt={title} className="bannerImage" />
            </div>
          </div>

          <div className="printerLogoContainer">
            <img src={logo} alt="Logo" className="printerLogo" />
          </div>
        </div> */}

        {/* Product List */}
        <div className="printerlist">
          <div className="printerlisthead">
            <h2>Explore Our Printer Collection</h2>
            <p className="printerlistdescription">
              Find the best printers for home and office use. Choose from HP, Canon, and Epson models.
            </p>
          </div>

          <div className="printerlistmain">
            {selectedProducts.map((product) => (
              <div className="printerlistitem" key={product.id}>
                <div className="printerlistitemtop" onClick={() => handleNavigation(product)}>
                  <img src={product.img} alt={product.name} className="product-image" />
                </div>

                <div className="printerlistiteminfo">
                  <div className="printeriteminfohead">
                    <h3 onClick={() => handleNavigation(product)}>{product.name}</h3>
                    <p className="product-price">${product.price}</p>
                  </div>

                  <div className="printeriteminfobtn">
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

        {/* How to Buy a Printer Section */}
        <div className="how-to-section">
          <h2>🔸 Easy Steps to Get Your Printer</h2>
          <ul>
            <li>
              <FontAwesomeIcon icon={faShoppingCart} className="step-icon" />
              <strong>Step 1:</strong> Choose the printer that suits your needs.
            </li>
            <li>
              <FontAwesomeIcon icon={faCreditCard} className="step-icon" />
              <strong>Step 2:</strong> Click "Add to Cart" and proceed to checkout.
            </li>
            <li>
              <FontAwesomeIcon icon={faBox} className="step-icon" />
              <strong>Step 3:</strong> Your order is processed and prepared for shipment.
            </li>
            <li>
              <FontAwesomeIcon icon={faTruck} className="step-icon" />
              <strong>Step 4:</strong> Fast and secure shipping to your location.
            </li>
            <li>
              <FontAwesomeIcon icon={faCheckCircle} className="step-icon" />
              <strong>Step 5:</strong> Set up your printer and start printing!
            </li>
          </ul>
        </div>

        {/* <Brandfeature /> */}

        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="why-choose">
            <h2>🔸 Why Buy Printers from Us?</h2>
            <p>
              {whyChoose ||
                "We offer the best selection of HP, Canon, and Epson printers with competitive pricing and expert support."}
            </p>
          </div>
        </div>
      </div>
      <WhyChooseUs />
    </>
  );
};

export default Prcate;
