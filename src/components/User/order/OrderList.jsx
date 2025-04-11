import React, { useEffect, useState } from 'react';
import { useUserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import './OrderList.css';
import ViewOrderModal from './ViewOrderModal';

const OrderList = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const {isUserLoggedIn, fetchUser} = useUserContext();
    const navigate = useNavigate();

    useEffect(()=>{
        window.scrollTo(0,0);
        if (isUserLoggedIn?.uid) {
          fetchUser(isUserLoggedIn.uid);
          console.log("--->",isUserLoggedIn);
        }
      },[]);

      
        const [orders, setOrders] = useState(
          isUserLoggedIn.orders || []
        );

        if (!orders || orders.length === 0) {
            return <p>No orders available.</p>;
        }

    return (
        <div className="profile-section order-list order-listm">
        <h2>Your Orders</h2>
        <div className="order-list-main">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-details">
              <div className="order-details">
              <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
      <p><strong>Amount:</strong> ${order.grandTotal}</p>
      <p><strong>Status:</strong> {order.status}</p>
              </div>
              <div className="order-address">
                <h4>Delivery Address:</h4>
                <p>{order.billingInfo?.address}</p>
      <p>{order.billingInfo?.city}, {order.billingInfo?.state} {order.billingInfo?.zip}</p>
              </div>
                 
              </div>
              <div className="order-button">
              <button onClick={() => setSelectedOrder(order)}>View Order</button>
                <button>Track Order</button>
      
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