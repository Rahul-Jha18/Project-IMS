import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-about">
          <h4>Nepal Life Insurance</h4>
          <p>
            Centralized system to manage devices, branches, and organizational records efficiently. 
            Keep track of resources, activities, and performance in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-links">
          <h5>Quick Links</h5>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/branches">Branches</a></li>
            <li><a href="/devices">Devices</a></li> 
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-social">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Project IMS — All rights reserved.</small>
      </div>
    </footer>
  );
}
