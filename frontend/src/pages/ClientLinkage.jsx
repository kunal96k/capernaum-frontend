import React, { useEffect, useState } from 'react';
import { 
    Link2, 
    Link2Off, 
    Building, 
    Layers, 
    Users, 
    Activity, 
    Plus, 
    Search, 
    Filter, 
    ChevronRight, 
    CheckCircle2, 
    AlertCircle, 
    MoreHorizontal,
    Briefcase,
    Zap,
    Globe,
    Cpu
} from 'lucide-react';

const ClientLinkage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLinkage, setSelectedLinkage] = useState(null);
    
    // BPO Client Linkage Matrix Data
    const linkages = [
        { id: 1, client: 'Nexura Technologies', code: 'NEX-824', projects: ['Audio Transcript Q2', 'Voice Core'], lead: 'Rajesh Kumar', dept: 'Customer Support', status: 'Active', health: 94 },
        { id: 2, client: 'Digital Solutions Inc', code: 'DS-901', projects: ['L1 Outreach', 'Technical Audit'], lead: 'Priya Sharma', dept: 'Tech Ops', status: 'Active', health: 88 },
        { id: 3, client: 'CloudPeak Ventures', code: 'CP-332', projects: ['Lead Qualifying'], lead: 'Vikram Singh', dept: 'Sales Div', status: 'Pending', health: 45 },
        { id: 4, client: 'FinServe Global', code: 'FS-110', projects: ['KYC Batch #8', 'Compliance Log'], lead: 'Sneha Kulkarni', dept: 'Backoffice', status: 'Active', health: 92 },
    ];

    const getHealthColor = (health) => {
        if (health >= 90) return 'success';
        if (health >= 70) return 'primary';
        if (health >= 50) return 'warning';
        return 'danger';
    };

    return (
        <div className="client-linkage-wrapper">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col">
                    <h1 className="app-page-title mb-1">Strategic Client Linkage Matrix</h1>
                    <p className="text-muted mb-0 small">Centralized orchestration of client entities, operational projects, and human resource deployment.</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary shadow-lg border-0 px-4 hov-translate-up fw-bold" style={{background: '#9B7D3D'}} data-bs-toggle="modal" data-bs-target="#newLinkageModal">
                        <Link2 size={18} className="me-2" />Initialize Linkage
                    </button>
                </div>
            </div>

            {/* Linkage Ecosystem Stats */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Active Linkages', value: '142', icon: <Link2 className="text-primary" />, meta: 'Full Operational Sync', color: 'border-left-blue' },
                    { label: 'Entity Clusters', value: '18', icon: <Building className="text-success" />, meta: 'Enterprise Clients', color: 'border-left-green' },
                    { label: 'Project Nodes', value: '45', icon: <Layers className="text-warning" />, meta: 'Active Workflows', color: 'border-left-orange' },
                    { label: 'Resource Map', value: '156', icon: <Users className="text-info" />, meta: 'Deployed Personnel', color: 'border-left-info' }
                ].map((stat, i) => (
                    <div className="col-6 col-md-3" key={i}>
                        <div className={`app-card shadow-sm h-100 ${stat.color} overflow-hidden`}>
                            <div className="app-card-body p-4 text-center">
                                <div className="mb-2 opacity-50">{stat.icon}</div>
                                <div className="stats-figure fw-bold fs-3 text-dark">{stat.value}</div>
                                <div className="stats-label extra-small text-muted text-uppercase fw-bold mb-1">{stat.label}</div>
                                <div className="extra-small fw-bold text-success" style={{fontSize: '0.65rem'}}>{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Strategic Search & Filters */}
            <div className="app-card shadow-sm mb-4">
                <div className="app-card-body p-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-5">
                            <div className="search-box position-relative">
                                <Search size={16} className="position-absolute translate-middle-y top-50 ms-3 text-muted" />
                                <input type="text" className="form-control ps-5 rounded-pill border-light shadow-inner" placeholder="Analyze linkage by client or lead..." onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-auto ms-auto d-flex gap-2">
                             <div className="dropdown">
                                <button className="btn btn-white border shadow-sm rounded-pill px-3 fw-bold small dropdown-toggle no-toggle-arrow" data-bs-toggle="dropdown">
                                    <Filter size={14} className="me-2" />Logic Filters
                                </button>
                                <ul className="dropdown-menu shadow-lg border-0 mt-2 p-2" style={{borderRadius: 12}}>
                                    <li><a className="dropdown-item rounded-2 small fw-bold" href="#">Active Clusters Only</a></li>
                                    <li><a className="dropdown-item rounded-2 small fw-bold" href="#">High Risk Linkages ({'<70%'})</a></li>
                                    <li><a className="dropdown-item rounded-2 small fw-bold" href="#">Pending Provisioning</a></li>
                                </ul>
                            </div>
                            <button className="btn btn-dark border-0 shadow-sm rounded-pill px-4 fw-bold small"><Activity size={14} className="me-2" />Live Trace</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Linkage Matrix Table */}
            <div className="app-card app-card-table shadow-sm mb-4 overflow-hidden border-0">
                <div className="app-card-body p-0 table-responsive">
                    <table className="table app-table-hover mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">Client Entity Interface</th>
                                <th className="py-3">Operational Portfolio (Linked Projects)</th>
                                <th className="py-3">Resource Orchestrator (TL)</th>
                                <th className="py-3">Linkage Health</th>
                                <th className="py-3">Sync Status</th>
                                <th className="text-end px-4 py-3">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {linkages.filter(l => l.client.toLowerCase().includes(searchTerm.toLowerCase()) || l.lead.toLowerCase().includes(searchTerm.toLowerCase())).map((link) => (
                                <tr key={link.id}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-soft-primary p-2 rounded-3 me-3 text-primary"><Building size={20} /></div>
                                            <div>
                                                <div className="fw-bold text-dark">{link.client}</div>
                                                <div className="extra-small text-muted font-monospace">{link.code}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-1">
                                            {link.projects.map((p, pi) => (
                                                <span key={pi} className="badge bg-light text-dark border px-2 py-1 extra-small fw-bold d-flex align-items-center">
                                                    <Briefcase size={10} className="me-1 opacity-50" /> {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="user-avatar-xs rounded-circle bg-soft-info text-info d-flex align-items-center justify-content-center fw-bold me-2" style={{width: 24, height: 24, fontSize: '0.65rem'}}>{link.lead.split(' ').map(n=>n[0]).join('')}</div>
                                            <div>
                                                <div className="fw-semibold text-dark small">{link.lead}</div>
                                                <div className="extra-small text-muted">{link.dept}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{width: '150px'}}>
                                        <div className="d-flex align-items-center">
                                            <div className="progress flex-grow-1 shadow-inner" style={{height: 6, borderRadius: 10, background: '#eee'}}>
                                                <div className={`progress-bar bg-${getHealthColor(link.health)}`} style={{width: `${link.health}%`}}></div>
                                            </div>
                                            <span className={`ms-2 extra-small fw-bold text-${getHealthColor(link.health)}`}>{link.health}%</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {link.status === 'Active' ? <CheckCircle2 size={14} className="text-success me-2" /> : <Zap size={14} className="text-warning me-2" />}
                                            <span className={`small fw-bold ${link.status === 'Active' ? 'text-success' : 'text-warning'}`}>{link.status.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td className="text-end px-4 py-3">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button className="btn btn-sm btn-action btn-view" title="Linkage Intelligence" data-bs-toggle="modal" data-bs-target="#linkIntelModal" onClick={() => setSelectedLinkage(link)}><Globe size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-edit" title="Modify Linkage Map" data-bs-toggle="modal" data-bs-target="#editLinkModal" onClick={() => setSelectedLinkage(link)}><Cpu size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-delete text-danger" title="Sever Linkage" data-bs-toggle="modal" data-bs-target="#severConfirmModal" onClick={() => setSelectedLinkage(link)}><Link2Off size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALS */}
            {/* INITIALIZE LINKAGE MODAL */}
            <div className="modal fade" id="newLinkageModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Link2 size={20} className="me-2 text-warning" />Initialize Strategic Linkage</h5>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <div className="row g-4">
                                <div className="col-md-6 border-end">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3">1. Select Target Client Entity</label>
                                    <div className="input-group shadow-sm border rounded-3 mb-4">
                                        <span className="input-group-text bg-light border-0"><Building size={16} className="text-muted" /></span>
                                        <select className="form-select border-0 py-3 fw-bold">
                                            <option>Nexura Technologies</option>
                                            <option>Digital Solutions Inc</option>
                                            <option>CloudPeak Ventures</option>
                                        </select>
                                    </div>
                                    
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3">2. Assign Portfolio Assets (Projects)</label>
                                    <div className="project-selection bg-light rounded-3 p-3 shadow-inner" style={{maxHeight: 200, overflowY: 'auto'}}>
                                        {['Audio Transcript Q3', 'L2 Voice Support', 'Data Mining Loop', 'Compliance Audit V2', 'KYC Pulse 2026'].map((p, i) => (
                                            <div className="form-check mb-2" key={i}>
                                                <input className="form-check-input" type="checkbox" id={`proj-${i}`} />
                                                <label className="form-check-label small fw-bold text-dark" htmlFor={`proj-${i}`}>{p}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3">3. Assign Resource Orchestrator</label>
                                    <div className="input-group shadow-sm border rounded-3 mb-4">
                                        <span className="input-group-text bg-light border-0"><Users size={16} className="text-muted" /></span>
                                        <select className="form-select border-0 py-3 fw-bold">
                                            <option>Rajesh Kumar (Team Lead)</option>
                                            <option>Priya Sharma (Project Manager)</option>
                                            <option>Vikram Singh (QA Head)</option>
                                        </select>
                                    </div>

                                    <div className="p-4 rounded-4 bg-soft-primary border border-primary border-opacity-10 mt-2">
                                        <div className="d-flex align-items-center mb-3">
                                            <Zap size={24} className="text-primary me-2" />
                                            <h6 className="fw-bold mb-0 text-dark">Linkage Propagator</h6>
                                        </div>
                                        <p className="extra-small text-muted mb-0 fw-semibold">Linking entities will automatically synchronize the Strategic Data Vault, CRM Pipeline, and QA Forensic Hub for the assigned personnel clusters.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort</button>
                            <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg hov-translate-up" style={{ background: '#9B7D3D', border: 'none' }} onClick={() => alert('Infrastructure Linkage Initialized')}>Execute Linkage Pulse</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* LINK INTEL MODAL */}
            <div className="modal fade" id="linkIntelModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0 text-center d-block">
                            <div className="mx-auto mb-2 bg-primary bg-opacity-10 text-primary border rounded-circle d-flex align-items-center justify-content-center" style={{ width: 60, height: 60, marginLeft: 'auto', marginRight: 'auto' }}>
                                <Globe size={32} />
                            </div>
                            <h5 className="modal-title fw-bold">Infrastructure Intel: {selectedLinkage?.client}</h5>
                            <button type="button" className="btn-close btn-close-white position-absolute end-0 top-0 m-4" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <div className="p-4 bg-light rounded-4 mb-4">
                                <label className="extra-small text-muted text-uppercase fw-bold mb-3 d-block">Active Connectivity Mesh</label>
                                {[
                                    { label: 'Primary Lead', value: selectedLinkage?.lead, icon: <Users size={14} /> },
                                    { label: 'Cluster Health', value: `${selectedLinkage?.health}% Operational`, icon: <Activity size={14} />, color: 'text-success' },
                                    { label: 'Linked Artifacts', value: `${selectedLinkage?.projects.length} Secure Projects`, icon: <Layers size={14} /> }
                                ].map((item, i) => (
                                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom border-white" key={i}>
                                        <span className="small text-muted d-flex align-items-center">{item.icon} <span className="ms-2">{item.label}</span></span>
                                        <span className={`small fw-bold ${item.color || 'text-dark'}`}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <h6 className="fw-bold mb-3 small opacity-50"><Link2 size={14} className="me-2" />Assigned Portfolio</h6>
                            <div className="d-flex flex-wrap gap-2">
                                {selectedLinkage?.projects.map((p, i) => (
                                    <span key={i} className="badge bg-white text-dark border p-2 small fw-bold shadow-xs">{p}</span>
                                ))}
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-secondary w-100 py-3 fw-bold" data-bs-dismiss="modal">Terminate View</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT LINKAGE MODAL */}
            <div className="modal fade" id="editLinkModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white p-4">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Cpu size={20} className="me-2" />Modify Strategic Entity Map</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4">
                            <div className="row g-4">
                                <div className="col-md-6 border-end">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3 d-block">Operational Resource Lead</label>
                                    <select className="form-select py-3 fw-bold bg-light border-0 shadow-xs" defaultValue={selectedLinkage?.lead}>
                                        <option>Rajesh Kumar</option>
                                        <option>Priya Sharma</option>
                                        <option>Vikram Singh</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3 d-block">Linkage Synchronization State</label>
                                    <select className="form-select py-3 fw-bold bg-light border-0 shadow-xs" defaultValue={selectedLinkage?.status}>
                                        <option>Active</option>
                                        <option>Pending</option>
                                        <option>Maintenance</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                             <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort Changes</button>
                             <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg" style={{ background: '#9B7D3D', border: 'none' }} onClick={() => alert('Map Modified')}>Push Map Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEVER LINKAGE MODAL */}
            <div className="modal fade" id="severConfirmModal" tabIndex="-1" aria-hidden="true">
                 <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '400px' }}>
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-body p-5 text-center">
                            <div className="mb-4 d-inline-block bg-danger bg-opacity-10 p-4 rounded-circle">
                                <Link2Off size={48} className="text-danger" />
                            </div>
                            <h4 className="fw-bold mb-3 text-dark">Sever Strategic Linkage?</h4>
                            <p className="text-muted mb-4 small">This will immediately decouple <strong className="text-dark font-monospace">{selectedLinkage?.client}</strong> from all active project clusters and resource leads. This action is logged for compliance.</p>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-light flex-grow-1 py-3 fw-bold border" data-bs-dismiss="modal">Maintain Link</button>
                                <button type="button" className="btn btn-danger flex-grow-1 py-3 fw-bold" onClick={() => alert('Linkage Severed')}>Confirm Severance</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientLinkage;
