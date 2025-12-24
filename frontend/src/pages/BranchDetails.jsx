// src/pages/BranchDetails.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Footer from '../components/Footer';
import BranchLeft from '../components/BranchLeft';
import BranchRight from '../components/BranchRight';
import '../styles/Pages.css';

export default function BranchDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAdmin, isSubAdmin } = useAuth();

  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  // Refs for each right-side section
  const totalStaffRef   = useRef(null);
  const connectivityRef = useRef(null);
  const biometricsRef   = useRef(null);
  const scannerRef      = useRef(null);
  const projectorRef    = useRef(null);
  const printerRef      = useRef(null);
  const desktopRef      = useRef(null);
  const laptopRef       = useRef(null);
  const cctvRef         = useRef(null);
  const panelRef        = useRef(null);
  const upsRef          = useRef(null);
  const ipphoneRef      = useRef(null);

  const sectionRefs = {
    totalStaff: totalStaffRef,
    connectivity: connectivityRef,
    biometrics: biometricsRef,
    scanner: scannerRef,
    projector: projectorRef,
    printer: printerRef,
    desktop: desktopRef,
    laptop: laptopRef,
    cctv: cctvRef,
    panel: panelRef,
    ups: upsRef,
    ipphone: ipphoneRef,
  };

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const res = await api.get(`/api/branches/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBranch(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load branch details');
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchBranch();
    }
  }, [id, token]);

  const display = (v) =>
    v === null || v === undefined || v === '' ? '—' : v;

  // 🔥 FIXED → toggle open/close
  const handleSectionClick = (key) => {
    setActiveSection((prev) => (prev === key ? null : key));

    const ref = sectionRefs[key];
    if (ref && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (loading) {
    return <main className="branch-layout">Loading...</main>;
  }

  if (error || !branch) {
    return (
      <>
        <main className="branch-layout">
          <button className="btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <p style={{ color: 'red' }}>{error || 'Branch not found'}</p>
        </main>
        <Footer/>
      </>
    );
  }

  return (
    <>
      <main className="branch-layout">
        <BranchLeft
          branch={branch}
          navigate={navigate}
          isAdmin={isAdmin}
          isSubAdmin={isSubAdmin}
          editMode={editMode}
          setEditMode={setEditMode}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          display={display}
        />

        <BranchRight
          id={id}
          token={token}
          branch={branch}
          editMode={editMode}
          activeSection={activeSection}
          display={display}
          sectionRefs={sectionRefs}
        />
      </main>
      <Footer />
    </>
  );
}
