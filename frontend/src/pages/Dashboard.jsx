import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Welcome Banner */}
            <div className="app-card alert alert-dismissible shadow-sm mb-4 border-left-decoration" role="alert">
                <div className="inner">
                    <div className="app-card-body p-3 p-lg-4">
                        <h3 className="mb-3 text-dark fw-bold">Welcome to Capernaum Solutions</h3>
                        <div className="row gx-5 gy-3">
                            <div className="col-12 col-lg-9">
                                <div className="mb-2 text-dark">BPO & IT Operations command center. Monitor clients, agents, quality, and data in real-time.</div>
                                <div className="text-muted small">Last updated: 15 Apr 2026, 11:45 AM</div>
                            </div>
                            <div className="col-12 col-lg-3">
                                <button className="btn app-btn-primary w-100 shadow-sm" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}}>
                                    <i className="fa-solid fa-chart-line me-2"></i>View Reports
                                </button>
                            </div>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                </div>
            </div>

            {/* Stats Row */}
            <div className="row g-4 mb-4">
                <div className="col-6 col-md-4 col-lg-2">
                    <div className="app-card app-card-stat shadow-sm h-100 border-left-blue">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1 text-uppercase small text-muted">Active Clients</h4>
                            <div className="stats-figure stats-blue" style={{fontSize: '1.8rem', fontWeight: 700}}>38</div>
                            <div className="stats-meta text-muted small">BPO & IT projects</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="app-card app-card-stat shadow-sm h-100 border-left-green">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1 text-uppercase small text-muted">Calls Today</h4>
                            <div className="stats-figure stats-green" style={{fontSize: '1.8rem', fontWeight: 700}}>1,247</div>
                            <div className="stats-meta text-muted small">Across all campaigns</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                    <div className="app-card app-card-stat shadow-sm h-100 border-left-orange">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1 text-uppercase small text-muted">Avg QA Score</h4>
                            <div className="stats-figure stats-orange" style={{fontSize: '1.8rem', fontWeight: 700}}>87%</div>
                            <div className="stats-meta text-muted small">This month</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-2">
                    <div className="app-card app-card-stat shadow-sm h-100 border-left-success">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1 text-uppercase small text-muted">Active Agents</h4>
                            <div className="stats-figure stats-success" style={{fontSize: '1.8rem', fontWeight: 700}}>156</div>
                            <div className="stats-meta text-muted small">On floor today</div>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-4 col-lg-3">
                    <div className="app-card app-card-stat shadow-sm h-100 border-left-blue">
                        <div className="app-card-body p-3 p-lg-4">
                            <h4 className="stats-type mb-1 text-uppercase small text-muted">Pipeline Value</h4>
                            <div className="stats-figure fw-bold" style={{fontSize: '1.8rem', color: '#9B7D3D'}}>₹12.5L</div>
                            <div className="stats-meta text-muted small">Open negotiations</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3 border-bottom">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto"><h4 className="app-card-title fw-bold">Daily Call Volume</h4></div>
                                <div className="col-auto"><div className="card-header-action small"><a href="/reports" className="text-decoration-none">View analytics</a></div></div>
                            </div>
                        </div>
                        <div className="app-card-body p-3 p-lg-4">
                            <div className="mb-3 d-flex">
                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto border-0 bg-light">
                                    <option value="1">This week</option>
                                    <option value="2">Today</option>
                                    <option value="3">This Month</option>
                                </select>
                            </div>
                            <div className="chart-container" style={{height: 300, background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8}}>
                                <span className="text-muted italic small">Analytics Visualisation Engine Initialising...</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="app-card app-card-chart h-100 shadow-sm">
                        <div className="app-card-header p-3 border-bottom">
                            <div className="row justify-content-between align-items-center">
                                <div className="col-auto"><h4 className="app-card-title fw-bold">QA Score Distribution</h4></div>
                                <div className="col-auto"><div className="card-header-action small"><a href="/qa-hub" className="text-decoration-none">View QA Hub</a></div></div>
                            </div>
                        </div>
                        <div className="app-card-body p-3 p-lg-4">
                            <div className="mb-3 d-flex">
                                <select className="form-select form-select-sm ms-auto d-inline-flex w-auto border-0 bg-light">
                                    <option value="1">This week</option>
                                    <option value="2">Today</option>
                                    <option value="3">This Month</option>
                                </select>
                            </div>
                            <div className="chart-container" style={{height: 300, background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8}}>
                                <span className="text-muted italic small">Analytics Visualisation Engine Initialising...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CRM Pipeline Mini Preview */}
            <div className="app-card shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h4 className="app-card-title fw-bold">CRM Pipeline Overview</h4>
                    <button className="btn btn-sm text-white px-3" style={{background: '#9B7D3D', fontSize: '0.75rem'}}>Full Pipeline</button>
                </div>
                <div className="app-card-body p-4">
                    <div className="row g-3">
                        {[
                            { label: 'New Leads', count: 12, color: 'info' },
                            { label: 'Contacted', count: 8, color: 'primary' },
                            { label: 'In Negotiation', count: 5, color: 'warning' },
                            { label: 'Closed', count: 15, color: 'success' }
                        ].map((item, idx) => (
                            <div className="col-6 col-md-3" key={idx}>
                                <div className={`p-3 rounded-3 text-center border shadow-sm hov-bg-light transition-all`} style={{cursor: 'pointer'}}>
                                    <div className="small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>{item.label}</div>
                                    <div className={`fs-4 fw-bold text-${item.color}`}>{item.count}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="app-card shadow-sm mb-4 overflow-hidden">
                <div className="app-card-header p-3 border-bottom"><h4 className="app-card-title fw-bold">Recent Activity Stream</h4></div>
                <div className="app-card-body">
                    {[
                        { title: 'Agent Priya Sharma completed 42 calls — Target 100% achieved', time: 'Today, 10:20 AM', icon: 'fa-circle-check', color: 'text-success' },
                        { title: 'New client "Nexura Technologies" moved to Negotiation stage', time: 'Today, 09:15 AM', icon: 'fa-handshake', color: 'text-info' },
                        { title: 'Batch upload "Audio_Transcription_Q2" processed — 1,250 records', time: 'Yesterday, 04:30 PM', icon: 'fa-cloud-arrow-up', color: 'text-warning' },
                        { title: 'QA flagged 3 calls for review — Agent Vikram needs coaching', time: 'Yesterday, 02:10 PM', icon: 'fa-flag', color: 'text-danger' }
                    ].map((activity, idx) => (
                        <div className="item p-3 border-bottom hov-bg-soft-primary transition-all position-relative" key={idx} style={{cursor: 'pointer'}}>
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <div className={`icon-placeholder ${activity.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`} style={{width: 38, height: 38, background: 'rgba(0,0,0,0.03)'}}>
                                        <i className={`fa-solid ${activity.icon}`}></i>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="title mb-1 fw-semibold text-dark small">{activity.title}</div>
                                    <div className="meta text-muted small" style={{fontSize: '0.7rem'}}>{activity.time}</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fa-solid fa-chevron-right text-muted small opacity-50"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="app-card shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom"><h4 className="app-card-title fw-bold">Executive Quick Actions</h4></div>
                <div className="app-card-body p-4">
                    <div className="row g-3">
                        <div className="col-12 col-sm-6 col-md-3"><button className="btn btn-outline-primary w-100 py-2 fw-bold shadow-sm hov-scale" onClick={() => navigate('/crm-pipeline')}><i className="fa-solid fa-user-plus me-2"></i>Add Client</button></div>
                        <div className="col-12 col-sm-6 col-md-3"><button className="btn btn-outline-secondary w-100 py-2 fw-bold shadow-sm hov-scale" onClick={() => navigate('/daily-report-upload')}><i className="fa-solid fa-cloud-arrow-up me-2"></i>Upload Data</button></div>
                        <div className="col-12 col-sm-6 col-md-3"><button className="btn btn-outline-secondary w-100 py-2 fw-bold shadow-sm hov-scale" onClick={() => navigate('/employee-master')}><i className="fa-solid fa-users me-2"></i>Assign Staff</button></div>
                        <div className="col-12 col-sm-6 col-md-3"><button className="btn btn-outline-dark w-100 py-2 fw-bold shadow-sm hov-scale" onClick={() => navigate('/audit-logs')}><i className="fa-solid fa-file-invoice me-2"></i>Audit Logs</button></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
