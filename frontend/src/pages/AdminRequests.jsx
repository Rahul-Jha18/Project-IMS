// src/pages/AdminRequests.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  getAllRequests,
  updateRequestStatus,
  deleteRequest,
} from '../services/requestService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function AdminRequests() {
  const { token, isAdmin, isSubAdmin } = useAuth();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await getAllRequests(token); // admin endpoint
      setRequests(data);
    } catch (err) {
      console.error('Error fetching all requests:', err);
    }
  };

  useEffect(() => {
    fetchRequests();
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

  // Show "Name (Role)" in User column
  const formatUserWithRole = (user) => {
    if (!user) return 'Unknown';
    const rawRole = user.role || '';
    let prettyRole = rawRole;

    if (rawRole === 'admin') prettyRole = 'Admin';
    else if (rawRole === 'sub-admin') prettyRole = 'Sub Admin';
    else if (rawRole === 'user') prettyRole = 'User';

    return `${user.name} (${prettyRole})`;
  };

  const canAct = isAdmin || isSubAdmin;

  return (
    <>
      <main className="device-page">
        <h2>Manage User Requests</h2>
        <div className="d-table">
          <table className="device-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
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
                  <td colSpan={canAct ? 5 : 4}>No requests found.</td>
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
