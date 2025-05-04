import React from 'react';
import './OrderModal.css';

const OrderModal = ({ show, close, order }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay order-modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={close}>×</button>
        <h2>Order Details</h2>
        <p><strong>Order ID:</strong> {order.orderId}</p>
        <p><strong>User Name:</strong> {order.userName}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
        <p><strong>Total Price:</strong> ${order.grandTotal}</p>

        <h4>Items Ordered:</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span> - ${item.price}
            </li>
          ))}
        </ul>

        <h4>Shipping Address:</h4>
        <p>
          {order.billingInfo.street}, {order.billingInfo.city}, {order.billingInfo.state}, {order.billingInfo.zip}, {order.billingInfo.country}
        </p>

        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default OrderModal;
