import React, { useState, useEffect } from 'react';
import {
    Fingerprint,
    Key,
    ShieldAlert,
    Copy,
    Eye,
    EyeOff,
    Plus,
    Trash2,
    Search,
    CheckCircle,
    Clock,
    Activity,
    ShieldCheck,
    AlertTriangle,
    ExternalLink,
    Download,
    RefreshCw
} from 'lucide-react';

const ClientCredentials = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const clients = [
        { id: 1, name: 'Nexura Technologies', uid: 'CLT-NX-2024-001', email: 'contact@nexura.com', status: 'Active', login: '15 Apr 2026, 10:30 AM', sessions: 3, pass: 'SecP@ss2024!Nx', role: 'Main Admin' },
        { id: 2, name: 'Digital Solutions Inc', uid: 'CLT-DS-2024-012', email: 'admin@digsol.com', status: 'Active', login: '15 Apr 2026, 09:45 AM', sessions: 2, pass: 'DigSol#Secure99', role: 'Project Manager' },
        { id: 3, name: 'CloudPeak Ventures', uid: 'CLT-CP-2024-005', email: 'portal@cloudpeak.io', status: 'Pending', login: 'Never', sessions: 0, pass: 'PendingAuth_25', role: 'Auditor' },
    ];

    const activeClient = selectedClient || clients[0];

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        alert(`${label} Copied to Secure Clipboard`);
    };

    return (
        <div className="client-credentials-wrapper">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Client Access Infrastructure</h1>
                    <p className="text-muted small mb-0">Manage encrypted gateway credentials and portal permission matrices.</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-outline-primary shadow-sm hov-translate-up" onClick={() => alert('Credential Export Initiated')}>
                        <Download size={18} className="me-2" />Security Audit Export
                    </button>
                </div>
            </div>

            {/* Credential Spotlight & Permissions */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-8">
                    <div className="app-card shadow-sm h-100 border-left-blue overflow-hidden">
                        <div className="app-card-header p-3 border-bottom d-flex align-items-center bg-light bg-opacity-50">
                            <Fingerprint size={20} className="me-2 text-primary" />
                            <h4 className="app-card-title mb-0">Active Credential Spotlight: {activeClient.name}</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="cred-card shadow-sm mb-4 position-relative overflow-hidden p-4" style={{ background: 'linear-gradient(135deg, #1a1d20 0%, #343a40 100%)', color: 'white', borderRadius: 12 }}>
                                <div className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <div className="cred-label opacity-75 extra-small text-uppercase fw-bold mb-1">Authenticated Gateway Entry Point</div>
                                        <div className="cred-value d-flex align-items-center">
                                            <span className="font-monospace fs-5 fw-bold text-warning">https://portal.capernaum.com</span>
                                            <button className="btn btn-sm text-white ms-3 p-0 hov-text-warning" onClick={() => copyToClipboard('https://portal.capernaum.com', 'URL')}><Copy size={16} /></button>
                                        </div>
                                    </div>
                                    <div className="bg-white bg-opacity-10 p-2 rounded-circle">
                                        <ShieldCheck size={32} className="text-warning" />
                                    </div>
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <div className="p-3 rounded-3 border bg-light h-100">
                                        <div className="extra-small text-muted text-uppercase fw-bold mb-1">Security Identifier (UID)</div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="font-monospace fw-bold text-dark">{activeClient.uid}</span>
                                            <button className="btn btn-sm btn-link p-0 text-muted" onClick={() => copyToClipboard(activeClient.uid, 'UID')}><Copy size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 rounded-3 border bg-light h-100">
                                        <div className="extra-small text-muted text-uppercase fw-bold mb-1">Auth Relay (Email)</div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <span className="font-monospace fw-bold text-dark">{activeClient.email}</span>
                                            <button className="btn btn-sm btn-link p-0 text-muted" onClick={() => copyToClipboard(activeClient.email, 'Email')}><Copy size={16} /></button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="p-4 rounded-3 border-dashed border-primary bg-primary bg-opacity-05">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <div className="extra-small text-muted text-uppercase fw-bold mb-1">Active Access Token</div>
                                                <span className="font-monospace fw-bold fs-5 text-dark letter-spacing-1">{showPass ? activeClient.pass : '••••••••••••'}</span>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-sm btn-outline-secondary px-3 btn-light rounded-pill fw-bold" onClick={() => setShowPass(!showPass)}>
                                                    {showPass ? <>Conceal</> : <>Reveal</>}
                                                </button>
                                                <button className="btn btn-sm btn-primary px-3 rounded-pill fw-bold shadow-sm" style={{ background: '#636260ff', borderColor: '#9B7D3D', color: 'white' }} onClick={() => alert('Entropy Refresh Initiated')}>
                                                    Refresh Key
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="app-card shadow-sm h-100 border-left-orange">
                        <div className="app-card-header p-3 border-bottom d-flex align-items-center bg-light bg-opacity-50">
                            <ShieldCheck size={20} className="me-2 text-warning" />
                            <h4 className="app-card-title mb-0">Permission Matrix</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="mb-4">
                                {[
                                    { id: 'viewProjects', label: 'Inspect Deliverables' },
                                    { id: 'viewReports', label: 'Operational Telemetry' },
                                    { id: 'uploadDocs', label: 'Documentation Injection' },
                                    { id: 'viewAnalytics', label: 'Executive Analytics View' },
                                    { id: 'exportData', label: 'Master Data Export' }
                                ].map((perm, idx) => (
                                    <div className="form-check mb-3 hov-bg-light p-2 rounded-2 transition-all cursor-pointer" key={idx}>
                                        <input className="form-check-input ms-0 me-3" type="checkbox" id={perm.id} defaultChecked={idx < 4} style={{ width: '1.2rem', height: '1.2rem' }} />
                                        <label className="form-check-label fw-semibold text-dark small" htmlFor={perm.id}>{perm.label}</label>
                                    </div>
                                ))}
                            </div>
                            <button className="btn btn-danger w-100 py-3 fw-bold shadow-sm text-uppercase letter-spacing-1" style={{ fontSize: '0.75rem' }}>
                                Commit Security Policy Update
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Infrastructure Auth Registry */}
            <div className="app-card app-card-table shadow-sm mb-4 overflow-hidden">
                <div className="app-card-header p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
                    <div className="d-flex align-items-center">
                        <Key size={20} className="me-2 text-muted" />
                        <h4 className="app-card-title mb-0">Infrastructure Authentication Registry</h4>
                    </div>
                    <div className="search-box position-relative">
                        <Search size={16} className="position-absolute translate-middle-y top-50 ms-3 text-muted" />
                        <input type="text" className="form-control form-control-sm ps-5 rounded-pill border-light" placeholder="Search auth entries..." onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table table-hover mb-0 app-table-hover align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">Entity Identity</th>
                                <th className="py-3">Gateway Role</th>
                                <th className="py-3">Last Temporal Pulse</th>
                                <th className="py-3">Active Cluster</th>
                                <th className="text-end px-4 py-3">Auth Ops</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
                                <tr key={client.id} onClick={() => setSelectedClient(client)} style={{ cursor: 'pointer' }} className={activeClient.id === client.id ? 'table-primary bg-opacity-10' : ''}>
                                    <td className="px-4 py-3">
                                        <div className="fw-bold text-dark">{client.name}</div>
                                        <div className="text-muted extra-small font-monospace">{client.uid}</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className="badge bg-soft-info text-info border px-3 py-1 rounded-pill">{client.role}</span>
                                    </td>
                                    <td className="py-3 px-3">
                                        <div className="d-flex align-items-center small text-muted">
                                            <Clock size={12} className="me-2" />
                                            {client.login}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <Activity size={14} className="me-2 text-success" />
                                            <span className="small fw-bold text-dark">{client.sessions} Nodes</span>
                                        </div>
                                    </td>
                                    <td className="text-end px-4 py-3">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button className="btn btn-sm btn-action btn-view" title="Security Insights"><ExternalLink size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#editCredModal" onClick={(e) => { e.stopPropagation(); setSelectedClient(client); setEditMode(true); }} title="Modify Auth Matrix"><Key size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-delete text-danger" data-bs-toggle="modal" data-bs-target="#revokeConfirmModal" onClick={(e) => { e.stopPropagation(); setSelectedClient(client); }} title="Revoke Gateway Access"><ShieldAlert size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* EDIT PERMISSION MODAL */}
            <div className="modal fade" id="editCredModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4">
                            <h5 className="modal-title fw-bold"><i className="fa-solid fa-lock me-2"></i>Auth Protocol Orchestration</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <div className="row g-4 align-items-center">
                                <div className="col-md-5 text-center border-end">
                                    <div className="mx-auto mb-3 bg-primary bg-opacity-10 text-primary border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 80, height: 80, fontSize: '2rem' }}>
                                        <CheckCircle size={40} />
                                    </div>
                                    <h4 className="fw-bold mb-1 text-dark">{selectedClient?.name || 'Asset Identification...'}</h4>
                                    <span className="badge bg-light text-muted border px-3 py-1 font-monospace">{selectedClient?.uid || '---'}</span>
                                </div>
                                <div className="col-md-7">
                                    <div className="mb-4">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2 d-block">System Role Authorization</label>
                                        <select className="form-select fw-bold text-primary" defaultValue={selectedClient?.role}>
                                            <option>Main Enterprise Admin</option>
                                            <option>Regional Manager</option>
                                            <option>Compliance Auditor</option>
                                            <option>Executive Viewer Only</option>
                                        </select>
                                    </div>
                                    <div className="p-3 rounded-3 border bg-warning bg-opacity-10 d-flex align-items-start m-0">
                                        <AlertTriangle size={24} className="text-warning me-3 flex-shrink-0" />
                                        <div className="small text-dark fw-semibold">Role modifications instantly propagate across the digital enterprise network. Ensure compliance protocols are met.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Cancel Session</button>
                            <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg hov-translate-up" style={{ background: '#9B7D3D', borderColor: '#9B7D3D' }} onClick={() => alert('Access Matrix Propagated')}>Push Security Assets</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* REVOKE CONFIRMATION MODAL */}
            <div className="modal fade" id="revokeConfirmModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-body p-5 text-center">
                            <div className="mb-4 d-inline-block bg-danger bg-opacity-10 p-4 rounded-circle">
                                <ShieldAlert size={48} className="text-danger" />
                            </div>
                            <h4 className="fw-bold mb-3 text-dark">Revoke Gateway Access?</h4>
                            <p className="text-muted mb-4 small">This will immediately terminate all active authenticated sessions for <strong className="text-dark font-monospace">{selectedClient?.name}</strong>. The entity will be locked from the external infrastructure.</p>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-light flex-grow-1 py-3 fw-bold border" data-bs-dismiss="modal">Abort</button>
                                <button type="button" className="btn btn-danger flex-grow-1 py-3 fw-bold shadow-sm" onClick={() => { alert('Gateway Access Revoked'); }}>Confirm Revocation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientCredentials;
