import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Footer from "../components/Footer"; // ✅ Add footer like Device.jsx
import "../styles/Pages.css";

export default function Branch() {
  const { user } = useAuth();
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [search, setSearch] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    manager_name: "",
    address: "",
    contact: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

 
  // Fetch branches
 
  const fetchBranches = async () => {
    try {
      const res = await api.get("/api/branches", {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setBranches(res.data);
      setFilteredBranches(res.data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

 
  // Handle search
 
  useEffect(() => {
    const results = branches.filter((b) =>
      b.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBranches(results);
  }, [search, branches]);

  
  // Handle input
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 
  // Handle submit
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await api.put(`/api/branches/${editingId}`, form, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        alert("Branch updated successfully!");
      } else {
        await api.post("/api/branches", form, {
          headers: { Authorization: `Bearer ${user?.token}` },
        });
        alert("Branch added successfully!");
      }

      setForm({ name: "", manager_name: "", address: "", contact: "" });
      setEditingId(null);
      setFormVisible(false);
      fetchBranches();
    } catch (err) {
      console.error("Error saving branch:", err);
      alert("Failed to save branch");
    } finally {
      setLoading(false);
    }
  };

 
  // Handle edit
  
  const handleEdit = (branch) => {
    setForm({
      name: branch.name,
      manager_name: branch.manager_name || "",
      address: branch.address || "",
      contact: branch.contact || "",
    });
    setEditingId(branch.id);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 
  // Handle delete
 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await api.delete(`/api/branches/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      alert("Branch deleted successfully!");
      fetchBranches();
    } catch (err) {
      console.error("Error deleting branch:", err);
      alert("Failed to delete branch");
    }
  };

 
  // JSX
 
  return (
    <>
      <main className="page-container">
        <div className="device-header" style={{textAlign:"center"}}>
          <h2>Branch Management</h2>
        </div>

        {/* ===== Controls ===== */}
        <div className="device-controls">
          <input
            type="text"
            placeholder="Search branches..."
            className="device-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {user?.is_admin === 1 && (
            <button
              className="Add-btn"
              onClick={() => {
                setForm({ name: "", manager_name: "", address: "", contact: "" });
                setEditingId(null);
                setFormVisible(!formVisible);
              }}
            >
              {formVisible ? "Close Form" : "Add Branch"}
            </button>
          )}
        </div>

        {/* ===== Add/Edit Form ===== */}
        {user?.is_admin === 1 && formVisible && (
          <section className="add-device">
            <h3>{editingId ? "Edit Branch" : "Add New Branch"}</h3>
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
                {editingId ? "Update Branch" : "Add Branch"}
              </button>
            </form>
          </section>
        )}

        {/* ===== Table ===== */}
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
              {user?.is_admin === 1 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBranches.length ? (
              filteredBranches.map((b) => (
                <tr key={b.id}>
                  <td>{b.id}</td>
                  <td>{b.name}</td>
                  <td>{b.manager_name || "—"}</td>
                  <td>{b.address || "—"}</td>
                  <td>{b.contact || "—"}</td>
                  <td>{new Date(b.createdAt).toLocaleString()}</td>
                  <td>{new Date(b.updatedAt).toLocaleString()}</td>
                  {user?.is_admin === 1 && (
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(b.id)}
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={user?.is_admin === 1 ? 8 : 7}>No branches found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>

      {/* ✅ Footer */}
      <Footer />
    </>
  );
}
