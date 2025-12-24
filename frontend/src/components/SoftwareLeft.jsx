// src/components/SoftwareLeft.jsx
import React from 'react';

export default function SoftwareLeft({
  software,
  navigate,
  isAdmin,
  isSubAdmin,
  editMode,
  setEditMode,
  activeSection,
  onSectionClick,
  display,
}) {
  // READ branch info from software object (flat or nested)
  const branchName =
    software.branchName ||
    software.branch?.name ||
    software.branch?.branchName;

  const branchManager =
    software.manager_name ||
    software.branch?.manager_name ||
    software.branch?.managerName;

  const branchLocation =
    software.branchLocation ||
    software.branch?.address ||
    software.branch?.location;

  return (
    <aside className="branch-left">
      {/* BACK BUTTON */}
      <button className="btn Infra-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="branch-title">Software Details</h2>

      {/* BRANCH INFO */}
      <p><strong>Branch:</strong> {display(branchName)}</p>
      <p><strong>Branch Manager:</strong> {display(branchManager)}</p>
      <p><strong>Location:</strong> {display(branchLocation)}</p>

      {/* EDIT BUTTON */}
      {(isAdmin || isSubAdmin) && (
        <button
          className="btn Infra-btn"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? 'Close Edit' : 'Edit Software'}
        </button>
      )}

      {/* ==== SECTION LINKS ==== */}
      <h3
        className={`branch-section-link ${activeSection === 'office365' ? 'active' : ''}`}
        onClick={() => onSectionClick('office365')}
      >
        <span className="arrow">{activeSection === 'office365' ? '▼' : '▶'}</span>
        Office 365
      </h3>

      <h3
        className={`branch-section-link ${activeSection === 'antivirus' ? 'active' : ''}`}
        onClick={() => onSectionClick('antivirus')}
      >
        <span className="arrow">{activeSection === 'antivirus' ? '▼' : '▶'}</span>
        Antivirus
      </h3>

      <h3
        className={`branch-section-link ${activeSection === 'outsource' ? 'active' : ''}`}
        onClick={() => onSectionClick('outsource')}
      >
        <span className="arrow">{activeSection === 'outsource' ? '▼' : '▶'}</span>
        Outsource Staff
      </h3>

      <h3
        className={`branch-section-link ${activeSection === 'coreApps' ? 'active' : ''}`}
        onClick={() => onSectionClick('coreApps')}
      >
        <span className="arrow">{activeSection === 'coreApps' ? '▼' : '▶'}</span>
        Core Applications
      </h3>

      <h3
        className={`branch-section-link ${activeSection === 'localSoftware' ? 'active' : ''}`}
        onClick={() => onSectionClick('localSoftware')}
      >
        <span className="arrow">{activeSection === 'localSoftware' ? '▼' : '▶'}</span>
        Local Software
      </h3>

      <h3
        className={`branch-section-link ${activeSection === 'compliance' ? 'active' : ''}`}
        onClick={() => onSectionClick('compliance')}
      >
        <span className="arrow">{activeSection === 'compliance' ? '▼' : '▶'}</span>
        Compliance / Remarks
      </h3>
    </aside>
  );
}
