import React, { useState } from 'react';

const RoleMaster = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const roles = [
        { name: 'Super Admin', type: 'System', members: 1, permissions: ['Full System Access', 'User Management', 'Reports & Analytics', 'Audit Access'], color: 'danger' },
        { name: 'Team Lead', type: 'Custom', members: 5, permissions: ['Team Management', 'Call Monitoring', 'QA Reviews'], blocked: ['User Management'], color: 'info' },
        { name: 'Call Agent', type: 'Custom', members: 120, permissions: ['Make Calls', 'View CRM Data'], blocked: ['Quality Check', 'Reports'], color: 'info' },
        { name: 'QA Analyst', type: 'Custom', members: 8, permissions: ['Quality Audits', 'Call Reviews', 'Generate Reports'], blocked: ['User Management'], color: 'info' },
    ];

    const openRoleModal = (role, mode) => {
        setSelectedRole(role);
        setEditMode(mode === 'edit');
    };

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Role & Permissions Architecture</h1>
                    <p className="text-muted small mb-0">Define hierarchical access controls and functional capabilities.</p>
                </div>
                <div className="col-auto">
                    <button className="btn app-btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#roleModal" onClick={() => openRoleModal(null, 'add')}>
                        <i className="fa-solid fa-plus me-2"></i>Provision New Role
                    </button>
                </div>
            </div>

            {/* Roles Grid */}
            <div className="row g-4 mb-4">
                {roles.map((role, idx) => (
                    <div className="col-12 col-md-6 col-lg-4" key={idx}>
                        <div className="app-card shadow-sm h-100 border-top-decoration">
                            <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-10">
                                <h5 className="app-card-title mb-0 fw-bold text-dark">{role.name}</h5>
                                <span className={`badge bg-soft-${role.color} text-${role.color} border px-3`}>{role.type.toUpperCase()}</span>
                            </div>
                            <div className="app-card-body p-4">
                                <div className="mb-3 d-flex align-items-center">
                                    <div className="icon-placeholder bg-light rounded-circle d-flex align-items-center justify-content-center me-2" style={{width: 30, height: 30}}>
                                        <i className="fa-solid fa-users text-muted small"></i>
                                    </div>
                                    <small className="text-muted fw-bold">Active Members: {role.members}</small>
                                </div>
                                <h6 className="mb-3 small fw-bold text-uppercase text-muted" style={{letterSpacing: '0.5px'}}>Enabled Capabilities</h6>
                                <div className="list-group list-group-flush border-bottom-0">
                                    {role.permissions.map((perm, pIdx) => (
                                        <div className="list-group-item p-0 py-2 d-flex align-items-center border-0" key={pIdx}>
                                            <i className="fa-solid fa-check-double text-success me-2" style={{fontSize: '0.75rem'}}></i>
                                            <small className="fw-semibold text-dark">{perm}</small>
                                        </div>
                                    ))}
                                    {role.blocked?.map((block, bIdx) => (
                                        <div className="list-group-item p-0 py-2 d-flex align-items-center border-0 opacity-50" key={bIdx}>
                                            <i className="fa-solid fa-ban text-danger me-2" style={{fontSize: '0.75rem'}}></i>
                                            <small className="text-muted">{block}</small>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="app-card-footer p-3 border-top bg-light text-end">
                                <div className="btn-group">
                                    <button className="btn btn-sm btn-action btn-view" title="Inspect Intelligence" data-bs-toggle="modal" data-bs-target="#roleModal" onClick={() => openRoleModal(role, 'view')}><i className="fa-solid fa-shield-halved"></i></button>
                                    <button className="btn btn-sm btn-action btn-edit" title="Modify Protocols" data-bs-toggle="modal" data-bs-target="#roleModal" onClick={() => openRoleModal(role, 'edit')}><i className="fa-solid fa-sliders"></i></button>
                                    <button className="btn btn-sm btn-action btn-delete" title="Purge Architecture" onClick={() => confirm(`Irrevocably delete ${role.name} role?`) && alert('Purge Initiated')}><i className="fa-solid fa-trash-can"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ROLE MODAL (Add/View/Edit) */}
            <div className="modal fade" id="roleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">
                                {editMode ? <><i className="fa-solid fa-shield-virus me-2"></i>Modify Security Role</> : <><i className="fa-solid fa-user-shield me-2"></i>Role Architecture Insight</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="p-4 bg-light border-bottom text-center shadow-inner">
                                <div className="mx-auto mb-3 bg-white text-primary border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{width: 70, height: 70, fontSize: '1.5rem'}}>
                                    <i className="fa-solid fa-key"></i>
                                </div>
                                <h3 className="fw-bold mb-1 text-dark">{selectedRole?.name || 'New Role Architecture'}</h3>
                                <span className="badge bg-primary px-4 py-2 rounded-pill shadow-sm">{selectedRole?.type || 'CUSTOM'} IDENTITY</span>
                            </div>
                            <div className="p-4 bg-white">
                                <div className="row g-4 italicized-labels">
                                    <div className="col-md-12">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Architecture Identifier (Name)</label>
                                        <input type="text" className="form-control" defaultValue={selectedRole?.name} readOnly={!editMode && selectedRole} />
                                    </div>
                                    <div className="col-12">
                                        <h6 className="small fw-bold text-uppercase text-muted border-bottom pb-2 mb-3" style={{letterSpacing: '0.5px'}}>Functional Capability Matrix</h6>
                                        <div className="row g-3">
                                            {[
                                                'Global Infrastructure Access',
                                                'Entity Provisioning (User Management)',
                                                'Telemetry Reports & Visualization',
                                                'Audit Trail Inspection',
                                                'Team Operation Management',
                                                'QA Score Calibration',
                                                'Secure Data Vault Ingress'
                                            ].map((perm, idx) => (
                                                <div className="col-md-6" key={idx}>
                                                    <div className="form-check hov-bg-light p-2 rounded-2 transition-all">
                                                        <input className="form-check-input ms-0 me-3" type="checkbox" id={`perm-${idx}`} disabled={!editMode && selectedRole} defaultChecked={selectedRole?.permissions.includes(perm) || idx % 2 === 0} />
                                                        <label className="form-check-label fw-semibold text-dark small" htmlFor={`perm-${idx}`}>{perm}</label>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4 bg-light">
                            <button type="button" className="btn btn-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Discard Insight</button>
                            {(editMode || !selectedRole) && (
                                <button type="button" className="btn btn-primary px-5 fw-bold shadow-sm" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}} onClick={() => alert('Architecture Propagated')}>Push Security Policy</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RoleMaster;
