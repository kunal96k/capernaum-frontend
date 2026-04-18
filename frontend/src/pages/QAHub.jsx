import React, { useEffect, useState } from 'react';
import { 
    Headphones, 
    Play, 
    Search, 
    Filter, 
    Download, 
    List, 
    Grid, 
    Star, 
    TrendingUp, 
    CheckCircle2, 
    AlertCircle, 
    XCircle, 
    Clock, 
    ShieldCheck, 
    MessageSquare,
    Calendar,
    Award,
    ChevronRight,
    MoreHorizontal,
    Trash2,
    Activity
} from 'lucide-react';

const QAHub = () => {
    const [activeTab, setActiveTab] = useState('call-logs-tab');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
    const [selectedLog, setSelectedLog] = useState(null);
    const [calibrationScore, setCalibrationScore] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [logs, setLogs] = useState([
        { id: 1, name: 'Priya Sharma', init: 'PS', client: 'Nexura Technologies', project: 'Voice Support Q2', date: '15 Apr 2026', duration: '04:32', score: 92, status: 'Passed', evaluator: 'Suresh Raina' },
        { id: 2, name: 'Rahul Patil', init: 'RP', client: 'GreenField Corp', project: 'L1 Tech Desk', date: '15 Apr 2026', duration: '06:15', score: 88, status: 'Passed', evaluator: 'Suresh Raina' },
        { id: 3, name: 'Vikram Deshmukh', init: 'VD', client: 'Apex Solutions', project: 'Lead Qualifying', date: '14 Apr 2026', duration: '03:48', score: 72, status: 'Review', evaluator: 'Anjali Sharma' },
        { id: 4, name: 'Anjali Mehta', init: 'AM', client: 'BlueStar BPO', project: 'Claims Audit', date: '13 Apr 2026', duration: '05:10', score: 58, status: 'Failed', evaluator: 'Anjali Sharma' },
    ]);

    const handleScoreUpdate = () => {
        if (!selectedLog) return;
        setLogs(prevLogs => prevLogs.map(log => 
            log.id === selectedLog.id ? { ...log, score: calibrationScore } : log
        ));
        alert('Performance Matrix Recalibrated and Saved');
    };

    const handleDeleteLog = (id) => {
        if (confirm('Confirm record deletion? This action cannot be undone.')) {
            setLogs(prevLogs => prevLogs.filter(log => log.id !== id));
        }
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-success';
        if (score >= 75) return 'text-primary';
        if (score >= 60) return 'text-warning';
        return 'text-danger';
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Passed': return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-20 px-3 py-1 rounded-pill">QUALIFIED</span>;
            case 'Review': return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-20 px-3 py-1 rounded-pill">AUDIT PENDING</span>;
            case 'Failed': return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-20 px-3 py-1 rounded-pill">COACHING REQ</span>;
            default: return null;
        }
    };

    return (
        <div className="qa-hub-wrapper">
            <div className="row mb-4 align-items-center justify-content-between g-3">
                <div className="col">
                    <h1 className="app-page-title mb-1">Quality Assurance Hub</h1>
                    <p className="text-muted mb-0 small">Operational intelligence and compliance monitoring for enterprise workflows.</p>
                </div>
                <div className="col-auto d-flex gap-2">
                    <div className="btn-group shadow-sm bg-white rounded p-1">
                        <button className={`btn btn-sm ${viewMode === 'table' ? 'btn-primary shadow-sm' : 'btn-light border-0'}`} onClick={() => setViewMode('table')}><List size={16} /></button>
                        <button className={`btn btn-sm ${viewMode === 'card' ? 'btn-primary shadow-sm' : 'btn-light border-0'}`} onClick={() => setViewMode('card')}><Grid size={16} /></button>
                    </div>
                    <button className="btn btn-white border shadow-sm px-3 fw-bold small"><Download size={14} className="me-2" />Report</button>
                </div>
            </div>

            <ul className="nav nav-pills mb-4 bg-light p-1 rounded-3 d-inline-flex" role="tablist">
                <li className="nav-item">
                    <button className={`nav-link px-4 py-2 fw-bold small ${activeTab === 'call-logs-tab' ? 'active shadow-sm' : ''}`} onClick={() => setActiveTab('call-logs-tab')}>Audit Logs & Evaluations</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link px-4 py-2 fw-bold small ${activeTab === 'analytics' ? 'active shadow-sm' : ''}`} onClick={() => setActiveTab('analytics')}>Performance Trends</button>
                </li>
            </ul>

            {activeTab === 'call-logs-tab' && (
                <>
                    {/* BPO Telemetry Cards */}
                    <div className="row g-4 mb-4">
                        {[
                            { label: 'System Accuracy', value: '94.2%', icon: <ShieldCheck className="text-success" />, meta: '+1.2%', color: 'border-left-green' },
                            { label: 'Evaluation Depth', value: '1,242', icon: <Headphones className="text-primary" />, meta: 'Target 1.5k', color: 'border-left-blue' },
                            { label: 'Compliance Index', value: '88/100', icon: <TrendingUp className="text-warning" />, meta: '-2 pts', color: 'border-left-orange' },
                            { label: 'Coaching Pulse', value: '18 Units', icon: <MessageSquare className="text-danger" />, meta: 'Active now', color: 'border-left-red' }
                        ].map((stat, i) => (
                            <div className="col-12 col-md-3" key={i}>
                                <div className={`app-card shadow-sm h-100 ${stat.color}`}>
                                    <div className="app-card-body p-4 text-center">
                                        <div className="mb-2 opacity-50">{stat.icon}</div>
                                        <div className="stats-figure fw-bold fs-3 text-dark">{stat.value}</div>
                                        <div className="stats-label extra-small text-muted text-uppercase fw-bold mb-1">{stat.label}</div>
                                        <div className="small fw-bold text-success" style={{fontSize: '0.7rem'}}>{stat.meta}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {viewMode === 'table' ? (
                        <div className="app-card app-card-table shadow-sm mb-4 overflow-hidden">
                            <div className="app-card-header p-4 border-bottom bg-white d-flex justify-content-between align-items-center">
                                <h4 className="app-card-title mb-0">Engagement Audit Log</h4>
                                <div className="d-flex gap-2">
                                    <div className="search-box position-relative">
                                        <Search size={16} className="position-absolute translate-middle-y top-50 ms-3 text-muted" />
                                        <input type="text" className="form-control form-control-sm ps-5 rounded-pill border-light" placeholder="Agent or Project..." onChange={(e) => setSearchTerm(e.target.value)} />
                                    </div>
                                    <button className="btn btn-sm btn-light border"><Filter size={14} /></button>
                                </div>
                            </div>
                            <div className="app-card-body p-0 table-responsive">
                                <table className="table app-table-hover mb-0 align-middle">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="px-4">Service Representative</th>
                                            <th>Enterprise Client</th>
                                            <th>Audit Date</th>
                                            <th>Score</th>
                                            <th>Compliance State</th>
                                            <th className="text-end px-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {logs.filter(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()) || l.project.toLowerCase().includes(searchTerm.toLowerCase())).map((log) => (
                                            <tr key={log.id} className="transition-all hov-bg-light">
                                                <td className="px-4" data-label="Entity">
                                                    <div className="d-flex align-items-center">
                                                        <div className="user-avatar-sm rounded-3 d-flex align-items-center justify-content-center bg-soft-primary text-primary fw-bold me-3 border" style={{width: 38, height: 38, fontSize: '0.8rem'}}>{log.init}</div>
                                                        <div>
                                                            <div className="fw-bold text-dark small">{log.name}</div>
                                                            <div className="extra-small text-muted font-monospace" style={{fontSize: '0.6rem'}}>{log.project}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-label="Client/Eval">
                                                    <div className="fw-semibold text-dark small">{log.client}</div>
                                                    <div className="extra-small text-muted" style={{fontSize: '0.65rem'}}>Evaluator: {log.evaluator}</div>
                                                </td>
                                                <td className="small text-muted" data-label="Date/Pulse">
                                                    <div className="fw-bold">{log.date}</div>
                                                    <div className="extra-small opacity-75"><Clock size={10} className="me-1" /> {log.duration} duration</div>
                                                </td>
                                                <td data-label="Score">
                                                    <div className={`fw-bold fs-5 ${getScoreColor(log.score)}`}>{log.score}<small className="text-muted opacity-50" style={{fontSize: '0.6em'}}> /100</small></div>
                                                </td>
                                                <td data-label="Status">{getStatusBadge(log.status)}</td>
                                                <td className="text-end px-4" data-label="Operations">
                                                    <div className="btn-group shadow-sm rounded-pill overflow-hidden border">
                                                        <button className="btn btn-sm btn-white text-muted hov-bg-primary hov-text-white border-0" title="Deep Audit" data-bs-toggle="modal" data-bs-target="#qaEvaluationModal" onClick={() => setSelectedLog(log)}><Headphones size={16} /></button>
                                                        <button className="btn btn-sm btn-white text-muted hov-bg-warning hov-text-dark border-0" title="Adjust Parameters" data-bs-toggle="modal" data-bs-target="#editScoreModal" onClick={() => { setSelectedLog(log); setCalibrationScore(log.score); }}><Award size={16} /></button>
                                                        <button className="btn btn-sm btn-white text-muted hov-bg-danger hov-text-white border-0 text-danger" title="Purge Record" onClick={() => handleDeleteLog(log.id)}><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="row g-4 mb-4">
                            {logs.map((log) => (
                                <div className="col-12 col-md-6 col-lg-4" key={log.id}>
                                    <div className="app-card shadow-sm h-100 border-top border-4 border-primary hov-translate-up transition-all">
                                        <div className="app-card-body p-4">
                                            <div className="d-flex align-items-start mb-4">
                                                <div className="user-avatar-lg rounded-3 d-flex align-items-center justify-content-center bg-soft-primary text-primary fw-bold me-3 border" style={{width: 50, height: 50, fontSize: '1.2rem'}}>{log.init}</div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0 fw-bold">{log.name}</h6>
                                                    <p className="text-muted small mb-0">{log.project} • {log.client}</p>
                                                    <div className="mt-1">{getStatusBadge(log.status)}</div>
                                                </div>
                                                <button className="btn btn-link p-0 text-muted"><MoreHorizontal size={18} /></button>
                                            </div>
                                            <div className="stats-box bg-light rounded-3 p-3 text-center mb-4 shadow-inner">
                                                <div className="extra-small text-muted text-uppercase fw-bold mb-1">Quality Engagement Score</div>
                                                <div className={`fs-1 fw-bold ${getScoreColor(log.score)}`}>{log.score}<small className="text-muted opacity-50" style={{fontSize: '0.5em'}}>%</small></div>
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button className="btn btn-primary flex-grow-1 shadow-sm fw-bold py-2 border-0" data-bs-toggle="modal" data-bs-target="#qaEvaluationModal" onClick={() => setSelectedLog(log)} style={{background: '#9B7D3D', color: 'white'}}>
                                                    <Headphones size={16} className="me-2" /> Audit Session
                                                </button>
                                                <button className="btn btn-white border px-3" data-bs-toggle="modal" data-bs-target="#editScoreModal" onClick={() => { setSelectedLog(log); setCalibrationScore(log.score); }}><Award size={18} className="text-primary" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {activeTab === 'analytics' && (
                <div className="app-card shadow-sm p-5 text-center bg-white rounded-3">
                    <div className="mb-4 d-inline-block bg-primary bg-opacity-10 p-4 rounded-circle">
                        <TrendingUp size={48} className="text-primary" />
                    </div>
                    <h3 className="fw-bold text-dark">Proprietary Trend Intelligence</h3>
                    <p className="text-muted mx-auto" style={{maxWidth: '500px'}}>Data aggregation in progress. Live performance telemetry, KPI trajectory, and agent coaching loops will visualize here shortly.</p>
                    <button className="btn btn-primary px-5 py-2 fw-bold shadow-lg" style={{background: '#9B7D3D', border: 'none'}}>Initialize Sync</button>
                </div>
            )}

            {/* MODALS */}
            {/* Modal: Deep Audit & Checks */}
            <div className="modal fade" id="qaEvaluationModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white border-0 p-4">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Headphones size={20} className="me-2 text-warning" />Strategic Quality Audit</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0 bg-white">
                            {selectedLog && (
                                <>
                                    <div className="p-4 bg-light border-bottom d-flex align-items-center">
                                        <div className="me-4 pe-4 border-end">
                                            <div className="extra-small text-muted text-uppercase fw-bold">Agent</div>
                                            <div className="fw-bold fs-5 text-dark">{selectedLog.name}</div>
                                        </div>
                                        <div className="me-4 pe-4 border-end">
                                            <div className="extra-small text-muted text-uppercase fw-bold">Enterprise Client</div>
                                            <div className="fw-bold text-dark">{selectedLog.client}</div>
                                        </div>
                                        <div className="ms-auto text-end">
                                            <div className="extra-small text-muted text-uppercase fw-bold">Quality Pulse</div>
                                            <div className={`fw-bold fs-4 ${getScoreColor(selectedLog.score)}`}>{selectedLog.score}%</div>
                                        </div>
                                    </div>

                                    <div className="p-4">
                                        <div className="audio-player-premium mb-4 p-4 border rounded-4 shadow-sm bg-white overflow-hidden position-relative">
                                            <div className="position-absolute top-0 start-0 h-100 bg-primary opacity-05" style={{width: '60%'}}></div>
                                            <div className="row align-items-center position-relative">
                                                <div className="col-auto">
                                                    <button className="btn btn-primary rounded-circle shadow p-3" style={{width: 56, height: 56, background: '#9B7D3D', border: 'none'}}><Play size={24} fill="white" /></button>
                                                </div>
                                                <div className="col">
                                                    <div className="fw-bold text-dark mb-1">RECORDING_STREAM_SEC_{selectedLog.id}.wav</div>
                                                    <div className="d-flex align-items-center gap-3">
                                                       <span className="badge bg-soft-primary text-primary extra-small">ENCRYPTED</span>
                                                       <span className="text-muted extra-small"><Clock size={12} className="me-1" /> {selectedLog.duration} session duration</span>
                                                    </div>
                                                </div>
                                                <div className="col-auto text-end">
                                                    <span className="font-monospace text-primary fw-bold" style={{fontSize: '0.8rem'}}>02:14 / {selectedLog.duration}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row g-4">
                                            <div className="col-md-7">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center"><ShieldCheck size={18} className="me-2 text-primary" /> Evaluation Checksheet</h6>
                                                <div className="checklist-container">
                                                    {[
                                                       { label: 'Mandatory Greeting Protocol', status: 'Passed' },
                                                       { label: 'Technical Issue Resolution Integrity', status: 'Passed' },
                                                       { label: 'Documentation & Case Logging', status: 'Passed' },
                                                       { label: 'Escalation Threshold Monitoring', status: 'Review' },
                                                       { label: 'Global Compliance Adherence', status: 'Passed' }
                                                    ].map((check, i) => (
                                                        <div className="d-flex justify-content-between align-items-center p-3 mb-2 rounded-3 border bg-white hov-bg-light transition-all" key={i}>
                                                            <span className="small fw-semibold text-dark">{check.label}</span>
                                                            {check.status === 'Passed' ? <CheckCircle2 className="text-success" size={18} /> : <AlertCircle className="text-warning" size={18} />}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <h6 className="fw-bold mb-3 d-flex align-items-center"><MessageSquare size={18} className="me-2 text-primary" /> Strategic Feedback</h6>
                                                <div className="p-4 bg-light rounded-4 border-start border-4 border-warning shadow-inner">
                                                    <p className="small text-dark italic mb-3">"Representative demonstrated high empathy and technical accuracy. Closing script requires additional refinement to align with Q2 customer satisfaction objectives."</p>
                                                    <div className="d-flex align-items-center">
                                                        <div className="user-avatar-sm rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-2" style={{width: 24, height: 24, fontSize: '0.6rem'}}>QA</div>
                                                        <span className="extra-small fw-bold text-muted">Audited by {selectedLog.evaluator}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                   <button className="btn btn-dark w-100 py-2 fw-bold small shadow-sm" onClick={() => {
                                                       setLogs(prev => prev.map(l => l.id === selectedLog.id ? {...l, status: 'Passed'} : l));
                                                       alert('Evaluation Certified Successfully');
                                                   }} data-bs-dismiss="modal"><Award size={14} className="me-2" /> Certify Evaluation</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer border-0 p-4 bg-light">
                            <button type="button" className="btn btn-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Close Insight</button>
                            <button type="button" className="btn btn-primary px-4 fw-bold shadow-lg" style={{background: '#9B7D3D', border: 'none'}} data-bs-toggle="modal" data-bs-target="#coachingModal">
                                <Calendar size={18} className="me-2" />Schedule Coaching Loop
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal: Score Adjustment */}
            {/* AUDIO PLAYER MODAL */}
            <div className="modal fade" id="audioPlayerModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Play size={20} className="me-2 text-primary" />Forensic Audio Stream Interface</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5 bg-dark text-white">
                            {selectedLog && (
                                <div className="text-center">
                                    <div className="mb-4">
                                        <h4 className="fw-bold mb-1 text-white">{selectedLog.name}</h4>
                                        <p className="text-muted small text-uppercase fw-bold letter-spacing-2">{selectedLog.project} — {selectedLog.date}</p>
                                    </div>
                                    <div className="audio-visualizer bg-black bg-opacity-50 rounded-4 p-5 mb-5 border border-white border-opacity-10 d-flex align-items-center justify-content-center" style={{ height: 180 }}>
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className="bg-primary mx-1" style={{ width: 4, height: `${Math.random() * 100}%`, borderRadius: 10, opacity: 0.6 }}></div>
                                        ))}
                                    </div>
                                    <div className="audio-controls d-flex align-items-center justify-content-center gap-4">
                                        <button className="btn btn-link text-white opacity-50"><i className="fa-solid fa-backward-step fs-4"></i></button>
                                        <button className="btn btn-primary rounded-circle shadow-lg" style={{ width: 64, height: 64, background: '#9B7D3D', border: 'none' }}><Play size={32} className="ms-1" /></button>
                                        <button className="btn btn-link text-white opacity-50"><i className="fa-solid fa-forward-step fs-4"></i></button>
                                    </div>
                                    <div className="mt-5 progress bg-white bg-opacity-10" style={{ height: 6, borderRadius: 10 }}>
                                        <div className="progress-bar bg-primary" style={{ width: '45%' }}></div>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2 extra-small text-muted fw-bold">
                                        <span>02:14</span>
                                        <span>{selectedLog.duration}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer bg-dark border-top border-white border-opacity-10 p-4">
                            <button type="button" className="btn btn-outline-light px-4 fw-bold" data-bs-dismiss="modal">Terminate Stream</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EVALUATION CHECKSHEET MODAL */}
            <div className="modal fade" id="evaluateModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white p-4">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><List size={20} className="me-2" />Quality Compliance Checksheet</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <div className="row g-4">
                                <div className="col-md-8 border-end">
                                    {[
                                        { cat: 'Greeting & Verification', q: 'Did the agent perform identity verification according to protocol?' },
                                        { cat: 'Problem Solution', q: 'Was the core issue addressed and resolved during the primary pulse?' },
                                        { cat: 'Tone & Empathy', q: 'Did the agent maintain institutional professionalism and emotional resonance?' },
                                        { cat: 'Sales/Offer', q: 'Was the required upsell logic or strategic offer presented?' }
                                    ].map((item, i) => (
                                        <div className="p-4 rounded-4 bg-light mb-3 border border-transparent hov-border-primary transition-all pointer" key={i}>
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h6 className="fw-bold mb-0 text-dark small text-uppercase opacity-50">{item.cat}</h6>
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-white border shadow-xs fw-bold px-3 py-1">FAIL</button>
                                                    <button className="btn btn-sm btn-success shadow-sm fw-bold px-3 py-1 border-0">PASS</button>
                                                </div>
                                            </div>
                                            <p className="mb-0 fw-semibold text-dark">{item.q}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="col-md-4">
                                    <div className="p-4 rounded-4 bg-soft-info border border-info border-opacity-10 mb-4 text-center">
                                        <label className="extra-small text-muted text-uppercase fw-bold mb-1">Live Score Variance</label>
                                        <div className="display-4 fw-bold text-info">88%</div>
                                        <p className="extra-small fw-bold text-info mb-0 lh-base mt-2">Score is currently 4% below client SLA target.</p>
                                    </div>
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Forensic Feedback Log</label>
                                    <textarea className="form-control bg-light border-0 shadow-inner mb-4" rows="8" placeholder="Enter detailed corrective actions and qualitative observations..."></textarea>
                                    <div className="form-check form-switch hov-scale mt-2">
                                        <input className="form-check-input" type="checkbox" id="markCritical" />
                                        <label className="form-check-label small fw-bold text-danger" htmlFor="markCritical">Flag as Critical Compliance Violation</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort Audit</button>
                            <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg" style={{ background: '#9B7D3D', border: 'none' }} onClick={() => alert('Compliance Audit Finalized')} data-bs-dismiss="modal">Finalize Evaluation</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* COACHING LOOP MODAL */}
            <div className="modal fade" id="coachingModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><MessageSquare size={20} className="me-2 text-warning" />Initialize Coaching Feedback Loop</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5">
                            <div className="text-center mb-5">
                                <div className="mx-auto bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mb-3" style={{ width: 80, height: 80 }}>
                                    <TrendingUp size={40} className="text-warning" />
                                </div>
                                <h4 className="fw-bold text-dark">Loop Scheduled with {selectedLog?.name}</h4>
                            </div>
                            <div className="mb-4">
                                <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Resource Availability Slot</label>
                                <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                                     <span className="input-group-text bg-light border-0"><Calendar size={18} className="text-muted" /></span>
                                     <select className="form-select border-0 py-3 fw-bold">
                                         <option>Tomorrow — 10:00 AM (Confirmed Available)</option>
                                         <option>Tomorrow — 02:30 PM</option>
                                         <option>Wed, 22nd — 09:00 AM</option>
                                     </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Strategic Training Module</label>
                                <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                                     <span className="input-group-text bg-light border-0"><Activity size={18} className="text-muted" /></span>
                                     <select className="form-select border-0 py-3 fw-bold">
                                         <option>Active Listening Protocol</option>
                                         <option>Cross-Sell Strategy V2</option>
                                         <option>Negative Customer Handling</option>
                                         <option>System Efficiency Optimization</option>
                                     </select>
                                </div>
                            </div>
                            <div className="form-check mt-5 bg-light p-3 rounded-3 border-dashed">
                                <input className="form-check-input ms-0 me-3" type="checkbox" id="autoNotify" defaultChecked />
                                <label className="form-check-label small fw-bold text-dark" htmlFor="autoNotify">Notify Team Lead via Pulse Notification Channel</label>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort Loop</button>
                            <button type="button" className="btn btn-warning px-5 fw-bold shadow-sm" onClick={() => alert('Coaching Loop Initialized')} data-bs-dismiss="modal">Deploy Coaching Sequence</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CALIBRATE SCORE MODAL */}
            <div className="modal fade" id="editScoreModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" style={{maxWidth: '450px'}}>
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Award size={20} className="me-2" />Calibrate Evaluation Score</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            {selectedLog && (
                                <form className="row g-4">
                                    <div className="col-12">
                                        <div className="p-3 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                                            <div>
                                                <div className="extra-small text-muted text-uppercase fw-bold">Active Agent</div>
                                                <div className="fw-bold text-dark">{selectedLog.name}</div>
                                            </div>
                                            <div className="text-end">
                                                <div className="extra-small text-muted text-uppercase fw-bold">Client Account</div>
                                                <div className="fw-bold text-dark">{selectedLog.client}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 text-center">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-3">Target Calibration (0 - 100)</label>
                                        <div className="d-flex align-items-center justify-content-center gap-3">
                                            <h1 className="fw-bold mb-0 display-4" style={{ color: '#9B7D3D' }}>{calibrationScore}</h1>
                                            <input 
                                                type="range" 
                                                className="form-range" 
                                                min="0" 
                                                max="100" 
                                                value={calibrationScore} 
                                                onChange={(e) => setCalibrationScore(parseInt(e.target.value))}
                                                style={{maxWidth: '200px'}} 
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Calibration Rationale (Mandatory)</label>
                                        <textarea className="form-control bg-light border-0 shadow-inner" rows="4" placeholder="Describe the justification for manual performance adjustment according to BPO compliance guidelines..."></textarea>
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort</button>
                            <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg" style={{background: '#9B7D3D', border: 'none'}} onClick={handleScoreUpdate} data-bs-dismiss="modal">Commit Adjustment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QAHub;
