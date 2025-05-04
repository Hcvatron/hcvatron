import React, { useState } from 'react';
import { db } from '../../../firebase/firebaseConfig'; // Adjust path as needed
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './AddBlogForm.css';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlogForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(''); // Custom Date
  const [author, setAuthor] = useState(''); // Custom Author Name
  const [link, setLink] = useState(''); // Link field
  const [imageLink, setImageLink] = useState(''); // Image URL field

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  const navigate = useNavigate();

  const categories = ['Antivirus', 'Printer', 'Windows OS'];

  // Helper function to format title into URL format
  const formatTitleForURL = (title) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, ''); // Remove non-word characters (except for hyphens)
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);  // Set the Base64 string of the image
      };
      reader.readAsDataURL(file);
    }
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageBase64 && !imageLink) {  // Check if image is uploaded or link is provided
      toast.error('Please upload an image or provide an image URL');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    // Format the title for URL
    const formattedTitle = formatTitleForURL(title);

    try {
      // Save blog data to Firestore
      const blogRef = collection(db, '_blogs');
      await addDoc(blogRef, {
        title,
        content,
        imageBase64,
        imageLink,  // Save the image link if provided
        category,
        createdAt: new Date(),
        formattedDate: date,
        author, // Custom author name
        urlSlug: formattedTitle, // Save the formatted title for URL
        seoTitle, // Save SEO Title
        seoDescription, // Save SEO Description
        seoKeywords: seoKeywords.split(',').map(keyword => keyword.trim()).join(', '), // Convert to comma-separated keywords
      });

      toast.success('Blog added successfully!');

      // Reset form
      setTitle('');
      setContent('');
      setImage(null);
      setImageBase64('');
      setCategory('');
      setDate('');
      setAuthor('');
      setLink('');
      setImageLink('');
      setSeoTitle('');
      setSeoDescription('');
      setSeoKeywords('');

    } catch (err) {
      toast.error('Error uploading blog: ' + err.message);
    }
  };

  return (
    <div className='addblog'>
      <div className="close" onClick={onClose}>X</div>
      <div className="addblog-form">
        <h2>Add a Blog</h2>
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
                  ['clean'],
                ]
              }}
              theme="snow"
              placeholder="Write your blog content here..."
              required
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

          <div className="form-group">
            <label htmlFor="image">Blog Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>

          {/* Image Link Input Field */}
          <div className="form-group">
            <label htmlFor="imageLink">Image URL (optional)</label>
            <input
              type="url"
              id="imageLink"
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="Enter an image URL"
            />
          </div>

          {/* Custom Date Input */}
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

          {/* Custom Author Input */}
          <div className="form-group">
            <label htmlFor="author">Author Name</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Enter author name"
              required
            />
          </div>

          <h3>For SEO ↓</h3>
          <div className="form-group">
            <label htmlFor="seoTitle">SEO Title</label>
            <input
              type="text"
              id="seoTitle"
              value={seoTitle}
              onChange={(e) => setSeoTitle(e.target.value)}
              placeholder="Enter SEO Title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="seoDescription">SEO Description</label>
            <input
              type="text"
              id="seoDescription"
              value={seoDescription}
              onChange={(e) => setSeoDescription(e.target.value)}
              placeholder="Enter SEO Description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="seoKeywords">SEO Keywords (comma separated)</label>
            <input
              type="text"
              id="seoKeywords"
              value={seoKeywords}
              onChange={(e) => setSeoKeywords(e.target.value)}
              placeholder="Enter SEO Keywords"
            />
          </div>

          {imageBase64 && <img src={imageBase64} alt="Blog preview" className="image-preview" />}
          <button type="submit" className="submit-btn">Add Blog</button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogForm;
