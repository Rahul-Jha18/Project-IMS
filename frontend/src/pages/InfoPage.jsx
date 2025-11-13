import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getBranches } from '../services/branchService';
import { getDevices } from '../services/deviceService';
import Footer from '../components/Footer';
import '../styles/Pages.css';

export default function InfoPage() {
  const { token } = useAuth();
  const [branches, setBranches] = useState([]);
  const [devices, setDevices] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const [search, setSearch] = useState('');

  // Fetch branches and devices
  useEffect(() => {
    const fetchData = async () => {
      try {
        const branchData = await getBranches(token);
        const deviceData = await getDevices(token);
        setBranches(branchData);
        setDevices(deviceData);
        setFilteredData(deviceData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, [token]);

  //  Filtering logic
  useEffect(() => {
    let filtered = devices;

    if (selectedDevice) {
      filtered = filtered.filter((d) =>
        d.name.toLowerCase().includes(selectedDevice.toLowerCase())
      );
    }

    if (selectedBranch) {
      filtered = filtered.filter(
        (d) => String(d.branchId) === String(selectedBranch)
      );
    }

    if (search) {
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.model.toLowerCase().includes(search.toLowerCase()) ||
          d.ip.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [selectedDevice, selectedBranch, search, devices]);

  return (
    <>
      <main className="device-page">
        <div className="device-header">
          <h2>Information Page</h2>
        </div>

        <div className="Controls_device">
          {/* 🔍 Search bar */}
          <input
            type="text"
            placeholder="Search by name, model, or IP..."
            className="device-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* 📱 Device selector */}
          <select className="Select-device"
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
          >
            <option value="">All Devices</option>
            {devices.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {/* 🏢 Branch selector */}
          <select className='Select-Branch'
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
          >
            <option value="">All Branches</option>
            {branches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* 📋 Info Table */}
        <div className='d-table'>
        <table className="device-table">
          <thead>
            <tr>
              <th>Device Name</th>
              <th>IP</th>
              <th>Model</th>
              <th>Status</th>
              <th>Branch</th>
              <th>Branch Manager</th>
              <th>Branch Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? (
              filteredData.map((d) => {
                const branch = branches.find((b) => b.id === d.branchId);
                return (
                  <tr key={d.id}>
                    <td>{d.name}</td>
                    <td>{d.ip}</td>
                    <td>{d.model}</td>
                    <td>{d.status}</td>
                    <td>{branch?.name || 'N/A'}</td>
                    <td>{branch?.manager_name || 'N/A'}</td>
                    <td>{branch?.contact || 'N/A'}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7">No matching results found.</td>
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
