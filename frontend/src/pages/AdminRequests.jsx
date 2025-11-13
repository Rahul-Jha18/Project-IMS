// src/pages/AdminRequests.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getRequests, updateRequestStatus } from '../services/requestService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function AdminRequests() {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await getRequests(token);
      setRequests(data);    
    } catch (err) {
      console.error(err);
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

  return (
    <>
      <main className="device-page">
        <h2>Manage User Requests</h2>
        <div className='d-table'>
        <table className="device-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.user?.name || 'Unknown'}</td>
                  <td>{r.type}</td>
                  <td>{r.description}</td>
                  <td>{r.status}</td>
                  <td>
                    {r.status === 'Pending' && (
                      <button
                        className="btn-edit"
                        onClick={() => handleStatusChange(r.id, 'Done')}
                      >
                        Mark Done
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No requests found.</td>
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
