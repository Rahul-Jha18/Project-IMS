// src/components/BranchLeft.jsx
import React from 'react';

export default function BranchLeft({
  branch,
  navigate,
  isAdmin,
  isSubAdmin,
  editMode,
  setEditMode,
  activeSection,
  onSectionClick,  
  display,
}) {
  return (
    <aside className="branch-left">
      <button className="btn Infra-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="branch-title">Branch Details</h2>
      <p><strong>Name:</strong> {branch.name}</p>
      <p><strong>Manager:</strong> {display(branch.manager_name)}</p>
      <p><strong>Address:</strong> {display(branch.address)}</p>
      <p>
        <strong>Contact:</strong> {display(branch.contact)}
        {branch.ext_no ? ` (Ext: ${branch.ext_no})` : ''}
      </p>

      {(isAdmin || isSubAdmin) && (
        <button
          className="btn Infra-btn"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Close Edit' : 'Edit Details'}
        </button>
      )}

      {/* === LEFT SIDE NAVIGATION SECTIONS === */}
      <h3
        className={`branch-section-link ${
          activeSection === 'totalStaff' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('totalStaff')}
      >
        <span className="arrow">
          {activeSection === 'totalStaff' ? '▼' : '▶'}
        </span>
        Total Staff
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'connectivity' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('connectivity')}
      >
        <span className="arrow">
          {activeSection === 'connectivity' ? '▼' : '▶'}
        </span>
        Connectivity
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'biometrics' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('biometrics')}
      >
        <span className="arrow">
          {activeSection === 'biometrics' ? '▼' : '▶'}
        </span>
        Biometrics
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'scanner' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('scanner')}
      >
        <span className="arrow">
          {activeSection === 'scanner' ? '▼' : '▶'}
        </span>
        Scanner
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'projector' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('projector')}
      >
        <span className="arrow">
          {activeSection === 'projector' ? '▼' : '▶'}
        </span>
        Projector
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'printer' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('printer')}
      >
        <span className="arrow">
          {activeSection === 'printer' ? '▼' : '▶'}
        </span>
        Printer
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'desktop' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('desktop')}
      >
        <span className="arrow">
          {activeSection === 'desktop' ? '▼' : '▶'}
        </span>
        Desktop
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'laptop' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('laptop')}
      >
        <span className="arrow">
          {activeSection === 'laptop' ? '▼' : '▶'}
        </span>
        Laptop
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'cctv' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('cctv')}
      >
        <span className="arrow">
          {activeSection === 'cctv' ? '▼' : '▶'}
        </span>
        CCTV
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'panel' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('panel')}
      >
        <span className="arrow">
          {activeSection === 'panel' ? '▼' : '▶'}
        </span>
        Interactive Panel
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'ups' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('ups')}
      >
        <span className="arrow">
          {activeSection === 'ups' ? '▼' : '▶'}
        </span>
        UPS / Inverter
      </h3>

      <h3
        className={`branch-section-link ${
          activeSection === 'ipphone' ? 'active' : ''
        }`}
        onClick={() => onSectionClick('ipphone')}
      >
        <span className="arrow">
          {activeSection === 'ipphone' ? '▼' : '▶'}
        </span>
        IP Telephone
      </h3>
    </aside>
  );
}
