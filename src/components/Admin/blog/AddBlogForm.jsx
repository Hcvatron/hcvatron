import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebaseConfig';  // Adjust path as needed
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './AddBlogForm.css';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../../context/AdminContext'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddBlogForm = ({onClose}) => {

    const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Store rich text content
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState('');
  const [category, setCategory] = useState('');
  
  const [date, setDate] = useState('');


  // Categories
  const categories = ['Antivirus', 'Printer', 'Windows OS'];



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

    if (!imageBase64) {
      toast.error('Please upload an image');
      return;
    }

    if (!category) {
      toast.error('Please select a category');
      return;
    }

    try {
      // Save blog data to Firestore
      const blogRef = collection(db, 'antivirus_blogs');
      await addDoc(blogRef, {
        title,
        content,
        imageBase64,
        category,
        createdAt: new Date(),
        formattedDate: date,
      });

      toast.success('Blog added successfully!');
      
      // Reset form
      setTitle('');
      setContent('');
      setImage(null);
      setImageBase64('');
      setCategory('');

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
                       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                       ['bold', 'italic', 'underline'],
                       [{ 'align': [] }],
                       ['link'],
                       ['image'],
                       ['blockquote'],
                       [{ 'direction': 'rtl' }],
                       [{ 'color': [] }, { 'background': [] }],
                       [{ 'script': 'sub'}, { 'script': 'super' }],
                       [{ 'indent': '-1'}, { 'indent': '+1' }],
                       [{ 'size': ['small', 'medium', 'large', 'huge'] }],
                       ['code'],
                       ['clean']
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
     
               {imageBase64 && <img src={imageBase64} alt="Blog preview" className="image-preview" />}
     
               <button type="submit" className="submit-btn">Add Blog</button>
             </form>
           </div>
     
           
    </div>
  )
}

export default AddBlogForm