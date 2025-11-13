// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import InfoPage from './pages/InfoPage';
import Device from './pages/Device';
import Branch from './pages/Branch';
import Request from './pages/Request';
import AdminRequests from './pages/AdminRequests';
import Nav from './components/Nav';
import { useAuth } from './context/AuthContext';

// ✅ Protect normal user routes
function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

// ✅ Protect admin and sub-admin routes
function AdminRoute({ children }) {
  const { user } = useAuth();
  if (user?.role === 'admin' || user?.role === 'subadmin') {
    return children;
  }
  return <Navigate to="/" replace />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div>
      <Nav />
      <Routes>
        {/* === Public Routes === */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* === Protected Routes (all logged in users) === */}
        <Route path="/" element={<PrivateRoute><Landing /></PrivateRoute>} />
        <Route path="/InfoPage" element={<PrivateRoute><InfoPage /></PrivateRoute>} />
        <Route path="/devices" element={<PrivateRoute><Device /></PrivateRoute>} />
        <Route path="/branches" element={<PrivateRoute><Branch /></PrivateRoute>} />
        <Route path="/Request" element={<PrivateRoute><Request /></PrivateRoute>} />

        {/* === Admin & Sub-Admin Routes === */}
        <Route
          path="/AdminRequests"
          element={
            <AdminRoute>
              <AdminRequests />
            </AdminRoute>
          }
        />

        {/* === Fallback === */}
        <Route path="*" element={<Navigate to={user ? '/' : '/login'} replace />} />
      </Routes>
    </div>
  );
}
