// src/components/Nav.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Menu, X } from 'lucide-react';

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  const handleSignUp = () => {
    setMenuOpen(false);
    navigate('/register');
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const hideNavMenu = ['/login', '/register'].includes(location.pathname);
  const showNewsBar = location.pathname === '/';

  return (
    <>
      <header className="global-nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <div className="brand">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img
                src="https://play-lh.googleusercontent.com/zW5KMgLpmTvg0TA4xYIztb5HedXa6mqbAflXHBnNWix5kKetiqtR1ZOqNghuBtleiJkN"
                className="logo"
                alt="IMS Logo"
              />
            </Link>
          </div>

          {/* Hamburger Menu Icon */}
          {!hideNavMenu && (
            <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </div>
          )}

          {/* Navigation Menu */}
          {!hideNavMenu && (
            <nav className={`nav-menu ${menuOpen ? 'open' : ''}`} aria-label="Main menu">
              <Link to="/InfoPage" onClick={() => setMenuOpen(false)}>Information</Link>
              <Link to="/branches" onClick={() => setMenuOpen(false)}>Branches</Link>
              <Link to="/devices" onClick={() => setMenuOpen(false)}>Devices</Link>
              {user?.isAdmin ? (
                <Link to="/AdminRequests" onClick={() => setMenuOpen(false)}>Requests</Link>
              ) : (
                <Link to="/Request" onClick={() => setMenuOpen(false)}>Requests</Link>
              )}

              {/* User Buttons (visible in small screen menu) */}
              <div className="mobile-nav-actions">
                {user ? (
                  <>
                    <span className="user">Hi, {user.name}</span>
                    <button className="btn" onClick={handleLogout}>Logout</button>
                  </>
                ) : (
                  <>
                    {location.pathname !== '/login' && (
                      <button className="sign" onClick={handleSignIn}>Sign in</button>
                    )}
                    {location.pathname !== '/register' && (
                      <button className="sign" onClick={handleSignUp}>Sign up</button>
                    )}
                  </>
                )}
              </div>
            </nav>
          )}

          {/* Desktop Buttons */}
          <div className="nav-right">
            {user && !user.isAdmin && (
              <Link to="/Request" className="icon-btn" title="Submit Request">
                <Bell size={22} style={{ color: 'red', marginTop: '0.8rem' }} />
              </Link>
            )}
            {user ? (
              <>
                <span className="user">Hi, {user.name}</span>
                <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <button className="sign" onClick={handleSignIn}>Sign in</button>
                )}
                {location.pathname !== '/register' && (
                  <button className="sign" onClick={handleSignUp}>Sign up</button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {showNewsBar && (
        <div className="news-bar">
          <div className="news-ticker">
            <span>
              <strong>News & Updates:</strong> Why you always in a mood?
              ‘*****’ ‘round, actin’ brand new. I ain’t tryna tell you what to do,
              but try to play it cool. Baby, <b>I ain’t playin’ by your rules — everything looks better with a View.</b> 
              - <i>by 2KGolden</i>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
