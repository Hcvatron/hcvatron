import React, { useState, useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalContext } from "../../context/LocalContext";
import { useUserContext } from "../../context/UserContext";

const Cart = () => {
  const { cart, setCart } = useProduct();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  const { webinfo } = useLocalContext();
  const { isUserLoggedIn } = useUserContext();

  useEffect(() => {
    document.title = `Cart | ${webinfo.name}`;
  }, []);

  const validCoupons = {
    SAVE50: 50,
  };

  const handleRemove = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const calculateOriginalTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price || 0), 0)
      .toFixed(2);
  };

  const calculateDiscountedTotal = () => {
    const originalTotal = parseFloat(calculateOriginalTotal());
    const discountAmount = (originalTotal * discount) / 100;
    return (originalTotal - discountAmount).toFixed(2);
  };

  const handleApplyCoupon = () => {
    if (validCoupons[couponCode]) {
      setDiscount(validCoupons[couponCode]);
      toast.success(`Coupon applied! You got ${validCoupons[couponCode]}% off.`);
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleProceedToPay = () => {
    if (cart.length > 0) {
      if(isUserLoggedIn){
        navigate("/payment");
      }else{
          navigate('/user/login')
          toast.warning("Kindly login to proceed!!");
      }
     
    } else {
      toast.warning("Can't Proceed! Cart Is Empty");
    }
  };

  return (
    <div className="cart">
      <h1 className="cart-title">Your Cart ({cart.length} items)</h1>
      <div className="cart-layout">
        <div className="cart-items-container">
          {cart.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="cart-item-info">
                      <img src={item.img} alt={item.name} />
                      <span>{item.name}</span>
                    </td>
                    <td>${item.price}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="remove-item-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <p>
            Subtotal: <span>${calculateOriginalTotal()}</span>
          </p>
          <p>
            Discount: <span>{discount > 0 ? `${discount}%` : "$0.00"}</span>
          </p>
          <p className="final-total">
            Grand Total: <span>${calculateDiscountedTotal()}</span>
          </p>
          <button className="proceed-btn" onClick={handleProceedToPay}>
            Proceed to Checkout
          </button>
          <div className="payment-partners">
            <h3>Accepted Payments</h3>
            <div className="partner-icons">
              <img src="https://img.icons8.com/color/50/visa.png" alt="Visa" />
              <img
                src="https://img.icons8.com/color/50/mastercard.png"
                alt="Mastercard"
              />
              <img
                src="https://img.icons8.com/color/50/paypal.png"
                alt="Paypal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
