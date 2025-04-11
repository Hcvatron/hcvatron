import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";
import AddAddress from './AddAddress';

const AddressList = () => {

    const [addAddress, setAddAddress] = useState(false);
    const {isUserLoggedIn, fetchUser} = useUserContext();

    const navigate = useNavigate();
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
        name: isUserLoggedIn.name,
        email: isUserLoggedIn.email,
        
      });
    
      const [addresses, setAddresses] = useState([
        ...isUserLoggedIn.address
      ]);
      
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
    <div className="profile-section address-list" style={{marginTop:"10rem"}}>
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
     {addAddress && <AddAddress setAddAddress={()=>setAddAddress()} />}
  </div>
  )
}

export default AddressList