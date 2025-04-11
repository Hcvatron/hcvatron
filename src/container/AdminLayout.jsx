import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from '../components/Admin/nav/Nav'; 
import Dashboard from '../components/Admin/dashboard/Dashboard';
import TopNav from '../components/Admin/nav/TopNav';
import BlogDash from '../components/Admin/blog/BlogDash';
import BlogEditForm from '../components/Admin/blog/BlogEditForm';
import ReadBlog from '../components/Admin/blog/ReadBlog';
import MediaUploader from '../components/Admin/Media/MediaUploader';

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh',overflow:'hidden' }}>
      <TopNav />
      
      <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 60px)' }}> {/* Adjust height */}
        {/* Left Side: Navigation */}
        <Nav style={{ flex: 0.2, backgroundColor: '#2c3e50', padding: '20px', height: '100%' }} />
        
        {/* Right Side: Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/blog" element={<BlogDash />} />
            <Route path="/admin/blog/:name" element={<ReadBlog />} />
            <Route path="/admin/blog/edit" element={<BlogEditForm />} />
            <Route path="/admin/media" element={<MediaUploader />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
