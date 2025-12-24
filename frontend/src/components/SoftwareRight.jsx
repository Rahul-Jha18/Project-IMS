// src/components/SoftwareRight.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function SoftwareRight({
  id,
  token,
  software,
  editMode,
  activeSection,
  onSectionClick,   // ✅ new prop
  display,
}) {
  const [form, setForm] = useState({});

  // copy flat object from API into form
  useEffect(() => {
    setForm(software || {});
  }, [software]);

  const get = (key) => {
    if (form && Object.prototype.hasOwnProperty.call(form, key)) {
      return form[key];
    }
    if (software && Object.prototype.hasOwnProperty.call(software, key)) {
      return software[key];
    }
    return undefined;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/api/software/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Software details updated successfully!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <section className="branch-right">
      <div className="branch-right-inner">
        {editMode ? (
          /* ===== EDIT MODE ===== */
          <section className="branch-edit-form">
            <h2>Edit Software Details</h2>

            {/* OFFICE 365 */}
            <h3 style={{ marginTop: 16 }}>Office 365</h3>
            <label>Total Licenses</label>
            <input
              type="number"
              name="o365_total_licenses"
              value={get('o365_total_licenses') || ''}
              onChange={handleChange}
            />
            <label>Assigned Users (emails / count)</label>
            <input
              type="text"
              name="o365_assigned_users"
              value={get('o365_assigned_users') || ''}
              onChange={handleChange}
            />
            <label>Plan (Business Std / E1 / E3)</label>
            <input
              type="text"
              name="o365_plan"
              value={get('o365_plan') || ''}
              onChange={handleChange}
            />
            <label>Expiry</label>
            <input
              type="text"
              name="o365_expiry"
              value={get('o365_expiry') || ''}
              onChange={handleChange}
            />
            <label>Remarks</label>
            <input
              type="text"
              name="o365_remarks"
              value={get('o365_remarks') || ''}
              onChange={handleChange}
            />

            {/* ANTIVIRUS */}
            <h3 style={{ marginTop: 16 }}>Antivirus</h3>
            <label>Vendor / Product</label>
            <input
              type="text"
              name="av_vendor"
              value={get('av_vendor') || ''}
              onChange={handleChange}
            />
            <label>Total Licenses</label>
            <input
              type="number"
              name="av_total_licenses"
              value={get('av_total_licenses') || ''}
              onChange={handleChange}
            />
            <label>Expiry</label>
            <input
              type="text"
              name="av_expiry"
              value={get('av_expiry') || ''}
              onChange={handleChange}
            />
            <label>Last Update</label>
            <input
              type="text"
              name="av_last_update"
              value={get('av_last_update') || ''}
              onChange={handleChange}
            />
            <label>Status (Active / Expired)</label>
            <input
              type="text"
              name="av_status"
              value={get('av_status') || ''}
              onChange={handleChange}
            />

            {/* OUTSOURCE STAFF */}
            <h3 style={{ marginTop: 16 }}>Outsource Staff</h3>
            <label>Total Outsource Staff</label>
            <input
              type="number"
              name="outsource_total_staff"
              value={get('outsource_total_staff') || ''}
              onChange={handleChange}
            />
            <label>Vendor Names</label>
            <input
              type="text"
              name="outsource_vendor_names"
              value={get('outsource_vendor_names') || ''}
              onChange={handleChange}
            />
            <label>Roles (Computer Operator / IT Support)</label>
            <input
              type="text"
              name="outsource_roles"
              value={get('outsource_roles') || ''}
              onChange={handleChange}
            />
            <label>Contract End</label>
            <input
              type="text"
              name="outsource_contract_end"
              value={get('outsource_contract_end') || ''}
              onChange={handleChange}
            />
            <label>Remarks</label>
            <input
              type="text"
              name="outsource_remarks"
              value={get('outsource_remarks') || ''}
              onChange={handleChange}
            />

            {/* CORE APPS */}
            <h3 style={{ marginTop: 16 }}>Core Applications</h3>
            <label>Core Apps List (CPAS, FINPOS, DMS...)</label>
            <input
              type="text"
              name="core_apps_list"
              value={get('core_apps_list') || ''}
              onChange={handleChange}
            />
            <label>CPAS Users (count / IDs)</label>
            <input
              type="text"
              name="core_cpas_users"
              value={get('core_cpas_users') || ''}
              onChange={handleChange}
            />
            <label>FINPOS Users</label>
            <input
              type="text"
              name="core_finpos_users"
              value={get('core_finpos_users') || ''}
              onChange={handleChange}
            />
            <label>DMS Users</label>
            <input
              type="text"
              name="core_dms_users"
              value={get('core_dms_users') || ''}
              onChange={handleChange}
            />

            {/* LOCAL SOFTWARE */}
            <h3 style={{ marginTop: 16 }}>Local Software</h3>
            <label>Installed Software List</label>
            <input
              type="text"
              name="local_software_list"
              value={get('local_software_list') || ''}
              onChange={handleChange}
            />
            <label>PDF Tools</label>
            <input
              type="text"
              name="local_pdf_tools"
              value={get('local_pdf_tools') || ''}
              onChange={handleChange}
            />
            <label>Scanner Tools</label>
            <input
              type="text"
              name="local_scanner_tools"
              value={get('local_scanner_tools') || ''}
              onChange={handleChange}
            />
            <label>CCTV Client</label>
            <input
              type="text"
              name="local_cctv_client"
              value={get('local_cctv_client') || ''}
              onChange={handleChange}
            />

            {/* COMPLIANCE */}
            <h3 style={{ marginTop: 16 }}>Compliance / Remarks</h3>
            <label>Windows Activated (Yes/No)</label>
            <input
              type="text"
              name="comp_windows_activated"
              value={get('comp_windows_activated') || ''}
              onChange={handleChange}
            />
            <label>Office Activated (Yes/No)</label>
            <input
              type="text"
              name="comp_office_activated"
              value={get('comp_office_activated') || ''}
              onChange={handleChange}
            />
            <label>Antivirus Active (Yes/No)</label>
            <input
              type="text"
              name="comp_av_active"
              value={get('comp_av_active') || ''}
              onChange={handleChange}
            />
            <label>Auto Update Enabled (Yes/No)</label>
            <input
              type="text"
              name="comp_auto_update"
              value={get('comp_auto_update') || ''}
              onChange={handleChange}
            />
            <label>Remarks</label>
            <input
              type="text"
              name="comp_remarks"
              value={get('comp_remarks') || ''}
              onChange={handleChange}
            />

            <button
              className="btn Infra-btn"
              onClick={handleUpdate}
              style={{ marginTop: 18 }}
            >
              Save
            </button>
          </section>
        ) : (
          /* ===== VIEW MODE ===== */
          <>
            {/* 🔹 MAIN SUMMARY TABLE */}
            <div className="slide-container slide-open">
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Summary</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Office 365 */}
                  <tr>
                    <td>1</td>
                    <td>Office 365</td>
                    <td>
                      {display(get('o365_plan'))} –{' '}
                      {display(get('o365_total_licenses'))} licenses
                    </td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() => onSectionClick('office365')}
                      >
                        {activeSection === 'office365'
                          ? 'Hide Details'
                          : 'Details'}
                      </button>
                    </td>
                  </tr>

                  {/* Antivirus */}
                  <tr>
                    <td>2</td>
                    <td>Antivirus</td>
                    <td>
                      {display(get('av_vendor'))} –{' '}
                      {display(get('av_status'))}
                    </td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() => onSectionClick('antivirus')}
                      >
                        {activeSection === 'antivirus'
                          ? 'Hide Details'
                          : 'Details'}
                      </button>
                    </td>
                  </tr>

                  {/* Outsource Staff */}
                  <tr>
                    <td>3</td>
                    <td>Outsource Staff</td>
                    <td>
                      {display(get('outsource_total_staff'))} staff –{' '}
                      {display(get('outsource_vendor_names'))}
                    </td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() => onSectionClick('outsource')}
                      >
                        {activeSection === 'outsource'
                          ? 'Hide Details'
                          : 'Details'}
                      </button>
                    </td>
                  </tr>

                  {/* Core Apps */}
                  <tr>
                    <td>4</td>
                    <td>Core Applications</td>
                    <td>{display(get('core_apps_list'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() => onSectionClick('coreApps')}
                      >
                        {activeSection === 'coreApps'
                          ? 'Hide Details'
                          : 'Details'}
                      </button>
                    </td>
                  </tr>

                  {/* Local Software */}
                  <tr>
                    <td>5</td>
                    <td>Local Software</td>
                    <td>{display(get('local_software_list'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() => onSectionClick('localSoftware')}
                      >
                        {activeSection === 'localSoftware'
                          ? 'Hide Details'
                          : 'Details'}
                      </button>
                    </td>
                  </tr>

                  {/* Compliance */}
                  <tr>
                    <td>6</td>
                    <td>Compliance</td>
                    <td>{display(get('comp_remarks'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() => onSectionClick('compliance')}
                      >
                        {activeSection === 'compliance'
                          ? 'Hide Details'
                          : 'Details'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 🔹 DETAILS TABLE (ONLY ONE OPEN AT A TIME) */}

            {activeSection === 'office365' && (
              <div
                className="slide-container slide-open"
                style={{ marginTop: '1rem' }}
              >
                <table
                  className="branch-infra-table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Total Licenses</th>
                      <th>Assigned Users</th>
                      <th>Plan</th>
                      <th>Expiry</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('o365_total_licenses'))}</td>
                      <td>{display(get('o365_assigned_users'))}</td>
                      <td>{display(get('o365_plan'))}</td>
                      <td>{display(get('o365_expiry'))}</td>
                      <td>{display(get('o365_remarks'))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'antivirus' && (
              <div
                className="slide-container slide-open"
                style={{ marginTop: '1rem' }}
              >
                <table
                  className="branch-infra-table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Vendor</th>
                      <th>Total Licenses</th>
                      <th>Expiry</th>
                      <th>Last Update</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('av_vendor'))}</td>
                      <td>{display(get('av_total_licenses'))}</td>
                      <td>{display(get('av_expiry'))}</td>
                      <td>{display(get('av_last_update'))}</td>
                      <td>{display(get('av_status'))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'outsource' && (
              <div
                className="slide-container slide-open"
                style={{ marginTop: '1rem' }}
              >
                <table
                  className="branch-infra-table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Total Staff</th>
                      <th>Vendors</th>
                      <th>Roles</th>
                      <th>Contract End</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('outsource_total_staff'))}</td>
                      <td>{display(get('outsource_vendor_names'))}</td>
                      <td>{display(get('outsource_roles'))}</td>
                      <td>{display(get('outsource_contract_end'))}</td>
                      <td>{display(get('outsource_remarks'))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'coreApps' && (
              <div
                className="slide-container slide-open"
                style={{ marginTop: '1rem' }}
              >
                <table
                  className="branch-infra-table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Core Apps</th>
                      <th>CPAS Users</th>
                      <th>FINPOS Users</th>
                      <th>DMS Users</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('core_apps_list'))}</td>
                      <td>{display(get('core_cpas_users'))}</td>
                      <td>{display(get('core_finpos_users'))}</td>
                      <td>{display(get('core_dms_users'))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'localSoftware' && (
              <div
                className="slide-container slide-open"
                style={{ marginTop: '1rem' }}
              >
                <table
                  className="branch-infra-table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Installed Software</th>
                      <th>PDF Tools</th>
                      <th>Scanner Tools</th>
                      <th>CCTV Client</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('local_software_list'))}</td>
                      <td>{display(get('local_pdf_tools'))}</td>
                      <td>{display(get('local_scanner_tools'))}</td>
                      <td>{display(get('local_cctv_client'))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeSection === 'compliance' && (
              <div
                className="slide-container slide-open"
                style={{ marginTop: '1rem' }}
              >
                <table
                  className="branch-infra-table"
                  style={{ width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Windows Activated</th>
                      <th>Office Activated</th>
                      <th>Antivirus Active</th>
                      <th>Auto Update</th>
                      <th>Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('comp_windows_activated'))}</td>
                      <td>{display(get('comp_office_activated'))}</td>
                      <td>{display(get('comp_av_active'))}</td>
                      <td>{display(get('comp_auto_update'))}</td>
                      <td>{display(get('comp_remarks'))}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
