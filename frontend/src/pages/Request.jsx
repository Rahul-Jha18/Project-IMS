// src/pages/Request.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addRequest, getRequests } from '../services/requestService';
import { getBranches } from '../services/branchService';
import { getDevices } from '../services/deviceService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function Request() {
  const { user, token } = useAuth();

  const [requests, setRequests] = useState([]);
  const [branches, setBranches] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);

  const [formData, setFormData] = useState({
    type: 'add_device',
    description: '',
    branchId: '',
    deviceId: '',
  });

  // Fetch user's requests
  const fetchRequests = async () => {
    try {
      const data = await getRequests(token);
      // backend already filters by userId; extra filter optional
      setRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    }
  };

  // Fetch branches (for dropdown)
  const fetchBranches = async () => {
    try {
      const data = await getBranches(token);
      setBranches(data);
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  };

  // Fetch devices (optionally by branch)
  const fetchDevices = async (branchId = '') => {
    try {
      setLoadingDevices(true);
      const data = await getDevices(token, branchId || '');
      setDevices(data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    } finally {
      setLoadingDevices(false);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchBranches();
    fetchDevices(); // initially all devices
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'branchId') {
      setFormData((prev) => ({
        ...prev,
        branchId: value,
        deviceId: '', // reset
      }));
      fetchDevices(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        type: formData.type,
        description: formData.description,
        branchId: formData.branchId || null,
        deviceId: formData.deviceId || null,
      };

      await addRequest(token, payload);
      alert('Request submitted successfully!');

      setFormData({
        type: 'add_device',
        description: '',
        branchId: '',
        deviceId: '',
      });

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

        {/* ===== Request Form ===== */}
        <form onSubmit={handleSubmit} className="request-form">
          {/* Request Type */}
          <label>Request Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="add_device">Add Device</option>
            <option value="update_device">Update Device</option>
            <option value="status_change">Status Change</option>
            <option value="delete_device">Delete Device</option>
            <option value="other">Other</option>
          </select>

          {/* Branch */}
          <label>Branch:</label>
          <select
            name="branchId"
            value={formData.branchId}
            onChange={handleChange}
          >
            <option value="">-- Select Branch (optional) --</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Device (filtered by branch) */}
          <label>Device:</label>
          <select
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            disabled={loadingDevices || devices.length === 0}
          >
            <option value="">-- Select Device (optional) --</option>
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} ({d.ip})
              </option>
            ))}
          </select>

          {/* Description */}
          <label>Description:</label>
          <textarea
            name="description"
            placeholder="Describe your request..."
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="Add-btn">
            Submit Request
          </button>
        </form>

        {/* ===== Your Previous Requests ===== */}
        <h3>Your Previous Requests</h3>
        <table className="device-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Branch</th>
              <th>Device</th>
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
                  <td>{r.branch?.name || '-'}</td>
                  <td>
                    {r.device
                      ? `${r.device.name} (${r.device.ip})`
                      : '-'}
                  </td>
                  <td>{r.description}</td>
                  <td>{r.status}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No requests yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
      <Footer />
    </>
  );
}
