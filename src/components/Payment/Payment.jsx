import React, { useState, useEffect } from "react";
import "./Payment.css";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { useProduct } from "../../context/ProductContext";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, collection, addDoc, serverTimestamp,updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { isUserLoggedIn,fetchUser } = useUserContext();
  const { cart, setCart } = useProduct();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isUserLoggedIn?.uid) return;

      try {
        const userRef = doc(db, "antivirus_user", isUserLoggedIn.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().address) {
          setAddresses(userSnap.data().address);
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to load addresses.");
      }
    };

    fetchAddresses();
  }, [isUserLoggedIn]);

  useEffect(() => {
    if (selectedAddress) {
      const address = addresses.find((addr) => addr.title === selectedAddress);
      if (address) {
        setBillingInfo({
          fullName: isUserLoggedIn?.name || "Guest",
          address: address.street,
          city: address.city,
          state: address.state,
          zip: address.postcode,
        });
      }
    }
  }, [selectedAddress, addresses, isUserLoggedIn]);

  const calculateOriginalTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price || 0), 0).toFixed(2);
  };

  const calculateDiscountedTotal = () => {
    const originalTotal = parseFloat(calculateOriginalTotal());
    const discountAmount = (originalTotal * 0) / 100; // Adjust discount logic if needed
    return (originalTotal - discountAmount).toFixed(2);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!isUserLoggedIn?.uid) {
      toast.error("You must be logged in to complete the payment.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    setIsProcessing(true);

    const orderData = {
      userId: isUserLoggedIn.uid,
      userName: isUserLoggedIn.name || "Guest",
      userEmail: isUserLoggedIn.email || "N/A",
      items: cart,
      subtotal: calculateOriginalTotal(),
      discount: 0, // Add discount logic if needed
      grandTotal: calculateDiscountedTotal(),
      paymentMethod: selectedPaymentMethod,
      billingInfo,
      timestamp: serverTimestamp(),
      status: "Processing",
    };

    try {
      const orderRef = collection(db, "antivirus_orders");
      const orderDoc = await addDoc(orderRef, orderData);
    const orderId = orderDoc.id;

      // 2️⃣ Fetch the exact timestamp after the order is created
      const orderSnapshot = await getDoc(orderDoc);
      const finalTimestamp = orderSnapshot.data()?.timestamp || new Date();
  
      // 3️⃣ Update user document with the full order details
      const userRef = doc(db, "antivirus_user", isUserLoggedIn.uid);
      await updateDoc(userRef, {
        orders: arrayUnion({
          orderId,
          ...orderData,
          timestamp: finalTimestamp, // Store the actual timestamp here
        }),
      });
      fetchUser(isUserLoggedIn.uid);

      setCart([]); 
      toast.success("Order placed successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardNumberChange = (event) => {
    const number = event.target.value;
    setCardNumber(number);
    const cardTypes = {
      visa: /^4/,
      mastercard: /^5[1-5]/,
      discover: /^6/,
      jcb: /^35/,
    };
    for (const [type, pattern] of Object.entries(cardTypes)) {
      if (pattern.test(number)) {
        setCardType(type);
        return;
      }
    }
    setCardType("unknown");
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <h1 className="payment-title">Complete Your Payment</h1>
        <p className="payment-subtitle">Secure and easy payment gateway for your transactions.</p>
      </div>
      <div className="payment-grid">
        <div className="billing-section">
          <h2>Billing Information</h2>
          <form>
            <div className="form-group">
              <label>Use Saved Address</label>
              <select value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)}>
                <option value="">Select an address</option>
                {addresses.map((addr) => (
                  <option key={addr.title} value={addr.title}>
                    {addr.title} - {addr.street}, {addr.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" value={billingInfo.fullName} onChange={(e) => setBillingInfo({ ...billingInfo, fullName: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" value={billingInfo.address} readOnly />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" value={billingInfo.city} readOnly />
              </div>
              <div className="form-group">
                <label>State</label>
                <input type="text" value={billingInfo.state} readOnly />
              </div>
              <div className="form-group">
                <label>ZIP Code</label>
                <input type="text" value={billingInfo.zip} readOnly />
              </div>
            </div>
          </form>
        </div>

        <div className="payment-section">
          <h2>Payment Details</h2>
          <form onSubmit={handlePaymentSubmit}>
            <div className="form-group">
              <label>Payment Method</label>
              <select value={selectedPaymentMethod} onChange={(e) => setSelectedPaymentMethod(e.target.value)}>
                <option value="credit-card">Credit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            {selectedPaymentMethod === "credit-card" && (
              <>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" value={cardNumber} onChange={handleCardNumberChange} placeholder="1234 5678 9012 3456" required />
                  {cardType && <p className="card-type">{cardType.toUpperCase()}</p>}
                </div>
              </>
            )}
            <button type="submit" className={`submit-button ${isProcessing ? "processing" : ""}`} disabled={isProcessing}>
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
