import React, { useEffect } from "react";
import "./productPage.css";
import { useProduct } from "../../context/ProductContext";
import { toast } from "react-toastify";
import Brandfeature from "./Brandfeature";

const ProductPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { productToShow, cart, setCart } = useProduct();

  const handleCart = (item) => {
    if (!cart.some((bagItem) => bagItem.id === item.id)) {
      setCart((prevBag) => [...prevBag, item]);
      toast.success(`${item.name} Added to Cart`);
    } else {
      toast.warning(`${item.name} is already in the Cart`);
    }
  };

  // Extracting specifications, original price, and discounted price from the product object
  const { specifications, originalPrice, price: discountedPrice, desc } = productToShow;

  return (
    <>
      <div className="productPage-container">
        <div className="productPage-grid">
          {/* Product Image Section */}
          <div className="productPage-image">
            <img src={productToShow.img} alt={productToShow.name} />
          </div>

          {/* Product Details Section */}
          <div className="productPage-details">
            <h1 className="productPage-title">{productToShow.name}</h1>
            <p className="productPage-category">Antivirus Software</p>
            <p className="productPage-description">{desc}</p>

            {/* Features */}
            <div className="productPage-features">
              <h3>Key Features:</h3>
              <ul>
                <li>Real-Time Threat Protection</li>
                <li>Secure Browsing and Firewall</li>
                <li>Identity Theft Defense</li>
                <li>Ransomware Protection</li>
              </ul>
            </div>

            {/* Specifications */}
            {specifications && (
              <div className="productPage-specifications">
                <h3>Specifications:</h3>
                <ul>
                  {Object.entries(specifications).map(([key, value]) => (
                    <li key={key}>
                      <span>{key}</span>: {value}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Pricing Section */}
            <div className="productPage-pricing">
              {originalPrice && <p className="original-price">${originalPrice}</p>}
              <p className="discounted-price">${discountedPrice}</p>
              {originalPrice && (
                <span className="discount-badge">
                  Save {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Call-to-Action */}
            <button className="productPage-btn" onClick={() => handleCart(productToShow)}>
              Add to Cart
            </button>

            {/* Additional Information Section */}
            <div className="additional-info">
              <h3>Important Information:</h3>
              <ul>
                <li>
                  After ordering, activation key and download link will be sent to your registered email ID within 2 hours.
                </li>
                <li>
                  Email will be sent only to a valid email ID registered on softbuy.in. Ensure your email is registered before purchasing.
                </li>
                <li>
                  Support numbers will be sent to your registered email along with the activation code in case assistance is required.
                </li>
                <li>
                  Features include: Antivirus, Antispyware, Anti-phishing, Secure browsing, File shredder, Fast and secure payments,
                  Password manager, Social network protection, USB immunizer, Safe files, Web protection, Rescue mode, and a Vulnerability scanner.
                </li>
                <li>Cash on delivery is not available, and this item is non-returnable.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
      <div className="aboutbrandsection">
      <h2>About the Brand</h2>
      </div>
      <Brandfeature />
    </>
  );
};

export default ProductPage;
