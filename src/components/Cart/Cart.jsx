import React, { useState, useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLocalContext } from "../../context/LocalContext";
import { useUserContext } from "../../context/UserContext";
import "./Cart.css";
import BestSeller from "../categories/Antivirus/BestSeller/BestSeller";

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
      isUserLoggedIn ? navigate("/payment") : navigate("/user/login");
      if (!isUserLoggedIn) toast.warning("Kindly login to proceed!");
    } else {
      toast.warning("Your cart is empty!");
    }
  };

  return (
    <>
    <div className="cart-container">
      <h1 className="cart-heading">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="cart-empty">
          <img src="https://img.icons8.com/ios/100/shopping-cart--v1.png" alt="Empty" />
          <p>Your cart is currently empty.</p>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.img} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>${item.price}</p>
                  <button onClick={() => handleRemove(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: <strong>${calculateOriginalTotal()}</strong></p>
            <p>Discount: <strong>{discount > 0 ? `${discount}%` : "None"}</strong></p>

            <div className="coupon-block">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Apply</button>
            </div>

            <p className="total">Total: <strong>${calculateDiscountedTotal()}</strong></p>

            <button className="checkout-btn" onClick={handleProceedToPay}>
              Proceed to Checkout
            </button>

            <div className="payment-logos">
              <h5>Accepted Payments</h5>
              <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" />
              <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" />
              <img src="https://img.icons8.com/color/48/paypal.png" alt="PayPal" />
            </div>
          </div>
        </div>
      )}
    </div>
    <BestSeller />
    </>
  );
};

export default Cart;
