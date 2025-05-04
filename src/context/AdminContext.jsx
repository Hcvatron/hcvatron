import { useEffect, createContext, useContext, useState } from "react";
import { db } from "../firebase/firebaseConfig"; // Firebase config
import { collection, getDocs } from "firebase/firestore";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null); // Admin state
  const [selectedBlog, setSelectedBlog] = useState(() =>
    localStorage.getItem("selectedBlog")
      ? JSON.parse(localStorage.getItem("selectedBlog"))
      : null
  );
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching Admin from LocalStorage on component mount
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(storedAdmin); // Set admin from localStorage
    }
    setLoading(false);
  }, []);

  // Function to fetch all users, orders, and blogs
  const getAllUsersOrdersAndBlogs = async () => {
    try {
      // Fetching Users
      const usersRef = collection(db, "_user");
      const userSnapshot = await getDocs(usersRef);
      const allUsers = [];
      userSnapshot.forEach((doc) => {
        const userData = doc.data();
        allUsers.push({
          ...userData,
          id: doc.id,
        });
      });
      setUsers(allUsers);

      // Fetching Orders
      const ordersRef = collection(db, "_orders");
      const orderSnapshot = await getDocs(ordersRef);
      const allOrders = [];
      orderSnapshot.forEach((doc) => {
        const orderData = doc.data();
        allOrders.push({
          ...orderData,
          id: doc.id,
        });
      });
      setOrders(allOrders);

      // Fetching Blogs
      const blogsRef = collection(db, "_blogs");
      const blogSnapshot = await getDocs(blogsRef);
      const allBlogs = [];
      blogSnapshot.forEach((doc) => {
        const blogData = doc.data();
        allBlogs.push({
          ...blogData,
          id: doc.id,
        });
      });
      setBlogs(allBlogs);
    } catch (error) {
      console.error("Error fetching users, orders, and blogs: ", error);
    }
  };

  // Fetch users, orders, and blogs when the admin logs in
  useEffect(() => {
    if (admin) {
      getAllUsersOrdersAndBlogs(); // Fetch data when admin is logged in
    }
  }, [admin]);

  // Save selected blog to localStorage
  useEffect(() => {
    localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
  }, [selectedBlog]);

  // Logout function
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin"); // Remove admin from localStorage
    setUsers([]);
    setOrders([]);
    setBlogs([]);
  };

  // Select Blog function
  const selectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  // Provide the admin state to the context
  if (loading) {
    return null;
  }

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logoutAdmin, selectedBlog, selectBlog, users, orders, blogs,getAllUsersOrdersAndBlogs }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
