import React, { useState } from 'react';
import './Seo.css';
import { db } from '../../../firebase/firebaseConfig';
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAdminContext } from '../../../context/AdminContext';

const Seo = () => {
  const { seoMeta, fetchSeoMeta } = useAdminContext();
  const [editingId, setEditingId] = useState(null);
  const [seoData, setSeoData] = useState({
    route: '',
    title: '',
    description: '',
    keywords: '',
  });

  const handleChange = (e) => {
    setSeoData({ ...seoData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Normalize route for comparison
    const trimmedRoute = seoData.route.trim().toLowerCase();
  
    // Check if route already exists (excluding current edit)
    const isDuplicate = seoMeta.some(
      (item) =>
        item.route.trim().toLowerCase() === trimmedRoute &&
        item.id !== editingId
    );
  
    if (isDuplicate) {
      toast.error('Route already exists. Please use a unique route.');
      return;
    }
  
    try {
      if (editingId) {
        await updateDoc(doc(db, 'seo_metadata', editingId), {
          ...seoData,
          route: trimmedRoute
        });
        toast.success('SEO metadata updated!');
      } else {
        await addDoc(collection(db, 'seo_metadata'), {
          ...seoData,
          route: trimmedRoute
        });
        toast.success('SEO metadata saved!');
      }
  
      resetForm();
      fetchSeoMeta();
    } catch (error) {
      console.error('Error saving SEO data:', error);
      toast.error('Failed to save SEO metadata.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this SEO entry?')) return;
  
    try {
      await deleteDoc(doc(db, 'seo_metadata', id));
      toast.success('SEO entry deleted!');
      fetchSeoMeta(); // Refresh list
    } catch (error) {
      console.error('Error deleting SEO data:', error);
      toast.error('Failed to delete SEO entry.');
    }
  };
  
  
  const handleEdit = (item) => {
    setSeoData({
      route: item.route,
      title: item.title,
      description: item.description,
      keywords: item.keywords,
    });
    setEditingId(item.id);
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setSeoData({
      route: '',
      title: '',
      description: '',
      keywords: '',
    });
    setEditingId(null);
  };

  return (
    <div className="seo-page">
      <div className="seo-form-container">
        <h2>{editingId ? 'Edit SEO Metadata' : 'Add SEO Metadata'}</h2>
        <form onSubmit={handleSubmit} className="seo-form">
  <label>Route Path</label>
  <input
    type="text"
    name="route"
    value={seoData.route}
    onChange={handleChange}
    placeholder="/about or /product/item"
    required
  />

  <label>Page Title</label>
  <input
    type="text"
    name="title"
    value={seoData.title}
    onChange={handleChange}
    placeholder="Enter page title (e.g. About Us | Hcvatron)"
    required
  />

  <label>Description</label>
  <textarea
    name="description"
    value={seoData.description}
    onChange={handleChange}
    placeholder="Brief page description for SEO (150-160 characters)"
    required
  />

  <label>Keywords (comma-separated)</label>
  <input
    type="text"
    name="keywords"
    value={seoData.keywords}
    onChange={handleChange}
    placeholder="e.g. antivirus, protection, security software"
    required
  />

  <div className="seo-form-buttons">
    <button type="submit">{editingId ? 'Update' : 'Save'}</button>
    {editingId && (
      <button type="button" className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
    )}
  </div>
</form>
      </div>

      <div className="seo-list">
        <h2>Saved SEO Entries</h2>
        {seoMeta.length === 0 ? (
          <p>No entries found.</p>
        ) : (
          <div className="seo-list-main">
            {seoMeta.map((item) => (
              <div key={item.id} className="seo-card">
                <p><strong>Route:</strong> {item.route}</p>
                <p><strong>Title:</strong> {item.title}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Keywords:</strong> {item.keywords}</p>
                <div className="seo-card-buttons">
  <button className='edit-btn' onClick={() => handleEdit(item)}>Edit</button>
  <button className="delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
</div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Seo;
