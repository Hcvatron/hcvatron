import React from "react";
import { useLocalContext } from "../../context/LocalContext";
import { useNavigate } from "react-router-dom";
import "./Blogpage.css";

const BlogPage = () => {
  const { selectedUserBlog } = useLocalContext();
  const navigate = useNavigate();

  if (!selectedUserBlog) {
    return (
      <div className="blogpage-container">
        <h2>Blog Not Found</h2>
        <button className="back-button" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="blogpage-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Blogs
      </button>
      <h1 className="blog-title">{selectedUserBlog.title}</h1>
      <p className="blog-meta">
        <span>{selectedUserBlog.formattedDate}</span> •{" "}
        <span>{selectedUserBlog.author}</span>
      </p>
      <div className="blog-bottom">
     
      
      {selectedUserBlog.imageBase64 && (
        <img src={selectedUserBlog.imageBase64} alt={selectedUserBlog.title} className="blog-image" />
      )}
        
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: selectedUserBlog.content }}
      ></div>
        
        </div>
    </div>
  );
};

export default BlogPage;
