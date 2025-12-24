// src/pages/Software.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Footer from "../components/Footer";
import "../styles/Pages.css";

export default function Software() {
  const navigate = useNavigate();
  const { token, isAdmin, isSubAdmin } = useAuth();

  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    try {
      const res = await api.get("/api/branches", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data || [];
      setBranches(data);
      setFilteredBranches(data);
    } catch (err) {
      console.error("Error fetching branches for software page:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchBranches();
  }, [token]);

  // 🔍 Search
  useEffect(() => {
    const q = search.toLowerCase();
    const results = branches.filter((b) => {
      const name = (b.name || "").toLowerCase();
      const address = (b.address || "").toLowerCase();
      return name.includes(q) || address.includes(q);
    });
    setFilteredBranches(results);
  }, [search, branches]);

  const handleInspect = (id) => {
    navigate(`/software-details/${id}`);
  };

  const handleEdit = (branch) => {
    navigate(`/branches/${branch.id}`); // same edit page as branch
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return;

    if (!window.confirm("Are you sure you want to delete this branch?")) return;

    try {
      await api.delete(`/api/branches/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Branch deleted successfully!");
      fetchBranches();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete");
    }
  };

  // 🔹 NEW: go to Assets page filtered by this branch
  const handleViewAssets = (branch) => {
    // you can change to branch.brCode if your filter uses BrCode instead of id
    navigate(`/assets?branch=${branch.id}`);
  };

  if (loading) {
    return (
      <main className="page-container">
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <>
      <main className="page-container">
        <div className="device-header" style={{ textAlign: "center" }}>
          <h2>Software Management</h2>
        </div>

        {/* Search */}
        <div className="device-controls">
          <input
            type="text"
            placeholder="Search by branch or location..."
            className="device-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="device-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Branch Name</th>
                <th>Location</th>
                {(isAdmin || isSubAdmin) && <th>Actions</th>}
                <th>Software</th>
                {/* NEW: open Assets page */}
                <th>Assets</th>
              </tr>
            </thead>

            <tbody>
              {filteredBranches.length ? (
                filteredBranches.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.name || "—"}</td>
                    <td>{b.address || "—"}</td>

                    {(isAdmin || isSubAdmin) && (
                      <td className="action-cell">
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

                    <td>
                      <button
                        className="btn-inspect"
                        onClick={() => handleInspect(b.id)}
                      >
                        View Software
                      </button>
                    </td>

                    {/* NEW: open Assets page for this branch */}
                    <td>
                      <button
                        className="btn-inspect"
                        onClick={() => handleViewAssets(b)}
                      >
                        View Assets
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={isAdmin || isSubAdmin ? 6 : 5}
                    style={{ textAlign: "center" }}
                  >
                    No branches found.
                  </td>
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
