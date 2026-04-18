import React, { useEffect, useState } from 'react';
import {
    Database,
    UploadCloud,
    FileBox,
    ShieldCheck,
    Search,
    Filter,
    Download,
    MoreHorizontal,
    Activity,
    Lock,
    FileText,
    FileAudio,
    FileOutput,
    CheckCircle2,
    Clock,
    AlertCircle,
    Info,
    RefreshCw,
    Play,
    Pause,
    Volume2,
    Trash2,
    FileSpreadsheet,
    Calendar,
    Check
} from 'lucide-react';

const DataVault = () => {
    const [files, setFiles] = useState([
        { id: 1, name: 'Audio_Transcription_Q2.zip', client: 'Nexura Technologies', project: 'Voice Support', type: 'Audio Stream', user: 'Priya Sharma', date: '15 Apr 2026', records: '1,250', status: 'Secured', size: '128 MB', icon: <FileAudio className="text-primary" /> },
        { id: 2, name: 'Invoice_Batch_March.xlsx', client: 'GreenField Corp', project: 'L1 Tech Desk', type: 'Master Ledger', user: 'Rahul Patil', date: '14 Apr 2026', records: '2,450', status: 'Secured', size: '42 MB', icon: <FileText className="text-success" /> },
        { id: 3, name: 'Customer_Signals_W14.zip', client: 'Apex Solutions', project: 'Lead Qualifying', type: 'Compressed Telemetry', user: 'Vikram Deshmukh', date: '13 Apr 2026', records: '890', status: 'Scanning', size: '94 MB', icon: <FileBox className="text-warning" /> },
    ]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isIngesting, setIsIngesting] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackProgress, setPlaybackProgress] = useState(0);

    const handleUpload = () => {
        setIsIngesting(true);
        setTimeout(() => {
            const newFile = {
                id: files.length + 1,
                name: `Asset_Pulse_${new Date().toLocaleDateString().replace(/\//g, '')}.zip`,
                client: 'Nexura Technologies',
                project: 'CRM Sync',
                type: 'Compressed Container',
                user: 'System Admin',
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'Short', year: 'numeric' }),
                records: Math.floor(Math.random() * 5000) + 100,
                status: 'Scanning',
                size: '12 MB',
                icon: <FileBox className="text-warning" />
            };
            setFiles([newFile, ...files]);
            setIsIngesting(false);
            // Close modal using bootstrap raw JS if needed, but for dummy we just alert
            alert('Infrastructure Sync Completed: New Asset Ingested');
        }, 1500);
    };

    const handlePurge = (id) => {
        if (confirm('CRITICAL: Purge asset from encrypted vault? This action is irreversible.')) {
            setFiles(files.filter(f => f.id !== id));
            alert('Security Protocol: Asset Purged from Vault');
        }
    };

    const exportToCSV = () => {
        const headers = ["Name,Client,Project,Type,Date,Records,Size,Status"];
        const rows = files.map(f => `${f.name},${f.client},${f.project},${f.type},${f.date},${f.records},${f.size},${f.status}`);
        const content = headers.concat(rows).join("\n");
        const blob = new Blob([content], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'DataVault_Inventory.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    useEffect(() => {
        let interval;
        if (isPlaying && playbackProgress < 100) {
            interval = setInterval(() => {
                setPlaybackProgress(prev => Math.min(prev + 1, 100));
            }, 500);
        } else if (playbackProgress >= 100) {
            setIsPlaying(false);
            setPlaybackProgress(0);
        }
        return () => clearInterval(interval);
    }, [isPlaying, playbackProgress]);

    return (
        <div className="data-vault-wrapper">
            <div className="row mb-4 align-items-center justify-content-between g-3">
                <div className="col">
                    <h1 className="app-page-title mb-1">Strategic Data Vault</h1>
                    <p className="text-muted mb-0 small">Secure asset ingestion and encrypted repository for enterprise intelligence.</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-primary shadow-lg border-0 px-4 hov-translate-up fw-bold" style={{ background: '#9B7D3D' }} data-bs-toggle="modal" data-bs-target="#uploadBatchModal">
                        <UploadCloud size={18} className="me-2" />Ingest New Asset
                    </button>
                </div>
            </div>

            {/* Infrastructure Telemetry */}
            <div className="row g-4 mb-4">
                {[
                    { label: 'Vault Inventory', value: '1,847', icon: <Database className="text-primary" />, meta: 'All Nodes Online', color: 'border-left-blue' },
                    { label: 'Integrity Verified', value: '1,692', icon: <ShieldCheck className="text-success" />, meta: '99.9% Logic Sync', color: 'border-left-green' },
                    { label: 'Ingestion Queue', value: '155', icon: <Activity className="text-warning" />, meta: 'High Priority', color: 'border-left-orange' },
                    { label: 'Cloud Footprint', value: '42.8 GB', icon: <Lock className="text-info" />, meta: 'AES-256 Active', color: 'border-left-info' }
                ].map((stat, i) => (
                    <div className="col-6 col-md-3" key={i}>
                        <div className={`app-card shadow-sm h-100 ${stat.color} overflow-hidden`}>
                            <div className="app-card-body p-4 text-center">
                                <div className="mb-2 opacity-50">{stat.icon}</div>
                                <div className="stats-figure fw-bold fs-3 text-dark">{stat.value}</div>
                                <div className="stats-label extra-small text-muted text-uppercase fw-bold mb-1">{stat.label}</div>
                                <div className="extra-small fw-bold text-success" style={{ fontSize: '0.65rem' }}>{stat.meta}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Asset Search & Filter */}
            <div className="app-card shadow-sm mb-4">
                <div className="app-card-body p-3">
                    <div className="row g-3 align-items-center">
                        <div className="col-md-4">
                            <div className="search-box position-relative">
                                <Search size={16} className="position-absolute translate-middle-y top-50 ms-3 text-muted" />
                                <input type="text" className="form-control ps-5 rounded-pill border-light shadow-inner" placeholder="Search operational assets..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group input-group-sm">
                                <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-3"><Calendar size={14} className="text-muted" /></span>
                                <input type="text" className="form-control border-start-0 ps-0 rounded-end-pill extra-small fw-bold" placeholder="Select Priority Range..." defaultValue="10 Apr - 20 Apr 2026" />
                            </div>
                        </div>
                        <div className="col-auto ms-auto d-flex gap-2">
                            <div className="dropdown">
                                <button className="btn btn-white border shadow-sm rounded-pill px-3 fw-bold small dropdown-toggle no-toggle-arrow" data-bs-toggle="dropdown">
                                    <Filter size={14} className="me-2" />Refine View
                                </button>
                                <ul className="dropdown-menu shadow-lg border-0 mt-2 p-2" style={{ borderRadius: 12 }}>
                                    <li><a className="dropdown-item rounded-2 small fw-bold" href="#">All Asset Types</a></li>
                                    <li><a className="dropdown-item rounded-2 small fw-bold" href="#">Compressed Containers</a></li>
                                    <li><a className="dropdown-item rounded-2 small fw-bold" href="#">Structured Data Sets</a></li>
                                </ul>
                            </div>
                            <button className="btn btn-dark border-0 shadow-sm rounded-pill px-4 fw-bold small" onClick={exportToCSV}>
                                <Download size={14} className="me-2" />Audit Export
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Asset Table */}
            <div className="app-card app-card-table shadow-sm mb-4 overflow-hidden border-0">
                <div className="app-card-body p-0 table-responsive">
                    <table className="table app-table-hover mb-0 align-middle">
                        <thead className="bg-light">
                            <tr>
                                <th className="px-4 py-3">Asset Logic & Identity</th>
                                <th className="py-3">Enterprise Client</th>
                                <th className="py-3">Classification</th>
                                <th className="py-3">Ingestion Date</th>
                                <th className="py-3">Integrity Pulse</th>
                                <th className="text-end px-4 py-3">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())).map((file) => (
                                <tr key={file.id}>
                                    <td className="px-4 py-3">
                                        <div className="d-flex align-items-center">
                                            <div className="asset-icon p-2 bg-light rounded-3 me-3">{file.icon}</div>
                                            <div>
                                                <div className="fw-bold text-dark">{file.name}</div>
                                                <div className="extra-small text-muted font-monospace">{file.size} Intensity</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="fw-semibold text-dark small">{file.client}</div>
                                        <div className="extra-small text-muted">Project: {file.project}</div>
                                    </td>
                                    <td><span className="badge bg-soft-primary text-primary px-3 py-1 rounded-pill small border">{file.type}</span></td>
                                    <td className="small text-muted mt-3">
                                        <Clock size={12} className="me-2" />
                                        {file.date}
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {file.status === 'Secured' ? <CheckCircle2 size={14} className="text-success me-2" /> : <RefreshCw size={14} className="text-warning me-2 spin" />}
                                            <span className={`small fw-bold ${file.status === 'Secured' ? 'text-success' : 'text-warning'}`}>{file.status.toUpperCase()}</span>
                                        </div>
                                    </td>
                                    <td className="text-end px-4 py-3">
                                        <div className="btn-group shadow-sm rounded-pill">
                                            <button className="btn btn-sm btn-action btn-view" title="Asset Metadata" data-bs-toggle="modal" data-bs-target="#viewDetailModal" onClick={() => { setSelectedFile(file); setIsPlaying(false); setPlaybackProgress(0); }}><Info size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-edit" title="Relaunch Pipeline" onClick={() => alert('Infrastructure process re-queued for ' + file.name)}><RefreshCw size={16} /></button>
                                            <button className="btn btn-sm btn-action btn-delete text-danger" title="Purge Asset" onClick={() => handlePurge(file.id)}><Lock size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODALS */}
            {/* UPLOAD MODAL */}
            <div className="modal fade" id="uploadBatchModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-primary text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><UploadCloud size={20} className="me-2" />Secure Operational Ingestion</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 bg-white">
                            <div className="ingestion-zone p-5 text-center border-dashed border-2 rounded-4 bg-light mb-4 hov-bg-primary transition-all cursor-pointer">
                                <div className="mb-4 d-inline-block bg-primary bg-opacity-10 p-4 rounded-circle">
                                    <FileOutput size={48} className="text-primary" />
                                </div>
                                <h4 className="fw-bold mb-1 text-dark">Stage Infrastructure Assets</h4>
                                <p className="text-muted small px-lg-5">Drop strategic containers here or browse for manual injection. System supports secured .zip, .xlsx, and .csv schemas (Max 100MB per pulse).</p>
                                <button className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm mt-3" style={{ background: '#9B7D3D', border: 'none' }}>Browse Data Nodes</button>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Target Enterprise Client</label>
                                    <select className="form-select border-0 bg-light py-3 fw-bold shadow-xs">
                                        <option>Select entity...</option>
                                        <option>Nexura Technologies</option>
                                        <option>GreenField Corp</option>
                                        <option>Apex Solutions</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label extra-small fw-bold text-muted text-uppercase mb-2">Automated Ingestion Protocol</label>
                                    <select className="form-select border-0 bg-light py-3 fw-bold shadow-xs">
                                        <option>Dynamic Schema Detection</option>
                                        <option>CRM Entry Point Sync</option>
                                        <option>QA Voice Stream Processing</option>
                                        <option>Employee Temporal Logic</option>
                                    </select>
                                </div>
                                <div className="col-12 mt-4">
                                    <div className="p-3 rounded-3 bg-info bg-opacity-10 border border-info border-opacity-10 d-flex align-items-start m-0 text-info">
                                        <AlertCircle size={20} className="me-3 mt-1" />
                                        <div className="small fw-bold">All ingested assets are subjected to AES-256 encryption at rest. Deployment to operational clusters happens immediately after malware telemetry check.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer bg-light p-4 border-0">
                            <button type="button" className="btn btn-outline-secondary px-4 fw-bold" data-bs-dismiss="modal">Abort</button>
                            <button type="button" className="btn btn-primary px-5 fw-bold shadow-lg d-flex align-items-center" style={{ background: '#9B7D3D', border: 'none' }} onClick={handleUpload} disabled={isIngesting}>
                                {isIngesting ? <><RefreshCw size={18} className="me-2 spin" />Syncing...</> : 'Confirm Pulse Ingestion'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIEW MODAL */}
            <div className="modal fade" id="viewDetailModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg overflow-hidden">
                        <div className="modal-header bg-dark text-white p-4 border-0">
                            <h5 className="modal-title fw-bold d-flex align-items-center"><Info size={20} className="me-2 text-info" />Vault Asset Intel</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            {selectedFile ? (
                                <>
                                    <div className="p-5 text-center bg-white border-bottom position-relative overflow-hidden">
                                        <div className="position-absolute top-0 start-50 translate-middle-x mt-n4 bg-info bg-opacity-10 rounded-circle" style={{ width: 240, height: 240 }}></div>
                                        <div className="mx-auto mb-4 bg-white p-3 rounded-4 shadow-sm position-relative d-inline-flex align-items-center justify-content-center border" style={{ width: 100, height: 130, border: '2px solid #f8f9fa !important' }}>
                                            {React.cloneElement(selectedFile.icon, { size: 56, strokeWidth: 1.2, className: '', style: { color: '#9B7D3D' } })}
                                        </div>
                                        <h4 className="fw-bold mb-1 text-dark">{selectedFile.name}</h4>
                                        <div className="d-flex justify-content-center gap-2 mt-3">
                                            <span className="badge px-3 py-2 rounded-pill small" style={{ background: '#9B7D3D' }}>{selectedFile.size}</span>
                                            <span className="badge bg-dark px-3 py-2 rounded-pill small">{selectedFile.records} RECORDS</span>
                                        </div>

                                        {selectedFile.type.includes('Audio') && (
                                            <div className="mt-4 px-4">
                                                <div className="bg-light rounded-4 p-3 border border-dashed">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <button className="btn btn-primary rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm" style={{ width: 45, height: 45, background: '#9B7D3D', border: 'none' }} onClick={() => setIsPlaying(!isPlaying)}>
                                                            {isPlaying ? <Pause size={20} fill="white" /> : <Play size={20} className="ms-1" fill="white" />}
                                                        </button>
                                                        <div className="flex-grow-1">
                                                            <div className="progress overflow-visible bg-white border position-relative" style={{ height: 6 }}>
                                                                <div className="progress-bar" style={{ width: `${playbackProgress}%`, background: '#9B7D3D', transition: 'width 0.5s linear' }}></div>
                                                                <div className="position-absolute top-50 translate-middle" style={{ left: `${playbackProgress}%`, width: 12, height: 12, background: '#9B7D3D', borderRadius: '50%', border: '2px solid white', boxShadow: '0 2px 4px rgba(0,0,0,0.2)', zIndex: 10 }}></div>
                                                            </div>
                                                            <div className="d-flex justify-content-between mt-2 extra-small text-muted fw-bold">
                                                                <span>0:{(Math.floor(playbackProgress * 0.45)).toString().padStart(2, '0')}</span>
                                                                <span>0:45</span>
                                                            </div>
                                                        </div>
                                                        <Volume2 size={18} className="text-muted" />
                                                    </div>
                                                </div>
                                                <p className="extra-small text-muted mt-2 mb-0">Secure stream decryption active. AES-256 protected playback.</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4 bg-white">
                                        {[
                                            { l: 'Enterprise Anchor', v: selectedFile.client },
                                            { l: 'Project Domain', v: selectedFile.project },
                                            { l: 'Classification', v: selectedFile.type },
                                            { l: 'Temporal Ingress', v: selectedFile.date },
                                            { l: 'Infrastructure State', v: selectedFile.status, color: 'text-success' }
                                        ].map((row, i) => (
                                            <div className="d-flex justify-content-between py-2 border-bottom border-light" key={i}>
                                                <span className="extra-small text-muted text-uppercase fw-bold">{row.l}</span>
                                                <span 
                                                    className={`small fw-bold ${row.color || 'text-dark'}`}
                                                    contentEditable={row.l !== 'Temporal Ingress'}
                                                    suppressContentEditableWarning={true}
                                                    onBlur={(e) => console.log('Metadata update staging:', e.target.innerText)}
                                                >
                                                    {row.v}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="px-4 pb-4">
                                        <button className="btn btn-dark w-100 rounded-pill small fw-bold shadow-sm py-2" onClick={() => alert('Infrastructure Checksum Verified: Metadata Saved to Encrypted Ledger.')}>
                                            <Check size={16} className="me-2 text-success" />Save Metadata Updates
                                        </button>
                                    </div>
                                </>
                            ) : <div className="p-5 text-center">Awaiting metadata buffer...</div>}
                        </div>
                        <div className="modal-footer bg-light p-4 border-0 d-flex gap-2">
                            <button type="button" className="btn btn-outline-secondary flex-grow-1 fw-bold border-0 hov-bg-white" data-bs-dismiss="modal">Close Session</button>
                            <button type="button" className="btn btn-primary flex-grow-1 fw-bold shadow-lg" style={{ background: '#9B7D3D', border: 'none' }} onClick={() => alert('Handshake initiated. Downloading decrypted asset package...')}>
                                <Download size={18} className="me-2" />Retrieve Asset
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataVault;
