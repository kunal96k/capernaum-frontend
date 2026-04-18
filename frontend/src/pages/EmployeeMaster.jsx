import React, { useEffect, useState } from 'react';
import { 
    Users, 
    UserPlus, 
    ShieldCheck, 
    Search, 
    Filter, 
    MoreHorizontal, 
    Mail, 
    Briefcase, 
    Calendar, 
    CheckCircle2, 
    AlertCircle, 
    UserCog,
    Contact,
    Key,
    UserMinus,
    ExternalLink,
    ChevronRight,
    Lock
} from 'lucide-react';

const EmployeeMaster = () => {
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [employees, setEmployees] = useState([
        { id: 'EMP001', name: 'Priya Sharma', init: 'PS', email: 'priya.sharma@capernaum.com', role: 'Team Lead', dept: 'Customer Support', status: 'Active', joined: '12 Jan 2022', manager: 'Kunal Patil' },
        { id: 'EMP002', name: 'Rajesh Kumar', init: 'RK', email: 'rajesh.kumar@capernaum.com', role: 'Call Agent', dept: 'Sales Team', status: 'Active', joined: '15 Mar 2022', manager: 'Priya Sharma' },
        { id: 'EMP003', name: 'Vikram Singh', init: 'VS', email: 'vikram.singh@capernaum.com', role: 'QA Analyst', dept: 'Quality Assurance', status: 'On Leave', joined: '10 Feb 2022', manager: 'Kunal Patil' },
        { id: 'EMP004', name: 'Anjali Mehta', init: 'AM', email: 'anjali.mehta@capernaum.com', role: 'Data Scientist', dept: 'Operations', status: 'Active', joined: '05 May 2023', manager: 'Vikram Singh' },
    ]);

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('first_name') + ' ' + formData.get('last_name');
        const role = formData.get('role');
        const dept = formData.get('dept');
        const email = formData.get('email');
        
        const newEmp = {
            id: 'EMP' + (employees.length + 1).toString().padStart(3, '0'),
            name: name,
            init: name.split(' ').map(n => n[0]).join(''),
            email: email,
            role: role,
            dept: dept,
            status: 'Active',
            joined: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
            manager: 'System Admin'
        };
        
        setEmployees([newEmp, ...employees]);
        alert('Infrastructure Identity Created: ' + newEmp.id);
    };

    const handleDelete = (id) => {
        if(confirm('Permanently expunge personnel record?')) {
            setEmployees(employees.filter(e => e.id !== id));
            alert('Record Expunged from Registry');
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updated = {
            ...selectedEmployee,
            name: formData.get('name'),
            email: formData.get('email'),
            dept: formData.get('dept'),
            status: formData.get('status')
        };
        setEmployees(employees.map(e => e.id === selectedEmployee.id ? updated : e));
        alert('Record Updated in Master Registry');
    };

    const getStatusBadge = (status) => {
        switch(status) {
            case 'Active': return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1 rounded-pill small fw-bold">OPERATIONAL</span>;
            case 'On Leave': return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 px-3 py-1 rounded-pill small fw-bold">STANDBY</span>;
            case 'Terminated': return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 px-3 py-1 rounded-pill small fw-bold">DECOMMISSIONED</span>;
            default: return null;
        }
    };

    return (
        <div className="employee-master-wrapper">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col">
                    <h1 className="app-page-title mb-1">Human Infrastructure Registry</h1>
                    <p className="text-muted mb-0 small">Manage institutional identity, departmental structures, and personnel credentials.</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary shadow-lg border-0 px-4 hov-translate-up fw-bold" style={{background: '#9B7D3D'}} data-bs-toggle="modal" data-bs-target="#addEmployeeModal">
                        <UserPlus size={18} className="me-2" />Register Personnel
                    </button>
                </div>
            </div>

            {/* Force Stats */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Active Force', value: '156', icon: <Users size={20} className="text-primary" />, meta: 'Full Integrity', color: 'border-left-blue' },
                    { label: 'Operational Now', value: '142', icon: <CheckCircle2 size={20} className="text-success" />, meta: '91% Attendance', color: 'border-left-green' },
                    { label: 'Standby Status', value: '14', icon: <AlertCircle size={20} className="text-warning" />, meta: 'Authorized Absence', color: 'border-left-orange' },
                    { label: 'Strategic Units', value: '08', icon: <Briefcase size={20} className="text-info" />, meta: 'Global Clusters', color: 'border-left-info' }
                ].map((stat, i) => (
                    <div className="col-6 col-md-3" key={i}>
                        <div className={`app-card shadow-sm h-100 ${stat.color} overflow-hidden`}>
                            <div className="app-card-body p-4 text-center">
                                <div className="mb-2 opacity-50">{stat.icon}</div>
                                <div className="stats-figure fw-bold fs-3 text-dark">{stat.value}</div>
                                <div className="stats-label extra-small text-muted text-uppercase fw-bold mb-1">{stat.label}</div>
                                <div className="extra-small fw-bold text-success" style={{fontSize: '0.65rem'}}>{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Registry Table */}
            <div className="app-card app-card-table shadow-sm mb-4 overflow-hidden border-0">
                <div className="app-card-header p-4 border-bottom bg-white d-flex justify-content-between align-items-center">
                    <h4 className="app-card-title mb-0 d-flex align-items-center"><Contact size={20} className="me-2 text-muted" />Personnel Master Index</h4>
                    <div className="d-flex gap-2">
                         <div className="search-box position-relative">
                            <Search size={16} className="position-absolute translate-middle-y top-50 ms-3 text-muted" />
                            <input type="text" className="form-control ps-5 rounded-pill border-light shadow-inner" placeholder="Search Identity..." onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                        <button className="btn btn-white border shadow-sm rounded-pill px-3 fw-bold small"><Filter size={14} className="me-2" />Filters</button>
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table app-table-hover mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">Institutional Identity</th>
                                <th className="py-3">Authentication Hub (Email)</th>
                                <th className="py-3">Operational Role</th>
                                <th className="py-3">Unit / Dept</th>
                                <th className="py-3">Status</th>
                                <th className="text-end px-4 py-3">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase())).map((emp) => (
                                <tr key={emp.id}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="user-avatar-sm rounded-3 d-flex align-items-center justify-content-center me-3 bg-soft-primary text-primary fw-bold" style={{width: 42, height: 42, fontSize: '0.85rem'}}>{emp.init}</div>
                                            <div>
                                                <div className="fw-bold text-dark">{emp.name}</div>
                                                <div className="extra-small text-muted font-monospace">{emp.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="small text-muted d-flex align-items-center"><Mail size={12} className="me-2 opacity-50" />{emp.email}</div>
                                    </td>
                                    <td><span className="badge bg-light text-dark border px-3 py-1 rounded-pill small fw-semibold">{emp.role}</span></td>
                                    <td>
                                        <div className="fw-semibold text-dark small">{emp.dept}</div>
                                        <div className="extra-small text-muted">Joined {emp.joined}</div>
                                    </td>
                                    <td>{getStatusBadge(emp.status)}</td>
                                    <td className="text-end px-4 py-3">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button className="btn btn-sm btn-action btn-view" title="Detailed Intel" data-bs-toggle="modal" data-bs-target="#viewEmployeeModal" onClick={() => setSelectedEmployee(emp)}><Contact size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-edit" title="Modify Record" data-bs-toggle="modal" data-bs-target="#editEmployeeModal" onClick={() => setSelectedEmployee(emp)}><UserCog size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-warning" title="Security Reset" data-bs-toggle="modal" data-bs-target="#resetPasswordModal" onClick={() => setSelectedEmployee(emp)}><Key size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-delete text-danger" title="Expunge Member" onClick={() => handleDelete(emp.id)}><UserMinus size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALS */}
            {/* VIEW MODAL */}
            <div className="modal fade" id="viewEmployeeModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><ShieldCheck size={20} className="me-2 text-info" />Institutional Identity Audit</h5>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {selectedEmployee && (
                                <div className="row g-0">
                                    <div className="col-md-4 bg-light border-end p-5 text-center">
                                        <div className="profile-img-container mx-auto mb-4 position-relative d-inline-block">
                                            <div className="bg-white rounded-4 shadow-sm border border-4 border-white d-flex align-items-center justify-content-center" style={{width: 140, height: 140, fontSize: '4rem', color: '#9B7D3D'}}>
                                                {selectedEmployee.init}
                                            </div>
                                            <span className="position-absolute bottom-0 end-0 bg-success border border-4 border-white rounded-circle p-2 shadow-sm" style={{width: 24, height: 24}}></span>
                                        </div>
                                        <h4 className="fw-bold mb-1 text-dark">{selectedEmployee.name}</h4>
                                        <p className="text-muted small fw-bold mb-3 font-monospace letter-spacing-1">{selectedEmployee.id}</p>
                                        <div className="mt-2">{getStatusBadge(selectedEmployee.status)}</div>
                                    </div>
                                    <div className="col-md-8 p-5 bg-white">
                                        <h6 className="fw-bold mb-4 small text-muted text-uppercase d-flex align-items-center"><MoreHorizontal size={16} className="me-2" /> Personnel Parameters</h6>
                                        <div className="row g-4 text-start">
                                            <div className="col-6"><label className="text-muted extra-small d-block text-uppercase fw-bold mb-1">Operational Unit</label><span className="fw-bold text-dark fs-6 d-flex align-items-center"><Briefcase size={16} className="me-2 text-primary" />{selectedEmployee.dept}</span></div>
                                            <div className="col-6"><label className="text-muted extra-small d-block text-uppercase fw-bold mb-1">Current Protocol Role</label><span className="fw-bold text-dark fs-6 d-flex align-items-center"><ShieldCheck size={16} className="me-2 text-success" />{selectedEmployee.role}</span></div>
                                            <div className="col-12"><label className="text-muted extra-small d-block text-uppercase fw-bold mb-1">Authenticated Relay (Email)</label><span className="fw-bold text-dark fs-6 d-flex align-items-center"><Mail size={16} className="me-2 text-info" />{selectedEmployee.email}</span></div>
                                            <div className="col-6"><label className="text-muted extra-small d-block text-uppercase fw-bold mb-1">Deployment Date</label><span className="fw-bold text-dark fs-6 d-flex align-items-center"><Calendar size={16} className="me-2 text-muted" />{selectedEmployee.joined}</span></div>
                                            <div className="col-6"><label className="text-muted extra-small d-block text-uppercase fw-bold mb-1">Direct Controller</label><span className="fw-bold text-primary fs-6 d-flex align-items-center"><UserCog size={16} className="me-2" />{selectedEmployee.manager}</span></div>
                                        </div>
                                        <div className="mt-5 pt-3 border-top">
                                            <button className="btn btn-link text-decoration-none small p-0 fw-bold d-flex align-items-center text-primary hov-translate-right transition-all">
                                                Audit Temporal Logs <ChevronRight size={14} className="ms-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal-footer bg-light border-0 p-4">
                            <button type="button" className="btn btn-secondary w-100 py-3 fw-bold shadow-sm" data-bs-dismiss="modal">Close Audit Session</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ADD MODAL */}
            <div className="modal fade" id="addEmployeeModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><UserPlus size={20} className="me-2" />Personnel Credential Registration</h5>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <form className="row g-4" id="registerForm" onSubmit={handleRegister}>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Legal First Name</label>
                                    <input name="first_name" type="text" className="form-control bg-light border-0 py-3 px-4 shadow-inner fw-semibold" placeholder="e.g. Priyakshi" required />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Legal Surname</label>
                                    <input name="last_name" type="text" className="form-control bg-light border-0 py-3 px-4 shadow-inner fw-semibold" placeholder="e.g. Sharma" required />
                                </div>
                                <div className="col-12">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Institutional Authenticator ID (Email)</label>
                                    <div className="input-group shadow-xs rounded-3 overflow-hidden border">
                                        <span className="input-group-text bg-light border-0"><Mail size={18} className="text-muted" /></span>
                                        <input name="email" type="email" className="form-control border-0 py-3 fw-bold" placeholder="p.sharma@capernaum-admin.io" required />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Assigned Operational Unit</label>
                                    <select name="dept" className="form-select border-0 bg-light py-3 fw-bold shadow-xs" required>
                                        <option value="">Select Dept...</option>
                                        <option>Customer Lifecycle Hub</option>
                                        <option>Global Sales Vector</option>
                                        <option>Strategic Performance Group</option>
                                        <option>Intelligence & QA Unit</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Designated Protocol Role</label>
                                    <select name="role" className="form-select border-0 bg-light py-3 fw-bold shadow-xs" required>
                                        <option value="">Select Role...</option>
                                        <option>Operations Agent</option>
                                        <option>Team Orchestrator (TL)</option>
                                        <option>QA Intelligence Analyst</option>
                                        <option>Unit Manager</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="p-4 rounded-4 bg-primary bg-opacity-05 border-dashed border-primary border-opacity-25 d-flex align-items-center">
                                         <ShieldCheck size={32} className="text-primary me-4 flex-shrink-0" />
                                         <div className="small fw-semibold text-dark">Initialization will trigger secure protocol transmission to the registered authenticator ID, including temporary enterprise gateway credentials.</div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Abort Registration</button>
                            <button type="submit" form="registerForm" className="btn btn-primary px-5 fw-bold shadow-lg hov-translate-up" style={{ background: '#9B7D3D', border: 'none' }} data-bs-dismiss="modal">Register Personnel</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            <div className="modal fade" id="editEmployeeModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><UserCog size={20} className="me-2" />Modify Operational Parameters</h5>
                            <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            {selectedEmployee && (
                                <form className="row g-4" id="editForm" onSubmit={handleUpdate}>
                                    <div className="col-md-6">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Full Identity Name</label>
                                        <input name="name" type="text" className="form-control bg-light border-0 py-3 shadow-inner fw-semibold" defaultValue={selectedEmployee.name} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Authenticated Relay</label>
                                        <input name="email" type="email" className="form-control bg-light border-0 py-3 shadow-inner fw-semibold" defaultValue={selectedEmployee.email} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Unit Assignment</label>
                                        <select name="dept" className="form-select border-0 bg-light py-3 fw-bold shadow-xs" defaultValue={selectedEmployee.dept} required>
                                            <option>Customer Support</option>
                                            <option>Sales Team</option>
                                            <option>Quality Assurance</option>
                                            <option>Operations</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Protocol Status</label>
                                        <select name="status" className="form-select border-0 bg-light py-3 fw-bold shadow-xs" defaultValue={selectedEmployee.status} required>
                                            <option>Active</option>
                                            <option>On Leave</option>
                                            <option>Terminated</option>
                                        </select>
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                             <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Discard Changes</button>
                             <button type="submit" form="editForm" className="btn btn-primary px-5 fw-bold shadow-lg" style={{ background: '#9B7D3D', border: 'none' }} data-bs-dismiss="modal">Commit Changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* RESET MODAL */}
            <div className="modal fade" id="resetPasswordModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-warning bg-opacity-10 py-4 border-0">
                            <h5 className="modal-title fw-bold text-warning-emphasis d-flex align-items-center"><Lock size={20} className="me-2" />Force Authenticator Recalibration</h5>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-5">
                            {selectedEmployee && (
                                <>
                                    <p className="mb-4 text-center">You are initiating a system-wide security reset for <strong className="text-dark fs-5 d-block mt-2">{selectedEmployee.name}</strong> All active session tokens will be purged immediately.</p>
                                    <div className="p-4 bg-light rounded-4 border text-center shadow-inner mt-4 position-relative overflow-hidden">
                                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-warning opacity-05"></div>
                                        <label className="extra-small text-muted text-uppercase fw-bold mb-2 position-relative">Temporary Redemption Protocol</label>
                                        <h3 className="font-monospace fw-bold letter-spacing-2 text-dark position-relative mb-0">CAP-RESET-2026</h3>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="modal-footer bg-light p-4 border-0 d-flex gap-2">
                             <button type="button" className="btn btn-outline-secondary flex-grow-1 fw-bold" data-bs-dismiss="modal">Abort</button>
                            <button type="button" className="btn btn-warning flex-grow-1 fw-bold shadow-sm text-dark hov-translate-up" onClick={() => alert('Protocol Initiated')}>Execute Forced Reset</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeMaster;
