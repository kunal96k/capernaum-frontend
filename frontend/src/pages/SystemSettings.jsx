import React, { useState, useEffect } from 'react';

const SystemSettings = () => {
    const [activeTab, setActiveTab] = useState('general');

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [activeTab]);

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Global Architecture Configuration</h1>
                    <p className="text-muted small mb-0">Modulate platform identity, security protocols, and operational parameters.</p>
                </div>
                <div className="col-auto">
                    <span className="badge bg-soft-dark text-dark border px-3 py-2"><i className="fa-solid fa-server me-2"></i>NODE-ID: CAP-PRD-01</span>
                </div>
            </div>

            <div className="row g-4 settings-container mt-2">
                {/* Lateral Navigation (Sub-Architecture) */}
                <div className="col-12 col-lg-3">
                    <div className="nav flex-column nav-pills settings-nav shadow-sm bg-white p-2 rounded-3 border" role="tablist">
                        {[
                            { id: 'general', label: 'Brand Identity', icon: 'fa-building-shield' },
                            { id: 'reports', label: 'Telemetry Rules', icon: 'fa-chart-network' },
                            { id: 'security', label: 'Security Protocols', icon: 'fa-shield-halved' },
                            { id: 'data', label: 'Vault Maintenance', icon: 'fa-database' }
                        ].map(tab => (
                            <button 
                                key={tab.id}
                                className={`nav-link text-start border-0 mb-1 d-flex align-items-center gap-3 py-3 px-4 ${activeTab === tab.id ? 'active bg-primary text-white shadow' : 'bg-transparent text-muted hov-bg-light'}`}
                                onClick={() => setActiveTab(tab.id)}
                                style={{borderRadius: 12, transition: '0.3s'}}
                            >
                                <i className={`fa-solid ${tab.icon}`}></i>
                                <span className="fw-bold small text-uppercase" style={{letterSpacing: '0.5px'}}>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="app-card mt-4 p-4 text-center bg-dark text-white shadow-lg overflow-hidden position-relative" style={{borderRadius: 15}}>
                        <i className="fa-solid fa-microchip position-absolute opacity-10" style={{fontSize: '5rem', right: -10, bottom: -10}}></i>
                        <h6 className="fw-bold mb-2">System Health</h6>
                        <div className="d-flex justify-content-center gap-1 mb-2">
                            {[1,2,3,4,5].map(i => <div key={i} className="bg-success rounded-pill" style={{width: 4, height: 12}}></div>)}
                        </div>
                        <small className="opacity-75 font-monospace" style={{fontSize: '0.65rem'}}>STABLE / 99.9% UPTIME</small>
                    </div>
                </div>

                {/* Content Matrix */}
                <div className="col-12 col-lg-9">
                    <div className="tab-content shadow-lg p-5 bg-white rounded-4 border-0 position-relative overflow-hidden">
                        <div className="position-absolute top-0 end-0 p-4 opacity-10">
                            <i className="fa-solid fa-gears" style={{fontSize: '8rem'}}></i>
                        </div>

                        {activeTab === 'general' && (
                            <div className="tab-pane fade show active">
                                <div className="section-header mb-5 border-bottom pb-4">
                                    <h4 className="fw-bold text-dark mb-1">Corporate Identity Architecture</h4>
                                    <p className="text-muted small mb-0">Define how the platform represents the organizational brand across all interfaces.</p>
                                </div>
                                <div className="row g-4">
                                    <div className="col-12 d-flex align-items-center gap-4 mb-3">
                                        <div className="logo-upload-wrap shadow-sm border-2 border-primary border-dashed">
                                            <i className="fa-solid fa-cloud-arrow-up text-primary fs-3"></i>
                                        </div>
                                        <div>
                                            <h6 className="fw-bold text-dark mb-1">Architecture Visual Identifier (Logo)</h6>
                                            <p className="small text-muted mb-0">Vector (SVG) or High-Density PNG (256x256) recommended.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Entity Designation (Business Name)</label>
                                        <input type="text" className="form-control" defaultValue="Capernaum Solutions" />
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Command Prefix (Dashboard Title)</label>
                                        <input type="text" className="form-control" defaultValue="Capernaum Admin Portal" />
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Secure Support Gateway (Email)</label>
                                        <input type="email" className="form-control" defaultValue="support@capernaum.com" />
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Emergency Contact Uplink</label>
                                        <input type="text" className="form-control" defaultValue="+91 91234 56789" />
                                    </div>
                                    <div className="col-12 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Geographic Nexus (Address)</label>
                                        <textarea className="form-control" rows="2" defaultValue="Nashik, Maharashtra, India" style={{resize: 'none'}}></textarea>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'reports' && (
                            <div className="tab-pane fade show active">
                                <div className="section-header mb-5 border-bottom pb-4">
                                    <h4 className="fw-bold text-dark mb-1">Telemetry & Data Rules</h4>
                                    <p className="text-muted small mb-0">Configure the parameters for daily performance reporting and KPI calculation.</p>
                                </div>
                                <div className="row g-4">
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Submission Lifecycle Termination (Deadline)</label>
                                        <input type="time" className="form-control" defaultValue="17:00" />
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Operational Buffer (Grace Period)</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" defaultValue="30" />
                                            <span className="input-group-text bg-light border-start-0 small">MINUTES</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-primary text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Target Calibration (Default Calls)</label>
                                        <input type="number" className="form-control border-primary" defaultValue="40" />
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Quality Floor (QA Threshold)</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control" defaultValue="70" />
                                            <span className="input-group-text bg-light border-start-0 small">/ 100</span>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <h6 className="small fw-bold text-uppercase text-muted border-bottom pb-2 mb-3">Enabled Metric Triggers</h6>
                                        {['Calls Volume Tracking', 'Temporal Density (Duration)', 'Quality Index (QA)', 'Velocity Auto-Calculation'].map((metric, idx) => (
                                            <div key={idx} className="form-check form-switch mb-3 p-3 border rounded-3 hov-bg-light transition-all">
                                                <input className="form-check-input ms-0 me-3 mt-1" type="checkbox" defaultChecked />
                                                <label className="form-check-label fw-bold text-dark small">{metric}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="tab-pane fade show active">
                                <div className="section-header mb-5 border-bottom pb-4">
                                    <h4 className="fw-bold text-dark mb-1">Security & Access Protocols</h4>
                                    <p className="text-muted small mb-0">Orchestrate how the system handles audit logs and access security.</p>
                                </div>
                                <div className="card bg-dark text-white border-0 shadow-sm mb-4" style={{borderRadius: 12}}>
                                    <div className="card-body p-4 d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center gap-3">
                                            <i className="fa-solid fa-shield-virus fs-2 text-warning"></i>
                                            <div>
                                                <h6 className="fw-bold mb-0">Global Audit Logging</h6>
                                                <small className="opacity-75">Immutable trace recording is currently fully operational.</small>
                                            </div>
                                        </div>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input scale-150 shadow-none" type="checkbox" defaultChecked />
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <h6 className="small fw-bold text-uppercase text-muted border-bottom pb-2 mb-3">Retention Orchestration</h6>
                                        <div className="row g-3">
                                            <div className="col-md-6 italicized-labels">
                                                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Hot Storage Retention</label>
                                                <select className="form-select">
                                                    <option>90 Terrestrial Days</option>
                                                    <option>180 Terrestrial Days</option>
                                                    <option>Indefinite / Permanent</option>
                                                </select>
                                            </div>
                                            <div className="col-md-6 italicized-labels">
                                                <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Cold Storage Archiving After</label>
                                                <select className="form-select">
                                                    <option>30 Days</option>
                                                    <option>60 Days</option>
                                                    <option>90 Days</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4 text-center">
                                        <div className="btn-group shadow-sm border rounded-pill overflow-hidden">
                                            <button className="btn btn-white text-muted small fw-bold px-4 py-2 border-0 hov-bg-dark hov-text-white transition-all">VIEW AUDIT MATRIX</button>
                                            <button className="btn btn-white text-muted small fw-bold px-4 py-2 border-0 border-start hov-bg-primary hov-text-white transition-all">EXPORT CSV LEDGER</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'data' && (
                            <div className="tab-pane fade show active">
                                <div className="section-header mb-5 border-bottom pb-4">
                                    <h4 className="fw-bold text-dark mb-1">Vault & Database Integrity</h4>
                                    <p className="text-muted small mb-0">Manage system synchronization, backups, and structural maintenance.</p>
                                </div>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <div className="alert bg-soft-info border-info border-dashed text-info p-4 rounded-4 d-flex align-items-center gap-4">
                                            <i className="fa-solid fa-cloud-arrow-down fs-1 opacity-50"></i>
                                            <div>
                                                <h6 className="fw-bold mb-1 mb-0 text-dark">Temporal Synchronization Status</h6>
                                                <p className="small mb-0 text-muted">Cloud synchronization verified on March 20, 2026 at 09:12 AM. No integrity anomalies detected.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-dark w-100 py-3 fw-bold shadow-lg hov-scale-up transition-all" style={{borderRadius: 12}}>
                                            <i className="fa-solid fa-file-export me-3"></i>EXPORT COLD BACKUP (SQL)
                                        </button>
                                    </div>
                                    <div className="col-md-6">
                                        <button className="btn btn-outline-danger w-100 py-3 fw-bold hov-bg-danger hov-text-white transition-all" style={{borderRadius: 12}}>
                                            <i className="fa-solid fa-broom me-3"></i>PURGE TRANSIENT CACHE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Persistent Save Bar */}
                        <div className="d-flex justify-content-end gap-3 mt-5 pt-4 border-top">
                            <button className="btn btn-white px-4 py-2 fw-bold text-muted border-0 hov-bg-light rounded-pill" onClick={() => window.location.reload()}>ABORT CHANGES</button>
                            <button className="btn btn-dark px-5 py-2 fw-bold text-white shadow-lg rounded-pill" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}} onClick={() => alert('Configuration Propagated to Infrastructure')}>PROPAGATE CONFIGURATION</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SystemSettings;
