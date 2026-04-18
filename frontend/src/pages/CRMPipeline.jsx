import React, { useState, useEffect } from 'react';
import {
    Users,
    LayoutDashboard,
    Building,
    Phone,
    User,
    ExternalLink,
    Plus,
    Eye,
    Pencil,
    Trash2,
    Search,
    ShieldCheck,
    Briefcase,
    Zap
} from 'lucide-react';

const CRMPipeline = () => {
    const [activeTab, setActiveTab] = useState('kanban-view');
    const [selectedLead, setSelectedLead] = useState(null);
    const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'add'
    const [crmLeads, setCrmLeads] = useState([
        // New Leads
        { id: 1, company: 'Nexura Technologies', contact: 'Rajesh Mehra', phone: '+91 98765 43210', source: 'Digital Marketing', stage: 'New', sourceTag: 'tag-digital' },
        { id: 2, company: 'BlueOrbit India', contact: 'Meena Kapoor', phone: '+91 87654 32109', source: 'Cold Call', stage: 'New', sourceTag: 'tag-cold' },
        { id: 3, company: 'Pinnacle BPO', contact: 'Arun Nair', phone: '+91 76543 21098', source: 'Inbound', stage: 'New', sourceTag: 'tag-inbound' },
        { id: 4, company: 'DataSync Corp', contact: 'Neha Gupta', phone: '+91 65432 10987', source: 'Digital Marketing', stage: 'New', sourceTag: 'tag-digital' },

        // Contacted
        { id: 5, company: 'TechVista Inc', contact: 'Sanjay Patel', phone: '+91 54321 09876', source: 'Digital Marketing', stage: 'Contacted', sourceTag: 'tag-digital' },
        { id: 6, company: 'Vertex Solutions', contact: 'Ritu Sharma', phone: '+91 43210 98765', source: 'LinkedIn', stage: 'Contacted', sourceTag: 'tag-linkedin' },
        { id: 7, company: 'Infosync Labs', contact: 'Deepak Roy', phone: '+91 32109 87654', source: 'Cold Call', stage: 'Contacted', sourceTag: 'tag-cold' },

        // Negotiation
        { id: 8, company: 'GreenField Corp', contact: 'Anil Kumar', phone: '+91 21098 76543', source: 'Inbound', stage: 'Negotiation', sourceTag: 'tag-inbound', dealValue: '₹3.5L' },
        { id: 9, company: 'Apex Solutions', contact: 'Priya Verma', phone: '+91 10987 65432', source: 'Digital Marketing', stage: 'Negotiation', sourceTag: 'tag-digital', dealValue: '₹5.2L' },

        // Closed
        { id: 10, company: 'BlueStar BPO', contact: 'Kiran Shah', phone: '+91 09876 54321', source: 'Cold Call', stage: 'Closed', sourceTag: 'tag-cold', contract: '₹8.5L/yr' },
        { id: 11, company: 'OmniCall Services', contact: 'Sunita Devi', phone: '+91 98761 23456', source: 'Inbound', stage: 'Closed', sourceTag: 'tag-inbound', contract: '₹6.2L/yr' },
        { id: 12, company: 'TranscribeAI', contact: 'Amit Jain', phone: '+91 87651 09876', source: 'LinkedIn', stage: 'Closed', sourceTag: 'tag-linkedin', contract: '₹4.8L/yr' },
    ]);

    const moveLead = (leadId, nextStage) => {
        setCrmLeads(prevLeads => prevLeads.map(lead => 
            lead.id === leadId ? { ...lead, stage: nextStage } : lead
        ));
    };

    const handleDeleteLead = (id) => {
        if (confirm('Irrevocably remove lead from operational database?')) {
            setCrmLeads(prevLeads => prevLeads.filter(l => l.id !== id));
        }
    };

    const handleSaveLead = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        if (modalMode === 'add') {
            const newLead = {
                id: Date.now(),
                company: data.company,
                contact: data.contact,
                phone: data.phone,
                source: data.source_text || 'Inbound',
                stage: data.stage || 'New',
                sourceTag: data.source_tag || 'tag-inbound',
                dealValue: data.dealValue || '₹0.00'
            };
            setCrmLeads([...crmLeads, newLead]);
        } else {
            setCrmLeads(prevLeads => prevLeads.map(lead => 
                lead.id === selectedLead.id ? { ...lead, ...data } : lead
            ));
        }
        alert('Operational Data Synchronized Successfully');
        // We rely on data-bs-dismiss on the button or manual close
    };

    const openLeadModal = (lead, mode) => {
        setSelectedLead(lead);
        setModalMode(mode);
    };

    const stages = [
        { key: 'New', label: 'New Leads', class: 'kanban-col-new' },
        { key: 'Contacted', label: 'Contacted', class: 'kanban-col-contacted' },
        { key: 'Negotiation', label: 'In Negotiation', class: 'kanban-col-negotiation' },
        { key: 'Closed', label: 'Closed Won', class: 'kanban-col-closed' }
    ];

    return (
        <div className="crm-pipeline-container">
            <div className="row g-3 mb-4 align-items-center justify-content-between">
                <div className="col-auto">
                    <h1 className="app-page-title mb-1">Lead Generation & CRM Pipeline</h1>
                    <p className="text-muted mb-0 small">Manage leads and enterprise prospects through the sales funnel.</p>
                </div>
                <div className="col-auto">
                    <button className="btn app-btn-primary shadow-sm" data-bs-toggle="modal" data-bs-target="#leadModal" onClick={() => openLeadModal(null, 'add')}>
                        <Plus size={18} className="me-2" /> Provision New Prospect
                    </button>
                </div>
            </div>

            {/* View Switching Tabs */}
            <ul className="nav cap-tabs mb-4 px-2" id="crm-tabs">
                <li className="nav-item">
                    <button
                        className={`nav-link border-0 bg-transparent ${activeTab === 'kanban-view' ? 'active' : ''}`}
                        onClick={() => setActiveTab('kanban-view')}
                    >
                        Kanban Board
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link border-0 bg-transparent ${activeTab === 'list-view' ? 'active' : ''}`}
                        onClick={() => setActiveTab('list-view')}
                    >
                        List View
                    </button>
                </li>
            </ul>

            {/* KANBAN PERSPECTIVE */}
            {activeTab === 'kanban-view' && (
                <div className="cap-tab-content active p-1">
                    <div className="row g-3">
                        {stages.map((stage) => (
                            <div 
                                className="col-12 col-md-6 col-lg-3" 
                                key={stage.key}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    const leadId = e.dataTransfer.getData("leadId");
                                    if (leadId) moveLead(Number(leadId), stage.key);
                                }}
                            >
                                <div className={`kanban-column ${stage.class} shadow-sm border-0`}>
                                    <div className="kanban-col-header">
                                        <span className="kanban-col-title">{stage.label}</span>
                                        <span className="kanban-col-count">{crmLeads.filter(l => l.stage === stage.key).length}</span>
                                    </div>
                                    <div className="kanban-col-body">
                                        {crmLeads.filter(l => l.stage === stage.key).map(lead => (
                                            <div
                                                className="kanban-card hov-translate-up"
                                                key={lead.id}
                                                draggable={true}
                                                onDragStart={(e) => e.dataTransfer.setData("leadId", lead.id)}
                                                onClick={() => openLeadModal(lead, 'view')}
                                                data-bs-toggle="modal"
                                                data-bs-target="#leadModal"
                                            >
                                                <div className="kanban-card-title">{lead.company}</div>
                                                <div className="kanban-card-contact"><User size={13} className="me-2 text-muted" />{lead.contact}</div>
                                                <div className="kanban-card-phone"><Phone size={13} className="me-2 text-muted" />{lead.phone}</div>

                                                {lead.dealValue && (
                                                    <div className="small mt-2 fw-bold text-dark">
                                                        <Briefcase size={12} className="me-2 text-primary" />{lead.dealValue}
                                                    </div>
                                                )}

                                                <div className="kanban-card-footer mt-2 d-flex justify-content-between align-items-center">
                                                    <span className={`kanban-source-tag ${lead.sourceTag}`}>{lead.source.toUpperCase()}</span>
                                                    <div className="move-actions">
                                                        {stage.key !== 'Closed' && (
                                                            <button 
                                                                className="btn btn-xs p-0 text-primary hov-scale" 
                                                                title="Move to Next Stage"
                                                                onClick={(e) => { e.stopPropagation(); moveLead(lead.id, stages[stages.findIndex(s => s.key === stage.key) + 1].key); }}
                                                            >
                                                                <ExternalLink size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {crmLeads.filter(l => l.stage === stage.key).length === 0 && (
                                            <div className="text-center py-5 text-muted opacity-50 small">
                                                <Zap size={24} className="mb-2 d-xl-block mx-auto opacity-25" />
                                                No leads in this stage
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* LIST PERSPECTIVE */}
            {activeTab === 'list-view' && (
                <div className="cap-tab-content active">
                    <div className="app-card app-card-table shadow-sm mb-4">
                        <div className="app-card-body p-0">
                            <div className="table-responsive">
                                <table className="table app-table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3">Client Entity</th>
                                            <th className="px-4 py-3">Point of Contact</th>
                                            <th className="px-4 py-3">Telemetry (Phone)</th>
                                            <th className="px-4 py-3">Source Origin</th>
                                            <th className="px-4 py-3">Lifecycle Stage</th>
                                            <th className="px-4 py-3 text-end">Record Control</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {crmLeads.map(lead => (
                                            <tr key={lead.id} className="transition-all hov-bg-light">
                                                <td className="px-4 py-3" data-label="Entity">
                                                    <div className="fw-bold text-dark">{lead.company}</div>
                                                    <div className="text-muted font-monospace" style={{fontSize: '0.65rem'}}>UID: L-{String(lead.id).padStart(4, '0')}</div>
                                                </td>
                                                <td className="px-4 py-3 align-middle" data-label="Contact">{lead.contact}</td>
                                                <td className="px-4 py-3 align-middle font-monospace small" data-label="Telemetry">{lead.phone}</td>
                                                <td className="px-4 py-3 align-middle" data-label="Source">
                                                    <span className={`kanban-source-tag ${lead.sourceTag}`}>{lead.source}</span>
                                                </td>
                                                <td className="px-4 py-3 align-middle" data-label="Stage">
                                                    <span className={`badge border shadow-sm px-3 py-2 rounded-pill font-weight-bold text-uppercase bg-white text-dark`} style={{ fontSize: '0.65rem' }}>
                                                        <i className={`fa-solid fa-circle me-2 x-small text-${lead.stage === 'Closed' ? 'success' : lead.stage === 'Negotiation' ? 'warning' : 'primary'}`}></i>
                                                        {lead.stage}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 text-end align-middle" data-label="Control">
                                                    <div className="btn-group shadow-sm rounded-pill overflow-hidden border">
                                                        <button className="btn btn-sm btn-white text-muted hov-bg-primary hov-text-white border-0" title="Detailed Insight" data-bs-toggle="modal" data-bs-target="#leadModal" onClick={() => openLeadModal(lead, 'view')}><Eye size={16} /></button>
                                                        <button className="btn btn-sm btn-white text-muted hov-bg-dark hov-text-white border-0" title="Modify Record" data-bs-toggle="modal" data-bs-target="#leadModal" onClick={() => openLeadModal(lead, 'edit')}><Pencil size={16} /></button>
                                                        <button className="btn btn-sm btn-white text-muted hov-bg-danger hov-text-white border-0 text-danger" title="Purge Lead" onClick={() => handleDeleteLead(lead.id)}><Trash2 size={16} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* LEAD INTELLIGENCE MODAL */}
            <div className="modal fade" id="leadModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white py-4 px-4 border-0">
                            <h5 className="modal-title fw-bold">
                                {modalMode === 'add' ? <><Plus size={20} className="me-2" />Initialize New Strategic Lead</> :
                                    modalMode === 'edit' ? <><Pencil size={20} className="me-2" />Modify Intelligence Protocol: {selectedLead?.company}</> :
                                        <><ShieldCheck size={20} className="me-2 text-warning" />Strategic Lead Intel - {selectedLead?.company}</>}
                            </h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSaveLead}>
                            <div className="modal-body p-0">
                                <div className="bg-light p-4 border-bottom">
                                    <div className="row g-4 italicized-labels">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Lead Identity (Company)</label>
                                            <div className="input-group shadow-sm">
                                                <span className="input-group-text bg-white border-end-0"><Building size={16} className="text-muted" /></span>
                                                <input name="company" type="text" className="form-control border-start-0" defaultValue={selectedLead?.company || ''} readOnly={modalMode === 'view'} placeholder="Legal Entity Name" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Assigned Executive Contact</label>
                                            <div className="input-group shadow-sm">
                                                <span className="input-group-text bg-white border-end-0"><User size={16} className="text-muted" /></span>
                                                <input name="contact" type="text" className="form-control border-start-0" defaultValue={selectedLead?.contact || ''} readOnly={modalMode === 'view'} placeholder="Full Name" required />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 bg-white">
                                    <div className="row g-4 italicized-labels">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Encrypted Voice Channel</label>
                                            <input name="phone" type="text" className="form-control font-monospace" defaultValue={selectedLead?.phone || '+91 '} readOnly={modalMode === 'view'} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Acquisition Origin</label>
                                            <select name="sourceTag" className="form-select fw-semibold" defaultValue={selectedLead?.sourceTag || 'tag-digital'} disabled={modalMode === 'view'}>
                                                <option value="tag-digital">Digital Marketing Network</option>
                                                <option value="tag-cold">Cold Outreach / Direct Call</option>
                                                <option value="tag-inbound">Organic Inbound Signal</option>
                                                <option value="tag-linkedin">Professional Graph (LinkedIn)</option>
                                            </select>
                                            <input type="hidden" name="source" defaultValue={selectedLead?.source || 'Digital Marketing'} />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Current Funnel Trajectory</label>
                                            <select name="stage" className="form-select fw-bold text-primary" defaultValue={selectedLead?.stage || 'New'} disabled={modalMode === 'view'}>
                                                <option value="New">Discovery & New Lead</option>
                                                <option value="Contacted">Verification Contacted</option>
                                                <option value="Negotiation">Strategic Negotiation</option>
                                                <option value="Closed">Finalized - Closed Won</option>
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Financial Magnitude (Deal Value)</label>
                                            <input name="dealValue" type="text" className="form-control fw-bold text-success" defaultValue={selectedLead?.dealValue || selectedLead?.contract || '₹0.00'} readOnly={modalMode === 'view'} />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label small fw-bold text-muted text-uppercase mb-1" style={{ fontSize: '0.65rem' }}>Operational Intelligence Repository</label>
                                            <textarea className="form-control" rows="4" defaultValue="Lead identified during regional expansion audit. Strategic requirement for high-availability BPO infrastructure and client management systems." readOnly={modalMode === 'view'} style={{ resize: 'none' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer bg-light border-0 p-4">
                                <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort Intel Session</button>
                                {modalMode !== 'view' && (
                                    <button type="submit" className="btn btn-primary px-5 fw-bold shadow-lg hov-translate-up" style={{ background: '#9B7D3D', borderColor: '#9B7D3D' }} data-bs-dismiss="modal">
                                        {modalMode === 'add' ? 'Initialize lead record' : 'Propagate intelligence'}
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CRMPipeline;
