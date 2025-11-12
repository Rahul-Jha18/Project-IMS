import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell } from 'lucide-react';

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

  // Show news bar only on home (landing) page
  const showNewsBar = location.pathname === '/';

  return (
    <>
      {/* === Main Navigation === */}
      <header className="global-nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          {/* === Brand / Logo === */}
          <div className="brand">
            <Link to="/">
              <img
                src="https://play-lh.googleusercontent.com/zW5KMgLpmTvg0TA4xYIztb5HedXa6mqbAflXHBnNWix5kKetiqtR1ZOqNghuBtleiJkN"
                className="logo"
                alt="IMS Logo"
              />
            </Link>
          </div>

          {/* === Center Menu === */}
          {!hideNavMenu && (
            <nav className="nav-menu" aria-label="Main menu">
              <Link to="/InfoPage">Information</Link>
              <Link to="/branches">Branches</Link>
              <Link to="/devices">Devices</Link>
              <Link to="/Request">Requests</Link>
            </nav>
          )}

          {/* === Right Side (User, Bell, Auth Buttons) === */}
          <div className="nav-right">
            
            {user && !user.is_admin && (
              <Link to="/request" className="icon-btn" title="Submit Request">
                <Bell size={22} style={{color:"Red",marginTop:"0.8rem"}}/>
              </Link>
            )}

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
                  <button className="sign" onClick={handleSignIn}>
                    Sign in
                  </button>
                )}
                {location.pathname !== '/register' && (
                  <button className="sign" onClick={handleSignUp}>
                    Sign up
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      {/* === News Ticker (only on Landing Page) === */}
      {showNewsBar && (
        <div className="news-bar">
          <div className="news-ticker">
            <span>
              <strong>News & Updates:</strong> Why you always in a mood?
                        '*****' 'round, actin' brand new
                        I ain't tryna tell you what to do
                        But try to play it cool
                        Baby, <b> I ain't playin' by your rules everything look better with a View</b>. -<i> by 2KGolden</i>
            </span>
          </div>
        </div>
      )}
    </>
  );
}
