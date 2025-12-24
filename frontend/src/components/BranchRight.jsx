// src/components/BranchRight.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function BranchRight({
  id,
  token,
  branch,
  editMode,
  activeSection,
  display,
}) {
  const [form, setForm] = useState({});

  // local toggles for details
  const [showDesktopDetails, setShowDesktopDetails] = useState(false);
  const [showLaptopDetails, setShowLaptopDetails] = useState(false);
  const [showPrinterDetails, setShowPrinterDetails] = useState(false);
  const [showCctvDetails, setShowCctvDetails] = useState(false);
  const [showIpPhoneDetails, setShowIpPhoneDetails] = useState(false);

  // unpack nested infra from branch
  const infra = branch.infra || {};
  const scanner = branch.scanner || {};
  const projector = branch.projector || {};
  const printer = branch.printer || {};
  const desktop = branch.desktop || {};
  const laptop = branch.laptop || {};
  const cctv = branch.cctv || {};
  const panel = branch.panel || {};
  const ipphone = branch.ipphone || {};

  // initialize form when branch changes
  useEffect(() => {
    setForm({
      ...infra,
      ...scanner,
      ...projector,
      ...printer,
      ...desktop,
      ...laptop,
      ...cctv,
      ...panel,
      ...ipphone,
    });
  }, [branch]);

  const get = (key) => {
    if (Object.prototype.hasOwnProperty.call(form, key)) return form[key];

    if (Object.prototype.hasOwnProperty.call(infra, key)) return infra[key];
    if (Object.prototype.hasOwnProperty.call(scanner, key)) return scanner[key];
    if (Object.prototype.hasOwnProperty.call(projector, key)) return projector[key];
    if (Object.prototype.hasOwnProperty.call(printer, key)) return printer[key];
    if (Object.prototype.hasOwnProperty.call(desktop, key)) return desktop[key];
    if (Object.prototype.hasOwnProperty.call(laptop, key)) return laptop[key];
    if (Object.prototype.hasOwnProperty.call(cctv, key)) return cctv[key];
    if (Object.prototype.hasOwnProperty.call(panel, key)) return panel[key];
    if (Object.prototype.hasOwnProperty.call(ipphone, key)) return ipphone[key];

    return undefined;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // core infra
      const infraPayload = {
        total_staff:           form.total_staff,
        connectivity_status:   form.connectivity_status,
        connectivity_wlink:    form.connectivity_wlink,
        connectivity_lan_ip:   form.connectivity_lan_ip,
        connectivity_lan_switch: form.connectivity_lan_switch,
        connectivity_network:  form.connectivity_network,
        connectivity_wifi:     form.connectivity_wifi,
        biometrics_ip:         form.biometrics_ip,
      };

      // scanner
      const scannerPayload = {
        scanner_name: form.scanner_name,
        scanner_ip:   form.scanner_ip,
        remarks:      form.scanner_remarks || form.remarks,
      };

      // projector
      const projectorPayload = {
        projector_name:   form.projector_name,
        projector_ip:     form.projector_ip,
        projector_status: form.projector_status,
        location:         form.projector_location,
        remarks:          form.projector_remarks,
      };

      // printer
      const printerPayload = {
        printer_total_no: form.printer_total_no,
        printer_name:     form.printer_name,
        printer_ip:       form.printer_ip,
        printer_model:    form.printer_model,
        printer_3in1:     form.printer_3in1,
        remarks:          form.printer_remarks,
      };

      // desktop
      const desktopPayload = {
        desktop_total_no:  form.desktop_total_no,
        desktop_id:        form.desktop_id,
        desktop_brand:     form.desktop_brand,
        desktop_ram:       form.desktop_ram,
        desktop_ssd:       form.desktop_ssd,
        desktop_processor: form.desktop_processor,
        desktop_domain:    form.desktop_domain,
        remarks:           form.desktop_remarks,
      };

      // laptop
      const laptopPayload = {
        laptop_total_no:  form.laptop_total_no,
        laptop_id:        form.laptop_id,
        laptop_brand:     form.laptop_brand,
        laptop_ram:       form.laptop_ram,
        laptop_ssd:       form.laptop_ssd,
        laptop_processor: form.laptop_processor,
        laptop_domain:    form.laptop_domain,
        laptop_user:      form.laptop_user,
        remarks:          form.laptop_remarks,
      };

      // CCTV
      const cctvPayload = {
        cctv_total_no:    form.cctv_total_no,
        cctv_nvr_ip:      form.cctv_nvr_ip,
        cctv_record_days: form.cctv_record_days,
        cctv_nvr_details: form.cctv_nvr_details,
        remarks:          form.cctv_remarks,
      };

      // Panel
      const panelPayload = {
        panel_ip:     form.panel_ip,
        panel_status: form.panel_status,
        location:     form.panel_location,
        remarks:      form.panel_remarks,
      };

      // IP Phone
      const ipPhonePayload = {
        ip_telephone_status: form.ip_telephone_status,
        ip_telephone_ip:     form.ip_telephone_ip,
        ip_telephone_ext_no: form.ip_telephone_ext_no,
        model:               form.ip_telephone_model || form.model,
        remarks:             form.remarks,
      };

      await Promise.all([
        api.put(`/api/branches/${id}/infra`,     infraPayload,     { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/scanner`,   scannerPayload,   { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/projector`, projectorPayload, { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/printer`,   printerPayload,   { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/desktop`,   desktopPayload,   { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/laptop`,    laptopPayload,    { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/cctv`,      cctvPayload,      { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/panel`,     panelPayload,     { headers: { Authorization: `Bearer ${token}` } }),
        api.put(`/api/branches/${id}/ipphone`,   ipPhonePayload,   { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      alert('Updated successfully!');
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
          /* ==== EDIT MODE (unchanged) ==== */
          <section className="branch-edit-form">
            <h2>Edit Branch Infra</h2>

            {/* CORE INFRA */}
            <label>Total Staff</label>
            <input
              type="number"
              name="total_staff"
              value={get('total_staff') || ''}
              onChange={handleChange}
            />

            <label>Connectivity Status</label>
            <input
              type="text"
              name="connectivity_status"
              value={get('connectivity_status') || ''}
              onChange={handleChange}
            />

            <label>Wlink</label>
            <input
              type="text"
              name="connectivity_wlink"
              value={get('connectivity_wlink') || ''}
              onChange={handleChange}
            />

            <label>LAN IP</label>
            <input
              type="text"
              name="connectivity_lan_ip"
              value={get('connectivity_lan_ip') || ''}
              onChange={handleChange}
            />

            <label>LAN Switch</label>
            <input
              type="text"
              name="connectivity_lan_switch"
              value={get('connectivity_lan_switch') || ''}
              onChange={handleChange}
            />

            <label>Network</label>
            <input
              type="text"
              name="connectivity_network"
              value={get('connectivity_network') || ''}
              onChange={handleChange}
            />

            <label>WiFi</label>
            <input
              type="text"
              name="connectivity_wifi"
              value={get('connectivity_wifi') || ''}
              onChange={handleChange}
            />

            <label>Biometric IP</label>
            <input
              type="text"
              name="biometrics_ip"
              value={get('biometrics_ip') || ''}
              onChange={handleChange}
            />

            {/* Scanner */}
            <h3 style={{ marginTop: 16 }}>Scanner</h3>
            <label>Scanner Name</label>
            <input
              type="text"
              name="scanner_name"
              value={get('scanner_name') || ''}
              onChange={handleChange}
            />
            <label>Scanner IP</label>
            <input
              type="text"
              name="scanner_ip"
              value={get('scanner_ip') || ''}
              onChange={handleChange}
            />

            {/* Projector */}
            <h3 style={{ marginTop: 16 }}>Projector</h3>
            <label>Projector Name</label>
            <input
              type="text"
              name="projector_name"
              value={get('projector_name') || ''}
              onChange={handleChange}
            />
            <label>Projector IP</label>
            <input
              type="text"
              name="projector_ip"
              value={get('projector_ip') || ''}
              onChange={handleChange}
            />
            <label>Projector Status</label>
            <input
              type="text"
              name="projector_status"
              value={get('projector_status') || ''}
              onChange={handleChange}
            />

            {/* Printer */}
            <h3 style={{ marginTop: 16 }}>Printer</h3>
            <label>Printer Total No</label>
            <input
              type="number"
              name="printer_total_no"
              value={get('printer_total_no') || ''}
              onChange={handleChange}
            />
            <label>Printer Name</label>
            <input
              type="text"
              name="printer_name"
              value={get('printer_name') || ''}
              onChange={handleChange}
            />
            <label>Printer IP</label>
            <input
              type="text"
              name="printer_ip"
              value={get('printer_ip') || ''}
              onChange={handleChange}
            />
            <label>Printer Model</label>
            <input
              type="text"
              name="printer_model"
              value={get('printer_model') || ''}
              onChange={handleChange}
            />
            <label>Printer 3-in-1</label>
            <input
              type="text"
              name="printer_3in1"
              value={get('printer_3in1') || ''}
              onChange={handleChange}
            />

            {/* Desktop */}
            <h3 style={{ marginTop: 16 }}>Desktop</h3>
            <label>Desktop Total No</label>
            <input
              type="number"
              name="desktop_total_no"
              value={get('desktop_total_no') || ''}
              onChange={handleChange}
            />
            <label>Desktop IDs</label>
            <input
              type="text"
              name="desktop_id"
              value={get('desktop_id') || ''}
              onChange={handleChange}
            />
            <label>Desktop Brand</label>
            <input
              type="text"
              name="desktop_brand"
              value={get('desktop_brand') || ''}
              onChange={handleChange}
            />
            <label>Desktop RAM</label>
            <input
              type="text"
              name="desktop_ram"
              value={get('desktop_ram') || ''}
              onChange={handleChange}
            />
            <label>Desktop SSD</label>
            <input
              type="text"
              name="desktop_ssd"
              value={get('desktop_ssd') || ''}
              onChange={handleChange}
            />
            <label>Desktop Processor</label>
            <input
              type="text"
              name="desktop_processor"
              value={get('desktop_processor') || ''}
              onChange={handleChange}
            />
            <label>Desktop Domain</label>
            <input
              type="text"
              name="desktop_domain"
              value={get('desktop_domain') || ''}
              onChange={handleChange}
            />

            {/* Laptop */}
            <h3 style={{ marginTop: 16 }}>Laptop</h3>
            <label>Laptop Total No</label>
            <input
              type="number"
              name="laptop_total_no"
              value={get('laptop_total_no') || ''}
              onChange={handleChange}
            />
            <label>Laptop IDs</label>
            <input
              type="text"
              name="laptop_id"
              value={get('laptop_id') || ''}
              onChange={handleChange}
            />
            <label>Laptop Brand</label>
            <input
              type="text"
              name="laptop_brand"
              value={get('laptop_brand') || ''}
              onChange={handleChange}
            />
            <label>Laptop RAM</label>
            <input
              type="text"
              name="laptop_ram"
              value={get('laptop_ram') || ''}
              onChange={handleChange}
            />
            <label>Laptop SSD</label>
            <input
              type="text"
              name="laptop_ssd"
              value={get('laptop_ssd') || ''}
              onChange={handleChange}
            />
            <label>Laptop Processor</label>
            <input
              type="text"
              name="laptop_processor"
              value={get('laptop_processor') || ''}
              onChange={handleChange}
            />
            <label>Laptop Domain</label>
            <input
              type="text"
              name="laptop_domain"
              value={get('laptop_domain') || ''}
              onChange={handleChange}
            />
            <label>Laptop User</label>
            <input
              type="text"
              name="laptop_user"
              value={get('laptop_user') || ''}
              onChange={handleChange}
            />

            {/* CCTV */}
            <h3 style={{ marginTop: 16 }}>CCTV</h3>
            <label>CCTV Total No</label>
            <input
              type="number"
              name="cctv_total_no"
              value={get('cctv_total_no') || ''}
              onChange={handleChange}
            />
            <label>CCTV NVR IP</label>
            <input
              type="text"
              name="cctv_nvr_ip"
              value={get('cctv_nvr_ip') || ''}
              onChange={handleChange}
            />
            <label>Recording Days</label>
            <input
              type="text"
              name="cctv_record_days"
              value={get('cctv_record_days') || ''}
              onChange={handleChange}
            />
            <label>NVR Details</label>
            <input
              type="text"
              name="cctv_nvr_details"
              value={get('cctv_nvr_details') || ''}
              onChange={handleChange}
            />

            {/* Panel */}
            <h3 style={{ marginTop: 16 }}>Interactive Panel</h3>
            <label>Panel IP</label>
            <input
              type="text"
              name="panel_ip"
              value={get('panel_ip') || ''}
              onChange={handleChange}
            />
            <label>Panel Status</label>
            <input
              type="text"
              name="panel_status"
              value={get('panel_status') || ''}
              onChange={handleChange}
            />

            {/* UPS (UI only) */}
            <h3 style={{ marginTop: 16 }}>UPS / Inverter</h3>
            <label>UPS Total No</label>
            <input
              type="number"
              name="ups_total_no"
              value={get('ups_total_no') || ''}
              onChange={handleChange}
            />
            <label>UPS Model</label>
            <input
              type="text"
              name="ups_model"
              value={get('ups_model') || ''}
              onChange={handleChange}
            />
            <label>UPS Backup Time</label>
            <input
              type="text"
              name="ups_backup_time"
              value={get('ups_backup_time') || ''}
              onChange={handleChange}
            />
            <label>Installer</label>
            <input
              type="text"
              name="ups_installer"
              value={get('ups_installer') || ''}
              onChange={handleChange}
            />

            {/* IP Telephone */}
            <h3 style={{ marginTop: 16 }}>IP Telephone</h3>
            <label>IP Telephone Status</label>
            <input
              type="text"
              name="ip_telephone_status"
              value={get('ip_telephone_status') || ''}
              onChange={handleChange}
            />
            <label>IP Telephone IP</label>
            <input
              type="text"
              name="ip_telephone_ip"
              value={get('ip_telephone_ip') || ''}
              onChange={handleChange}
            />
            <label>IP Telephone Ext No</label>
            <input
              type="text"
              name="ip_telephone_ext_no"
              value={get('ip_telephone_ext_no') || ''}
              onChange={handleChange}
            />
            <label>Model</label>
            <input
              type="text"
              name="ip_telephone_model"
              value={get('ip_telephone_model') || ''}
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
          /* ==== VIEW MODE – ALL TABLES WITH HORIZONTAL TH ==== */
          <>
            {/* TOTAL STAFF */}
            <div
              className={`slide-container ${
                activeSection === 'totalStaff' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Total Staff</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('total_staff'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* CONNECTIVITY */}
            <div
              className={`slide-container ${
                activeSection === 'connectivity' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Wlink</th>
                    <th>LAN IP</th>
                    <th>LAN Switch</th>
                    <th>Network</th>
                    <th>WiFi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('connectivity_status'))}</td>
                    <td>{display(get('connectivity_wlink'))}</td>
                    <td>{display(get('connectivity_lan_ip'))}</td>
                    <td>{display(get('connectivity_lan_switch'))}</td>
                    <td>{display(get('connectivity_network'))}</td>
                    <td>{display(get('connectivity_wifi'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* BIOMETRICS */}
            <div
              className={`slide-container ${
                activeSection === 'biometrics' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Biometric IP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('biometrics_ip'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SCANNER */}
            <div
              className={`slide-container ${
                activeSection === 'scanner' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Scanner Name</th>
                    <th>Scanner IP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('scanner_name'))}</td>
                    <td>{display(get('scanner_ip'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PROJECTOR */}
            <div
              className={`slide-container ${
                activeSection === 'projector' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Projector Name</th>
                    <th>Projector IP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('projector_name'))}</td>
                    <td>{display(get('projector_ip'))}</td>
                    <td>{display(get('projector_status'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PRINTER – summary ID/Name/Brand/Details */}
            <div
              className={`slide-container ${
                activeSection === 'printer' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('printer_ip'))}</td>
                    <td>Printer</td>
                    <td>{display(get('printer_model'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() =>
                          setShowPrinterDetails((prev) => !prev)
                        }
                      >
                        {showPrinterDetails ? 'Hide Details' : 'Details'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Printer details as one horizontal row */}
              {showPrinterDetails && (
                <table
                  className="branch-infra-table"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Total No</th>
                      <th>Printer Name</th>
                      <th>Printer IP</th>
                      <th>Printer Model</th>
                      <th>3-in-1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('printer_total_no'))}</td>
                      <td>{display(get('printer_name'))}</td>
                      <td>{display(get('printer_ip'))}</td>
                      <td>{display(get('printer_model'))}</td>
                      <td>{display(get('printer_3in1'))}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* DESKTOP – summary ID/Name/Brand/Details */}
            <div
              className={`slide-container ${
                activeSection === 'desktop' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('desktop_id'))}</td>
                    <td>Desktop</td>
                    <td>{display(get('desktop_brand'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() =>
                          setShowDesktopDetails((prev) => !prev)
                        }
                      >
                        {showDesktopDetails ? 'Hide Details' : 'Details'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Desktop details as one horizontal row */}
              {showDesktopDetails && (
                <table
                  className="branch-infra-table"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Desktop IDs</th>
                      <th>Brand</th>
                      <th>RAM</th>
                      <th>SSD / HDD</th>
                      <th>Processor</th>
                      <th>Domain</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('desktop_id'))}</td>
                      <td>{display(get('desktop_brand'))}</td>
                      <td>{display(get('desktop_ram'))}</td>
                      <td>{display(get('desktop_ssd'))}</td>
                      <td>{display(get('desktop_processor'))}</td>
                      <td>{display(get('desktop_domain'))}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* LAPTOP – summary ID/Name/Brand/Details */}
            <div
              className={`slide-container ${
                activeSection === 'laptop' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('laptop_id'))}</td>
                    <td>Laptop</td>
                    <td>{display(get('laptop_brand'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() =>
                          setShowLaptopDetails((prev) => !prev)
                        }
                      >
                        {showLaptopDetails ? 'Hide Details' : 'Details'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Laptop details as one horizontal row */}
              {showLaptopDetails && (
                <table
                  className="branch-infra-table"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Laptop IDs</th>
                      <th>Brand</th>
                      <th>RAM</th>
                      <th>SSD / HDD</th>
                      <th>Processor</th>
                      <th>Domain</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('laptop_id'))}</td>
                      <td>{display(get('laptop_brand'))}</td>
                      <td>{display(get('laptop_ram'))}</td>
                      <td>{display(get('laptop_ssd'))}</td>
                      <td>{display(get('laptop_processor'))}</td>
                      <td>{display(get('laptop_domain'))}</td>
                      <td>{display(get('laptop_user'))}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* CCTV – summary ID/Name/Brand/Details */}
            <div
              className={`slide-container ${
                activeSection === 'cctv' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('cctv_nvr_ip'))}</td>
                    <td>CCTV Cameras</td>
                    <td>{display(get('cctv_nvr_details'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() =>
                          setShowCctvDetails((prev) => !prev)
                        }
                      >
                        {showCctvDetails ? 'Hide Details' : 'Details'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* CCTV details as one horizontal row */}
              {showCctvDetails && (
                <table
                  className="branch-infra-table"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Camera IDs</th>
                      <th>NVR IP</th>
                      <th>Record Days</th>
                      <th>NVR Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('cctv_id'))}</td>
                      <td>{display(get('cctv_nvr_ip'))}</td>
                      <td>{display(get('cctv_record_days'))}</td>
                      <td>{display(get('cctv_nvr_details'))}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>

            {/* PANEL */}
            <div
              className={`slide-container ${
                activeSection === 'panel' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>Panel IP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('panel_ip'))}</td>
                    <td>{display(get('panel_status'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* UPS */}
            <div
              className={`slide-container ${
                activeSection === 'ups' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>UPS IDs</th>
                    <th>UPS Model</th>
                    <th>Backup Time</th>
                    <th>Installer</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('ups_id'))}</td>
                    <td>{display(get('ups_model'))}</td>
                    <td>{display(get('ups_backup_time'))}</td>
                    <td>{display(get('ups_installer'))}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* IP Telephone – summary ID/Name/Brand/Details */}
            <div
              className={`slide-container ${
                activeSection === 'ipphone' ? 'slide-open' : 'slide-closed'
              }`}
            >
              <table className="branch-infra-table" style={{ width: '100%' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{display(get('ip_telephone_ip'))}</td>
                    <td>IP Telephone</td>
                    <td>{display(get('ip_telephone_model'))}</td>
                    <td>
                      <button
                        className="btn Infra-btn"
                        onClick={() =>
                          setShowIpPhoneDetails((prev) => !prev)
                        }
                      >
                        {showIpPhoneDetails ? 'Hide Details' : 'Details'}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* IP Telephone details as one horizontal row */}
              {showIpPhoneDetails && (
                <table
                  className="branch-infra-table"
                  style={{ marginTop: '1rem', width: '100%' }}
                >
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>IP</th>
                      <th>Ext No</th>
                      <th>3 in 1 </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{display(get('ip_telephone_status'))}</td>
                      <td>{display(get('ip_telephone_ip'))}</td>
                      <td>{display(get('ip_telephone_ext_no'))}</td>
                      <td>{display(get('ip_3in1'))}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
    