import React, { useEffect, useState } from "react";
import "./AllBlogs.css";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { useLocalContext } from "../../context/LocalContext";

const AllBlogs = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const { setSelectedUserBlog } = useLocalContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, "_blogs"));
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
    navigate(`/blog/${blog.title.toLowerCase()}`);
  };

  return (
    <div className="all-blogs">
      <div className="categories-header">
        <h2 className="categories-heading">Stay Ahead in Cybersecurity</h2>
      </div>
      <div className="blogs-section">
        <div className="blogs-grid">
          {blogPosts.map((blog) => (
            <div className="blog-card" key={blog.id} onClick={() => handleBlogClick(blog)}>
              <div className="blog-card-top"></div>
              {(blog.imageBase64 || blog.imageLink) && (
                <div className="blog-image-container">
                <img src={blog.imageBase64 || blog.imageLink} alt="Blog" />

                </div>
              )}
              <div className="blog-content">
                
                <p className="blog-description">{blog.content.replace(/<[^>]+>/g, "").slice(0, 150)}...</p>
                <p className="blog-meta">
                  <span>{blog.formattedDate}</span> • <span>{blog.author}</span>
                </p>
                <button className="read-more-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
