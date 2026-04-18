import React, { useState } from 'react';

const DepartmentMaster = () => {
    const [selectedDept, setSelectedDept] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [departments, setDepartments] = useState([
        { code: 'DEPT-CALL-01', name: 'Call Center - Inbound', head: 'Rajesh Kumar', staff: 45, budget: '₹12.5L', status: 'Active' },
        { code: 'DEPT-CALL-02', name: 'Call Center - Outbound', head: 'Priya Sharma', staff: 38, budget: '₹11.0L', status: 'Active' },
        { code: 'DEPT-QA-01', name: 'Quality Assurance', head: 'Vikram Singh', staff: 12, budget: '₹5.2L', status: 'Active' },
        { code: 'DEPT-BO-01', name: 'Back Office Operations', head: 'Neha Gupta', staff: 22, budget: '₹7.8L', status: 'Active' },
        { code: 'DEPT-HR-01', name: 'Human Resources', head: 'Amit Patel', staff: 8, budget: '₹3.5L', status: 'Active' },
        { code: 'DEPT-IT-01', name: 'Information Technology', head: 'Anaya Singh', staff: 15, budget: '₹6.2L', status: 'Active' },
    ]);

    const handleSaveDept = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const head = formData.get('head');
        const budget = '₹' + formData.get('budget') + 'L';
        const status = formData.get('status').split(' / ')[0];

        if (selectedDept && editMode) {
            setDepartments(departments.map(d => d.code === selectedDept.code ? { ...d, name, head, budget, status } : d));
            alert('Unit Configuration Propagated Successfully');
        } else {
            const newDept = {
                code: 'DEPT-' + Math.random().toString(36).substring(7).toUpperCase(),
                name: name,
                head: head,
                staff: 0,
                budget: budget,
                status: status
            };
            setDepartments([newDept, ...departments]);
            alert('New Organizational Unit Provisioned');
        }
    };

    const handleDeleteDept = (code) => {
        if (confirm(`Permanently decommission ${code}?`)) {
            setDepartments(departments.filter(d => d.code !== code));
            alert('Unit Decommissioned from Corporate Directory');
        }
    };

    const openDeptModal = (dept, mode) => {
        setSelectedDept(dept);
        setEditMode(mode === 'edit');
    };

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Departmental Management Console</h1>
                    <p className="text-muted small mb-0">Organize organizational units and allocate operational resources.</p>
                </div>
                <div className="col-auto">
                    <button className="btn app-btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#deptModal" onClick={() => openDeptModal(null, 'add')}>
                        <i className="fa-solid fa-plus me-2"></i>Create New Department
                    </button>
                </div>
            </div>

            {/* Statistics Grid */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Total Units', value: '8', meta: 'Operational', color: 'blue', icon: 'fa-sitemap' },
                    { label: 'Staff Aggregation', value: '156', meta: 'Cross-functional', color: 'green', icon: 'fa-users-viewfinder' },
                    { label: 'Resource Allocation', value: '₹45.2L', meta: 'Monthly Ceiling', color: 'orange', icon: 'fa-vault' },
                    { label: 'Strategic Openings', value: '5', meta: 'Hiring Pipeline', color: 'red', icon: 'fa-user-plus' }
                ].map((stat, idx) => (
                    <div className="col-6 col-md-4 col-lg-3" key={idx}>
                        <div className={`app-card app-card-stat shadow-sm h-100 border-left-${stat.color}`}>
                            <div className="app-card-body p-3 p-lg-4">
                                <h4 className="stats-type mb-1 text-uppercase small text-muted fw-bold">{stat.label}</h4>
                                <div className={`stats-figure stats-${stat.color} fw-bold`} style={{fontSize: '1.6rem'}}>{stat.value}</div>
                                <div className="stats-meta text-muted small italic">{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Departments Table */}
            <div className="app-card app-card-table shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-10">
                    <h4 className="app-card-title">Corporate Unit Directory</h4>
                    <div className="search-box">
                        <input type="text" className="form-control form-control-sm" placeholder="Filter units..." />
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table table-hover mb-0 app-table-hover">
                        <thead className="table-light">
                            <tr>
                                <th className="px-3">Unit Code</th>
                                <th>Nomenclature</th>
                                <th>Executive Head</th>
                                <th>Headcount</th>
                                <th>Monthly Allocation</th>
                                <th>Lifecycle</th>
                                <th className="text-end px-3">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map((dept, idx) => (
                                <tr key={idx} className="transition-all hov-bg-light">
                                    <td className="px-3" data-label="Code"><span className="badge bg-soft-secondary text-dark font-monospace border">{dept.code}</span></td>
                                    <td className="fw-bold text-dark" data-label="Unit">{dept.name}</td>
                                    <td data-label="Head">{dept.head}</td>
                                    <td data-label="Staff"><span className="badge bg-soft-primary text-primary px-3">{dept.staff} Members</span></td>
                                    <td className="fw-semibold text-dark" data-label="Budget">{dept.budget}</td>
                                    <td data-label="Lifecycle"><span className={`badge ${dept.status === 'Active' ? 'bg-soft-success text-success' : 'bg-soft-warning text-warning'} border px-3`}>{dept.status.toUpperCase()}</span></td>
                                    <td className="text-end px-3" data-label="Manage">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden border">
                                            <button className="btn btn-sm btn-white text-muted hov-bg-primary hov-text-white border-0" title="Inspect Unit" data-bs-toggle="modal" data-bs-target="#deptModal" onClick={() => openDeptModal(dept, 'view')}><i className="fa-solid fa-binoculars"></i></button>
                                            <button className="btn btn-sm btn-white text-muted hov-bg-dark hov-text-white border-0" title="Modify Configuration" data-bs-toggle="modal" data-bs-target="#deptModal" onClick={() => openDeptModal(dept, 'edit')}><i className="fa-solid fa-pen-ruler"></i></button>
                                            <button className="btn btn-sm btn-white text-muted hov-bg-danger hov-text-white border-0 text-danger" title="Decommission Unit" onClick={() => handleDeleteDept(dept.code)}><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* DEPARTMENT MODAL (Add/View/Edit) */}
            <div className="modal fade" id="deptModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">
                                {editMode ? <><i className="fa-solid fa-pen-to-square me-2"></i>Modify Unit Configuration</> : selectedDept ? <><i className="fa-solid fa-id-card me-2"></i>Unit Identity Insight</> : <><i className="fa-solid fa-plus me-2"></i>Provision New Unit</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <form id="deptForm" onSubmit={handleSaveDept}>
                                <div className="p-4 bg-light border-bottom text-center">
                                    <h3 className="fw-bold mb-1 text-dark">{selectedDept?.name || 'Asset Nomenclature...'}</h3>
                                    <span className="badge bg-primary px-4 py-2 rounded-pill shadow-sm">{selectedDept?.code || 'AUTO-ID'}</span>
                                </div>
                                <div className="p-4 bg-white italicized-labels">
                                    <div className="row g-4">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Unit Designation (Name)</label>
                                            <input name="name" type="text" className="form-control" defaultValue={selectedDept?.name} readOnly={!editMode && selectedDept} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Executive Authority (Head)</label>
                                            <input name="head" type="text" className="form-control" defaultValue={selectedDept?.head} readOnly={!editMode && selectedDept} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Resource Ceiling (Monthly Budget in L)</label>
                                            <div className="input-group">
                                                <span className="input-group-text bg-light border-right-0">₹</span>
                                                <input name="budget" type="number" className="form-control" defaultValue={selectedDept?.budget.replace('₹', '').replace('L', '')} readOnly={!editMode && selectedDept} required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Operational Lifecycle</label>
                                            <select name="status" className="form-select" defaultValue={selectedDept?.status} disabled={!editMode && selectedDept} required>
                                                <option>Active / Operational</option>
                                                <option>Maintenance / Suspended</option>
                                                <option>Decommissioned</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Mission Parameters (Description)</label>
                                            <textarea className="form-control" rows="4" defaultValue="Department focused on strategic operations and client engagement optimization." readOnly={!editMode && selectedDept} style={{resize: 'none'}}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer border-0 p-4 bg-light shadow-inner">
                            <button type="button" className="btn btn-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Abort Review</button>
                            {(editMode || !selectedDept) && (
                                <button type="submit" form="deptForm" className="btn btn-primary px-5 fw-bold shadow-sm" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}} data-bs-dismiss="modal">Push Configuration</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DepartmentMaster;
