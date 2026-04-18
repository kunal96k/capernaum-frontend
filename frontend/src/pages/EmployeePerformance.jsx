import React, { useEffect, useState } from 'react';
import {
    Users,
    UserPlus,
    BarChart3,
    Target,
    Clock,
    ShieldCheck,
    Search,
    Filter,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    ChevronRight,
    Briefcase,
    Zap,
    Activity
} from 'lucide-react';

const EmployeePerformance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [agents, setAgents] = useState([
        { id: '1', name: 'Priya Sharma', init: 'PS', client: 'Nexura Technologies', project: 'Audio Transcription', calls: 42, target: 40, duration: '3:48', qa: 92, progress: 105, status: 'Active' },
        { id: '2', name: 'Rahul Patil', init: 'RP', client: 'GreenField Corp', project: 'L1 Outreach', calls: 38, target: 35, duration: '4:15', qa: 88, progress: 109, status: 'Active' },
        { id: '3', name: 'Vikram Deshmukh', init: 'VD', client: 'Apex Solutions', project: 'Data Labeling', calls: 28, target: 35, duration: '5:02', qa: 72, progress: 80, status: 'Idle' },
        { id: '4', name: 'Anjali Mehta', init: 'AM', client: 'BlueStar BPO', project: 'Backoffice Audit', calls: 15, target: 35, duration: '6:48', qa: 58, progress: 43, status: 'Break' },
    ]);

    const handleUpdateTarget = (id, newTarget) => {
        setAgents(prev => prev.map(a => {
            if (a.id === id) {
                const progress = Math.round((a.calls / newTarget) * 100);
                return { ...a, target: newTarget, progress };
            }
            return a;
        }));
        alert('Operational Target Strategy Propagated');
    };

    const handleDeployPersonnel = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const client = formData.get('client_project').split(' — ')[0];
        
        const newAgent = {
            id: Date.now().toString(),
            name: name,
            init: name.split(' ').map(n => n[0]).join(''),
            client: client,
            project: 'Assigned',
            calls: 0,
            target: 40,
            duration: '0:00',
            qa: 100,
            progress: 0,
            status: 'Active'
        };
        
        setAgents([newAgent, ...agents]);
        alert('Infrastructure Deployment Initiated');
    };

    const getStatusConfig = (status) => {
        switch (status) {
            case 'Active': return { color: 'success', icon: <div className="status-dot bg-success me-2"></div> };
            case 'Idle': return { color: 'warning', icon: <div className="status-dot bg-warning me-2"></div> };
            case 'Break': return { color: 'danger', icon: <div className="status-dot bg-danger me-2"></div> };
            default: return { color: 'secondary', icon: null };
        }
    };

    return (
        <div className="performance-metrics-wrapper">
            <div className="row mb-4 align-items-center justify-content-between g-3">
                <div className="col">
                    <h1 className="app-page-title mb-1">Personnel Performance Matrix</h1>
                    <p className="text-muted mb-0 small">Real-time throughput, quality oversight, and resource deployment telemetry.</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary shadow-lg border-0 px-4 hov-translate-up fw-bold" style={{ background: '#9B7D3D' }} data-bs-toggle="modal" data-bs-target="#allocateResourceModal">
                        <UserPlus size={18} className="me-2" />Deploy Personnel
                    </button>
                </div>
            </div>

            {/* Performance Telemetry */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Active Personnel', value: '156', icon: <Users size={20} className="text-primary" />, meta: '98% On-site', color: 'border-left-blue' },
                    { label: 'Target Compliance', value: '118', icon: <Target size={20} className="text-success" />, meta: '+12% vs LW', color: 'border-left-green' },
                    { label: 'System Utilization', value: '88.4%', icon: <Zap size={20} className="text-warning" />, meta: 'Peak Load', color: 'border-left-orange' },
                    { label: 'Avg QA Pulse', value: '84/100', icon: <ShieldCheck size={20} className="text-info" />, meta: 'Stable', color: 'border-left-info' }
                ].map((stat, i) => (
                    <div className="col-6 col-md-3" key={i}>
                        <div className={`app-card shadow-sm h-100 ${stat.color} overflow-hidden`}>
                            <div className="app-card-body p-4 text-center">
                                <div className="mb-2 opacity-50">{stat.icon}</div>
                                <div className="stats-figure fw-bold fs-3 text-dark">{stat.value}</div>
                                <div className="stats-label extra-small text-muted text-uppercase fw-bold mb-1">{stat.label}</div>
                                <div className="extra-small fw-bold text-success" style={{ fontSize: '0.65rem' }}>{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter & Search Bar */}
            <div className="app-card shadow-sm mb-4">
                <div className="app-card-body p-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <div className="search-box position-relative">
                                <input type="text" className="form-control ps-5 rounded-pill border-light" placeholder="Search Personnel..." onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-auto ms-auto d-flex gap-2">
                            <select className="form-select border-light rounded-pill small fw-bold">
                                <option>All Client Entities</option>
                                <option>Nexura Technologies</option>
                                <option>GreenField Corp</option>
                            </select>
                            <button className="btn btn-white border shadow-sm rounded-pill px-3 fw-bold small">Filters</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Agent Matrix Grid */}
            <div className="row g-4 mb-4">
                {agents.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase())).map((agent, idx) => {
                    const status = getStatusConfig(agent.status);
                    const isHighPerformance = agent.qa >= 90;

                    return (
                        <div className="col-12 col-md-6 col-lg-4" key={idx}>
                            <div className="app-card shadow-sm h-100 border-top border-4 hov-translate-up transition-all" style={{ borderTopColor: agent.progress >= 100 ? '#198754' : '#fd7e14' }}>
                                <div className="app-card-body p-4">
                                    <div className="d-flex align-items-center mb-4">
                                        <div className="user-avatar-lg rounded-3 d-flex align-items-center justify-content-center bg-soft-primary text-primary fw-bold me-3 shadow-sm border" style={{ width: 54, height: 54 }}>
                                            {agent.init}
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <h6 className="mb-0 fw-bold text-dark">{agent.name}</h6>
                                                <div className="d-flex align-items-center">
                                                    {status.icon}
                                                    <span className={`extra-small fw-bold text-${status.color} text-uppercase`}>{agent.status}</span>
                                                </div>
                                            </div>
                                            <p className="text-muted mb-0 font-monospace" style={{ fontSize: '0.7rem' }}>{agent.client}</p>
                                        </div>
                                    </div>

                                    <div className="agent-operational-stats p-3 bg-light rounded-4 mb-4 shadow-inner">
                                        <div className="row g-2">
                                            <div className="col-4 border-end">
                                                <div className="extra-small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.6rem' }}>Throughput</div>
                                                <div className="fw-bold text-dark small">{agent.calls}/{agent.target}</div>
                                            </div>
                                            <div className="col-4 border-end text-center">
                                                <div className="extra-small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.6rem' }}>Temporal</div>
                                                <div className="fw-bold text-success small">{agent.duration}</div>
                                            </div>
                                            <div className="col-4 text-end">
                                                <div className="extra-small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.6rem' }}>Quality</div>
                                                <div className={`fw-bold small ${isHighPerformance ? 'text-success' : 'text-primary'}`}>{agent.qa}%</div>
                                            </div>
                                            <div className="col-12 pt-1 border-top mt-2">
                                                <div className="d-flex justify-content-between extra-small fw-bold text-muted mb-1" style={{ fontSize: '0.6rem' }}>
                                                    <span>TARGET QUOTA</span>
                                                    <span className={agent.progress >= 100 ? 'text-success' : 'text-warning'}>{agent.progress}%</span>
                                                </div>
                                                <div className="progress shadow-sm" style={{ height: 6, borderRadius: 10 }}>
                                                    <div className={`progress-bar progress-bar-striped progress-bar-animated bg-${agent.progress >= 100 ? 'success' : 'warning'}`} style={{ width: `${Math.min(agent.progress, 100)}%` }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button
                                            className="btn btn-primary flex-grow-1 shadow-sm fw-bold border-0 py-2 py-lg-1 small hov-translate-up"
                                            style={{ background: '#1a1d20', color: 'white' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#analyticsHubModal"
                                            onClick={() => setSelectedAgent(agent)}
                                        >
                                            <BarChart3 size={14} className="me-2" /> Analytics Hub
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary border shadow-xs px-3 py-2 py-lg-1 small hov-bg-dark hov-text-white transition-all"
                                            data-bs-toggle="modal"
                                            data-bs-target="#targetStrategyModal"
                                            onClick={() => setSelectedAgent(agent)}
                                        >
                                            <Target size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODALS */}
            {/* ANALYTICS HUB MODAL */}
            <div className="modal fade" id="analyticsHubModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center">
                                <BarChart3 size={20} className="me-2 text-primary" /> Performance Intelligence Hub — {selectedAgent?.name}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <div className="row g-4">
                                <div className="col-md-3 border-end">
                                    <div className="p-4 bg-light rounded-4 text-center mb-4">
                                        <div className="stats-figure fw-bold text-dark fs-2 mb-0">{selectedAgent?.qa}%</div>
                                        <div className="extra-small text-muted fw-bold text-uppercase">Mean QA Accuracy</div>
                                    </div>
                                    <div className="p-4 bg-soft-success rounded-4 text-center">
                                        <div className="stats-figure fw-bold text-success fs-2 mb-0">{selectedAgent?.progress}%</div>
                                        <div className="extra-small text-muted fw-bold text-uppercase">Quota Fulfillment</div>
                                    </div>
                                    <div className="mt-4 p-3 border rounded-3 text-start">
                                        <h6 className="fw-bold mb-3 small opacity-50"><Activity size={14} className="me-2" />Pulse Timeline</h6>
                                        <ul className="list-unstyled mb-0">
                                            {['09:00 - Logged In', '11:45 - High QA (98%)', '01:30 - Target Met'].map((log, i) => (
                                                <li key={i} className="extra-small mb-2 d-flex align-items-center"><CheckCircle2 size={12} className="text-success me-2" /> {log}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="bg-light p-5 rounded-4 d-flex align-items-center justify-content-center border-dashed position-relative overflow-hidden" style={{ height: 350 }}>
                                        <div className="d-flex align-items-end gap-3 h-100 w-100 px-4 pb-4">
                                            {[50, 70, 40, 85, 60, 95, 80, 55, 90, 75, 85].map((h, i) => (
                                                <div key={i} className="flex-grow-1 bg-primary bg-opacity-25 rounded-top transition-all shadow-sm" style={{ height: `${h}%`, minWidth: '20px', backgroundColor: i === 5 ? '#9B7D3D' : '#0d6efd' }}></div>
                                            ))}
                                        </div>
                                        <div className="position-absolute top-50 start-50 translate-middle text-center">
                                            <TrendingUp size={48} className="text-dark mb-3 mx-auto opacity-25" />
                                            <h5 className="fw-bold text-dark opacity-50">Real-time Telemetry Active</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-dark px-5 fw-bold" data-bs-dismiss="modal">Close Session</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* TARGET STRATEGY MODAL */}
            <div className="modal fade" id="targetStrategyModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Target size={20} className="me-2 text-danger" />Operational Target Strategy</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5">
                            <div className="text-center mb-5">
                                <h6 className="text-muted text-uppercase fw-bold extra-small mb-1">Targeting Personnel</h6>
                                <h3 className="fw-bold text-dark">{selectedAgent?.name}</h3>
                            </div>
                            <div className="mb-4">
                                <label className="form-label extra-small fw-bold text-muted text-uppercase">Throughput Quota (Units/Shift)</label>
                                <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                                    <button className="btn btn-light border-end fw-bold" onClick={() => {
                                        const input = document.getElementById('targetInput');
                                        input.value = parseInt(input.value) - 5;
                                    }}>-</button>
                                    <input id="targetInput" type="number" className="form-control border-0 text-center fw-bold text-dark py-3" defaultValue={selectedAgent?.target || 40} />
                                    <button className="btn btn-light border-start fw-bold" onClick={() => {
                                        const input = document.getElementById('targetInput');
                                        input.value = parseInt(input.value) + 5;
                                    }}>+</button>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label extra-small fw-bold text-muted text-uppercase">QA Compliance Threshold (%)</label>
                                <input type="range" className="form-range" min="0" max="100" defaultValue="85" />
                                <div className="d-flex justify-content-between extra-small fw-bold text-muted">
                                    <span>Efficiency Focus</span>
                                    <span className="text-dark">85% Threshold</span>
                                    <span>Quality Precision</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-4 bg-soft-danger border border-danger border-opacity-10 mt-5">
                                <div className="d-flex align-items-center mb-2">
                                    <AlertCircle size={20} className="text-danger me-2" />
                                    <h6 className="fw-bold mb-0 text-dark small">Strategy Recalibration</h6>
                                </div>
                                <p className="extra-small text-muted mb-0 fw-semibold">Modifying targets will instantly broadcast updated KPIs to the personnel dashboard and trigger manager alert sequences.</p>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-3 border-0">
                            <button className="btn btn-primary w-100 py-3 fw-bold shadow-lg border-0 hov-translate-up" style={{ background: '#9B7D3D' }} onClick={() => handleUpdateTarget(selectedAgent.id, parseInt(document.getElementById('targetInput').value))} data-bs-dismiss="modal">Push Strategy Update</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESOURCE DEPLOYMENT MODAL */}
            <div className="modal fade" id="allocateResourceModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center">
                                <Users size={20} className="me-2 text-warning" />Strategic Personnel Deployment
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleDeployPersonnel}>
                            <div className="modal-body p-4 bg-white">
                                <div className="row g-3 mb-4">
                                    <div className="col-md-12">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Resource Identity</label>
                                        <input name="name" type="text" className="form-control py-3 fw-bold shadow-sm" placeholder="Enter Full Name..." required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Target Enterprise Entity / Project Cluster</label>
                                    <div className="input-group shadow-sm border rounded-3 overflow-hidden">
                                        <span className="input-group-text bg-light border-0"><Briefcase size={18} className="text-muted" /></span>
                                        <select name="client_project" className="form-select border-0 fw-bold text-dark py-3" required>
                                            <option value="">Select operational target...</option>
                                            <option>Nexura Technologies — Audio Translation Hub</option>
                                            <option>GreenField Corp — Global Data Mining Unit</option>
                                            <option>Apex Solutions — CRM Cleanup Sequence</option>
                                        </select>
                                    </div>
                                </div>

                            <div className="row g-4">
                                <div className="col-md-12">
                                    <div className="d-flex justify-content-between align-items-end mb-3">
                                        <label className="form-label mb-0 extra-small fw-bold text-muted text-uppercase">Qualified Resource Inventory</label>
                                        <div className="extra-small text-primary fw-bold cursor-pointer transition-all hov-translate-up">Select All Operational Units <TrendingUp size={12} className="ms-1" /></div>
                                    </div>
                                    <div className="resource-inventory shadow-inner border rounded-4 overflow-hidden" style={{ maxHeight: 320, overflowY: 'auto' }}>
                                        {[
                                            { name: 'Priya Sharma', status: 'Deployed', color: 'primary', tags: ['L3 Auth', 'Audio'] },
                                            { name: 'Rahul Patil', status: 'Deployed', color: 'primary', tags: ['Mining', 'L2'] },
                                            { name: 'Sneha Kulkarni', status: 'Available', color: 'success', tags: ['QA'] },
                                            { name: 'Vikram Deshmukh', status: 'Available', color: 'success', tags: ['L1 Outreach'] },
                                            { name: 'Anjali Mehta', status: 'Deployed', color: 'primary', tags: ['Compliance'] },
                                            { name: 'Kunal Joshi', status: 'Standby', color: 'warning', tags: ['Support'] }
                                        ].map((emp, i) => (
                                            <div className="d-flex align-items-center justify-content-between p-3 border-bottom hov-bg-light transition-all" key={i}>
                                                <div className="d-flex align-items-center">
                                                    <div className="form-check mb-0 hov-scale">
                                                        <input className="form-check-input" type="checkbox" id={`empCheck-${i}`} style={{ width: '1.4rem', height: '1.4rem' }} defaultChecked={emp.status === 'Deployed'} />
                                                    </div>
                                                    <div className="ms-3">
                                                        <div className="fw-bold text-dark">{emp.name}</div>
                                                        <div className="d-flex gap-1 mt-1">
                                                            {emp.tags.map((t, ti) => <span key={ti} className="badge bg-light text-muted extra-small border font-monospace">{t}</span>)}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <span className={`badge bg-soft-${emp.color} text-${emp.color} px-3 py-2 rounded-pill fw-bold border border-${emp.color} border-opacity-25`} style={{ fontSize: '0.65rem' }}>{emp.status.toUpperCase()}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Abort Deployment</button>
                            <button type="submit" className="btn btn-primary px-5 fw-bold shadow-lg hov-translate-up" style={{ background: '#9B7D3D', border: 'none' }} data-bs-dismiss="modal">
                                <CheckCircle2 size={18} className="me-2" />Execute Personnel Linkage
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeePerformance;
