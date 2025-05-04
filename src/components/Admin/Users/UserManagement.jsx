import React, { useState, useEffect } from 'react';
import './UserManagement.css';
 
const UserManagement = ({users}) => {

  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Function to handle user status change
  const handleStatusChange = (userId) => {
    
  };

  // Function to open the modal for viewing user details
  const openModal = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="user-management-container">
      <h2>User Management</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                {/* <button onClick={() => handleStatusChange(user.id)}>
                  {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                </button> */}
                <button onClick={() => openModal(user)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add User Button */}
      {/* <button className="add-user-btn">Add User</button> */}

      {/* User Details Modal */}
      {selectedUser && showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>×</button>
            <h2>User Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Status:</strong> {selectedUser.status}</p>

            <h4>Orders:</h4>
            {selectedUser.orders.map(order => (
              <div key={order.orderId}>
                <p><strong>Order ID:</strong> {order.orderId}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Total:</strong> ${order.grandTotal}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>{item.name} - ${item.price}</li>
                  ))}
                </ul>
                <p><strong>Shipping Address:</strong></p>
                <p>{order.billingInfo.fullName}, {order.billingInfo.street}, {order.billingInfo.city}, {order.billingInfo.state}, {order.billingInfo.zip}, {order.billingInfo.country}</p>
              </div>
            ))}

            <h4>Addresses:</h4>
            {selectedUser.address.map((addr, index) => (
              <div key={index}>
                <p><strong>{addr.title}:</strong> {addr.street}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
