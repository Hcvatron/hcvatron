import React, { useState, useEffect } from "react";
import { useAdminContext } from "../../../context/AdminContext";
import OrderModal from "./OrderModal.jsx";
import './Order.css';
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore"; // Import missing getDoc
import { toast } from "react-toastify"; // Import the toast notification function
import { db } from "../../../firebase/firebaseConfig"; // Firestore db instance

const Orders = () => {
  const { orders,getAllData } = useAdminContext();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("");


  // Function to handle changing the status of an order
  const handleStatusChange = async (orderDocId, orderId, newStatus, userId) => {
   

    try {
      // Update the order status in the _orders collection
      const orderRef = doc(db, "_orders", orderDocId);
      await updateDoc(orderRef, {
        status: newStatus,
        timestamp: serverTimestamp(), 
      });

      // Update the status in the corresponding user's order list
      const userRef = doc(db, "_user", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userOrders = userSnap.data().orders || [];
        const updatedUserOrders = userOrders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status: newStatus };
          }
          return order;
        });

        // Update the orders field in the user's document
        await updateDoc(userRef, {
          orders: updatedUserOrders,
          timestamp: serverTimestamp(), 
        });

        await getAllData();

        toast.success("Order status updated successfully!");
      } else {
        toast.error("User not found!");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status.");
    }
  };

  // Function to open the order details modal
  const openModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="admin-orders-container">
      <h1>All Orders</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Status</th>
            <th>Grand Total</th>
            <th>Payment Method</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.userName}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order.id,order.orderId, e.target.value, order.userId) // Pass userId
                  }
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>${order.grandTotal}</td>
              <td>{order.paymentMethod}</td>
              <td>
                <button onClick={() => openModal(order)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderModal show={showModal} close={closeModal} order={selectedOrder} />
      )}
    </div>
  );
};

export default Orders;
