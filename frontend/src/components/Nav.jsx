import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignIn = () => navigate('/login');
  const handleSignUp = () => navigate('/register');
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Hide nav menu on login/register pages
  const hideNavMenu = ['/login', '/register'].includes(location.pathname);

  // Show news bar only on home page
  const showNewsBar = location.pathname === '/';

  return (
    <>
      {/* Main Navigation */}
      <header className="global-nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* Logo */}
          <div className="brand">
            <Link to="/">
              <img
                src="https://play-lh.googleusercontent.com/NCklXouWHKQdxkp5uFOCGAK8Kj86SS2LSRQfyKR_8yHBETnPNa9NDs_nylh8n3pH-j4=w600-h300-pc0xffffff-pd"
                className="logo"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Center menu */}
          {!hideNavMenu && (
            <div className="nav-menu" aria-label="Main menu">
              <Link to="/branches">Information</Link>
              <Link to="/branches">Branch</Link>
              <Link to="/devices">Device</Link>
              <Link to="/branches">Request</Link>
            </div>
          )}

          {/* Right side buttons */}
          <div className="nav-right">
            {user ? (
              <>
                <span className="user">Hi, {user.name}</span>
                <button className="btn btn-ghost" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                {location.pathname !== '/login' && (
                  <button className="btn" onClick={handleSignIn}>
                    Sign in
                  </button>
                )}
                {location.pathname !== '/register' && (
                  <button className="btn btn-outline" onClick={handleSignUp}>
                    Sign up
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      {/* News Bar */}
      {showNewsBar && (
        <div className="news-bar">
          <div className="news-ticker">
            <span>
              News and Updates: Today I going to add third user which is Sub-admin.
              He is superior that user and are allowed to update,Add and Edit data of the system
               but cannot able to delete any thing that is only done by main admin.
           </span>
          </div>
        </div>
      )}
    </>
  );
}
