// src/pages/Login.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginApi } from '../services/authService';
import '../styles/Pages.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ims_creds');
      if (saved) {
        const creds = JSON.parse(saved);
        setEmail(creds.email || '');
        setPassword(creds.password || '');
        setRemember(true);
      }
    } catch (err) {
      console.warn('Failed to load saved credentials', err);
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await loginApi(email, password);

      // Save "Remember me" credentials
      if (remember) {
        localStorage.setItem('ims_creds', JSON.stringify({ email, password }));
      } else {
        localStorage.removeItem('ims_creds');
      }

      // Store user info in AuthContext
      login(data, remember);

      // Redirect based on role
      if (data.role === 'admin') {
        navigate('/AdminRequests');
      } else if (data.role === 'subadmin') {
        navigate('/AdminRequests'); // sub-admin uses same dashboard
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h3>Login</h3>
      <form className="form" onSubmit={submit}>
        <input
          className="input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div style={{ margin: '8px 0' }}>
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Remember me
          </label>
        </div>

        <button className="btn" type="submit">Login</button>
        <p>Not registered? <Link to="/register">Register</Link></p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
