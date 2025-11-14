import React from 'react';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import '../styles/Pages.css';

export default function Landing() {
  const { user } = useAuth();

  return (
    <>
      <div className="header-spacer">
        <main className="landing-page">
          <section className="greeting-section">
            <h2>Welcome{user?.name ? `, ${user.name}` : ''}!</h2>
            <p>
              We’re glad to have you here. This page lets you access and manage
              various features of the Inventory Management System.
            </p>
          </section>

          {/* === Features Section === */}
          <section className="features-section">
            <h3>Features of the System</h3>
            <p style={{ fontSize: "1.2rem" }}>Here are some of the key functionalities you can use:</p>

            <div className="features-list">

              {/* === Feature 1: Devices === */}
              <div className="feature-box">
                <div className="feature-content">
                  <h4>View Devices</h4>
                  <p>
                    {user?.isAdmin
                      ? 'Access a comprehensive list of all devices in the inventory. Add new devices, update existing ones, and manage their status to ensure accurate tracking and maintenance.'
                      : 'Browse through the devices assigned to you or available in your branch. Check device details, status, and request support if needed.Also can add, update, or remove devices from your assigned list as necessary.'}
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

              {/* === Feature 2: Branches === */}
              <div className="feature-box">
                <div className="feature-content">
                  <h4>Manage Branches</h4>
                 <p>
                    {user?.isAdmin
                      ? 'Oversee all branches within the organization. Add new branches, update existing ones, and ensure each branch is properly configured with the necessary resources and personnel.'
                      : 'View details of the branches you are associated with. Get information about branch locations, departments, and key contacts to facilitate communication and coordination.'}
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

              {/* === Feature 3: Requests (different for admin & users) === */}
              <div className="feature-box">
                <div className="feature-content">
                  <h4>{user?.isAdmin ? 'Manage User Requests' : 'Submit a Request'}</h4>
                  <p>
                    {user?.isAdmin
                      ? 'View, track, and update requests submitted by users. Approve or resolve them as needed to maintain smooth operations.'
                      : 'Submit new requests for device issues, maintenance work, or IT support in just a few clicks. Provide clear details so the IT team can respond quickly and accurately. You can track the status of each request—whether it’s Pending, In Progress, or Completed—without needing follow-up calls.'}
                  </p>
                  <a
                    href={user?.isAdmin ? '/AdminRequests' : '/Request'}
                    className="feature-link"
                  >
                    {user?.isAdmin ? 'Manage Requests' : 'Submit Request'}
                  </a>
                </div>
                <div className="feature-image">
                  <img
                    src={user?.isAdmin
                      ? 'https://cdn-icons-png.flaticon.com/512/2920/2920255.png'
                      : 'https://cdn-icons-png.flaticon.com/512/1077/1077976.png'}
                    alt="Requests"
                  />
                </div>
              </div>

            </div>
          </section>

          <div className="footer-spacer" />
        </main>
      </div>

      <Footer />
    </>
  );
}
