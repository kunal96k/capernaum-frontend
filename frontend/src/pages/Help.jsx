import React from 'react';

const Help = () => {
    const faqSections = [
        {
            title: 'Infrastructure & CRM Pipeline',
            icon: 'fa-briefcase',
            color: 'primary',
            questions: [
                { q: 'How do I onboard a new client entity?', a: 'Navigate to the Dashboard or Client Management gateway and initiate "Add Client". Define SLA parameters and toggle portal access credentials.' },
                { q: 'What is the Kanban logic for CRM Pipeline?', a: 'The pipeline modulates client acquisition stages from "Lead Generation" to "Negotiation" and "Closed-Won", providing a visual telemetry of growth cycle.' }
            ]
        },
        {
            title: 'Forensics & QA Hub',
            icon: 'fa-shield-halved',
            color: 'success',
            questions: [
                { q: 'How do I decompose agent performance metrics?', a: 'Access the QA Hub and select a transaction record. The evaluation matrix allows multi-point scoring on communication efficiency and empathy protocols.' },
                { q: 'Where are aggregate employee metrics located?', a: 'The Employee Metrics module provides high-fidelity tracking of daily engagement volumes and average temporal density per unit.' }
            ]
        },
        {
            title: 'Vault Security & Data Injection',
            icon: 'fa-database',
            color: 'info',
            questions: [
                { q: 'What is the protocol for batch data propagation?', a: 'Utilize the Data Vault uplink. Drag-and-drop structural datasets or binary audio files into the secure buffer for client-specific encryption and storage.' },
                { q: 'Is the Data Vault architecture immutable?', a: 'The vault utilizes cold storage encryption and strict role-based access control. No data can be exfiltrated without administrative authorization traces.' }
            ]
        }
    ];

    return (
        <>
            <div className="row g-3 mb-4 align-items-center">
                <div className="col">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-1 text-uppercase fw-bold" style={{fontSize: '0.65rem', letterSpacing: '1px'}}>
                            <li className="breadcrumb-item"><a href="/dashboard" className="text-decoration-none text-muted">Core OS</a></li>
                            <li className="breadcrumb-item active text-primary">Intelligence Support</li>
                        </ol>
                    </nav>
                    <h1 className="app-page-title mb-0 fw-bold d-flex align-items-center">
                        <i className="fa-solid fa-circle-question me-3 text-primary opacity-50"></i>Intelligence Support Center
                    </h1>
                </div>
            </div>

            {/* Support Hero Banner */}
            <div className="app-card shadow-lg mb-5 border-0 overflow-hidden" style={{borderRadius: 15}}>
                <div className="app-card-body p-5 bg-dark text-white position-relative">
                    <div className="position-absolute top-0 end-0 p-4 opacity-10 d-none d-md-block">
                        <i className="fa-solid fa-headset" style={{fontSize: '10rem'}}></i>
                    </div>
                    <div className="position-relative">
                        <span className="badge bg-primary px-3 py-2 rounded-pill mb-3 shadow-lg fw-bold">OPERATIONAL ASSISTANCE ACTIVE</span>
                        <h2 className="display-6 fw-bold mb-3">Modular Intelligence Protocol</h2>
                        <p className="lead opacity-75 mb-0" style={{maxWidth: '700px'}}>Decompose frequently asked operational queries or establish a direct uplink with our technical support infrastructure.</p>
                    </div>
                </div>
            </div>

            {/* FAQ Matrix */}
            <div className="row g-4 mb-5">
                {faqSections.map((section, sIdx) => (
                    <div className="col-12" key={sIdx}>
                        <div className="app-card shadow-sm border-0" style={{borderRadius: 12}}>
                            <div className="app-card-header p-4 border-bottom bg-light bg-opacity-10 d-flex align-items-center gap-3">
                                <div className={`bg-soft-${section.color} p-2 rounded-3 text-${section.color}`}>
                                    <i className={`fa-solid ${section.icon} fs-5`}></i>
                                </div>
                                <h4 className="app-card-title fw-bold text-dark mb-0 text-uppercase small" style={{letterSpacing: '1px'}}>{section.title}</h4>
                            </div>
                            <div className="app-card-body p-0">
                                <div className="accordion accordion-flush" id={`faq-acc-${sIdx}`}>
                                    {section.questions.map((item, iIdx) => (
                                        <div className="accordion-item border-0" key={iIdx}>
                                            <h2 className="accordion-header">
                                                <button className="accordion-button collapsed py-4 px-4 fw-bold text-dark border-bottom transition-all hov-bg-light" type="button" data-bs-toggle="collapse" data-bs-target={`#q-${sIdx}-${iIdx}`}>
                                                    <span className="me-3 text-muted">0{iIdx + 1}.</span> {item.q}
                                                </button>
                                            </h2>
                                            <div id={`q-${sIdx}-${iIdx}`} className="accordion-collapse collapse" data-bs-parent={`#faq-acc-${sIdx}`}>
                                                <div className="accordion-body p-4 bg-light bg-opacity-50 italicized-labels text-secondary" style={{lineHeight: '1.8', borderBottom: '1px solid #eee'}}>
                                                    <i className="fa-solid fa-turn-up me-2 rotate-90 opacity-25"></i>
                                                    {item.a}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Direct Uplink Matrix */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-6">
                    <div className="app-card shadow-lg h-100 border-0 bg-white hover-up transition-all" style={{borderRadius: 15, borderBottom: '5px solid #d92525 !important'}}>
                        <div className="p-5">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div className="bg-soft-danger text-danger rounded-circle d-flex align-items-center justify-content-center" style={{width: 50, height: 50}}>
                                    <i className="fa-solid fa-tty fs-5"></i>
                                </div>
                                <h4 className="fw-bold text-dark mb-0">Technical Terminal Support</h4>
                            </div>
                            <p className="text-muted mb-4 opacity-75">Our infrastructure team is available Monday—Saturday [09:00 - 18:00 IST] for structural assistance.</p>
                            <div className="d-flex flex-column gap-2 mb-4">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-phone-volume text-muted small"></i>
                                    <span className="fw-bold text-dark">+91 9876 543 210</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="fa-solid fa-envelope-open-text text-muted small"></i>
                                    <span className="fw-bold text-primary">support@capernaum.com</span>
                                </div>
                            </div>
                            <button className="btn btn-dark w-100 py-3 fw-bold shadow-sm rounded-pill mt-auto">INITIATE TICKET</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="app-card shadow-lg h-100 border-0 bg-white hover-up transition-all" style={{borderRadius: 15, borderBottom: '5px solid #9B7D3D !important'}}>
                        <div className="p-5">
                            <div className="d-flex align-items-center gap-3 mb-4">
                                <div className="bg-soft-primary text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: 50, height: 50}}>
                                    <i className="fa-solid fa-layer-group fs-5"></i>
                                </div>
                                <h4 className="fw-bold text-dark mb-0">Architecture Exploration</h4>
                            </div>
                            <p className="text-muted mb-4 opacity-75">Navigate through individual operational modules to modulate enterprise performance.</p>
                            <ul className="list-unstyled mb-4">
                                {['Forensic Performance Analysis', 'Logic-Based Shift Control', 'CRM Velocity Tracking'].map((item, idx) => (
                                    <li key={idx} className="mb-2 d-flex align-items-center gap-2">
                                        <i className="fa-solid fa-check text-success small"></i>
                                        <span className="small fw-bold text-muted">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <button className="btn btn-primary w-100 py-3 fw-bold shadow-sm rounded-pill mt-auto" style={{background: '#9B7D3D', borderColor: '#9B7D3D'}}>RETURN TO COMMAND CENTER</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Help;
