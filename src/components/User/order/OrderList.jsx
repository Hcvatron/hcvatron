import React, { useState, useEffect } from 'react';
import './OrderList.css';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import ViewOrderModal from './ViewOrderModal';

const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isUserLoggedIn, fetchUser } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isUserLoggedIn?.uid) {
      fetchUser(isUserLoggedIn.uid);
    }
  }, [isUserLoggedIn, fetchUser]);

  const [orders, setOrders] = useState(isUserLoggedIn?.orders || []);

  if (!orders || orders.length === 0) {
    return <p>No orders available.</p>;
  }

  return (
    <div className="order-list-container" style={{ marginTop: location.pathname === '/user/orders' ? (window.innerWidth <= 768 ? '8rem' : '14rem') : '0rem'}}>
      <h2>Your Orders</h2>
      <div className="order-list-main" style={{height: location.pathname === "/user/orders" ?  '60rem':""}}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </div>
              <div className="order-details">
                <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
                <p><strong>Amount:</strong> ${order.grandTotal}</p>
              </div>
              <div className="order-address">
                <h4>Delivery Address:</h4>
                <p>{order.billingInfo?.street}, {order.billingInfo?.city}, {order.billingInfo?.state} {order.billingInfo?.zip}, {order.billingInfo?.country}</p>
              </div>
              <div className="order-buttons">
                <button className="view-btn" onClick={() => setSelectedOrder(order)}>View Order</button>
                <button className="track-btn">Track Order</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders">
            <p>No orders found!</p>
            <button onClick={() => navigate('/categories')}>Order Now</button>
          </div>
        )}
      </div>
      {selectedOrder && <ViewOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
};

export default OrderList;
