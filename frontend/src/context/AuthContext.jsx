import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const rawLocal = localStorage.getItem('ims_user');
    const rawSession = sessionStorage.getItem('ims_user');
    if (rawLocal) return JSON.parse(rawLocal);
    if (rawSession) return JSON.parse(rawSession);
    return null;
  });

  // Keep Authorization header synced with user token
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

  // ✅ Normalize backend field here (backend sends is_admin = 0 or 1)
  const login = (data, remember = true) => {
    const normalizedUser = {
      ...data,
      isAdmin: data.is_admin === 1 || data.is_admin === true, // convert numeric/boolean to boolean
      remember,
    };
    setUser(normalizedUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, token: user?.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
  