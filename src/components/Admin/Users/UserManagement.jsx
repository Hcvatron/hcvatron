import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
  ]);

  // Function to handle user status change
  const handleStatusChange = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
    ));
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
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
              <td>
                <button onClick={() => handleStatusChange(user.id)}>{user.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
                <button>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-user-btn">Add User</button>
    </div>
  );
};

export default UserManagement;
