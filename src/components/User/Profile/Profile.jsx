import React, { useState } from "react";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../context/UserContext";
import { useEffect } from "react";
import AddAddress from "../Address/AddAddress";
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import ViewOrderModal from "../order/ViewOrderModal";

const Profile = () => {
  const navigate = useNavigate();
  const {isUserLoggedIn, fetchUser} = useUserContext();
  const [addAddress, setAddAddress] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);



  if(!isUserLoggedIn){
    navigate('/login');
  }



  useEffect(()=>{
    window.scrollTo(0,0);
    if (isUserLoggedIn?.uid) {
      fetchUser(isUserLoggedIn.uid);
      console.log("--->",isUserLoggedIn);
    }
  },[]);

  useEffect(() => {
    setAddresses(isUserLoggedIn?.address || []);
  }, [isUserLoggedIn]);

  const [user, setUser] = useState({
    firstName: isUserLoggedIn.firstName,
    lastName: isUserLoggedIn.lastName,
    email: isUserLoggedIn.email,
    
  });

  const [addresses, setAddresses] = useState([
    ...isUserLoggedIn.address
  ]);
  

  const [orders, setOrders] = useState(
    isUserLoggedIn.orders || []
  );
  
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState(user);

  const handleEditUser = () => {
    setUser(editUser);
    setEditMode(false);
  };

  // Delete Address
  const deleteAddress = async (addtitle) =>{
    console.log('delete address');
    try {
      const userRef = doc(db, "antivirus_user", isUserLoggedIn.uid);
      const userSnapshot = await getDoc(userRef);
  
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const updatedAddresses = userData.address.filter(
          (addr) => addr.title.toLowerCase() !== addtitle.toLowerCase()
        );
  
        await updateDoc(userRef, { address: updatedAddresses });
  
        toast.success("Address deleted successfully! ✅");
        fetchUser(isUserLoggedIn.uid); 
      } else {
        toast.error("User data not found.");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address. Please try again.");
    }
  }

  return (
    <div className={`profile-container`}>
      {/* Top Section */}
      <div className="top-section">
        {/* User Details - Left */}
        <div className="profile-section user-details">
          <h2>Profile Details</h2>
          {editMode ? (
            <div className="edit-profile">
              <input
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
              />
              <input
                type="email"
                value={editUser.email}
                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              />
              <input
                type="text"
                value={editUser.phone}
                onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
              />
              <button onClick={handleEditUser}>Save</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              {/* <p><strong>Phone:</strong> {user.phone}</p> */}
              <button onClick={() => setEditMode(true)}>Edit</button>
            </div>
          )}
        </div>

        {/* Address List - Right */}
        <div className="profile-section address-list">
  <h2>Address List</h2>
  <div className="address-list-main">
    {addresses.length > 0 ? (
      addresses.map((address) => (
        <div key={address.id} className="address-card">
          <h3>{address.title}</h3>
          <p><strong>Street:</strong> {address.street}</p>
          <p><strong>Suburb:</strong> {address.suburb}</p>
          <p><strong>City:</strong> {address.city}, {address.state} {address.postcode}</p>
          <p><strong>Country:</strong> {address.country}</p>
          <div className="address-actions">
            <button onClick={() => alert(`Editing Address: ${address.title}`)}>Edit</button>
            <button onClick={() => deleteAddress(address.title)}>Delete</button>
          </div>
        </div>
      ))
      
    ) : (
      <div className="no-address">
        <p>No addresses found!</p>
       
      </div>
    )}
  </div>
  <button onClick={() => setAddAddress(true)}>Add New Address</button>
</div>

</div>

      {/* Order List - Bottom */}
      <div className="profile-section order-list">
  <h2>Recent Orders</h2>
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
    {orders.length > 0 &&  <div className="btn" style={{marginTop:'20px'}}>
         
          <button onClick={()=>navigate('/user/orders')}> View All Orders</button>
        </div>
    }
</div>

    {addAddress && <AddAddress setAddAddress={()=>setAddAddress()} />}
    {selectedOrder && <ViewOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

    </div>
  );
};

export default Profile;
