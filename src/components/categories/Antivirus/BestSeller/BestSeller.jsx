import React, { useEffect } from 'react';
import './BestSeller.css';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useProduct } from '../../../../context/ProductContext';
import WhyChooseUs from '../../../WhyChooseUs/WhyChooseUs';
import { useLocalContext } from '../../../../context/LocalContext';

const BestSeller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {webinfo} = useLocalContext();
  const { products, cart, setCart, setProductToShow } = useProduct();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Best Seller | ${webinfo.name}`;
  }, []);




  // Filter only "best-seller" products (with safeguard)
  const bestSellerProducts = Object.keys(products).flatMap((category) =>
    products[category].filter((product) => product.category && product.category.includes('best-seller'))
  );

  const handleNavigation = (item) => {
    setProductToShow(item);
    const productName = item.name.toLowerCase();
    navigate(
      `/antivirus/${productName.includes('norton') ? 'norton' : productName.includes('mcafee') ? 'mcafee' : productName.includes('avast') ? 'avast' : 'kaspersky'}/${productName.replace(/\s+/g, '-')}`
    );
  };

  const handleCart = (item) => {
    if (!cart.some((bagItem) => bagItem.id === item.id)) {
      setCart((prevCart) => [...prevCart, item]);
      toast.success(`${item.name} Added to Cart`);
    } else {
      toast.warning(`${item.name} is already in the Cart`);
    }
  };

  return (
    <>
    
    <div
      className="products-container"
      style={{
        marginTop: location.pathname === '/best-sellers' ? '10rem' : '0',
      }}
    >
      <div className="products-header">
        <h1>Best Sellers</h1>
        <p>Explore our most popular products, trusted by thousands of customers worldwide!</p>
      </div>
      <div className="products-grid">
        {bestSellerProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="card-image" onClick={() => handleNavigation(item)}>
              <img src={item.img} alt={item.name} />
            </div>
            <div className="card-content">
                <div className="card-content-text">
                <h2 onClick={() => handleNavigation(item)}>{item.name}</h2>
                <p className="price">${item.price}</p>
                </div>
              <div className="card-buttons">
                <button className="btn buy-now" onClick={() => navigate('/payment')}>
                  Buy Now
                </button>
                <button
                  className={`btn ${cart.some((prev) => prev.id === item.id) ? 'in-cart' : 'add-to-cart'}`}
                  onClick={() => handleCart(item)}
                  disabled={cart.some((prev) => prev.id === item.id)}
                >
                  {cart.some((prev) => prev.id === item.id) ? (
                    'Added to Cart'
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faShoppingBag} />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {location.pathname === '/best-seller' && <WhyChooseUs />}
    </>
  );
};

export default BestSeller;
