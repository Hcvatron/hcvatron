import { useEffect, createContext, useContext, useState } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Load from localStorage if exists
  const [admin, setAdmin] = useState(() => localStorage.getItem("admin") || null);
  const [selectedBlog, setSelectedBlog] = useState(() =>
    localStorage.getItem("selectedBlog")
      ? JSON.parse(localStorage.getItem("selectedBlog"))
      : null
  );

  // Save or remove admin from localStorage
  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", admin);
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  // Save selected blog
  useEffect(() => {
    localStorage.setItem("selectedBlog", JSON.stringify(selectedBlog));
  }, [selectedBlog]);

  // Logout function
  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("admin");
  };

  // Function to set selected blog
  const selectBlog = (blog) => {
    setSelectedBlog(blog);
  };

  return (
    <AdminContext.Provider value={{ admin, setAdmin, logoutAdmin, selectedBlog, selectBlog }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
