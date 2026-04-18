import React, { useState, useEffect } from 'react';

const Account = () => {
    const [activeTab, setActiveTab] = useState('profile');

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [activeTab]);

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Identity & Security Command</h1>
                    <p className="text-muted small mb-0">Manage your administrative credentials and security posture.</p>
                </div>
                <div className="col-auto">
                    <span className="badge bg-soft-success text-success border px-3 py-2"><i className="fa-solid fa-user-shield me-2"></i>SECURE SESSION ACTIVE</span>
                </div>
            </div>

            <div className="row g-4 settings-section">
                {/* Lateral Navigation (Profile Architecture) */}
                <div className="col-12 col-md-3">
                    <div className="app-card shadow-sm h-100 border-0 overflow-hidden" style={{borderRadius: 15}}>
                        <div className="app-card-body p-0">
                            <nav className="settings-nav nav flex-column" role="tablist">
                                {[
                                    { id: 'profile', label: 'Identity Profile', icon: 'fa-user-astronaut' },
                                    { id: 'security', label: 'Security & Access', icon: 'fa-vault' },
                                    { id: 'notifications', label: 'Communication Hub', icon: 'fa-tower-broadcast' }
                                ].map(tab => (
                                    <button 
                                        key={tab.id}
                                        className={`nav-link text-start border-0 border-start border-4 py-3 px-4 ${activeTab === tab.id ? 'active bg-soft-primary text-primary border-primary fw-bold' : 'bg-transparent text-muted border-transparent hov-bg-light'}`}
                                        onClick={() => setActiveTab(tab.id)}
                                        style={{transition: '0.3s'}}
                                    >
                                        <i className={`fa-solid ${tab.icon} me-3`}></i>{tab.label}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Content Matrix */}
                <div className="col-12 col-md-9">
                    <div className="tab-content">
                        
                        {/* IDENTITY PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className="tab-pane fade show active">
                                <div className="app-card shadow-lg mb-4 border-0 overflow-hidden" style={{borderRadius: 20}}>
                                    <div className="profile-header-bg" style={{height: 140, background: 'linear-gradient(45deg, #1e293b 0%, #334155 100%)'}}></div>
                                    <div className="profile-avatar-wrapper d-flex align-items-end mb-4 px-4">
                                        <div className="position-relative">
                                            <div className="rounded-circle border border-4 border-white shadow-lg d-flex align-items-center justify-content-center bg-primary text-white fw-bold" style={{width: 120, height: 120, fontSize: '3rem', marginTop: -60}}>
                                                KP
                                            </div>
                                            <button className="btn btn-dark btn-sm rounded-circle position-absolute bottom-0 end-0 shadow border border-2 border-white" style={{width: 32, height: 32, padding: 0}}><i className="fa-solid fa-camera small"></i></button>
                                        </div>
                                        <div className="ms-3 mb-1">
                                            <h3 className="mb-0 fw-bold text-dark">Kunal Patil</h3>
                                            <p className="text-muted mb-0 small uppercase fw-bold" style={{letterSpacing: '1px'}}>Principal Infrastructure Architect • IT Ops</p>
                                        </div>
                                    </div>
                                    <div className="app-card-body p-5 pt-0">
                                        <div className="row g-4 italicized-labels">
                                            {[
                                                { label: 'Canonical Name', value: 'Kunal Patil' },
                                                { label: 'Uplink Address (Email)', value: 'kunal.patil@tts.com', badge: 'VERIFIED' },
                                                { label: 'Operational Designation', value: 'Technical Head' },
                                                { label: 'Unit Alignment', value: 'IT & Operations Infrastructure' },
                                                { label: 'Geographic Nexus', value: 'Nashik, Maharashtra, India' },
                                                { label: 'Activation Timestamp', value: '12 Jan 2022' }
                                            ].map((field, fIdx) => (
                                                <div className="col-12 col-md-6" key={fIdx}>
                                                    <label className="form-label text-muted small text-uppercase fw-bold" style={{fontSize: '0.65rem'}}>{field.label}</label>
                                                    <div className="d-flex align-items-center gap-2">
                                                        <p className="fs-6 fw-bold text-dark mb-0">{field.value}</p>
                                                        {field.badge && <span className="badge bg-soft-success text-success border px-2 py-1" style={{fontSize: '0.5rem'}}>{field.badge}</span>}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr className="my-5 opacity-10" />
                                        <div className="d-flex gap-3">
                                            <button className="btn btn-dark px-4 fw-bold rounded-pill shadow" data-bs-toggle="modal" data-bs-target="#profileModal">MODIFY IDENTITY LOGS</button>
                                            <button className="btn btn-outline-secondary px-4 fw-bold rounded-pill">DOWNLOAD SECURITY CARD</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SECURITY & ACCESS TAB */}
                        {activeTab === 'security' && (
                            <div className="tab-pane fade show active">
                                <div className="app-card shadow-lg mb-4 border-0" style={{borderRadius: 20}}>
                                    <div className="app-card-header p-4 border-bottom bg-light bg-opacity-20">
                                        <h4 className="app-card-title fw-bold text-dark"><i className="fa-solid fa-user-lock me-3 text-primary"></i>Security Hardening Center</h4>
                                    </div>
                                    <div className="app-card-body p-5">
                                        <div className="row g-4">
                                            {[
                                                { label: 'Command Access Key', sub: 'Last cycled: 92 days ago', icon: 'fa-key', color: 'orange', action: 'RESET KEY', modal: '#passwordModal' },
                                                { label: 'Multi-Factor Uplink (2FA)', sub: 'Secondary hardware token verification', icon: 'fa-shield-halved', color: 'green', toggle: true },
                                                { label: 'Identity Verification Email', sub: 'Primary: kunal.patil@tts.com', icon: 'fa-envelope-shield', color: 'blue', action: 'RE-VERIFY', modal: '#emailResetModal' }
                                            ].map((row, rIdx) => (
                                                <div className="col-12" key={rIdx}>
                                                    <div className="d-flex align-items-center p-4 rounded-4 border hov-bg-light transition-all shadow-sm">
                                                        <div className={`app-icon-holder stats-${row.color} me-4 shadow-sm border-0 d-flex align-items-center justify-content-center rounded-3`} style={{width: 50, height: 50}}>
                                                            <i className={`fa-solid ${row.icon} fs-5`}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0 fw-bold text-dark">{row.label}</h6>
                                                            <p className="text-muted small mb-0">{row.sub}</p>
                                                        </div>
                                                        <div className="ms-auto text-end">
                                                            {row.toggle ? (
                                                                <div className="form-check form-switch scale-150">
                                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                                </div>
                                                            ) : (
                                                                <button className="btn btn-sm btn-dark px-3 fw-bold rounded-pill shadow-sm" data-bs-toggle="modal" data-bs-target={row.modal}>{row.action}</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <h6 className="mt-5 mb-4 fw-bold text-dark text-uppercase small" style={{letterSpacing: '1px'}}>Historical Access Trace (Recent Sessions)</h6>
                                        <div className="table-responsive rounded-3 border overflow-hidden">
                                            <table className="table table-hover mb-0 app-table-hover border-0">
                                                <thead className="bg-dark text-white border-0">
                                                    <tr>
                                                        <th className="px-3 border-0 small">Access Vector (Device)</th>
                                                        <th className="border-0 small">Geographic Terminal</th>
                                                        <th className="border-0 small">Activation Time</th>
                                                        <th className="border-0 small">IP Architecture</th>
                                                        <th className="text-end px-3 border-0 small">Session Logic</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className="bg-soft-success border-0">
                                                        <td className="px-3"><strong>Chrome on Windows Architecture</strong></td>
                                                        <td>Nashik Terminal</td>
                                                        <td className="small">Today, 10:45 AM</td>
                                                        <td className="font-monospace">192.168.1.45</td>
                                                        <td className="text-end px-3 font-monospace small"><span className="badge bg-success shadow-sm">CURRENT UPLINK</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="px-3">Safari on iPhone Mobile Unit</td>
                                                        <td>Mumbai Terminal</td>
                                                        <td className="small">Yesterday</td>
                                                        <td className="font-monospace">45.112.34.12</td>
                                                        <td className="text-end px-3 font-monospace small"><a href="#" className="btn btn-xs btn-outline-danger py-0 border-0 fw-bold">FORCE TERMINATION</a></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* COMMUNICATION HUB TAB */}
                        {activeTab === 'notifications' && (
                            <div className="tab-pane fade show active">
                                <div className="app-card shadow-lg mb-4 border-0" style={{borderRadius: 20}}>
                                    <div className="app-card-header p-4 border-bottom bg-light bg-opacity-20">
                                        <h4 className="app-card-title fw-bold text-dark"><i className="fa-solid fa-satellite-dish me-3 text-primary"></i>Signal Relay Preferences</h4>
                                    </div>
                                    <div className="app-card-body p-5">
                                        <div className="list-group list-group-flush">
                                            {[
                                                { label: 'Critical Alert Signals (Email)', sub: 'Receive emergency infrastructure reports and security alerts.', icon: 'fa-envelope-open-text' },
                                                { label: 'Operational Auditory Feedback', sub: 'Enable sound triggers for incoming data streams.', icon: 'fa-volume-high' },
                                                { label: 'Browser Injection (Push)', sub: 'Real-time telemetry alerts directly to terminal desktop.', icon: 'fa-bell-on' }
                                            ].map((pref, pIdx) => (
                                                <div className="list-group-item px-0 py-4 d-flex justify-content-between align-items-center border-bottom border-dashed" key={pIdx}>
                                                    <div className="d-flex gap-3">
                                                        <div className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary" style={{width: 40, height: 40}}>
                                                            <i className={`fa-solid ${pref.icon}`}></i>
                                                        </div>
                                                        <div>
                                                            <h6 className="mb-0 fw-bold text-dark">{pref.label}</h6>
                                                            <p className="text-muted small mb-0">{pref.sub}</p>
                                                        </div>
                                                    </div>
                                                    <div className="form-check form-switch scale-125">
                                                        <input className="form-check-input shadow-none" type="checkbox" defaultChecked={pIdx !== 1} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-center mt-5">
                                            <button className="btn btn-primary px-5 py-3 fw-bold rounded-pill shadow-lg" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}} onClick={() => alert('Preferences Propagated')}>PROPAGATE SIGNAL RULES</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* MODALS */}
            {/* PASSWORD RECOVERY MODAL */}
            <div className="modal fade" id="passwordModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg" style={{borderRadius: 15}}>
                        <div className="modal-header bg-dark text-white p-4">
                            <h5 className="modal-title fw-bold"><i className="fa-solid fa-key me-2"></i>Cycle Access Key</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4 italicized-labels">
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.6rem'}}>Current Operational Key</label>
                                <input type="password" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.6rem'}}>New Cybernetic Key</label>
                                <input type="password" className="form-control" />
                                <div className="form-text small opacity-50 italic">Requirement: Entropy {'>'} 256 bits (min 8 chars).</div>
                            </div>
                            <div className="mb-1">
                                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.6rem'}}>Re-verify Key</label>
                                <input type="password" className="form-control" />
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4 pt-0">
                            <button type="button" className="btn btn-secondary px-4 rounded-pill fw-bold" data-bs-dismiss="modal">ABORT</button>
                            <button type="button" className="btn btn-dark px-4 rounded-pill fw-bold" onClick={() => alert('Access Key Re-Cycled')}>COMMIT NEW KEY</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* PROFILE MODAL placeholder */}
            <div className="modal fade" id="profileModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg" style={{borderRadius: 15}}>
                        <div className="modal-header bg-primary text-white p-4">
                            <h5 className="modal-title fw-bold"><i className="fa-solid fa-user-pen me-2"></i>Modify Identity Logs</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4">
                            <p className="text-muted">Initiating identity verification sequence... (Profile editor module loading)</p>
                        </div>
                        <div className="modal-footer border-0 p-4 pt-0">
                            <button type="button" className="btn btn-primary px-4 rounded-pill fw-bold" data-bs-dismiss="modal">CLOSE</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EMAIL RESET MODAL placeholder */}
            <div className="modal fade" id="emailResetModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg" style={{borderRadius: 15}}>
                        <div className="modal-header bg-info text-white p-4">
                            <h5 className="modal-title fw-bold"><i className="fa-solid fa-envelope-circle-check me-2"></i>Link New Uplink Address</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4">
                            <p className="text-muted">Uplink synchronization protocol active. Enter new primary email address for relay.</p>
                            <input type="email" className="form-control" placeholder="new.uplink@tts.com" />
                        </div>
                        <div className="modal-footer border-0 p-4 pt-0">
                            <button type="button" className="btn btn-info text-white px-4 rounded-pill fw-bold" data-bs-dismiss="modal">VERIFY & LINK</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Account;
