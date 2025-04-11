import React from "react";
import "./ViewOrderModal.css";
import { useNavigate } from "react-router-dom";

const ViewOrderModal = ({ order, onClose }) => {
    const navigate = useNavigate();
  if (!order) return null;

  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Details</h2>
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Order Summary */}
        <div className="order-summary">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
          <p><strong>Total Amount:</strong> ${order.grandTotal}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>

        {/* Billing Information */}
        <div className="billing-info">
          <h3>Billing Information</h3>
          <p><strong>Name:</strong> {order.billingInfo?.fullName}</p>
          <p><strong>Address:</strong> {order.billingInfo?.address}, {order.billingInfo?.city}, {order.billingInfo?.state} {order.billingInfo?.zip}</p>
        </div>

        {/* Purchased Items */}
        <div className="order-items">
          <h3>Items Purchased</h3>
          {order.items && order.items.length > 0 ? (
            <ul>
              {order.items.map((item, index) => (
                <li key={index} className="order-item">
                   <a href onClick={()=>navigate(item.route)}> <div className="orderitemmain">
                    <img src={item.img} alt="" />
                    <strong>{item.name}</strong> <br />
                    </div>
                    </a>
                  
                  <p>Your Price: {item.discountedPrice}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found in this order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
