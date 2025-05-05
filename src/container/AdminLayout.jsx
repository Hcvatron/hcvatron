import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Nav from '../components/Admin/nav/Nav'; 
import Dashboard from '../components/Admin/dashboard/Dashboard';
import TopNav from '../components/Admin/nav/TopNav';
import BlogDash from '../components/Admin/blog/BlogDash';
import BlogEditForm from '../components/Admin/blog/BlogEditForm';
import ReadBlog from '../components/Admin/blog/ReadBlog';
import MediaUploader from '../components/Admin/Media/MediaUploader';
import { useAdminContext } from '../context/AdminContext';
import AdminLogin from '../components/Admin/Signin/AdminLogin';
import AdminPrivateRoute from './AdminPrivateRoute';  // Import your AdminPrivateRoute
import { Navigate } from 'react-router-dom';
import Orders from '../components/Admin/Orders/Orders';
import UserManagement from '../components/Admin/Users/UserManagement';
import Banner from '../components/Admin/Banner/Banner';

const AdminLayout = () => {
  const location = useLocation();
  const { admin, users } = useAdminContext();


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      {location.pathname !== "/admin/login" && <TopNav />}
      
      <div style={{ display: 'flex', flexDirection: 'row', height: 'calc(100vh - 60px)' }}> {/* Adjust height */}
        {/* Left Side: Navigation */}
        {location.pathname !== "/admin/login" && <Nav style={{ flex: 0.2, backgroundColor: '#2c3e50', padding: '20px', height: '100%' }} />}
        
        {/* Right Side: Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <Routes>
            <Route path="/admin" element={
              admin ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/admin/login" replace />
            } />
            <Route path="/admin/dashboard" element={
              <AdminPrivateRoute>
                <Dashboard />
              </AdminPrivateRoute>
            } />

            <Route path="/admin/blog" element={
              <AdminPrivateRoute>
                <BlogDash />
              </AdminPrivateRoute>
            } />
            <Route path="/admin/blog/:name" element={
              <AdminPrivateRoute>
                <ReadBlog />
              </AdminPrivateRoute>
            } />
            <Route path="/admin/blog/edit" element={
              <AdminPrivateRoute>
                <BlogEditForm />
              </AdminPrivateRoute>
            } />
            <Route path="/admin/media" element={
              <AdminPrivateRoute>
                <MediaUploader />
              </AdminPrivateRoute>
            } />
            <Route path="/admin/orders" element={
              <AdminPrivateRoute>
                <Orders />
              </AdminPrivateRoute>
            } />

           <Route path="/admin/manage-user" element={
              <AdminPrivateRoute>
                <UserManagement users={users} />
              </AdminPrivateRoute>
            } />

            <Route path="/admin/manage-banner" element={
              <AdminPrivateRoute>
                <Banner users={users} />
              </AdminPrivateRoute>
            } />

            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
