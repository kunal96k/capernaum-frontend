import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    Menu, 
    Bell, 
    User, 
    Settings, 
    LogOut, 
    Fingerprint,
    Search,
    ChevronDown
} from 'lucide-react';

const Header = ({ onToggleSidebar }) => {
    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, []);

    return (
        <header className="app-header fixed-top">
            <div className="app-header-inner">
                <div className="container-fluid py-2 h-100">
                    <div className="app-header-content h-100">
                        <div className="row justify-content-between align-items-center h-100">
                            
                            <div className="col-auto d-flex align-items-center">
                                <a id="sidepanel-toggler" className="sidepanel-toggler d-inline-block me-3 hov-translate-up" href="#" onClick={(e) => { e.preventDefault(); onToggleSidebar(); }}>
                                    <Menu size={24} className="text-dark" strokeWidth={2} />
                                </a>
                                
                                <Link to="/dashboard" className="topbar-brand d-flex align-items-center text-decoration-none d-none d-sm-flex">
                                    <div className="logo-wrapper bg-white shadow-xs rounded-circle p-1 me-2 d-flex align-items-center justify-content-center" style={{ width: 44, height: 44, border: '1px solid rgba(0,0,0,0.05)' }}>
                                        <img className="logo-icon" src="/assets/images/favicon.png" alt="logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                                    </div>
                                    <div className="brand-text d-flex flex-column justify-content-center line-height-1">
                                        <span className="fs-5 fw-bold text-dark lh-1">Capernaum <span style={{ color: '#9B7D3D' }}>Solutions</span></span>
                                        <span className="text-muted text-uppercase fw-bold opacity-50 lh-1" style={{ fontSize: '0.55rem', letterSpacing: '1px' }}>Enterprise Control</span>
                                    </div>
                                </Link>
                            </div>

                            <div className="app-utilities col-auto d-flex align-items-center gap-2">
                                {/* Search Trigger (Mobile only) */}
                                <div className="app-utility-item d-lg-none">
                                    <button className="btn btn-white shadow-xs rounded-circle p-2 border-0" title="Search Intelligence">
                                        <Search size={20} className="text-secondary" />
                                    </button>
                                </div>

                                {/* Notifications */}
                                <div className="app-utility-item dropdown">
                                    <a className="dropdown-toggle no-toggle-arrow d-flex align-items-center justify-content-center bg-white shadow-xs rounded-circle p-0" id="notifications-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" title="Security Signals" style={{ width: 40, height: 40, border: '1px solid rgba(0,0,0,0.06)' }}>
                                        <Bell size={20} className="text-secondary" />
                                        <span className="icon-badge bg-danger">5</span>
                                    </a>
                                    <div className="dropdown-menu p-0 shadow-lg border-0 mt-3 dropdown-menu-end" aria-labelledby="notifications-dropdown-toggle" style={{ width: '320px', borderRadius: 16, overflow: 'hidden' }}>
                                        <div className="dropdown-menu-header p-3 border-bottom bg-light">
                                            <h6 className="dropdown-menu-title mb-0 fw-bold small text-uppercase letter-spacing-1">Intelligence Stream</h6>
                                        </div>
                                        <div className="dropdown-menu-content" style={{ maxHeight: 350, overflowY: 'auto' }}>
                                            <div className="item p-3 border-bottom hov-bg-light transition-all cursor-pointer">
                                                <div className="row gx-2 align-items-center">
                                                    <div className="col-auto"><div className="app-icon-holder stats-primary"><Bell size={14} /></div></div>
                                                    <div className="col"><div className="info"><div className="desc small text-dark fw-semibold">Nexura batch upload complete</div><div className="meta x-small text-muted">22 mins ago</div></div></div>
                                                </div>
                                            </div>
                                            <div className="item p-3 hov-bg-light transition-all cursor-pointer">
                                                <div className="row gx-2 align-items-center">
                                                    <div className="col-auto"><div className="app-icon-holder bg-soft-warning"><Fingerprint size={14} className="text-warning" /></div></div>
                                                    <div className="col"><div className="info"><div className="desc small text-dark fw-semibold">QA Audit Required: Batch #824</div><div className="meta x-small text-muted">1 hr ago</div></div></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="dropdown-menu-footer p-2 text-center border-top bg-light"><Link to="/notifications" className="small fw-bold text-decoration-none text-primary">View All Metrics</Link></div>
                                    </div>
                                </div>

                                {/* User Profile */}
                                <div className="app-utility-item dropdown">
                                    <a className="dropdown-toggle no-toggle-arrow p-0 rounded-pill d-flex align-items-center transition-all hov-translate-up bg-white shadow-xs border px-2 ms-1" id="user-dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false" style={{ gap: '8px', height: 40 }}>
                                        <img src="/assets/images/user.png" alt="user" className="rounded-circle" style={{ width: 28, height: 28, objectFit: 'cover' }} />
                                        <div className="d-none d-md-block text-start me-1">
                                            <div className="fw-bold text-dark lh-1" style={{ fontSize: '0.75rem' }}>Kunal Patil</div>
                                            <div className="extra-small text-muted fw-bold text-uppercase opacity-75" style={{ fontSize: '0.5rem' }}>Full Access</div>
                                        </div>
                                        <ChevronDown size={12} className="text-muted opacity-50" />
                                    </a>
                                    <ul className="dropdown-menu shadow-lg border-0 mt-3 dropdown-menu-end p-2" aria-labelledby="user-dropdown-toggle" style={{ borderRadius: 16, minWidth: '200px' }}>
                                        <li><Link className="dropdown-item py-2 rounded-3 d-flex align-items-center" to="/account"><User size={16} className="me-2 text-muted" />Profile Strategy</Link></li>
                                        <li><Link className="dropdown-item py-2 rounded-3 d-flex align-items-center" to="/system-settings"><Settings size={16} className="me-2 text-muted" />Global Control</Link></li>
                                        <li><hr className="dropdown-divider opacity-50" /></li>
                                        <li><a className="dropdown-item py-2 rounded-3 text-danger d-flex align-items-center" href="/login"><LogOut size={16} className="me-2" />Eject Session</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};


export default Header;
