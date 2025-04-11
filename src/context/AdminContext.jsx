import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AdminContext = createContext();


export const AdminProvider = ({children})=>{
    const [admin, setAdmin] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(()=> localStorage.getItem('selectedBlog') ? JSON.parse(localStorage.getItem('selectedBlog')) : null);

    // Function to set selected blog
    const selectBlog = (blog) => {
      setSelectedBlog(blog);
    };


    useEffect(()=>{
       localStorage.setItem('selectedBlog', JSON.stringify(selectedBlog));
    })
  
    return (
        <AdminContext.Provider value={{admin,setAdmin,selectedBlog, selectBlog}}>
            {children}
        </AdminContext.Provider>
    )
}


export const useAdminContext = () => useContext(AdminContext);