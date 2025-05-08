import { useEffect, createContext, useContext, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() =>
    localStorage.getItem("admin") || null
  );
  const [selectedBlog, setSelectedBlog] = useState(() =>
    JSON.parse(localStorage.getItem("selectedBlog") || "null")
  );

  const [users, setUsers] = useState(() =>
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [orders, setOrders] = useState(() =>
    JSON.parse(localStorage.getItem("orders") || "[]")
  );
  const [blogs, setBlogs] = useState(() =>
    JSON.parse(localStorage.getItem("blogs") || "[]")
  );
  const [banners, setBanners] = useState(() =>
    JSON.parse(localStorage.getItem("banners") || "[]")
  );
  const [seoMeta, setSeoMeta] = useState(() =>
    JSON.parse(localStorage.getItem("seoMeta") || "[]")
  );
  const [loading, setLoading] = useState(true);

  // Save selectedBlog to localStorage
  useEffect(() => {
    localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
  }, [selectedBlog]);

  // Sync all key data to localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    localStorage.setItem("banners", JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem("seoMeta", JSON.stringify(seoMeta));
  }, [seoMeta]);

  const fetchUsers = async () => {
    try {
      const usersRef = collection(db, "_user");
      const snapshot = await getDocs(usersRef);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const ref = collection(db, "_orders");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  const fetchBlogs = async () => {
    try {
      const ref = collection(db, "_blogs");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  const fetchBanners = async () => {
    try {
      const ref = collection(db, "banners");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBanners(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  };

  const fetchSeoMeta = async () => {
    try {
      const ref = collection(db, "seo_metadata");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSeoMeta(data);
    } catch (err) {
      console.error("Error fetching SEO metadata:", err);
    }
  };

  const getAllData = async () => {
    await Promise.all([
      fetchUsers(),
      fetchOrders(),
      fetchBlogs(),
      fetchBanners(),
      fetchSeoMeta(),
    ]);
  };

  useEffect(() => {
    if (admin) {
      getAllData().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [admin]);

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
    setUsers([]);
    setOrders([]);
    setBlogs([]);
    setBanners([]);
    setSeoMeta([]);
  };

  const selectBlog = (blog) => setSelectedBlog(blog);

  if (loading) return null;

  return (
    <AdminContext.Provider
      value={{
        admin,
        setAdmin,
        logoutAdmin,
        selectedBlog,
        selectBlog,
        users,
        orders,
        blogs,
        banners,
        seoMeta,
        fetchUsers,
        fetchOrders,
        fetchBlogs,
        fetchBanners,
        fetchSeoMeta,
        getAllData,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
