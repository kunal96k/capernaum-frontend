import React, { useEffect, useState } from 'react';

const ActivityMonitoring = () => {
    const [selectedSession, setSelectedSession] = useState(null);
    const [sessions, setSessions] = useState([
        { name: 'Priya Sharma', id: 'EMP001', login: '09:15 AM', last: '3 mins ago', dur: '4h 52m', ip: '192.168.1.105', device: 'Chrome on Windows' },
        { name: 'Rajesh Kumar', id: 'EMP002', login: '09:18 AM', last: '1 min ago', dur: '4h 49m', ip: '192.168.1.106', device: 'Chrome on Windows' },
        { name: 'Vikram Singh', id: 'EMP003', login: '09:23 AM', last: '2 mins ago', dur: '4h 44m', ip: '192.168.1.107', device: 'Firefox on Linux' },
    ]);
    const [logs, setLogs] = useState([
        { time: '15 Apr 2026, 09:15 AM', id: 'EMP001', name: 'Priya Sharma', activity: 'User Login', actClass: 'bg-success', ip: '192.168.1.105', device: 'Chrome / Win 10', status: 'Success', statusClass: 'bg-success' },
        { time: '15 Apr 2026, 09:18 AM', id: 'EMP002', name: 'Rajesh Kumar', activity: 'User Login', actClass: 'bg-success', ip: '192.168.1.106', device: 'Chrome / Win 10', status: 'Success', statusClass: 'bg-success' },
        { time: '15 Apr 2026, 09:22 AM', id: 'EMP003', name: 'Vikram Singh', activity: 'Failed Access', actClass: 'bg-warning', ip: '192.168.1.107', device: 'Firefox / Ubuntu', status: 'Blocked', statusClass: 'bg-danger' },
        { time: '15 Apr 2026, 10:45 AM', id: 'EMP004', name: 'Neha Gupta', activity: 'User Login', actClass: 'bg-success', ip: '192.168.1.108', device: 'Safari / macOS', status: 'Success', statusClass: 'bg-success' },
    ]);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }

        // Simulate Live Feed
        const interval = setInterval(() => {
            const types = [
                { act: 'System Ping', res: 'Active', color: 'bg-info', rColor: 'bg-success' }, 
                { act: 'Auth Check', res: 'Verified', color: 'bg-primary', rColor: 'bg-success' },
                { act: 'Data Access', res: 'Authorized', color: 'bg-secondary', rColor: 'bg-success' }
            ];
            const type = types[Math.floor(Math.random() * types.length)];
            const names = ['Priya Sharma', 'Rajesh Kumar', 'Vikram Singh', 'Unknown Entity'];
            const name = names[Math.floor(Math.random() * names.length)];
            
            const newLog = {
                time: new Date().toLocaleTimeString(),
                id: 'SYS-' + Math.floor(Math.random() * 900 + 100),
                name: name,
                activity: type.act,
                actClass: type.color,
                ip: '192.168.1.' + Math.floor(Math.random() * 255),
                device: 'System Monitor',
                status: type.res,
                statusClass: type.rColor
            };
            setLogs(prev => [newLog, ...prev.slice(0, 9)]);
        }, 5000);

        return () => clearInterval(interval);
    }, [selectedSession]);

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">System Activity Monitor</h1>
                    <p className="text-muted small mb-0">Real-time surveillance of user sessions and authentication events.</p>
                </div>
                <div className="col-auto">
                    <select className="form-select border-0 shadow-sm bg-white fw-bold small">
                        <option>Real-time (Auto Refresh)</option>
                        <option>Past 24 Hours</option>
                        <option>Past 7 Days</option>
                    </select>
                </div>
            </div>

            {/* Statistics */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Authenticated Now', value: '142', meta: 'Live sessions', color: 'green' },
                    { label: 'Terminated Today', value: '14', meta: 'Session closures', color: 'orange' },
                    { label: 'Device Entropy', value: '8', meta: 'OS/Browser types', color: 'blue' },
                    { label: 'Security Blocks', value: '3', meta: 'Denied access', color: 'danger' }
                ].map((stat, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                        <div className={`app-card app-card-stat shadow-sm h-100 border-left-${stat.color}`}>
                            <div className="app-card-body p-3 p-lg-4 text-center">
                                <h4 className="stats-type mb-1 text-uppercase small text-muted fw-bold" style={{ fontSize: '0.65rem' }}>{stat.label}</h4>
                                <div className={`stats-figure stats-${stat.color} fw-bold`} style={{ fontSize: '2rem' }}>{stat.value}</div>
                                <div className="stats-meta text-muted small italic">{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Active Sessions */}
            <div className="app-card shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-10">
                    <h4 className="app-card-title mb-0">Live Auth Sessions</h4>
                    <span className="badge bg-soft-success text-success border px-3">PROTECTED</span>
                </div>
                <div className="app-card-body p-0">
                    <div className="table-responsive">
                        <table className="table app-table-hover mb-0">
                            <thead>
                                <tr>
                                    <th>Session Operator</th>
                                    <th>Initiated</th>
                                    <th>Last Pulse</th>
                                    <th>Persistence</th>
                                    <th>IP Address</th>
                                    <th className="text-end px-3">Management</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessions.map((session, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="user-avatar-xs bg-soft-primary text-primary rounded-circle d-flex align-items-center justify-content-center me-2 shadow-sm" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>
                                                    {session.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div className="fw-bold text-dark">{session.name} <span className="text-muted small fw-normal ms-1">({session.id})</span></div>
                                            </div>
                                        </td>
                                        <td className="small">{session.login}</td>
                                        <td><span className="badge bg-soft-success text-success border px-2">{session.last}</span></td>
                                        <td className="small">{session.dur}</td>
                                        <td className="font-monospace small">{session.ip}</td>
                                        <td className="text-end px-3">
                                            <div className="btn-group">
                                                <button className="btn btn-sm btn-action btn-view" title="Session Context" data-bs-toggle="modal" data-bs-target="#sessionModal" onClick={() => setSelectedSession(session)}><i className="fa-solid fa-radar"></i></button>
                                                <button className="btn btn-sm btn-action btn-delete" title="Force Disconnect" onClick={() => { if(confirm('Terminate session?')) setSessions(prev => prev.filter(s => s.id !== session.id)); }}><i className="fa-solid fa-power-off"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Activity Log */}
            <div className="app-card app-card-table shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h4 className="app-card-title">Authentication Audit Stream</h4>
                    <div className="search-box">
                        <input type="text" className="form-control form-control-sm" placeholder="Filter stream..." />
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Entity</th>
                                <th>Event Type</th>
                                <th>Network IP</th>
                                <th>Environment</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, idx) => (
                                <tr key={idx}>
                                    <td className="small text-muted fw-bold">{log.time}</td>
                                    <td><span className="fw-bold text-dark">{log.name}</span></td>
                                    <td><span className={`badge ${log.actClass} px-2 py-1 rounded-pill`} style={{ fontSize: '0.65rem' }}>{log.activity.toUpperCase()}</span></td>
                                    <td className="font-monospace small">{log.ip}</td>
                                    <td className="small text-muted">{log.device}</td>
                                    <td><span className={`badge ${log.statusClass} px-2 py-1 rounded-pill`} style={{ fontSize: '0.65rem' }}>{log.status.toUpperCase()}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL: Session Intelligence */}
            <div className="modal fade" id="sessionModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">Live Session Metadata</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {selectedSession ? (
                                <>
                                    <div className="p-4 bg-light text-center border-bottom shadow-inner">
                                        <div className="user-avatar-lg mx-auto mb-3 bg-white text-primary border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 80, height: 80, fontSize: '2rem' }}>
                                            {selectedSession.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <h4 className="fw-bold mb-1">{selectedSession.name}</h4>
                                        <span className="badge bg-success px-4 py-2 rounded-pill shadow-sm">AUTHENTICATED CHANNEL</span>
                                    </div>
                                    <div className="p-0">
                                        {[
                                            { l: 'Auth Identifier', v: selectedSession.id },
                                            { l: 'Engagement IP', v: selectedSession.ip },
                                            { l: 'Environment Context', v: selectedSession.device },
                                            { l: 'Continuous Duration', v: selectedSession.dur },
                                            { l: 'Last Handshake', v: selectedSession.last }
                                        ].map((row, i) => (
                                            <div className="d-flex justify-content-between p-3 px-4 border-bottom hov-bg-light" key={i}>
                                                <span className="text-muted fw-bold small text-uppercase" style={{ width: '160px', fontSize: '0.65rem' }}>{row.l}</span>
                                                <span className="fw-bold text-dark text-end" style={{ fontSize: '0.85rem' }}>{row.v}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : <div className="p-5 text-center text-muted italic">Polling session state...</div>}
                        </div>
                        <div className="modal-footer border-0 p-4 pt-0 mt-3">
                            <button type="button" className="btn btn-secondary w-100 py-2 fw-bold shadow-sm" data-bs-dismiss="modal">Close Insight</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ActivityMonitoring;
