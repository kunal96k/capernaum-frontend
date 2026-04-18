import React, { useState } from 'react';

const ShiftManagement = () => {
    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const [assignments, setAssignments] = useState([
        { id: 'EMP001', name: 'Rajesh Kumar', dept: 'Call Center - Inbound', shift: 'Morning (06:00-14:00)', date: '01-Jan-2024', status: 'Active' },
        { id: 'EMP002', name: 'Priya Sharma', dept: 'Call Center - Outbound', shift: 'Afternoon (14:00-22:00)', date: '05-Jan-2024', status: 'Active' },
        { id: 'EMP003', name: 'Vikram Singh', dept: 'Quality Assurance', shift: 'Night (22:00-06:00)', date: '10-Jan-2024', status: 'Active' },
    ]);

    const [shifts, setShifts] = useState([
        { name: 'Morning Shift', code: 'MOR-01', time: '06:00 - 14:00', capacity: 40, assigned: 38, status: 'Active', color: 'success' },
        { name: 'Afternoon Shift', code: 'AFT-01', time: '14:00 - 22:00', capacity: 45, assigned: 42, status: 'Active', color: 'success' },
        { name: 'Night Shift', code: 'NIT-01', time: '22:00 - 06:00', capacity: 35, assigned: 30, status: 'Active', color: 'warning' },
        { name: 'Weekend Support', code: 'WND-01', time: '09:00 - 18:00', capacity: 20, assigned: 20, status: 'Inactive', color: 'secondary' },
    ]);

    const openShiftModal = (shift, mode) => {
        setSelectedShift(shift);
        setEditMode(mode === 'edit');
    };

    const handleRevoke = (id) => {
        if (confirm('Revoke personnel assignment from this duty cycle?')) {
            setAssignments(assignments.filter(a => a.id !== id));
            alert('Personnel Disengaged from Cycle');
        }
    };

    const handleUpdateAssignment = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updated = {
            ...selectedAssignment,
            shift: formData.get('shift'),
            dept: formData.get('dept')
        };
        setAssignments(assignments.map(a => a.id === selectedAssignment.id ? updated : a));
        alert('Assignment Recalibrated Successfully');
    };

    return (
        <>
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-0">Shift Resource Orchestration</h1>
                    <p className="text-muted small mb-0">Design and assign operational duty cycles across organizational units.</p>
                </div>
                <div className="col-auto">
                    <button className="btn app-btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#shiftModal" onClick={() => openShiftModal(null, 'add')}>
                        <i className="fa-solid fa-plus me-2"></i>Provision New Duty Cycle
                    </button>
                </div>
            </div>

            {/* Statistics Row */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Operational Cycles', value: '4', meta: 'Running Synchronized', color: 'blue' },
                    { label: 'Aggregated Capacity', value: '156', meta: 'Unified Staff Slots', color: 'green' },
                    { label: 'Occupancy Rate', value: '91%', meta: '142 Assigned Units', color: 'orange' },
                    { label: 'Available Slots', value: '14', meta: 'Strategic Reserving', color: 'red' }
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

            {/* Shift Cards Grid */}
            <div className="row g-4 mb-4">
                {shifts.map((shift, idx) => (
                    <div className="col-12 col-md-6 col-lg-3" key={idx}>
                        <div className="app-card shift-card shadow-sm h-100 hov-bg-soft-primary transition-all border-0" style={{borderLeft: '4px solid #9B7D3D', borderRadius: 12}}>
                            <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center bg-light bg-opacity-20">
                                <h5 className="app-card-title mb-0 fw-bold text-dark">{shift.name}</h5>
                                <span className={`badge bg-soft-${shift.color} text-${shift.color} border px-2 py-1`}>{shift.status.toUpperCase()}</span>
                            </div>
                            <div className="app-card-body p-4 text-center">
                                <div className="shift-time fs-4 fw-bold text-dark mb-3 font-monospace" style={{letterSpacing: '1px'}}>{shift.time}</div>
                                <div className="mb-4 d-flex justify-content-center gap-3">
                                    <div className="text-center">
                                        <div className="small text-muted text-uppercase fw-bold" style={{fontSize: '0.6rem'}}>Capacity</div>
                                        <div className="fw-bold text-dark">{shift.capacity}</div>
                                    </div>
                                    <div className="text-center border-start ps-3">
                                        <div className="small text-muted text-uppercase fw-bold" style={{fontSize: '0.6rem'}}>Assigned</div>
                                        <div className="fw-bold text-dark">{shift.assigned}</div>
                                    </div>
                                    <div className="text-center border-start ps-3">
                                        <div className="small text-muted text-uppercase fw-bold" style={{fontSize: '0.6rem'}}>Vacant</div>
                                        <div className="fw-bold text-success">{shift.capacity - shift.assigned}</div>
                                    </div>
                                </div>
                                <div className="btn-group w-100 shadow-sm rounded-3 overflow-hidden border">
                                    <button className="btn btn-sm btn-white border-0 fw-bold text-muted hov-bg-dark hov-text-white py-2" data-bs-toggle="modal" data-bs-target="#shiftModal" onClick={() => openShiftModal(shift, 'view')}>VIEW</button>
                                    <button className="btn btn-sm btn-white border-0 border-start fw-bold text-muted hov-bg-warning hov-text-dark py-2" data-bs-toggle="modal" data-bs-target="#shiftModal" onClick={() => openShiftModal(shift, 'edit')}>EDIT</button>
                                    <button className="btn btn-sm btn-white border-0 border-start fw-bold text-muted hov-bg-danger hov-text-white py-2" onClick={() => confirm(`Purge ${shift.name} configuration?`) && alert('Cycle Purged')}>DEL</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Assignments Table */}
            <div className="app-card app-card-table shadow-sm mb-4">
                <div className="app-card-header p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h4 className="app-card-title">Staff Assignment Matrix</h4>
                    <div className="search-box">
                        <input type="text" className="form-control form-control-sm" placeholder="Filter agents..." />
                    </div>
                </div>
                <div className="app-card-body p-0 table-responsive">
                    <table className="table table-hover mb-0 app-table-hover">
                        <thead className="table-light">
                            <tr>
                                <th className="px-3">Asset UID</th>
                                <th>Personnel Nomenclature</th>
                                <th>Unit Alignment</th>
                                <th>Cycle Assignment</th>
                                <th>Activation Date</th>
                                <th className="text-end px-3">Management</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignments.map((asgn, idx) => (
                                <tr key={idx}>
                                    <td className="px-3" data-label="UID"><span className="badge bg-soft-secondary text-dark font-monospace border">{asgn.id}</span></td>
                                    <td className="fw-bold text-dark" data-label="Personnel">{asgn.name}</td>
                                    <td className="small" data-label="Unit">{asgn.dept}</td>
                                    <td data-label="Cycle"><span className={`badge ${asgn.shift.includes('Morning') ? 'bg-soft-info text-info' : asgn.shift.includes('Afternoon') ? 'bg-soft-warning text-warning' : 'bg-soft-danger text-danger'} border px-3`}>{asgn.shift.toUpperCase()}</span></td>
                                    <td className="small text-muted" data-label="Date">{asgn.date}</td>
                                    <td className="text-end px-3" data-label="Manage">
                                        <div className="btn-group shadow-sm rounded-pill overflow-hidden border">
                                            <button className="btn btn-sm btn-white text-muted hov-bg-primary hov-text-white border-0" title="Inspect Assignment" data-bs-toggle="modal" data-bs-target="#assignmentModal" onClick={() => { setSelectedAssignment(asgn); setEditMode(false); }}><i className="fa-solid fa-user-gear"></i></button>
                                            <button className="btn btn-sm btn-white text-muted hov-bg-warning hov-text-dark border-0" title="Modify Duty" data-bs-toggle="modal" data-bs-target="#assignmentModal" onClick={() => { setSelectedAssignment(asgn); setEditMode(true); }}><i className="fa-solid fa-clock-rotate-left"></i></button>
                                            <button className="btn btn-sm btn-white text-muted hov-bg-danger hov-text-white border-0 text-danger" title="Revoke Assignment" onClick={() => handleRevoke(asgn.id)}><i className="fa-solid fa-user-minus"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SHIFT MODAL (Add/View/Edit) */}
            <div className="modal fade" id="shiftModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">
                                {editMode ? <><i className="fa-solid fa-calendar-days me-2"></i>Modify Duty Cycle</> : selectedShift ? <><i className="fa-solid fa-clock me-2"></i>Duty Cycle Insight</> : <><i className="fa-solid fa-plus me-2"></i>Provision New Duty Cycle</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="p-4 bg-light border-bottom text-center shadow-inner">
                                <div className="mx-auto mb-3 bg-white text-primary border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{width: 70, height: 70, fontSize: '1.5rem', border: '2px solid #9B7D3D !important'}}>
                                    <i className="fa-solid fa-clock"></i>
                                </div>
                                <h3 className="fw-bold mb-1 text-dark">{selectedShift?.name || 'Cycle Nomenclature...'}</h3>
                                <span className="badge bg-primary px-4 py-2 rounded-pill shadow-sm">{selectedShift?.code || 'AUTO-ID'}</span>
                            </div>
                            <div className="p-4 bg-white italicized-labels">
                                <div className="row g-4">
                                    <div className="col-md-6 border-right">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Cycle Nomenclature</label>
                                        <input type="text" className="form-control" defaultValue={selectedShift?.name} readOnly={!editMode && selectedShift} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Architecture UID</label>
                                        <input type="text" className="form-control" defaultValue={selectedShift?.code} readOnly={!editMode && selectedShift} />
                                    </div>
                                    <div className="col-md-6 border-right">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Activation Point (Start)</label>
                                        <input type="time" className="form-control" defaultValue={selectedShift?.time.split(' - ')[0]} readOnly={!editMode && selectedShift} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Termination Point (End)</label>
                                        <input type="time" className="form-control" defaultValue={selectedShift?.time.split(' - ')[1]} readOnly={!editMode && selectedShift} />
                                    </div>
                                    <div className="col-md-12">
                                        <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{fontSize: '0.65rem'}}>Asset Buffer (Staff Capacity)</label>
                                        <input type="number" className="form-control bg-light fw-bold text-center fs-4" defaultValue={selectedShift?.capacity} readOnly={!editMode && selectedShift} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer border-0 p-4 bg-light shadow-inner">
                            <button type="button" className="btn btn-secondary px-4 fw-bold shadow-sm" data-bs-dismiss="modal">Abort Review</button>
                            {(editMode || !selectedShift) && (
                                <button type="button" className="btn btn-primary px-5 fw-bold shadow-sm" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}} onClick={() => alert('Cycle Configuration Propagated')}>Push Configuration</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* ASSIGNMENT MODAL (View/Edit) */}
            <div className="modal fade" id="assignmentModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden" style={{ borderRadius: 15 }}>
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold">
                                {editMode ? <><i className="fa-solid fa-clock-rotate-left me-2 text-warning"></i>Recalibrate Assignment</> : <><i className="fa-solid fa-user-gear me-2 text-primary"></i>Assignment Intelligence</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleUpdateAssignment}>
                            <div className="modal-body p-0">
                                {selectedAssignment && (
                                    <>
                                        <div className="p-4 bg-light text-center border-bottom shadow-inner">
                                            <div className="avatar-placeholder mx-auto mb-3 bg-white text-dark border rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 70, height: 70, fontSize: '1.5rem', border: '2px solid #9B7D3D !important' }}>
                                                {selectedAssignment.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <h4 className="fw-bold mb-1 text-dark">{selectedAssignment.name}</h4>
                                            <span className="badge bg-dark bg-opacity-75 px-3 py-1 rounded-pill">{selectedAssignment.id}</span>
                                        </div>
                                        <div className="p-4 bg-white">
                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Unit Alignment</label>
                                                    <input name="dept" type="text" className="form-control" defaultValue={selectedAssignment.dept} readOnly={!editMode} />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Core Duty Cycle</label>
                                                    {editMode ? (
                                                        <select name="shift" className="form-select fw-bold" defaultValue={selectedAssignment.shift}>
                                                            {shifts.map(s => <option key={s.code} value={s.name + ' (' + s.time + ')'}>{s.name} ({s.time})</option>)}
                                                        </select>
                                                    ) : (
                                                        <input type="text" className="form-control fw-bold text-primary" value={selectedAssignment.shift} readOnly />
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Activation Point</label>
                                                    <div className="small fw-bold text-dark">{selectedAssignment.date}</div>
                                                </div>
                                                <div className="col-md-6 border-start ps-3">
                                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-1">Protocol Status</label>
                                                    <div><span className="badge bg-soft-success text-success border px-2">OPERATIONAL</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer border-0 p-4 bg-light">
                                <button type="button" className="btn btn-secondary px-4 fw-bold small" data-bs-dismiss="modal">Close Insight</button>
                                {editMode && <button type="submit" className="btn btn-primary px-4 fw-bold small shadow-sm" style={{ background: '#9B7D3D', borderColor: '#9B7D3D' }} data-bs-dismiss="modal">Push Recalibration</button>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShiftManagement;
