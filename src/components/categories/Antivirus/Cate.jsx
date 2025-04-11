import React, { useEffect } from 'react';
import { useProduct } from '../../../context/ProductContext';
import './Cate.css';
import { useLocalContext } from '../../../context/LocalContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag,faShoppingCart, faCreditCard,faStar, faDownload, faShieldAlt, faCheckCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import WhyChooseUs from '../../WhyChooseUs/WhyChooseUs';
import { useMetadata } from '../../../context/Metadatacontext';
import Brandfeature from '../../productPage/Brandfeature';


const Cate = () => {
  const { products, selectedAntiv, cart, setCart, setProductToShow } = useProduct();
  const { webinfo } = useLocalContext();
  const categoryMetadata = useMetadata();
  const navigate = useNavigate();
  const selectedProducts = products[selectedAntiv] || [];
  const { title, bannerImg, backgroundImage,logo, whyChoose, features, testimonials } =
    categoryMetadata[selectedAntiv] || { title: '', bannerImg: '' };

    useEffect(() => {
      document.title = `${selectedAntiv} | ${webinfo.name}`;
    }, []);

  if (!selectedProducts.length) {
    return <p className="mid">Currently Not Available, We are Adding Soon!! 🙂</p>;
  }

  const handleNavigation = (value) => {
    setProductToShow(value);
    navigate(`${value.name.toLowerCase().replace(/\s+/g, '-')}`);
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
    <div className={`antiv comp`}>
      {/* Banner Section */}
      <div className="antivBanner">
  <div className="antivBannerContainer">
    {/* Left Section - Text & Support */}
    <div className="antivBannerLeft">
      
      <h2>{title}</h2>
      <p>{features[0]}</p>
      <div className="customersupportbox">
        <h3>24/7 Customer Support</h3>
        <a href={`tel:${webinfo.phonecall}`}>{webinfo.phone}</a>
      </div>
    </div>

    {/* Right Section - Image */}
    <div className="antivBannerRight">
      <img src={bannerImg} alt={title} className="bannerImage" />
      
    </div>
  </div>

 {/* Logo Section */}
 <div className="antivLogoContainer">
    <img src={logo} alt="Logo" className="antivLogo" />
  </div>
 
</div>


    
      {/* Product List */}
      <div className="antivlist">
  {/* Header Section */}
  <div className="antivlisthead">
    <h2> Explore Our Top Antivirus Solutions</h2>
    <p className="antivlistdescription">
      Keep your devices safe with the most advanced antivirus solutions. Get real-time protection, secure browsing, and more!
    </p>
  </div>

  {/* Product Grid */}
  <div className="antivlistmain">
    {selectedProducts.map((product) => (
      <div className="antivlistitem" key={product.id}>
        {/* Product Image */}
        <div className="antivlistitemtop" onClick={() => handleNavigation(product)}>
          <img src={product.img} alt={product.name} className="product-image" />
        </div>

        {/* Product Details */}
        <div className="antivlistiteminfo">
          <div className="antiviteminfohead">
            <h3 onClick={() => handleNavigation(product)}>{product.name}</h3>
            <p className="product-price">${product.price}</p>
          </div>

          {/* Action Buttons */}
          <div className="antiviteminfobtn">
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
  <h2>🔹 Quick & Easy Steps to Get Your Antivirus</h2>
  <ul>
    <li>
      <FontAwesomeIcon icon={faShoppingCart} className="step-icon" />
      <strong>Step 1:</strong> Choose the best antivirus solution from our trusted collection.
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
      <strong>Step 5:</strong> Install the antivirus and activate using your key.
    </li>
    <li>
      <FontAwesomeIcon icon={faCheckCircle} className="step-icon" />
      <strong>Step 6:</strong> Enjoy 24/7 cybersecurity protection!
    </li>
  </ul>
</div>

<Brandfeature />

      {/* Bottom Section */}
<div className="bottom-section">
  {/* Why Choose Us */}
  <div className="why-choose">
    <h2>🔹 Why Trust {title} for Your Security?</h2>
    <p>
      {whyChoose ||
        'Our advanced antivirus solutions offer unbeatable protection, ensuring your digital safety at all times.'}
    </p>
  </div>

  {/* Key Features */}
  {/* <div className="features">
    <h2>🚀 Key Benefits of Our Antivirus</h2>
    <ul>
      {features?.map((feature, index) => (
        <li key={index}>
          <FontAwesomeIcon icon={faCheckCircle} className="feature-icon" /> {feature}
        </li>
      ))}
    </ul>
  </div> */}

  {/* Testimonials */}
  {/* <div className="customer-testimonials">
    <h2>🌟 What Our Users Say</h2>
    {testimonials?.map((testimonial, index) => (
      <div className="testimonial-card" key={index}>
        <FontAwesomeIcon icon={faStar} className="testimonial-icon" />
        <p>
          "{testimonial.quote}" - <strong>{testimonial.author}</strong>
        </p>
      </div>
    ))}
  </div> */}

</div>

  </div>
    <WhyChooseUs/>
    </>
  );
};

export default Cate;
