// frontend/src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored =
      JSON.parse(localStorage.getItem('ims_user')) ||
      JSON.parse(sessionStorage.getItem('ims_user'));
    return stored || null;
  });

  // ✅ Sync axios headers & storage
  useEffect(() => {
    if (user?.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

      if (user.remember) {
        localStorage.setItem('ims_user', JSON.stringify(user));
        sessionStorage.removeItem('ims_user');
      } else {
        sessionStorage.setItem('ims_user', JSON.stringify(user));
        localStorage.removeItem('ims_user');
      }
    } else {
      delete api.defaults.headers.common['Authorization'];
      localStorage.removeItem('ims_user');
      sessionStorage.removeItem('ims_user');
    }
  }, [user]);

  // ✅ Normalize backend data (role-based)
  const login = (data, remember = true) => {
    const role = (data.role || '').toLowerCase();
    const normalizedUser = {
      id: data.id,
      name: data.name,
      email: data.email,
      token: data.token,
      role,
      isAdmin: role === 'admin',
      isSubAdmin: role === 'subadmin',
      isUser: role === 'user',
      remember,
    };
    setUser(normalizedUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token,
        login,
        logout,
        isAdmin: user?.isAdmin,
        isSubAdmin: user?.isSubAdmin,
        isUser: user?.isUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
