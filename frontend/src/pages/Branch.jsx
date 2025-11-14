// src/pages/Branch.jsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function Branch() {
  const { token, isAdmin, isSubAdmin } = useAuth();
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [search, setSearch] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: '',
    manager_name: '',
    address: '',
    contact: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const canManage = isAdmin || isSubAdmin;

  const fetchBranches = async () => {
    try {
      const res = await api.get('/api/branches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBranches(res.data);
      setFilteredBranches(res.data);
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    const results = branches.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBranches(results);
  }, [search, branches]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canManage) return;
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/api/branches/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Branch updated successfully!');
      } else {
        await api.post('/api/branches', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Branch added successfully!');
      }

      setForm({ name: '', manager_name: '', address: '', contact: '' });
      setEditingId(null);
      setFormVisible(false);
      fetchBranches();
    } catch (err) {
      console.error('Error saving branch:', err);
      alert('Failed to save branch');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (branch) => {
    if (!canManage) return;
    setForm({
      name: branch.name,
      manager_name: branch.manager_name || '',
      address: branch.address || '',
      contact: branch.contact || '',
    });
    setEditingId(branch.id);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return; // only admin
    if (!window.confirm('Are you sure you want to delete this branch?')) return;

    try {
      await api.delete(`/api/branches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Branch deleted successfully!');
      fetchBranches();
    } catch (err) {
      console.error('Error deleting branch:', err);
      alert('Failed to delete branch');
    }
  };

  return (
    <>
      <main className="page-container">
        <div className="device-header" style={{ textAlign: 'center' }}>
          <h2>Branch Management</h2>
        </div>

        <div className="device-controls">
          <input
            type="text"
            placeholder="Search branches..."
            className="device-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {canManage && (
            <button
              className="Add-btn"
              onClick={() => {
                setForm({
                  name: '',
                  manager_name: '',
                  address: '',
                  contact: '',
                });
                setEditingId(null);
                setFormVisible(!formVisible);
              }}
            >
              {formVisible ? 'Close Form' : 'Add Branch'}
            </button>
          )}
        </div>

        {canManage && formVisible && (
          <section className="add-device">
            <h3>{editingId ? 'Edit Branch' : 'Add New Branch'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Branch Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="manager_name"
                placeholder="Branch Manager"
                value={form.manager_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact Number"
                value={form.contact}
                onChange={handleChange}
              />
              <button type="submit" disabled={loading}>
                {editingId ? 'Update Branch' : 'Add Branch'}
              </button>
            </form>
          </section>
        )}

        <table className="device-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Branch Name</th>
              <th>Manager</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Created At</th>
              <th>Updated At</th>
              {canManage && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBranches.length ? (
              filteredBranches.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.manager_name || '—'}</td>
                  <td>{b.address || '—'}</td>
                  <td>{b.contact || '—'}</td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td>{new Date(b.updatedAt).toLocaleString()}</td>
                  {canManage && (
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </button>
                      {isAdmin && (
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(b.id)}
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
                <td colSpan={canManage ? 8 : 7}>No branches found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      <Footer />
    </>
  );
}
