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
      const raw = localStorage.getItem('ims_creds');
      if (raw) {
        const creds = JSON.parse(raw);
        if (creds?.email) setEmail(creds.email);
        if (creds?.password) setPassword(creds.password);
        setRemember(true);
      }
    } catch (e) {
      console.warn('Failed to read saved credentials', e);
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Call the API to login
      const data = await loginApi(email, password);
      
      try {
        // If remember is checked, store credentials in localStorage, else remove them
        if (remember) {
          localStorage.setItem('ims_creds', JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem('ims_creds');
        }
      } catch (err) {
        console.warn('Could not persist credentials', err);
      }

      // Call the login function in AuthContext to update the user state
      login(data, remember); 

      // Redirect to landing page after successful login
      navigate('/landing'); // Adjust this path to your actual landing page route
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
          <label style={{ userSelect: 'none' }}>
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
