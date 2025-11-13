// src/pages/AdminRequests.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAllRequests,
  updateRequestStatus,
  editRequest,
  deleteRequest,
} from '../services/requestService';
import { getBranches } from '../services/branchService';
import { getDevices } from '../services/deviceService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function AdminRequests() {
  const { token } = useAuth();

  const [requests, setRequests] = useState([]);
  const [branches, setBranches] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loadingDevices, setLoadingDevices] = useState(false);

  const [editingRequest, setEditingRequest] = useState(null);
  const [formData, setFormData] = useState({
    type: '',
    description: '',
    branchId: '',
    deviceId: '',
  });

  // ======= Load data =======
  const fetchRequests = async () => {
    try {
      const data = await getAllRequests(token);
      setRequests(data);
    } catch (err) {
      console.error('Error fetching all requests:', err);
    }
  };

  const fetchBranches = async () => {
    try {
      const data = await getBranches(token);
      setBranches(data);
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  };

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
    fetchDevices();
  }, []);

  // ======= Handlers =======

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateRequestStatus(token, id, newStatus);
      alert(`Request marked as ${newStatus}`);
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleEditClick = (req) => {
    setEditingRequest(req);
    setFormData({
      type: req.type || '',
      description: req.description || '',
      branchId: req.branch?.id || '',
      deviceId: req.device?.id || '',
    });

    // Load devices based on request's branch
    fetchDevices(req.branch?.id || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;

    if (name === 'branchId') {
      setFormData((prev) => ({
        ...prev,
        branchId: value,
        deviceId: '',
      }));
      fetchDevices(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingRequest) return;

    try {
      const payload = {
        type: formData.type,
        description: formData.description,
        branchId: formData.branchId || null,
        deviceId: formData.deviceId || null,
      };

      await editRequest(token, editingRequest.id, payload);
      alert('Request updated successfully');
      setEditingRequest(null);
      setFormData({ type: '', description: '', branchId: '', deviceId: '' });
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to update request');
    }
  };

  const handleCancelEdit = () => {
    setEditingRequest(null);
    setFormData({ type: '', description: '', branchId: '', deviceId: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this request?')) return;

    try {
      await deleteRequest(token, id);
      alert('Request deleted successfully');
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to delete request');
    }
  };

  return (
    <>
      <main className="device-page">
        <h2>Manage User Requests</h2>

        {/* ===== Edit Form (Admin) ===== */}
        {editingRequest && (
          <section className="add-device">
            <h3>Edit Request (ID: {editingRequest.id})</h3>
            <form onSubmit={handleEditSubmit} className="request-form">
              <label>Request Type:</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleEditFormChange}
              >
                <option value="add_device">Add Device</option>
                <option value="update_device">Update Device</option>
                <option value="status_change">Status Change</option>
                <option value="delete_device">Delete Device</option>
                <option value="other">Other</option>
              </select>

              <label>Branch:</label>
              <select
                name="branchId"
                value={formData.branchId}
                onChange={handleEditFormChange}
              >
                <option value="">-- Select Branch (optional) --</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <label>Device:</label>
              <select
                name="deviceId"
                value={formData.deviceId}
                onChange={handleEditFormChange}
                disabled={loadingDevices || devices.length === 0}
              >
                <option value="">-- Select Device (optional) --</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.ip})
                  </option>
                ))}
              </select>

              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleEditFormChange}
                required
              />

              <div style={{ marginTop: '10px' }}>
                <button type="submit" className="Add-btn">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-delete"
                  style={{ marginLeft: '8px' }}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* ===== Requests Table ===== */}
        <div className="d-table">
          <table className="device-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Branch</th>
                <th>Device</th>
                <th>Description</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.user?.name || 'Unknown'}</td>
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
                    <td>
                      {r.status === 'Pending' && (
                        <button
                          className="btn-edit"
                          onClick={() => handleStatusChange(r.id, 'Done')}
                        >
                          Mark Done
                        </button>
                      )}
                      <button
                        className="btn-edit"
                        style={{ marginLeft: '4px' }}
                        onClick={() => handleEditClick(r)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        style={{ marginLeft: '4px' }}
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8">No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}
