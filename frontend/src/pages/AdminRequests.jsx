// src/pages/AdminRequests.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
  addRequest,
} from '../services/requestService';
import { getBranches } from '../services/branchService';
import { getDevices } from '../services/deviceService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function AdminRequests() {
  const { token, isAdmin, isSubAdmin } = useAuth();
  const [requests, setRequests] = useState([]);

  const [branches, setBranches] = useState([]);
  const [devices, setDevices] = useState([]);

  const [newRequest, setNewRequest] = useState({
    type: 'add_device',
    branchId: '',
    deviceId: '',
    description: '',
  });

  //  show/hide request form
  const [showForm, setShowForm] = useState(false);

  // Both admin and subadmin can act on requests (mark Done)
const canAct = isAdmin || isSubAdmin;
const canAct1 =isSubAdmin;

  const fetchRequests = async () => {
    try {
      const data = await getAllRequests(token); // all requests with user info
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
      const data = await getDevices(token, branchId);
      setDevices(data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchBranches();
    fetchDevices();
  }, []);

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

  const handleDelete = async (id) => {
    if (!isAdmin) {
      alert('Only admin can delete requests');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this request?')) return;

    try {
      await deleteRequest(token, id);
      alert('Request deleted successfully');
      fetchRequests();
    } catch (err) {
      console.error('Failed to delete request:', err);
      alert(err.response?.data?.message || 'Failed to delete request');
    }
  };

  const handleBranchChange = async (e) => {
    const branchId = e.target.value;
    setNewRequest((prev) => ({ ...prev, branchId, deviceId: '' }));
    await fetchDevices(branchId);
  };

  const handleNewRequestChange = (e) => {
    const { name, value } = e.target;
    setNewRequest((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewRequestSubmit = async (e) => {
    e.preventDefault();
    if (!canAct) return;

    if (!newRequest.description.trim()) {
      alert('Please enter a description.');
      return;
    }

    try {
      const payload = {
        type: newRequest.type,
        description: newRequest.description,
        branchId: newRequest.branchId || null,
        deviceId: newRequest.deviceId || null,
      };

      await addRequest(token, payload);
      alert('Request submitted successfully!');
      setNewRequest({
        type: 'add_device',
        branchId: '',
        deviceId: '',
        description: '',
      });
      setShowForm(false); // hide after submit
      fetchRequests();
    } catch (err) {
      console.error('Failed to submit request:', err);
      alert(err.response?.data?.message || 'Failed to submit request');
    }
  };

  const formatUserWithRole = (user) => {
    if (!user) return 'Unknown';
    const rawRole = user.role || '';
    let prettyRole = rawRole;

    if (rawRole === 'admin') prettyRole = 'Admin';
    else if (rawRole === 'sub-admin') prettyRole = 'Sub Admin';
    else if (rawRole === 'user') prettyRole = 'User';

    return `${user.name} (${prettyRole})`;
  };

  return (
    <>
      <main className="request-page">
        <div className="Request-header">
          <h2>Manage User Requests</h2>

          {/*  Request button to toggle form */}
          {canAct1 && (
            <button
              className="Add-btn"
              onClick={() => setShowForm((prev) => !prev)}
            >
              {showForm ? 'Close Request Form' : 'New Request'}
            </button>
          )}
        </div>

        {/* ==== Subadmin Request Form – only visible when button clicked ==== */}
        {canAct && showForm && (
          <section style={{width:"100%",textAlign:"center", display:"flex", justifyContent:"center",flexDirection:"column", alignItems:"center", marginBottom:"2rem"}}>
            <h3>Create New Request</h3>
            <form  onSubmit={handleNewRequestSubmit}  className="request-form">
              <label>Request Type:</label>
              <select
                name="type"
                value={newRequest.type}
                onChange={handleNewRequestChange}
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
                value={newRequest.branchId}
                onChange={handleBranchChange}
              >
                <option value="">Select Branch (optional)</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>

              <label>Device:</label>
              <select
                name="deviceId"
                value={newRequest.deviceId}
                onChange={handleNewRequestChange}
              >
                <option value="">Select Device (optional)</option>
                {devices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.ip})
                  </option>
                ))}
              </select>

              <label>Description:</label>
              <textarea
                name="description"
                placeholder="Describe your request..."
                value={newRequest.description}
                onChange={handleNewRequestChange}
                required
              />

              <button type="submit" className="Add-btn">
                Submit Request
              </button>
            </form>
          </section>
        )}

        {/* ==== Requests Table ==== */}
          <table className="device-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Branch Name</th>
                <th>Device Name</th>
                <th>Description</th>
                <th>Status</th>
                {canAct && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((r) => (
                  <tr key={r.id}>
                    <td>{formatUserWithRole(r.user)}</td>
                    <td>{r.type}</td>
                    <td>{r.branch?.name || '—'}</td>
                    <td>
                      {r.device
                        ? `${r.device.name} (${r.device.ip})`
                        : '—'}
                    </td>

                    <td>{r.description}</td>
                    <td>{r.status}</td>
                    {canAct && (
                      <td>
                        {r.status === 'Pending' && (
                          <button
                            className="btn-edit"
                            onClick={() => handleStatusChange(r.id, 'Done')}
                          >
                            Mark Done
                          </button>
                        )}
                        {isAdmin && (
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(r.id)}
                            style={{ marginLeft: 8 }}
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={canAct ? 7 : 6}>No requests found.</td>
                </tr>
              )}
            </tbody>
          </table>
      </main>
      <Footer />
    </>
  );
}
