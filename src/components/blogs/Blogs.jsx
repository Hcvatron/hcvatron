import React, { useEffect, useState } from "react";
import "./Blogs.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useLocalContext } from "../../context/LocalContext";

const Blogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const { setSelectedUserBlog} = useLocalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "antivirus_blogs"));
      const blogData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id, 
          ...data,
          formattedDate: data.formattedDate || new Date(data.createdAt.seconds * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
      });
      setBlogPosts(blogData);
    };
    
    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedUserBlog(blog);
    navigate(`/blog/${blog.id}`);
  };

  return (
    <>
      <div className="categories-header">
        <div className="head">
          <div></div>
          <h2 className="categories-heading">Stay Ahead in Cybersecurity</h2>
        </div>
      </div>
      <div className="blogs-section blogs-section-user">
        <div className="blogs-grid">
          {blogPosts.map((blog) => (
            <div className="blog-card" key={blog.id} onClick={() => handleBlogClick(blog)}>
              <div className="blog-card-top">
              {blog.imageBase64 && (
                <img src={blog.imageBase64} alt={blog.title} className="blog-image" />
              )}
              <div className="blog-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-description">{blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...</p>
              </div>
              </div>
              <p className="blog-meta">
                  <span>{blog.formattedDate}</span> • <span>{blog.author}</span>
                </p>
            </div>
          ))}
        </div>
        <div className="blogs-footer">
          <button className="explore-button" onClick={()=>navigate('/explore-blogs')}>Explore Our Blogs</button>
        </div>
      </div>
    </>
  );
};

export default Blogs;
