import React, { useState } from 'react';

const DailyReportUpload = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const stats = [
        { label: 'Cumulative Output', value: '42', meta: 'Calls Handled Today', target: 'Target: 40', color: 'blue' },
        { label: 'Temporal Efficiency', value: '3:48', meta: 'Average Duration', badge: 'Per Engagement', color: 'green' },
        { label: 'Quality Index', value: '92', meta: 'QA Evaluation', badge: 'Validated', color: 'orange' },
        { label: 'Cycle Progress', value: '105%', meta: 'Target Velocity', progress: 105, color: 'success' }
    ];

    const reports = [
        { date: '14-Apr-2026', calls: 38, target: 40, duration: '3:42', qa: '88/100', progress: 95, status: 'Submitted' },
        { date: '13-Apr-2026', calls: 42, target: 40, duration: '3:48', qa: '92/100', progress: 105, status: 'Submitted' },
        { date: '12-Apr-2026', calls: 35, target: 40, duration: '3:35', qa: '85/100', progress: 87, status: 'Submitted' },
    ];

    const openReportModal = (report, mode) => {
        setSelectedReport(report);
        setEditMode(mode === 'edit');
    };

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Engagement Performance Ledger</h1>
                    <p className="text-muted small mb-0">Record and analyze daily operational output and quality telemetry.</p>
                </div>
                <div className="col-auto">
                    <button className="btn app-btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#reportModal" onClick={() => openReportModal(null, 'add')}>
                        <i className="fa-solid fa-cloud-arrow-up me-2"></i>Propagate Today's Ledger
                    </button>
                </div>
            </div>

            {/* Statistics Row */}
            <div className="row g-4 mb-4">
                {stats.map((stat, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                        <div className={`app-card app-card-stat shadow-sm h-100 border-0 text-center transition-all hov-translate-up`} style={{ borderRadius: '1rem' }}>
                            <div className="app-card-body p-4">
                                <h6 className="stats-type mb-3 text-uppercase fw-bold text-muted opacity-50" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>{stat.label}</h6>
                                <div className={`stats-figure fw-bold mb-4`} style={{ fontSize: '2.5rem', color: stat.color === 'green' ? '#198754' : stat.color === 'blue' ? '#0d6efd' : '#fd7e14' }}>
                                    {stat.value}
                                </div>
                                <div className="mt-2">
                                    {stat.target ? (
                                        <span className="small fw-bold text-muted opacity-75">{stat.target}</span>
                                    ) : stat.progress ? (
                                        <div className="px-3">
                                            <div className="progress shadow-inner mb-1" style={{ height: 6, borderRadius: 10 }}>
                                                <div className="progress-bar bg-success" style={{ width: `${Math.min(stat.progress, 100)}%` }}></div>
                                            </div>
                                            <span className="extra-small fw-bold text-success">{stat.progress}% Velocity</span>
                                        </div>
                                    ) : (
                                        <div className="px-4 py-1 border rounded-pill d-inline-block shadow-inner bg-light border-light" style={{ minWidth: '120px' }}>
                                            <span className="extra-small fw-bold text-muted text-uppercase" style={{ fontSize: '0.6rem', letterSpacing: '0.05em' }}>
                                                {stat.badge || stat.meta}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report History Table */}
            <div className="app-card app-card-table shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-10">
                    <h4 className="app-card-title">Ledger Submission History</h4>
                    <div className="search-box">
                        <input type="text" className="form-control form-control-sm" placeholder="Search historical data..." />
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table table-hover mb-0 app-table-hover">
                        <thead className="table-light">
                            <tr>
                                <th className="px-3">Temporal Node (Date)</th>
                                <th>Volume (Calls)</th>
                                <th>Ref Duration</th>
                                <th>Quality Score</th>
                                <th>Velocity Progress</th>
                                <th>Lifecycle</th>
                                <th className="text-end px-3">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, idx) => (
                                <tr key={idx}>
                                    <td className="px-3"><strong>{report.date}</strong></td>
                                    <td><span className="badge bg-soft-primary text-primary px-3">{report.calls} / {report.target}</span></td>
                                    <td className="font-monospace text-dark fw-bold small">{report.duration}</td>
                                    <td><span className="badge bg-soft-warning text-dark border px-3 fw-bold">{report.qa}</span></td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <div className="progress flex-grow-1 shadow-inner" style={{ height: 12, borderRadius: 6, maxWidth: 100 }}>
                                                <div className={`progress-bar bg-${report.progress >= 100 ? 'success' : 'warning'}`} style={{ width: `${Math.min(report.progress, 100)}%` }}></div>
                                            </div>
                                            <span className="ms-2 small fw-bold text-dark">{report.progress}%</span>
                                        </div>
                                    </td>
                                    <td><span className="badge bg-soft-success text-success border px-3">{report.status.toUpperCase()}</span></td>
                                    <td className="text-end px-3">
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-action btn-view" title="Inspect Ledger" data-bs-toggle="modal" data-bs-target="#reportModal" onClick={() => openReportModal(report, 'view')}><i className="fa-solid fa-microscope"></i></button>
                                            <button className="btn btn-sm btn-action btn-edit" title="Modify Record" data-bs-toggle="modal" data-bs-target="#reportModal" onClick={() => openReportModal(report, 'edit')}><i className="fa-solid fa-signature"></i></button>
                                            <button className="btn btn-sm btn-action btn-delete" title="Purge Ledger" onClick={() => confirm(`Purge ${report.date} performance data?`) && alert('Ledger Purged')}><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* REPORT MODAL (Add/View/Edit) */}
            <div className="modal fade" id="reportModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">
                                {editMode ? <><i className="fa-solid fa-pen-nib me-2"></i>Modify Performance Ledger</> : selectedReport ? <><i className="fa-solid fa-file-invoice me-2"></i>Performance Intelligence Detail</> : <><i className="fa-solid fa-upload me-2"></i>Propagate Today's Output</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="p-4 bg-light border-bottom text-center">
                                <h3 className="fw-bold mb-1 text-dark">{selectedReport?.date || 'Temporal Initialization...'}</h3>
                                <div className="d-flex justify-content-center gap-2">
                                    <span className="badge bg-primary px-3 py-2 rounded-pill shadow-sm">UID: Priya Sharma (EMP001)</span>
                                    {selectedReport && <span className="badge bg-success px-3 py-2 rounded-pill shadow-sm">VERIFIED BY OPS</span>}
                                </div>
                            </div>
                            <div className="p-4 bg-white italicized-labels">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Duty Cycle Alignment</label>
                                        <select className="form-select" disabled={!editMode && selectedReport}>
                                            <option>Morning (6AM - 2PM)</option>
                                            <option>Afternoon (2PM - 10PM)</option>
                                            <option>Evening (10PM - 6AM)</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Temporal Node (Report Date)</label>
                                        <input type="date" className="form-control" defaultValue={selectedReport ? '2026-04-14' : ''} readOnly={!editMode && selectedReport} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Engagements Triggered (Calls)</label>
                                        <input type="number" className="form-control" defaultValue={selectedReport?.calls} readOnly={!editMode && selectedReport} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Reference Target</label>
                                        <input type="number" className="form-control" defaultValue={selectedReport?.target || 40} readOnly={!editMode && selectedReport} />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Temporal Density (Avg Duration)</label>
                                        <input type="text" className="form-control font-monospace" defaultValue={selectedReport?.duration} placeholder="MM:SS" readOnly={!editMode && selectedReport} />
                                    </div>
                                    <div className="col-md-6 italicized-labels">
                                        <label className="form-label small fw-bold text-primary text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Quality Calibration Score</label>
                                        <div className="input-group">
                                            <input type="number" className="form-control fw-bold border-primary" defaultValue={selectedReport?.qa.split('/')[0]} readOnly={!editMode && selectedReport} />
                                            <span className="input-group-text bg-primary text-white border-primary">/ 100</span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Target Velocity (%)</label>
                                        <input type="number" className="form-control" defaultValue={selectedReport?.progress} readOnly={!editMode && selectedReport} />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Operation Intelligence Brief (Notes)</label>
                                        <textarea className="form-control" rows="3" defaultValue="Target exceeded due to high engagement volume in morning hours. One escalations handled successfully." readOnly={!editMode && selectedReport} style={{ resize: 'none' }}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4 bg-light shadow-inner">
                            <button type="button" className="btn btn-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Abort Submission</button>
                            {(editMode || !selectedReport) && (
                                <button type="button" className="btn btn-primary px-5 fw-bold shadow-sm" style={{ background: '#9B7D3D', borderColor: '#9B7D3D' }} onClick={() => alert('Ledger Propagated to Command Center')}>Commit Performance</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DailyReportUpload;
