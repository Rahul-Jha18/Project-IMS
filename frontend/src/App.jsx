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

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return user && user.role === 'admin' ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <div>
      <Nav />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route path="/" element={<PrivateRoute><Landing /></PrivateRoute>} />
        <Route path="/InfoPage" element={<PrivateRoute><InfoPage /></PrivateRoute>} /> 
        <Route path="/devices" element={<PrivateRoute><Device /></PrivateRoute>} />
        <Route path="/branches" element={<PrivateRoute><Branch /></PrivateRoute>} />
        <Route path="/request" element={<PrivateRoute><Request /></PrivateRoute>} />

        {/* Admin-only route */}
        <Route path="/admin/requests" element={<AdminRoute><AdminRequests /></AdminRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
