import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from './pages/Landing';
import Device from './pages/Device';
import Branch from './pages/Branch';
import Nav from './components/Nav';
import { useAuth } from './context/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
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
        <Route path="/devices" element={<PrivateRoute><Device /></PrivateRoute>} />
        <Route path="/branches" element={<PrivateRoute><Branch /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
