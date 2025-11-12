// src/pages/Request.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addRequest, getRequests } from '../services/requestService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function Request() {
  const { user, token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    type: 'add_device',
    description: '',
  });

  const fetchRequests = async () => {
    try {
      const data = await getRequests(token);
      // Only show requests created by current user
      setRequests(data.filter(r => r.userId === user.id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addRequest(token, formData);
      alert(' Request submitted successfully!');
      setFormData({ type: 'add_device', description: '' });
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert(' Failed to submit request.');
    }
  };

  return (
    <>
      <main className="request-page">
        <h2>Submit a Request</h2>
        <form onSubmit={handleSubmit} className="request-form">
          <label>Request Type:</label>
          <select 
            name="type"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="add_device">Add Device</option>
            <option value="update_device">Update Device</option>
            <option value="status_change">Status Change</option>
            <option value="status_change">Delete </option>
            <option value="other">Other</option>
          </select>

          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Describe your request..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          ></textarea>

          <button type="submit" className="Add-btn">Submit Request</button>
        </form>

        <h3>Your Previous Requests</h3>
        <table className="device-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.type}</td>
                  <td>{r.description}</td>
                  <td>{r.status}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
}
