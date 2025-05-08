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
import OrderList from "../order/OrderList";

const Profile = () => {
  const navigate = useNavigate();
  const {isUserLoggedIn, fetchUser} = useUserContext();
  const [addAddress, setAddAddress] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  if(!isUserLoggedIn){
    navigate('/user/login');
  }

  useEffect(()=>{
    if (isUserLoggedIn?.uid) {
      fetchUser(isUserLoggedIn.uid);
    }
  },[]);

  useEffect(() => {
    setAddresses(isUserLoggedIn?.address || []);
  }, [isUserLoggedIn]);

  const [user, setUser] = useState({
    firstName: isUserLoggedIn.firstName,
    lastName: isUserLoggedIn.lastName,
    email: isUserLoggedIn.email,
    phone: isUserLoggedIn.phone,
    
  });

  const [addresses, setAddresses] = useState([
    ...isUserLoggedIn.address
  ]);
  

  const [orders, setOrders] = useState(
    isUserLoggedIn.orders || []
  );
  
  const [editMode, setEditMode] = useState(false);
  const [editUser, setEditUser] = useState(user);

  const handleEditUser = async () => {
    try {
      const userRef = doc(db, "_user", isUserLoggedIn.uid);
  
      await updateDoc(userRef, {
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        email: editUser.email,
        phone: editUser.phone,
      });
  
      toast.success("Profile updated successfully! ✅");
      setUser(editUser);
      setEditMode(false);
      fetchUser(isUserLoggedIn.uid);
    } catch (error) {
      console.error("Error updating user profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };
  

  // Delete Address
  const deleteAddress = async (addtitle) =>{
    console.log('delete address');
    try {
      const userRef = doc(db, "_user", isUserLoggedIn.uid);
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

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';
  
    const cleaned = phone.replace(/\D/g, '');
  
    // India (+91)
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
    }
  
    // US (+1)
    if (cleaned.startsWith('1') && cleaned.length === 11) {
      return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
  
    // Fallback for local 10-digit number
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
  
    return phone;
  };
  
  

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
                value={editUser.firstName}
                onChange={(e) => setEditUser({ ...editUser, firstName: e.target.value })}
              />
              <input
                type="text"
                value={editUser.lastName}
                onChange={(e) => setEditUser({ ...editUser, lastName: e.target.value })}
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
              <p><strong>Phone:</strong> {formatPhoneNumber(user.phone)}</p>
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
          <p><strong>City / State:</strong> {address.city}, {address.state}</p>
          <p><strong>Country:</strong> {address.country}</p>
          <p><strong>Zip:</strong> {address.postcode}</p>
          <p><strong>Phone:</strong> {formatPhoneNumber(address.phone)}</p>
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
   <OrderList />

    {addAddress && <AddAddress setAddAddress={()=>setAddAddress()} />}
    {selectedOrder && <ViewOrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}

    </div>
  );
};

export default Profile;
