import React, { useEffect, useState } from 'react';
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
  const [urlSlug, setUrlSlug] = useState(''); // New field for URL slug

  // SEO Fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

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
      setUrlSlug(selectedBlog.urlSlug || ''); // Set the URL slug if available
      setSeoTitle(selectedBlog.seoTitle || ''); // Set SEO Title if available
      setSeoDescription(selectedBlog.seoDescription || ''); // Set SEO Description if available
      setSeoKeywords(selectedBlog.seoKeywords || ''); // Set SEO Keywords if available
    }
  }, [selectedBlog]);

  // Handle title change to update the URL slug
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    // Generate URL slug by converting title to URL-friendly format
    const slug = newTitle
      .toLowerCase()
      .replace(/\s+/g, '-')  // Replace spaces with hyphens
      .replace(/[^\w-]+/g, ''); // Remove non-alphanumeric characters
    setUrlSlug(slug);
  };

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

    if (!title || !content || !category || !author || !date || !urlSlug) {
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
        urlSlug,   // Save the URL slug
        updatedAt: new Date(),
        seoTitle,   // Save SEO Title
        seoDescription,  // Save SEO Description
        seoKeywords,    // Save SEO Keywords
      });

      toast.success('Blog updated successfully!');
      navigate('/admin/blog'); // Redirect to blogs list
    } catch (error) {
      toast.error('Error updating blog: ' + error.message);
    }
  };

  // Handle the back button click
  const handleBackClick = () => {
    navigate('/admin/blog'); // Navigate to the blogs list page
  };

  return (
    <div className="editblog">
      <div className="editblog-form">
         {/* Back Button */}
         <button onClick={handleBackClick} className="back-btn">Back to Blog List</button>
        <h2>Edit Blog</h2>

        
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
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
              className="custom-quill"
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

          {/* Image URL input field */}
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

          {/* Author input field */}
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

          {/* Date input field */}
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

          {/* Image upload field */}
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

          {/* SEO Fields */}
          <h3>SEO Fields ↓</h3>
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

          <button type="submit" className="submit-btn">Update Blog</button>
        </form>
      </div>
    </div>
  );
};

export default BlogEditForm;
