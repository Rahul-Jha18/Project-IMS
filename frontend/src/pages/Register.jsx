import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await registerApi(name, email, password);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="form-container">
      <h3>Register</h3>
      <form className="form" onSubmit={submit}>
        <input className="input" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="btn" type="submit">Register</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
        {error && <p style={{color:'red'}}>{error}</p>}
      </form>
    </div>
  );
}