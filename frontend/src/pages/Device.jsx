import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBranches } from '../services/branchService';
import { getDevices, addDevice, updateDevice, deleteDevice } from '../services/deviceService';
import Footer from '../components/Footer'; // ✅ Import your footer
import '../styles/Pages.css';

export default function Device() {
  const { user, token } = useAuth();
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newDevice, setNewDevice] = useState({
    id: null,
    name: '',
    ip: '',
    model: '',
    branchId: '',
    status: 'Active',
  });

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
      setFilteredDevices(data);
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  };

  useEffect(() => {
    fetchBranches();
    fetchDevices();
  }, []);

  useEffect(() => {
    const results = devices.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredDevices(results);
  }, [search, devices]);

  const handleBranchChange = (e) => {
    const branchId = e.target.value;
    setSelectedBranch(branchId);
    fetchDevices(branchId);
  };

  const handleInputChange = (e) => {
    setNewDevice({ ...newDevice, [e.target.name]: e.target.value });
  };

  const handleSubmitDevice = async (e) => {
    e.preventDefault();
    try {
      if (newDevice.id) {
        await updateDevice(token, newDevice.id, {
          ...newDevice,
          branchId: Number(newDevice.branchId),
        });
        alert('Device updated successfully!');
      } else {
        await addDevice(token, {
          ...newDevice,
          branchId: Number(newDevice.branchId),
        });
        alert('Device added successfully!');
      }
      setNewDevice({ id: null, name: '', ip: '', model: '', branchId: '', status: 'Active' });
      setShowForm(false);
      fetchDevices(selectedBranch);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to save device');
    }
  };

  const handleEditDevice = (device) => {
    setNewDevice(device);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteDevice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this device?')) return;
    try {
      await deleteDevice(token, id);
      alert('Device deleted successfully!');
      fetchDevices(selectedBranch);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to delete device');
    }
  };

  return (
    <>
      <main className="device-page">
        <div className="device-header">
          <h2>Devices Details</h2>
        </div>

        <div className="device-controls">
          <div className="branch-filter">
            <label style={{ fontSize: '20px', marginRight: '10px' }}>Filter by Branch:</label>
            <select value={selectedBranch} onChange={handleBranchChange}>
              <option value="">All Branches</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Search devices..."
            className="device-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {user?.is_admin === 1 && (
            <button className="Add-btn" onClick={() => {
              setNewDevice({ id: null, name: '', ip: '', model: '', branchId: '', status: 'Active' });
              setShowForm(!showForm);
            }}>
              {showForm ? 'Close Form' : 'Add Device'}
            </button>
          )}
        </div>

        {user?.is_admin === 1 && showForm && (
          <section className="add-device">
            <h3>{newDevice.id ? 'Edit Device' : 'Add New Device'}</h3>
            <form onSubmit={handleSubmitDevice}>
              <input
                type="text"
                name="name"
                placeholder="Device Name"
                value={newDevice.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="ip"
                placeholder="IP Address"
                value={newDevice.ip}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model"
                value={newDevice.model}
                onChange={handleInputChange}
                required
              />
              <select name="branchId" value={newDevice.branchId} onChange={handleInputChange} required>
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
              <select name="status" value={newDevice.status} onChange={handleInputChange} required>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button type="submit">{newDevice.id ? 'Update Device' : 'Add Device'}</button>
            </form>
          </section>
        )}

        <table className="device-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>IP</th>
              <th>Model</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDevices.length ? (
              filteredDevices.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.ip}</td>
                  <td>{d.model}</td>
                  <td>{d.branch?.name || 'N/A'}</td>
                  <td>{d.status}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEditDevice(d)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteDevice(d.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No devices found.</td></tr>
            )}
          </tbody>
        </table>
      </main>

      {/*  Add Footer below main content */}
      <Footer />
    </>
  );
}
