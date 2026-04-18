import React, { useState } from 'react';

const AuditLogs = () => {
    const [selectedLog, setSelectedLog] = useState(null);

    const auditLogs = [
        { time: "2026-04-15 10:45:30", user: "Priya Sharma", module: "Daily Reports", action: "create", detail: "Daily report submitted: 42 calls, Avg 3:48, QA Score 92/100, Progress 105%", icon: "fa-file-lines" },
        { time: "2026-04-15 10:30:15", user: "Rahul Kumar", module: "Daily Reports", action: "create", detail: "Daily report submitted: 38 calls, Avg 3:52, QA Score 88/100, Progress 95%", icon: "fa-file-lines" },
        { time: "2026-04-15 10:22:45", user: "Neha Singh", module: "Daily Reports", action: "create", detail: "Daily report submitted: 40 calls, Avg 3:45, QA Score 90/100, Progress 100%", icon: "fa-file-lines" },
        { time: "2026-04-14 18:05:20", user: "Priya Sharma", module: "Daily Reports", action: "update", detail: "Report edited: QA Score updated from 88/100 to 92/100", icon: "fa-pen-to-square" },
        { time: "2026-03-20 17:15:30", user: "Amit Admin", module: "SLA Master", action: "update", detail: "Updated Rule PR-102: Tier 1 changed from 10% to 12.5%", icon: "fa-shield-halved" },
        { time: "2026-03-20 16:45:12", user: "Amit Admin", module: "Course Master", action: "create", detail: "Added new master course: Data Science Essentials", icon: "fa-graduation-cap" },
        { time: "2026-03-19 18:05:33", user: "Amit Admin", module: "Security", action: "delete", detail: "Revoked access for deactivated client account #P-882", icon: "fa-lock-open" }
    ];

    const getActionClass = (action) => {
        switch (action) {
            case 'create': return 'act-create';
            case 'update': return 'act-update';
            case 'delete': return 'act-delete';
            default: return 'act-create';
        }
    };

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Operation Audit Trails</h1>
                    <p className="text-muted small mb-0">Immutable high-fidelity record of all administrative orchestrations.</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-outline-secondary btn-sm shadow-sm"><i className="fa-solid fa-download me-2"></i>Export Security Ledger (CSV)</button>
                </div>
            </div>

            {/* Filters */}
            <div className="app-card shadow-sm mb-4 border-0">
                <div className="app-card-body p-3 bg-light bg-opacity-50">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <select className="form-select form-select-sm border-0 shadow-sm">
                                <option>Target Architecture: All</option>
                                <option>Performance Reporting</option>
                                <option>SLA Compliance</option>
                                <option>User Identity Matrix</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm border-0 shadow-sm">
                                <option>Identity: All Personnel</option>
                                <option>Priya Sharma</option>
                                <option>System Automator</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <div className="input-group input-group-sm">
                                <input type="text" className="form-control border-0 shadow-sm" placeholder="Search operation traces..." />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-dark btn-sm w-100 fw-bold shadow-sm">Trace Action</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Log Table */}
            <div className="app-card shadow-sm mb-5 border-0 overflow-hidden">
                <div className="app-card-body p-0">
                    <div className="table-responsive">
                        <table className="table app-table-hover mb-0 log-table text-left">
                            <thead className="bg-dark text-white">
                                <tr>
                                    <th className="p-3 border-0 small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Temporal Node</th>
                                    <th className="p-3 border-0 small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Account Identifier</th>
                                    <th className="p-3 border-0 small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Domain Architecture</th>
                                    <th className="p-3 border-0 small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Operation Type</th>
                                    <th className="p-3 border-0 small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Trace Description</th>
                                    <th className="p-3 border-0 text-end small text-uppercase fw-bold" style={{ letterSpacing: '1px' }}>Analytics</th>
                                </tr>
                            </thead>
                            <tbody>
                                {auditLogs.map((log, idx) => (
                                    <tr key={idx} className="transition-all hov-bg-light">
                                        <td className="p-3 text-muted small fw-bold font-monospace" data-label="Time">{log.time}</td>
                                        <td className="p-3" data-label="User">
                                            <div className="log-user">
                                                <div className="avatar-placeholder rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center fw-bold small" style={{ width: 32, height: 32 }}>
                                                    {log.user.charAt(0)}
                                                </div>
                                                <div className="fw-bold small text-dark">{log.user}</div>
                                            </div>
                                        </td>
                                        <td className="p-3" data-label="Module">
                                            <div className="d-flex align-items-center gap-2">
                                                <div className="module-icon-wrap"><i className={`fa-solid ${log.icon} small`}></i></div>
                                                <span className="fw-bold small text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>{log.module}</span>
                                            </div>
                                        </td>
                                        <td className="p-3" data-label="Action"><span className={`log-action-badge ${getActionClass(log.action)} shadow-xs`}>{log.action.toUpperCase()}</span></td>
                                        <td className="p-3" data-label="Detail"><div className="diff-text shadow-inner bg-light border-0 text-dark opacity-75">{log.detail}</div></td>
                                        <td className="p-3 text-end" data-label="Inspect">
                                            <button className="btn btn-sm btn-white border shadow-sm rounded-circle d-flex align-items-center justify-content-center hov-bg-primary hov-text-white ms-auto transition-all" style={{ width: 36, height: 36 }} onClick={() => setSelectedLog(log)} data-bs-toggle="modal" data-bs-target="#auditDetailModal">
                                                <i className="fa-solid fa-microscope small"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* AUDIT DETAIL MODAL (VIEW) */}
            <div className="modal fade" id="auditDetailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden" style={{ borderRadius: 15 }}>
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">
                                <i className="fa-solid fa-file-shield me-2 opacity-75"></i>Security Trace Decomposition
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="p-4 bg-light border-bottom text-center italicized-labels">
                                <div className="mx-auto mb-3 bg-white text-dark border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 60, height: 60, fontSize: '1.25rem' }}>
                                    <i className="fa-solid fa-fingerprint opacity-50"></i>
                                </div>
                                <h4 className="fw-bold mb-1 text-dark">Trace ID: SEC-{Math.floor(Math.random() * 90000) + 10000}</h4>
                                <span className={`log-action-badge ${getActionClass(selectedLog?.action)} mt-2 px-4 shadow-sm`}>{selectedLog?.action.toUpperCase()} UNIT</span>
                            </div>
                            <div className="p-3">
                                {[
                                    { label: 'Temporal Node', value: selectedLog?.time },
                                    { label: 'Asset Identity', value: selectedLog?.user },
                                    { label: 'Domain Module', value: selectedLog?.module },
                                    { label: 'Vector Type', value: selectedLog?.action.toUpperCase() }
                                ].map((row, rIdx) => (
                                    <div className="detail-row py-3 d-flex justify-content-between align-items-center" key={rIdx}>
                                        <div className="detail-label text-uppercase text-muted fw-bold" style={{ fontSize: '0.6rem' }}>{row.label}</div>
                                        <div className="detail-value fw-bold text-dark">{row.value}</div>
                                    </div>
                                ))}
                                <div className="p-4 bg-dark rounded-4 mt-2 border-0 shadow-lg position-relative overflow-hidden">
                                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-05"></div>
                                    <div className="text-uppercase fw-bold text-white text-opacity-50 mb-2 position-relative" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>Operation Intelligence Brief:</div>
                                    <div className="small fw-semibold text-white font-monospace position-relative" style={{ lineHeight: '1.6', opacity: 0.9 }}>{selectedLog?.detail}</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4 pt-2">
                            <button type="button" className="btn btn-dark w-100 py-3 fw-bold shadow-lg" data-bs-dismiss="modal">Terminate Trace View</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuditLogs;
