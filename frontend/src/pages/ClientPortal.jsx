import React, { useState, useEffect } from 'react';
import { 
    Building, 
    ShieldCheck, 
    Users, 
    Activity, 
    Plus, 
    Eye, 
    Pencil, 
    Trash2, 
    Search, 
    Key, 
    Info, 
    AlertTriangle, 
    CheckCircle,
    Clock,
    FileText,
    ExternalLink,
    Wand2
} from 'lucide-react';

const ClientPortal = () => {
    const [portalActive, setPortalActive] = useState(true);
    const [selectedClient, setSelectedClient] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [clients, setClients] = useState([
        { id: 1, name: 'Nexura Technologies', code: 'NEX-8241', email: 'contact@nexura.com', projects: 3, portal: 'Enabled', status: 'Active', manager: 'Rajesh Kumar', phone: '+91 98765 43210', sla: 'Premium (24hr)', projectsList: ['Audio Transcription Q2', 'Data Labeling V3', 'Voice Core'] },
        { id: 2, name: 'Digital Solutions Inc', code: 'DIG-5512', email: 'admin@digsol.com', projects: 5, portal: 'Enabled', status: 'Active', manager: 'Priya Sharma', phone: '+91 87654 32109', sla: 'Enterprise (4hr)', projectsList: ['Global Support Desk', 'L1 Outreach', 'Technical Audit'] },
        { id: 3, name: 'CloudPeak Ventures', code: 'CLO-3391', email: 'portal@cloudpeak.io', projects: 2, portal: 'Pending', status: 'Pending', manager: 'Vikram Singh', phone: '+91 76543 21098', sla: 'Standard (48hr)', projectsList: ['Lead Qualification'] },
        { id: 4, name: 'FinServe Global', code: 'FIN-1029', email: 'contact@finserve.com', projects: 4, portal: 'Enabled', status: 'Active', manager: 'Rajesh Kumar', phone: '+91 65432 10987', sla: 'Enterprise (4hr)', projectsList: ['Compliance Review', 'KYC Verification'] },
    ]);

    const handleProvisionClient = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('company');
        const email = formData.get('email');
        const phone = formData.get('phone');
        
        const newClient = {
            id: Date.now(),
            name: name,
            code: name.substring(0, 3).toUpperCase() + '-' + Math.floor(Math.random() * 9000 + 1000),
            email: email,
            projects: 0,
            portal: 'Enabled',
            status: 'Active',
            manager: formData.get('manager'),
            phone: phone,
            sla: formData.get('sla'),
            projectsList: []
        };
        setClients([newClient, ...clients]);
        alert('Provisioning Sequence Initiated Successfully');
    };

    const handlePurge = () => {
        setClients(prev => prev.filter(c => c.id !== selectedClient.id));
        alert('Entity Purged from Operational Registry');
    };

    const handlePortalToggle = () => {
        const newState = !portalActive;
        setPortalActive(newState);
    };

    const handleDeleteClick = (client) => {
        setSelectedClient(client);
        setShowDeleteModal(true);
    };

    return (
        <div className="client-portal-wrapper">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Client Management Matrix</h1>
                    <p className="text-muted small mb-0">Manage enterprise client entities and their digital access infrastructure.</p>
                </div>
                <div className="col-auto">
                    <button className="btn app-btn-primary shadow-sm hov-translate-up" data-bs-toggle="modal" data-bs-target="#addClientModal">
                        <Plus size={18} className="me-2" />Provision New Client
                    </button>
                </div>
            </div>

            {/* Infrastructure Gateway & Telemetry */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="app-card shadow-sm h-100 border-left-blue overflow-hidden">
                        <div className="app-card-header p-3 border-bottom d-flex align-items-center bg-light bg-opacity-50">
                            <ShieldCheck size={20} className="me-2 text-primary" />
                            <h4 className="app-card-title mb-0">Portal Infrastructure</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h5 className="mb-1 text-dark fw-bold">Global External Gateway</h5>
                                    <p className="text-muted small mb-0">Master toggle for secure client portal orchestration.</p>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="portalToggle" checked={portalActive} onChange={handlePortalToggle} style={{ width: '2.8rem', height: '1.4rem' }} />
                                </div>
                            </div>
                            <div className={`alert ${portalActive ? 'alert-info' : 'alert-secondary'} border-0 shadow-inner small mb-0 d-flex align-items-center transition-all`} role="alert">
                                <Key size={20} className="me-3 text-info" />
                                <div>{portalActive ? 'Authenticated gateway entries are active. Encrypted data channels are transmitting telemetry.' : 'Gateway access suspended. All client digital endpoints are currently offline.'}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className="app-card shadow-sm h-100">
                        <div className="app-card-header p-3 border-bottom d-flex align-items-center bg-light bg-opacity-50">
                            <Activity size={20} className="me-2 text-primary" />
                            <h4 className="app-card-title mb-0">Operational Telemetry</h4>
                        </div>
                        <div className="app-card-body p-4">
                            <div className="row text-center g-3">
                                <div className="col-6 col-md-3 border-end">
                                    <div className="stats-figure text-primary fw-bold fs-4">38</div>
                                    <div className="stats-label extra-small text-muted text-uppercase fw-bold">Active Entities</div>
                                </div>
                                <div className="col-6 col-md-3 border-end">
                                    <div className="stats-figure text-success fw-bold fs-4">35</div>
                                    <div className="stats-label extra-small text-muted text-uppercase fw-bold">Gateway On</div>
                                </div>
                                <div className="col-6 col-md-3 border-end">
                                    <div className="stats-figure text-warning fw-bold fs-4">3</div>
                                    <div className="stats-label extra-small text-muted text-uppercase fw-bold">Provisioning</div>
                                </div>
                                <div className="col-6 col-md-3">
                                    <div className="stats-figure text-info fw-bold fs-4">12</div>
                                    <div className="stats-label extra-small text-muted text-uppercase fw-bold">New (30d)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Registry */}
            <div className="app-card app-card-table shadow-sm mb-4 overflow-hidden">
                <div className="app-card-header p-4 border-bottom d-flex justify-content-between align-items-center bg-white">
                    <div className="d-flex align-items-center">
                        <Users size={20} className="me-2 text-muted" />
                        <h4 className="app-card-title mb-0">Enterprise Client Directory</h4>
                    </div>
                    <div className="search-box position-relative">
                        <Search size={16} className="position-absolute translate-middle-y top-50 ms-3 text-muted" />
                        <input type="text" className="form-control form-control-sm ps-5 rounded-pill border-light shadow-inner" placeholder="Search operational registry..." />
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table table-hover mb-0 app-table-hover">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">Legal Entity Identifier</th>
                                <th className="py-3">Primary Account Comms</th>
                                <th className="py-3">Portfolio</th>
                                <th className="py-3">Gateway Auth</th>
                                <th className="py-3">Lifecycle Stage</th>
                                <th className="text-end px-4 py-3">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map((client) => (
                                <tr key={client.id} className="align-middle">
                                    <td className="px-4 py-3">
                                        <div className="fw-bold text-dark">{client.name}</div>
                                        <div className="text-muted extra-small font-monospace">UID: {client.code}</div>
                                    </td>
                                    <td className="small text-muted">{client.email}</td>
                                    <td>
                                        <span className="badge bg-soft-primary text-primary px-3 py-2 rounded-pill font-weight-bold" style={{fontSize: '0.65rem'}}>
                                            {client.projects} ACTIVE ASSETS
                                        </span>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className={`status-dot me-2 ${client.portal === 'Enabled' ? 'bg-success' : 'bg-warning'}`}></div>
                                            <span className="small fw-semibold">{client.portal}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`badge ${client.status === 'Active' ? 'bg-success' : 'bg-warning'} px-3 py-1`}>{client.status.toUpperCase()}</span>
                                    </td>
                                    <td className="text-end px-4 py-3 text-nowrap">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button className="btn btn-sm btn-action btn-view" data-bs-toggle="modal" data-bs-target="#clientModal" onClick={() => { setSelectedClient(client); setEditMode(false); }} title="Inspect Metrics"><Eye size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-edit" data-bs-toggle="modal" data-bs-target="#clientModal" onClick={() => { setSelectedClient(client); setEditMode(true); }} title="Modify Protocols"><Pencil size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-delete text-danger" data-bs-toggle="modal" data-bs-target="#deleteConfirmModal" onClick={() => handleDeleteClick(client)} title="Purge Record"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CLIENT MODAL (Comprehensive BPO View) */}
            <div className="modal fade" id="clientModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center">
                                {editMode ? <><Pencil size={20} className="me-2 text-warning" />Edit Client Interface</> : <><Building size={20} className="me-2 text-info" />Entity Intelligence Detail</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="p-4 bg-light border-bottom d-flex justify-content-between align-items-end">
                                <div>
                                    <h3 className="fw-bold mb-1 text-dark">{selectedClient?.name || 'Loading Asset...'}</h3>
                                    <span className="badge bg-primary px-3 py-2 rounded-pill shadow-sm small font-monospace">UID: {selectedClient?.code || '---'}</span>
                                </div>
                                <div className="text-end">
                                    <label className="extra-small text-muted text-uppercase fw-bold mb-1 d-block">SLA Level</label>
                                    <span className="badge bg-dark px-3 py-2 rounded-pill"><Clock size={12} className="me-2" />{selectedClient?.sla || 'Standard'}</span>
                                </div>
                            </div>
                            <div className="p-4">
                                <ul className="nav nav-pills mb-4 bg-light p-1 rounded-3 d-inline-flex" role="tablist">
                                    <li className="nav-item">
                                        <button className="nav-link active modal-tab-btn" data-bs-toggle="pill" data-bs-target="#tab-basics">General Info</button>
                                    </li>
                                    {!editMode && (
                                        <li className="nav-item ms-1">
                                            <button className="nav-link modal-tab-btn" data-bs-toggle="pill" data-bs-target="#tab-linkages">Active Linkages</button>
                                        </li>
                                    )}
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="tab-basics">
                                        <div className="row g-4">
                                            <div className="col-md-6">
                                                <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Comms Relay (Email)</label>
                                                <input type="email" className="form-control" defaultValue={selectedClient?.email} readOnly={!editMode} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Voice Link</label>
                                                <input type="tel" className="form-control font-monospace" defaultValue={selectedClient?.phone} readOnly={!editMode} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Lifecycle Tracking</label>
                                                <select className="form-select fw-semibold" defaultValue={selectedClient?.status} disabled={!editMode}>
                                                    <option value="Active">Operational / Active</option>
                                                    <option value="Pending">Pending Provisioning</option>
                                                    <option value="Inactive">Deactivated / Terminated</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Account Executive</label>
                                                <select className="form-select fw-semibold" defaultValue={selectedClient?.manager} disabled={!editMode}>
                                                    <option>Rajesh Kumar</option>
                                                    <option>Priya Sharma</option>
                                                    <option>Vikram Singh</option>
                                                </select>
                                            </div>
                                            {editMode && (
                                                <div className="col-12 mt-4">
                                                    <div className="alert alert-warning border-0 small d-flex align-items-center m-0">
                                                        <AlertTriangle size={18} className="me-2" />
                                                        Modifying these protocols will instantly affect all digital gateway sync processes.
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="tab-linkages">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3 d-block">Linked Portfolio Assets</label>
                                        <div className="list-group list-group-flush border rounded-3 shadow-inner">
                                            {selectedClient?.projectsList?.map((p, i) => (
                                                <div key={i} className="list-group-item d-flex justify-content-between align-items-center py-3 bg-white">
                                                    <div className="d-flex align-items-center">
                                                        <div className="asset-icon me-3 bg-light p-2 rounded-2"><FileText size={16} className="text-primary" /></div>
                                                        <span className="fw-bold text-dark">{p}</span>
                                                    </div>
                                                    <button className="btn btn-sm btn-link text-decoration-none small">View Stream <ExternalLink size={12} className="ms-1" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4 pt-0">
                            <button type="button" className="btn btn-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Close Session</button>
                            {editMode && <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg" style={{ background: '#9B7D3D', borderColor: '#9B7D3D' }} onClick={() => alert('Operational Protcols Propagated')}>Push Integrity Update</button>}
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD CLIENT MODAL */}
            <div className="modal fade" id="addClientModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Plus size={20} className="me-2" />Provision New Enterprise Asset</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <form id="addClientForm" onSubmit={handleProvisionClient}>
                                <div className="mb-4">
                                    <label className="form-label small fw-bold text-dark text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Legal Entity Identifier (Company)</label>
                                    <div className="input-group shadow-sm">
                                        <span className="input-group-text bg-light border-end-0"><Building size={16} className="text-muted" /></span>
                                        <input name="company" type="text" className="form-control form-control-lg border-start-0" placeholder="e.g. Nexura Global Solutions" required />
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Comms Gateway (Email)</label>
                                        <input name="email" type="email" className="form-control bg-light" placeholder="contact@client.com" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Direct Voice Link</label>
                                        <input name="phone" type="tel" className="form-control bg-light" placeholder="+91 98765 43210" required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Assigned Operations Lead</label>
                                        <select name="manager" className="form-select bg-light" required>
                                            <option value="">Select executive...</option>
                                            <option>Rajesh Kumar</option>
                                            <option>Priya Sharma</option>
                                            <option>Vikram Singh</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-dark text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>SLA Commitment</label>
                                        <select name="sla" className="form-select bg-light" required defaultValue="Standard (48hr Response)">
                                            <option>Standard (48hr Response)</option>
                                            <option>Premium (24hr Response)</option>
                                            <option>Enterprise (4hr Response)</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <div className="p-3 rounded-2 border shadow-inner bg-light">
                                            <div className="form-check form-switch mb-0 d-flex align-items-center">
                                                <input className="form-check-input me-3" type="checkbox" id="provisionPortal" defaultChecked style={{width: '2.5rem', height: '1.25rem'}} />
                                                <label className="form-check-label fw-bold text-dark small" htmlFor="provisionPortal">Auto-Provision Digital External Gateway</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 rounded-2 bg-info bg-opacity-10 border border-info border-opacity-10 small text-info fw-semibold d-flex align-items-center">
                                    <Wand2 size={18} className="me-3" />
                                    Record initialization will trigger an automated credential transmission sequence to specified comms endpoints.
                                </div>
                                <div className="modal-footer border-0 p-4 bg-light mt-4">
                                    <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort</button>
                                    <button type="submit" className="btn btn-primary px-5 fw-bold shadow-lg" style={{ background: '#9B7D3D', borderColor: '#9B7D3D' }} data-bs-dismiss="modal">Provision Entity</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* DELETE CONFIRMATION MODAL (Premium) */}
            <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '420px'}}>
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-body p-0">
                            <div className="p-5 text-center">
                                <div className="mb-4 d-inline-block bg-danger bg-opacity-10 p-4 rounded-circle">
                                    <AlertTriangle size={48} className="text-danger" />
                                </div>
                                <h4 className="fw-bold mb-3 text-dark">Confirm Entity Purge</h4>
                                <p className="text-muted mb-4">You are about to irrevocably remove <strong className="text-dark font-monospace">{selectedClient?.name}</strong> from the operational master database. All associated linkages will be servered.</p>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-light flex-grow-1 py-3 fw-bold border" data-bs-dismiss="modal">Maintain Record</button>
                                    <button type="button" className="btn btn-danger flex-grow-1 py-3 fw-bold" onClick={handlePurge} data-bs-dismiss="modal">Confirm Purge</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientPortal;
