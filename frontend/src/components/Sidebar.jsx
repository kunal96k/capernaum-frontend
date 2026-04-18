import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Bell, 
    Building, 
    Link as LinkIcon, 
    Users, 
    Key, 
    Cpu, 
    Target, 
    Headphones, 
    BarChart3, 
    Database, 
    UserPlus, 
    GitPullRequest, 
    Shield, 
    Clock, 
    Activity, 
    FileUp, 
    Radar, 
    Microscope, 
    Sliders, 
    UserCog, 
    Settings, 
    HelpCircle, 
    LogOut,
    ChevronDown,
    Minus,
    Fingerprint
} from 'lucide-react';

const Sidebar = ({ isOpen, setSidebarOpen }) => {
    const menuItems = [
        { header: 'Main Architecture' },
        { path: '/dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
        { path: '/notifications', label: 'Signal Stream', icon: Bell },

        { header: 'Enterprise Client Hub' },
        {
            label: 'Client Ecosystem',
            icon: Building,
            submenu: [
                { path: '/client-linkage', label: 'Linkage Matrix', icon: LinkIcon },
                { path: '/client-portal', label: 'Client Management', icon: Users },
                { path: '/client-credentials', label: 'Access Control', icon: Key }
            ]
        },

        { header: 'Operational Excellence' },
        {
            label: 'BPO Operations',
            icon: Cpu,
            submenu: [
                { path: '/crm-pipeline', label: 'CRM Pipeline', icon: Target },
                { path: '/qa-hub', label: 'QA Forensic Hub', icon: Headphones },
                { path: '/employee-performance', label: 'Performance Analytics', icon: BarChart3 },
                { path: '/data-vault', label: 'Secure Data Vault', icon: Database }
            ]
        },

        { header: 'Institutional Repository' },
        {
            label: 'Master Data',
            icon: Database,
            submenu: [
                { path: '/employee-master', label: 'Personnel Master', icon: UserPlus },
                { path: '/department-master', label: 'Departmental Master', icon: GitPullRequest },
                { path: '/role-master', label: 'Role & Permission Matrix', icon: Shield },
                { path: '/shift-management', label: 'Shift Orchestration', icon: Clock }
            ]
        },

        { header: 'Operational Intelligence' },
        {
            label: 'Logs & Activity',
            icon: Activity,
            submenu: [
                { path: '/daily-report-upload', label: 'Performance Ledger', icon: FileUp },
                { path: '/activity-monitoring', label: 'Live Activity Trace', icon: Radar },
                { path: '/audit-logs', label: 'Forensic Audit Trails', icon: Microscope }
            ]
        },

        { header: 'Core Logic & Security' },
        {
            label: 'System Admin',
            icon: Sliders,
            submenu: [
                { path: '/account', label: 'Identity Settings', icon: UserCog },
                { path: '/system-settings', label: 'Global Parameters', icon: Settings }
            ]
        },
        { path: '/help', label: 'Intelligence Support', icon: HelpCircle }
    ];

    return (
        <div id="app-sidepanel" className={`app-sidepanel shadow-lg ${isOpen ? 'sidepanel-visible' : 'sidepanel-hidden'}`}>
            <div id="sidepanel-drop" className="sidepanel-drop" onClick={() => setSidebarOpen(false)}></div>
            <div className="sidepanel-inner d-flex flex-column bg-white">
                <a href="#" id="sidepanel-close" className="sidepanel-close d-xl-none" onClick={(e) => { e.preventDefault(); setSidebarOpen(false); }}>&times;</a>

                <div className="app-user-info px-4 my-4 border-bottom pb-4 mb-0">
                    <div className="d-flex align-items-center mb-3">
                        <div className="user-avatar-container position-relative">
                            <img className="rounded-circle shadow-sm border border-2 border-white" src="/assets/images/user.png" alt="user" style={{ width: 50, height: 50, objectFit: 'cover' }} />
                            <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-white rounded-circle" style={{ width: 12, height: 12 }}></span>
                        </div>
                        <div className="user-details ms-3">
                            <div className="user-name fw-bold text-dark" style={{ fontSize: '0.95rem' }}>Kunal Patil</div>
                            <div className="user-role text-muted text-uppercase fw-bold" style={{ fontSize: '0.6rem', letterSpacing: '0.5px' }}>Platform Control</div>
                        </div>
                    </div>
                    <Link to="/account" className="profile-shortcut d-block small text-primary fw-bold text-decoration-none hov-translate-right transition-all">
                        <Fingerprint size={16} className="me-2 text-warning" />Expand Identity Profile
                    </Link>
                </div>

                <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1 mb-4 overflow-auto px-2">
                    <ul className="app-menu list-unstyled accordion" id="menu-accordion">
                        {menuItems.map((item, idx) => {
                            if (item.header) {
                                return <li key={idx} className="nav-header small text-uppercase text-muted px-4 mb-2 mt-4 fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px' }}>{item.header}</li>;
                            }

                            if (item.submenu) {
                                const submenuId = `submenu-${idx}`;
                                return (
                                    <li className="nav-item has-submenu" key={idx}>
                                        <a className="nav-link submenu-toggle transition-all" href="#" data-bs-toggle="collapse" data-bs-target={`#${submenuId}`} aria-expanded="false">
                                            <span className="nav-icon"><item.icon size={18} /></span>
                                            <span className="nav-link-text ms-1 fw-medium">{item.label}</span>
                                            <span className="submenu-arrow ms-auto opacity-50"><ChevronDown size={14} /></span>
                                        </a>
                                        <div id={submenuId} className="collapse submenu shadow-inner bg-light bg-opacity-50 mx-2 rounded-3" data-bs-parent="#menu-accordion">
                                            <ul className="submenu-list list-unstyled p-2">
                                                {item.submenu.map((sub, sIdx) => {
                                                    const SubIcon = sub.icon || Minus;
                                                    return (
                                                        <li className="submenu-item" key={sIdx}>
                                                            <NavLink className={({ isActive }) => `submenu-link small d-block py-2 px-3 rounded-2 text-decoration-none transition-all ${isActive ? 'active fw-bold text-primary bg-white shadow-sm' : 'text-muted'}`} to={sub.path}>
                                                                <SubIcon size={14} className="me-2 opacity-50" />{sub.label}
                                                            </NavLink>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </li>
                                );
                            }

                            return (
                                <li className="nav-item" key={idx}>
                                    <NavLink className={({ isActive }) => `nav-link transition-all ${isActive ? 'active bg-soft-primary text-primary fw-bold border-start border-3 border-primary shadow-xs' : 'text-muted'}`} to={item.path}>
                                        <span className="nav-icon"><item.icon size={18} /></span>
                                        <span className="nav-link-text ms-1 fw-medium">{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="app-sidepanel-footer border-top p-3 bg-light bg-opacity-50">
                    <nav className="app-nav app-nav-footer">
                        <ul className="app-menu footer-menu list-unstyled mb-0">
                            <li className="nav-item">
                                <a className="nav-link py-2 hov-text-danger transition-all" href="#" onClick={() => confirm('Terminate administrative session?') && (window.location.href = '/login')}>
                                    <span className="nav-icon"><LogOut size={18} /></span>
                                    <span className="nav-link-text ms-1 fw-bold text-uppercase small" style={{ letterSpacing: '0.5px' }}>Shutdown Session</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
