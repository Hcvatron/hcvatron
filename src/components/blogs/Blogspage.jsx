import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useLocalContext } from "../../context/LocalContext";
import "./Blogpage.css";
import CommentForm from "./CommentForm/CommentForm";

const BlogPage = () => {
  const { selectedUserBlog, setSelectedUserBlog } = useLocalContext();
  const [loading, setLoading] = useState(true); // To handle loading state
  const navigate = useNavigate();
  const [formattedTitle, setFormattedTitle] = useState('');

  // Function to extract the title from the URL
  const extractTitleFromURL = () => {
    const currentURL = window.location.pathname;
    const extractedTitle = currentURL.split('/blog/')[1];
    setFormattedTitle(extractedTitle);
  };

  useEffect(() => {
    extractTitleFromURL();
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        if (!formattedTitle) return; // If formattedTitle is empty, return early

        const blogRef = collection(db, "_blogs");
        const q = query(blogRef, where("urlSlug", "==", formattedTitle)); // Corrected query
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setSelectedUserBlog({
              id: doc.id,
              title: data.title,
              content: data.content,
              author: data.author,
              imageBase64: data.imageBase64,
              imageLink:data.imageLink,
              formattedDate: data.date
                ? new Date(data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Date not available", // If the date field is missing
            });
          });
        } else {
          console.log("No such blog found!");
          setSelectedUserBlog(null); // Set null if no blog is found
        }
      } catch (error) {
        console.error("Error fetching blog: ", error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchBlog();
  }, [formattedTitle, setSelectedUserBlog]);

  // Show loading spinner if data is still being fetched
  if (loading) {
    return (
      <div className="blogpage-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  // If no blog is found
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
    <>
    <div className="blogpage-container">
      <button className="back-button" onClick={() => navigate('/blogs')}>
        ← Back to Blogs
      </button>
      <div className="blog-content">
        {(selectedUserBlog.imageBase64 || selectedUserBlog.imageLink) && (
           <img
                src={selectedUserBlog.imageBase64 || selectedUserBlog.imageLink}
                  alt="Blog"
                     className="blog-image"
              />
          )}
     </div>
      <h1 className="blog-title">{selectedUserBlog.title}</h1>
      <p className="blog-meta">
        <span>{selectedUserBlog.formattedDate}</span> •{" "}
        <span>{selectedUserBlog.author}</span>
      </p>
      <div className="blog-content-container">
        {selectedUserBlog.imageBase64 && (
          <img
            src={selectedUserBlog.imageBase64}
            alt={selectedUserBlog.title}
            className="blog-image"
          />
        )}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: selectedUserBlog.content }}
        ></div>
      </div>
    </div>
    <CommentForm />
    </>
  );
};

export default BlogPage;
