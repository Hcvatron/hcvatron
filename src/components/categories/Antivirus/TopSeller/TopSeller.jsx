import React, { useEffect } from 'react';
// import './TopSeller.css';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { useProduct } from '../../../../context/ProductContext';
import WhyChooseUs from '../../../WhyChooseUs/WhyChooseUs';
import { useLocalContext } from '../../../../context/LocalContext';

const TopSeller = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {webinfo} = useLocalContext();
  const { products, cart, setCart, setProductToShow } = useProduct();

  useEffect(() => {
    // Automatically scroll to the top of the page when the component loads
    window.scrollTo(0, 0);
    document.title = `Best Seller | ${webinfo.name}`;
  }, []);

  // Filter only "top-seller" products
  const topSellerProducts = Object.keys(products).flatMap((category) =>
    products[category].filter((product) => product.category && product.category.includes('top-rated'))
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
      toast.success(`${item.name} Added to Cart. Enjoy secure and reliable protection!`);
    } else {
      toast.warning(`${item.name} is already in the Cart. Keep exploring for more options!`);
    }
  };

  return (
    <>
    <div
      className="products-container"
      style={{
        marginTop: location.pathname === '/top-rated' ? window.innerWidth <= 768 ? "4rem" :  '10rem' : '0rem',
      }}
    >
      <div className="products-header">
        <h1>Top Rated Products</h1>
        <p>
        Explore our most dependable and well-regarded products, which have been hand-selected by our experts and are adored by customers around! These devices are loaded with state-of-the-art capabilities that provide the ideal balance of security,
privacy as well as device performance.
        </p>
      </div>
      <div className="products-grid">
        {topSellerProducts.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="card-image" onClick={() => handleNavigation(item)}>
              <img src={item.img} alt={item.name} />
              {item.category === 'top-rated' && <span className="badge">Top Rated</span>}
            </div>
            <div className="card-content">
                <div className="card-content-text">
                <h2 onClick={() => handleNavigation(item)}>{item.name}</h2>
              <p className="price">
                ${item.price} 
              </p>
                </div>
                <span className="price-note">(Limited-time offer!)</span>
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
    {location.pathname === '/top-rated' && <WhyChooseUs />}
    </>
  );
};

export default TopSeller;
