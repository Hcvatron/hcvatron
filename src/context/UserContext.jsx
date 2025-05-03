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
        <UserContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, fetchUser}}>
            {children}
        </UserContext.Provider>
    )
}


export const useUserContext = () => useContext(UserContext);