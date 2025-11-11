import React from 'react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function Landing() {
  const { user } = useAuth();

  return (
    <>
      <main className="landing-page">
        <section className="greeting-section">
          <h2>Welcome{user?.name ? `, ${user.name}` : ''}!</h2>
          <p>We’re glad to have you here. This is page where you can access and manage various features of the system.</p>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h3>Features of the System</h3>
          <p>Here are some of the key functionalities you can use:</p>
          <div className="features-list">
            {/* Feature 1 */}
            <div className="feature-box">
              <div className="feature-content">
                <h4>View Devices</h4>
                <p>
                  Track records of all devices used across the organization of all branches and Departments.
                  Monitor their current status, usage, and performance in real-time.
                  Maintain a complete record of each device for auditing and management.
                  Identify issues quickly and ensure every device is functioning optimally.
                  Streamline device management across all locations from a single dashboard.
                </p>
                <a href="/devices" className="feature-link">Visit</a>
              </div>
              <div className="feature-image">
                <img 
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20250315122640215754/Input----Output--Devices.webp" 
                  alt="Devices" 
                />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="feature-box">
              <div className='feature-content'>
                <h4>Manage Branches</h4>
                <p>
                  Maintain complete records of all branches, including employee details, IP addresses, and locations.
                  Monitor and manage branch-specific information efficiently from a centralized system.
                  Track activities and resources for each branch in real-time.
                  Ensure accurate data management and quick access to branch information.
                  Simplify branch operations and maintain organizational oversight effortlessly.
                </p>
                <a href="/branches" className="feature-link">Visit</a>
              </div>
              <div className="feature-image">
                <img 
                  src="https://www.shutterstock.com/image-vector/isometric-urban-megalopolis-top-view-600nw-2470153533.jpg" 
                  alt="Branches" 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Spacer before Footer */}
        <div className="footer-spacer" />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
