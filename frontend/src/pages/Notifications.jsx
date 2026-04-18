import React, { useState, useEffect } from 'react';

const Notifications = () => {
    const [filter, setFilter] = useState('all');
    const [notifications, setNotifications] = useState([
        { id: 1, type: 'system', title: 'System Maintenance Scheduled', message: 'The server will undergo scheduled maintenance on Sunday, 28th January 2024 from 2:00 AM to 6:00 AM IST.', time: '28 minutes ago', unread: true },
        { id: 2, type: 'alert', title: 'Critical: Database Backup Failed', message: 'The daily database backup failed at 02:30 AM. Requires immediate attention.', time: '2 hours ago', unread: true, action: 'DEEP TRACE' },
        { id: 3, type: 'activity', title: 'New Employee Onboarded', message: 'Suresh Patel (EMP145) has been successfully onboarded. Credentials generated.', time: '3 hours ago', unread: true },
        { id: 4, type: 'approval', title: 'Leave Request Pending - Priya Sharma', message: 'Leave request for Priya Sharma (EMP002) for 09-Jan to 10-Jan 2024 is awaiting approval.', time: '5 hours ago', unread: true, approvalMode: true },
        { id: 5, type: 'system', title: 'Monthly Report Generated', message: 'January 2024 monthly performance report has been generated and is available.', time: '1 day ago', unread: false },
        { id: 6, type: 'activity', title: 'QA Review Completed', message: 'Quality Assurance review for Call Center team completed. Average score: 87/100.', time: '1 day ago', unread: false }
    ]);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [filter, notifications]);

    const stats = [
        { label: 'Unread Signals', value: notifications.filter(n => n.unread).length, color: 'blue', meta: 'New notifications' },
        { label: 'Security Alerts', value: notifications.filter(n => n.type === 'alert').length, color: 'orange', meta: 'Requires attention' },
        { label: 'Critical Anomalies', value: notifications.filter(n => n.type === 'alert' && n.unread).length, color: 'red', meta: 'Urgent action needed' },
        { label: 'Cycle Payload', value: notifications.length, color: 'success', meta: 'Total notifications' }
    ];

    const removeNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const markAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const clearAll = () => {
        if(confirm('Purge all signal logs from interface?')) setNotifications([]);
    };

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Signal Intelligence Center</h1>
                    <p className="text-muted small mb-0">Monitor and orchestrate system notifications and operational alerts.</p>
                </div>
                <div className="col-auto d-flex gap-2">
                    <button className="btn btn-sm btn-white border shadow-sm px-3 fw-bold" onClick={markAllRead}><i className="fa-solid fa-check-double me-2 text-success"></i>Mark All Read</button>
                    <button className="btn btn-sm btn-white border shadow-sm px-3 fw-bold text-danger" onClick={clearAll}><i className="fa-solid fa-trash-can me-2"></i>Purge Ledger</button>
                </div>
            </div>

            {/* Statistics Meta Row */}
            <div className="row g-4 mb-4">
                {stats.map((stat, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                        <div className={`app-card app-card-stat shadow-sm h-100 border-left-${stat.color} border-0 rounded-4 overflow-hidden`}>
                            <div className="app-card-body p-4 bg-white">
                                <h4 className="stats-type mb-1 text-uppercase fw-bold text-muted" style={{fontSize: '0.65rem'}}>{stat.label}</h4>
                                <div className={`stats-figure stats-${stat.color} fw-bold`}>{stat.value}</div>
                                <div className="stats-meta text-muted small italicized-labels fw-medium">{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Signal Filter Matrix */}
            <div className="row g-4 mb-4">
                <div className="col-12">
                    <div className="app-card shadow-sm border-0 bg-light bg-opacity-50 p-3 rounded-4">
                        <div className="d-flex gap-2 flex-wrap">
                            {[
                                { id: 'all', label: 'All Signals', count: notifications.length },
                                { id: 'system', label: 'System Architecture', count: notifications.filter(n => n.type === 'system').length },
                                { id: 'alert', label: 'Security Alerts', count: notifications.filter(n => n.type === 'alert').length },
                                { id: 'activity', label: 'Identity Activity', count: notifications.filter(n => n.type === 'activity').length },
                                { id: 'approval', label: 'Decision Control', count: notifications.filter(n => n.type === 'approval').length }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    className={`btn btn-sm px-4 py-2 rounded-pill fw-bold transition-all ${filter === tab.id ? 'btn-dark shadow-lg' : 'btn-white border text-muted'}`}
                                    onClick={() => setFilter(tab.id)}
                                >
                                    {tab.label} <span className={`badge ms-2 ${filter === tab.id ? 'bg-white text-dark' : 'bg-dark text-white'}`}>{tab.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Matrix */}
            <div className="row g-4">
                <div className="col-12">
                    <div className="app-card shadow-lg border-0 overflow-hidden" style={{borderRadius: 15}}>
                        <div className="app-card-header p-4 border-bottom bg-white d-flex justify-content-between align-items-center">
                            <h4 className="app-card-title fw-bold text-dark mb-0">Signal Stream Output</h4>
                            <span className="small text-muted fw-medium"><i className="fa-solid fa-clock-rotate-left me-2"></i>Last Updated: Just Now</span>
                        </div>
                        <div className="app-card-body p-0">
                            {notifications.filter(n => filter === 'all' || n.type === filter).length > 0 ? (
                                notifications.filter(n => filter === 'all' || n.type === filter).map((notif) => (
                                    <div key={notif.id} className={`notification-item p-4 border-start border-4 transition-all hov-shadow-inner ${notif.unread ? 'bg-white ps-5' : 'bg-light opacity-75'} ${notif.type}`} style={{marginBottom: 0, borderRadius: 0}}>
                                        <div className="d-flex justify-content-between align-items-start">
                                            <div className="flex-grow-1">
                                                <div className="d-flex align-items-center gap-2 mb-2">
                                                    <span className={`notification-badge badge-${notif.type} shadow-xs text-uppercase fw-bold`} style={{fontSize: '0.6rem'}}>{notif.type} NODE</span>
                                                    {notif.unread && <span className="p-1 bg-primary rounded-circle shadow-sm" style={{width: 8, height: 8}}></span>}
                                                </div>
                                                <div className="notification-title fs-6 fw-bold text-dark">{notif.title}</div>
                                                <div className="notification-message text-muted mt-1 italicized-labels" style={{maxWidth: '800px'}}>{notif.message}</div>
                                                <div className="notification-meta mt-2 fw-bold text-uppercase text-muted opacity-50" style={{fontSize: '0.65rem'}}><i className="fa-solid fa-hourglass-half me-1"></i>{notif.time}</div>
                                                
                                                {notif.action && (
                                                    <div className="notification-action mt-3 d-flex gap-2">
                                                        <button className="btn btn-sm btn-dark px-4 py-2 fw-bold shadow-sm">{notif.action}</button>
                                                        <button className="btn btn-sm btn-outline-secondary px-4 py-2 fw-bold">ACKNOWLEDGE</button>
                                                    </div>
                                                )}

                                                {notif.approvalMode && (
                                                    <div className="notification-action mt-3 d-flex gap-2">
                                                        <button className="btn btn-sm btn-success px-4 py-2 fw-bold shadow-sm"><i className="fa-solid fa-circle-check me-2"></i>AUTHORIZE</button>
                                                        <button className="btn btn-sm btn-danger px-4 py-2 fw-bold shadow-sm"><i className="fa-solid fa-circle-xmark me-2"></i>DECLINE</button>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="btn btn-sm btn-white border-0 shadow-none rounded-circle hov-bg-danger hov-text-white transition-all" style={{width: 32, height: 32}} onClick={() => removeNotification(notif.id)}>
                                                <i className="fa-solid fa-xmark small"></i>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-5 text-center bg-light">
                                    <i className="fa-solid fa-satellite-dish fs-1 text-muted opacity-25 mb-3"></i>
                                    <h5 className="text-muted fw-bold">No High-Fidelity Signals in Selected Matrix</h5>
                                    <p className="text-muted small">All systems operational and telemetry streams are clear.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Notifications;
