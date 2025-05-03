import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebaseConfig'; // Adjust path as needed
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './BlogEditForm.css';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../../context/AdminContext'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BlogEditForm = () => {
  const navigate = useNavigate();
  const { selectedBlog } = useAdminContext(); // Get the selected blog to edit

  // States for blog fields
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [imageLink, setImageLink] = useState('');  // New field for image link
  const [author, setAuthor] = useState('');  // New field for author
  const [date, setDate] = useState('');  // New field for date

  // Categories list
  const categories = ['Antivirus', 'Printer', 'Windows OS'];

  useEffect(() => {
    if (selectedBlog) {
      setTitle(selectedBlog.title);
      setContent(selectedBlog.content);
      setCategory(selectedBlog.category);
      setImageBase64(selectedBlog.imageBase64 || '');
      setImageLink(selectedBlog.imageLink || ''); // Set the image link if available
      setAuthor(selectedBlog.author || ''); // Set the author if available
      setDate(selectedBlog.date || ''); // Set the date if available
    }
  }, [selectedBlog]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result); // Set the Base64 string of the image
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !category || !author || !date) {
      toast.error('All fields are required!');
      return;
    }

    try {
      const blogRef = doc(db, '_blogs', selectedBlog.id);
      await updateDoc(blogRef, {
        title,
        content,
        category,
        imageBase64,
        imageLink,  // Save the image link if provided
        author,
        date,
        updatedAt: new Date(),
      });

      toast.success('Blog updated successfully!');
      navigate('/admin/blog'); // Redirect to blogs list
    } catch (error) {
      toast.error('Error updating blog: ' + error.message);
    }
  };

  return (
    <div className="editblog">
      <div className="editblog-form">
        <h2>Edit Blog</h2>
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  [{ 'align': [] }],
                  ['link'],
                  ['image'],
                  ['blockquote'],
                  [{ 'direction': 'rtl' }],
                  [{ 'color': [] }, { 'background': [] }],
                  [{ 'script': 'sub' }, { 'script': 'super' }],
                  [{ 'indent': '-1' }, { 'indent': '+1' }],
                  [{ 'size': ['small', 'medium', 'large', 'huge'] }],
                  ['code'],
                  ['clean']
                ]
              }}
              theme="snow"
              placeholder="Edit your blog content..."
              required
              className='custom-quill'
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* New Image URL input field */}
          <div className="form-group">
            <label htmlFor="imageLink">Image URL (optional)</label>
            <input
              type="url"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>

          {/* New Author input field */}
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>

          {/* New Date input field */}
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Blog Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {imageBase64 && <img src={imageBase64} alt="Blog preview" className="image-preview" />}

          <button type="submit" className="submit-btn">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default BlogEditForm;
