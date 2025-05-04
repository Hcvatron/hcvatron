import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { useProduct } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc, collection, addDoc, updateDoc, serverTimestamp, arrayUnion, runTransaction } from "firebase/firestore"; // 
import "./Payment.css";

const Payment = () => {
  const { isUserLoggedIn, fetchUser } = useUserContext();
  const { cart, setCart } = useProduct();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isUserLoggedIn?.uid) return;

      try {
        const userRef = doc(db, "_user", isUserLoggedIn.uid);
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
          fullName: isUserLoggedIn?.firstName + " " + isUserLoggedIn?.lastName || "Guest",
          street: address.street,
          city: address.city,
          state: address.state,
          zip: address.postcode,
          country: address.country,
          phone: address.phone || "Not Available",
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
  
    // Generate new Order ID
    let newOrderId = "";
    try {
      const orderIdRef = doc(db, "order_id_counter", "counter");
  
      // Using Firestore transaction to atomically increment the order ID
      await runTransaction(db, async (transaction) => {
        const orderIdDoc = await transaction.get(orderIdRef);
  
        if (orderIdDoc.exists()) {
          const lastOrderId = orderIdDoc.data().lastOrderId;
          newOrderId = `OD2025${lastOrderId + 1}`; // Generate new ID based on the last one
  
          // Update the counter atomically
          transaction.update(orderIdRef, { lastOrderId: lastOrderId + 1 });
        } else {
          newOrderId = "OD20250001";
          transaction.set(orderIdRef, { lastOrderId: 1 });
        }
      });
    } catch (error) {
      console.error("Error generating order ID:", error);
      toast.error("Failed to generate order ID.");
      return;
    }
  
    const timestamp = new Date(); // Use current date as timestamp
  
    const orderData = {
      orderId: newOrderId,
      userId: isUserLoggedIn.uid,
      userName: isUserLoggedIn.firstName + " " + isUserLoggedIn.lastName || "Guest",
      userEmail: isUserLoggedIn.email || "N/A",
      items: cart,
      subtotal: calculateOriginalTotal(),
      discount: 0, // Add discount logic if needed
      grandTotal: calculateDiscountedTotal(),
      paymentMethod: selectedPaymentMethod,
      billingInfo,
      timestamp: timestamp, // Directly set the timestamp here
      status: "Processing",
    };
  
    try {
      // Create the order in the "_orders" collection
      const orderRef = collection(db, "_orders");
      const orderDoc = await addDoc(orderRef, orderData);
  
      const userRef = doc(db, "_user", isUserLoggedIn.uid);
  
      // Fetch current user's orders
      const userSnap = await getDoc(userRef);
      const currentOrders = userSnap.exists() ? userSnap.data().orders || [] : [];
  
      // Add the new order data to the current user's orders
      const updatedOrders = [...currentOrders, { ...orderData, orderId: newOrderId, timestamp }];
  
      // Update the user's orders array using set() to avoid arrayUnion()
      await setDoc(userRef, { orders: updatedOrders }, { merge: true });
  
      fetchUser(isUserLoggedIn.uid); // Refresh user data
      setCart([]); // Empty the cart after successful order placement
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
              <label>Street Address</label>
              <input type="text" value={billingInfo.street} readOnly />
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
              <div className="form-group">
                <label>Country</label>
                <input type="text" value={billingInfo.country} readOnly />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" value={billingInfo.phone} onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })} />
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
