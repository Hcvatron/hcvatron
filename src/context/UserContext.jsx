import { updateDoc } from "firebase/firestore";
import {
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    setDoc,
    doc,
    getDoc,
    onSnapshot
  } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";
const { createContext, useState, useEffect, useContext } = require("react");


const UserContext = createContext();


export const UserProvider = ({ children }) => {

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(()=>localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null);

    useEffect(()=>{
            localStorage.setItem('user', JSON.stringify(isUserLoggedIn));
    },[isUserLoggedIn])

    const fetchUser = async (uid) => {
      if (!uid) return;
  
      const userDocRef = doc(db, "_user", uid);
  
      const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
              let userData = { uid, ...docSnap.data() };
  
              // Convert Firestore Timestamps to JavaScript Date Strings
              if (userData.orders) {
                  userData.orders = userData.orders.map(order => ({
                      ...order,
                      timestamp: order.timestamp?.seconds 
                          ? new Date(order.timestamp.seconds * 1000).toISOString() 
                          : order.timestamp // Keep existing format if it's already a string
                  }));
              }
  
              setIsUserLoggedIn(userData);
          } else {
              setIsUserLoggedIn(null);
          }
      });
  
      return unsubscribe;
  };

  const updateActivity = async (status, uid) =>{
    try {
      const userDocRef = doc(db,'_user',uid);
         if(status === "Active"){
            await updateDoc(userDocRef,{
             status: status,
             lastLogin: new Date(),
             timestamp: new Date()
            })
         }else if(status === "InActive"){
          await updateDoc(userDocRef,{
            status: status,
            lastLogout: new Date(),
            timestamp: new Date()
           })
         }else{
          toast.warning("Internal Error")
         }

    } catch (error) {
      console.log("Error while updating activity-->",error);
      toast.error("Error while updating activity");
    }
    
   
  }
  
  const userLogout = () => {
    updateActivity('InActive',isUserLoggedIn.uid)
    setIsUserLoggedIn(null);
    localStorage.removeItem("user");
  };

    
  useEffect(() => {
    let unsubscribe;
  
    const handleFetch = async () => {
      unsubscribe = await fetchUser(isUserLoggedIn.uid);
    };
  
    if (isUserLoggedIn?.uid) {
      handleFetch();
    }
  
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [isUserLoggedIn?.uid]);

    return (
        <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, fetchUser, userLogout,updateActivity }}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext);