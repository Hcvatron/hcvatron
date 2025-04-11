import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useAdminContext } from '../../../context/AdminContext';
import { db } from '../../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './BlogList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const BlogList = ({ count, main }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { selectBlog } = useAdminContext();

  useEffect(() => {
    const fetchBlogs = async () => {
      const querySnapshot = await getDocs(collection(db, 'antivirus_blogs'));
      const blogData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
      setLoading(false); // Stop loading when data is fetched
    };

    fetchBlogs();
  }, []);
  const handleBlogClick = (blog) => {
    selectBlog(blog);
    const encodedTitle = encodeURIComponent(blog.title); // Encode before navigation
    navigate(`/admin/blog/${encodedTitle}`);
  };
  
  const handleEdit = (blog) => {
    selectBlog(blog);
    navigate('/admin/blog/edit');
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteDoc(doc(db, 'antivirus_blogs', blogId));
      setBlogs(blogs.filter(blog => blog.id !== blogId));
    }
  };

  let displayedBlogs = count === "all" 
    ? blogs 
    : count && !isNaN(count) 
    ? blogs.slice(0, parseInt(count)) 
    : blogs;

  return (
    <div className="blogs-container">
      <div className="blog-container-head">
        <h2>Your Blogs ↓</h2>
      </div>

      {/* Loader Spinner */}
      {loading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : displayedBlogs.length === 0 ? (
        <div className="no-blogs">
          <p>No blogs available. Add a new one!</p>
        </div>
      ) : (
        <div className="blog-container-div">
          {displayedBlogs.map((blog) => {
            const shortContent = blog.content.replace(/<[^>]+>/g, "").slice(0, 200);
            const isLong = blog.content.length > 200;

            return (
              <div key={blog.id} className="blog-card">
                <div className="blog-image" onClick={() => handleBlogClick(blog)}>
                  {blog.imageBase64 && <img src={blog.imageBase64} alt="Blog" />}
                </div>
                <div className="blog-content">
                  <h3 onClick={() => handleBlogClick(blog)}>{blog.title}</h3>
                  <p style={{ whiteSpace: 'pre-wrap' }}>
                    {shortContent} {isLong && "..."} {isLong && (
                      <button 
                        className="read-more-btn" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBlogClick(blog);
                        }}
                      >
                        <span onClick={()=>handleBlogClick(blog)}>Read More</span>
                      </button>
                    )}
                  </p>
                  <p><strong>Category:</strong> {blog.category}</p>
                  <p><strong>Date:</strong> {blog.formattedDate}</p>

                  {main && (
                    <div className="blog-actions">
                      <button className="edit-btn" onClick={() => handleEdit(blog)}> 
                        <FontAwesomeIcon icon={faPencil} /> Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(blog.id)}>
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BlogList;
