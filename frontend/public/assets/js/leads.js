/**
 * Leads Management Module JS
 * Handles lead data, filtering, searching, and status updates.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Mock Data for demonstration
    const mockLeads = [
        {
            id: 'LD1001',
            name: 'Aman Sharma',
            phone: '9876543210',
            email: 'aman@example.com',
            course: 'Java Full Stack',
            referredBy: 'Campus Hub',
            status: 'NEW',
            counselor: 'Unassigned',
            qualification: 'BE (CS)',
            nextFollowup: '2026-03-19',
            notes: 'Interested in placement guarantee.',
            timeline: [{ date: '2026-03-18 10:00', action: 'Lead Created', user: 'System' }]
        },
        {
            id: 'LD1002',
            name: 'Sneha Patil',
            phone: '8765432109',
            email: 'sneha@example.com',
            course: 'Python Development',
            referredBy: 'Direct Walk-in',
            status: 'CONTACTED',
            counselor: 'Kunal Patil',
            qualification: 'MCA',
            nextFollowup: '2026-03-19',
            notes: 'Called, student was busy. Asked to call tomorrow.',
            timeline: [
                { date: '2026-03-19 11:30', action: 'Called - No response', user: 'Kunal Patil' },
                { date: '2026-03-18 14:00', action: 'Assigned to Kunal Patil', user: 'Admin' }
            ]
        },
        {
            id: 'LD1003',
            name: 'Rahul Deshmukh',
            phone: '7654321098',
            email: 'rahul@example.com',
            course: 'Data Science',
            referredBy: 'Social Media',
            status: 'CONTACTED',
            counselor: 'Nikita Patil',
            qualification: 'B.Tech',
            nextFollowup: '2026-03-18',
            notes: 'Comparing with other institutes. Needs a demo class.',
            timeline: [
                { date: '2026-03-18 16:00', action: 'Scheduled Demo', user: 'Nikita Patil' },
                { date: '2026-03-17 09:30', action: 'Contacted', user: 'Nikita Patil' }
            ]
        },
        {
            id: 'LD1004',
            name: 'Priyanka Kulkarni',
            phone: '6543210987',
            email: 'priyanka@example.com',
            course: 'Java Full Stack',
            referredBy: 'Referral Program',
            status: 'INTERESTED',
            counselor: 'Kunal Patil',
            qualification: 'BE (IT)',
            nextFollowup: '2026-03-19',
            notes: 'Very interested in Java. Inquired about batches.',
            timeline: [
                { date: '2026-03-19 10:00', action: 'Follow-up Call', user: 'Kunal Patil' },
                { date: '2026-03-18 12:00', action: 'Interested', user: 'Kunal Patil' }
            ]
        },
        {
            id: 'LD1005',
            name: 'Vikram Singh',
            phone: '9988776655',
            email: 'vikram@example.com',
            course: 'Web Development',
            referredBy: 'Google Search',
            status: 'CONVERTED',
            counselor: 'Nikita Patil',
            qualification: 'BCA',
            nextFollowup: '-',
            notes: 'Fees paid partially. Admission confirmed.',
            timeline: [
                { date: '2026-03-17 15:30', action: 'Payment Received', user: 'Accounts' },
                { date: '2026-03-16 11:00', action: 'Converted', user: 'Nikita Patil' }
            ]
        },
        {
            id: 'LD1006',
            name: 'Anita More',
            phone: '8877665544',
            email: 'anita@example.com',
            course: 'Python Development',
            referredBy: 'Referral Agent',
            status: 'CONTACTED',
            counselor: 'Kunal Patil',
            qualification: 'BCS',
            nextFollowup: '2026-03-21',
            notes: 'Waiting for final year results.',
            timeline: [{ date: '2026-03-18 10:30', action: 'Initial Contact', user: 'Kunal Patil' }]
        },
        {
            id: 'LD1007',
            name: 'Sameer Khan',
            phone: '7766554433',
            email: 'sameer@example.com',
            course: 'Data Science',
            referredBy: 'Job Fair',
            status: 'NEW',
            counselor: 'Unassigned',
            qualification: 'M.Sc (Stats)',
            nextFollowup: '2026-03-19',
            notes: 'Met at MIT Job Fair. Strong math background.',
            timeline: [{ date: '2026-03-15 14:00', action: 'Event Entry', user: 'Nikita' }]
        },
        {
            id: 'LD1008',
            name: 'Kavita Joshi',
            phone: '6655443322',
            email: 'kavita@example.com',
            course: 'Web Development',
            referredBy: 'LinkedIn',
            status: 'INTERESTED',
            counselor: 'Nikita Patil',
            qualification: 'B.E (EnTC)',
            nextFollowup: '2026-03-19',
            notes: 'Wants to switch to IT. Asked for syllabus.',
            timeline: [{ date: '2026-03-19 09:15', action: 'Document Shared', user: 'Nikita Patil' }]
        },
        {
            id: 'LD1009',
            name: 'Rohan Gupta',
            phone: '5544332211',
            email: 'rohan@example.com',
            course: 'Java Full Stack',
            referredBy: 'Facebook',
            status: 'NOT_INTERESTED',
            counselor: 'Kunal Patil',
            qualification: 'Diploma',
            nextFollowup: '-',
            notes: 'Joined another institute. Fees too high.',
            timeline: [{ date: '2026-03-17 11:00', action: 'Not Interested', user: 'Kunal Patil' }]
        },
        {
            id: 'LD1010',
            name: 'Megha Roy',
            phone: '4433221100',
            email: 'megha@example.com',
            course: 'Data Science',
            referredBy: 'Newspaper Ad',
            status: 'CONTACTED',
            counselor: 'Kunal Patil',
            qualification: 'B.Sc (Math)',
            nextFollowup: '2026-03-17',
            notes: 'Overdue follow-up. Student was out of town.',
            timeline: [{ date: '2026-03-16 16:30', action: 'Call Scheduled', user: 'Kunal Patil' }]
        }
    ];

    let leads = [...mockLeads];
    const pageContext = window.leadPageContext || 'all'; // 'all', 'assigned', 'followups'
    const currentUser = 'Kunal Patil';

    // DOM Elements
    const leadsTableBody = document.getElementById('leadsTableBody');
    const searchInput = document.getElementById('searchInput');
    const statusFilter = document.getElementById('statusFilter');
    const counselorFilter = document.getElementById('counselorFilter');
    const courseFilter = document.getElementById('courseFilter');
    const timeFilter = document.getElementById('timeFilter');
    const noDataMsg = document.getElementById('noDataMsg');

    // Stats Elements
    const statTotal = document.getElementById('stat-total');
    const statNew = document.getElementById('stat-new');
    const statFollowups = document.getElementById('stat-followups');
    const statConverted = document.getElementById('stat-converted');
    const statOverdue = document.getElementById('stat-overdue');

    function init() {
        if (!leadsTableBody) return; // Exit if not on a leads-related page
        renderLeads();
        updateStats();
        setupEventListeners();
        injectModals();
    }

    function renderLeads() {
        const query = (searchInput && searchInput.value.toLowerCase()) || '';
        const status = (statusFilter && statusFilter.value) || '';
        const counselor = (counselorFilter && counselorFilter.value) || '';
        const course = (courseFilter && courseFilter.value) || '';
        const time = (timeFilter && timeFilter.value) || 'all';

        let filteredLeads = leads.filter(lead => {
            const matchesQuery = lead.name.toLowerCase().includes(query) ||
                lead.phone.includes(query) ||
                lead.id.toLowerCase().includes(query);
            const matchesStatus = !status || lead.status === status;
            const matchesCounselor = !counselor || lead.counselor === counselor;
            const matchesCourse = !course || lead.course === course;

            return matchesQuery && matchesStatus && matchesCounselor && matchesCourse;
        });

        // Context Specific Filtering
        if (pageContext === 'assigned') {
            filteredLeads = filteredLeads.filter(l => l.counselor === currentUser);
        } else if (pageContext === 'followups') {
            const today = new Date().toISOString().split('T')[0];
            if (time === 'today') {
                filteredLeads = filteredLeads.filter(l => l.nextFollowup === today);
            } else if (time === 'overdue') {
                filteredLeads = filteredLeads.filter(l => l.nextFollowup < today && l.nextFollowup !== '-');
            } else if (time === 'upcoming') {
                filteredLeads = filteredLeads.filter(l => l.nextFollowup > today);
            }
            // Follow-ups usually only show leads that AREN'T converted or dropped
            filteredLeads = filteredLeads.filter(l => l.status !== 'CONVERTED' && l.status !== 'DROPPED');
        }

        leadsTableBody.innerHTML = '';

        if (filteredLeads.length === 0) {
            noDataMsg.style.display = 'block';
        } else {
            noDataMsg.style.display = 'none';
            filteredLeads.forEach(lead => {
                const tr = document.createElement('tr');
                tr.innerHTML = getRowHTML(lead);
                leadsTableBody.appendChild(tr);
            });
        }
    }

    function getRowHTML(lead) {
        if (pageContext === 'followups') {
            return `
                <td><span class="fw-semibold text-primary">#${lead.id}</span></td>
                <td>${lead.name}</td>
                <td>${lead.phone}</td>
                <td>${lead.timeline[0].action}</td>
                <td><span class="${isOverdue(lead.nextFollowup) ? 'text-danger fw-bold' : ''}">${lead.nextFollowup}</span></td>
                <td><span class="badge ${getStatusBadgeClass(lead.status)} badge-status">${lead.status}</span></td>
                <td>${lead.counselor}</td>
                <td class="text-center">
                    <div class="action-btns">
                        <button class="btn btn-sm btn-outline-info" onclick="viewLead('${lead.id}')" title="View Details"><i class="fa-solid fa-eye"></i></button>
                        <button class="btn btn-sm btn-outline-warning" onclick="updateStatus('${lead.id}')" title="Update Status"><i class="fa-solid fa-pen-to-square"></i></button>
                    </div>
                </td>
            `;
        }

        return `
            <td><span class="fw-semibold text-primary">#${lead.id}</span></td>
            <td>${lead.name}</td>
            <td>${lead.phone}</td>
            <td>${lead.course}</td>
            ${pageContext === 'all' ? `<td>${lead.referredBy}</td>` : ''}
            <td><span class="badge ${getStatusBadgeClass(lead.status)} badge-status">${lead.status}</span></td>
            ${pageContext === 'all' ? `<td>${lead.counselor}</td>` : ''}
            <td>${lead.nextFollowup}</td>
            <td class="text-center text-nowrap">
                <div class="action-btns">
                    <button class="btn btn-sm btn-outline-info" onclick="viewLead('${lead.id}')" title="View"><i class="fa-solid fa-eye"></i></button>
                    ${pageContext === 'followups' ? '' : `<button class="btn btn-sm btn-outline-primary" onclick="assignCounselor('${lead.id}')" title="Assign"><i class="fa-solid fa-user-tag"></i></button>`}
                    <button class="btn btn-sm btn-outline-success" onclick="updateStatus('${lead.id}')" title="Status"><i class="fa-solid fa-arrows-rotate"></i></button>
                    <button class="btn btn-sm btn-outline-warning" onclick="addNotes('${lead.id}')" title="Notes"><i class="fa-solid fa-note-sticky"></i></button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteLead('${lead.id}')" title="Delete"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            </td>
        `;
    }

    function isOverdue(date) {
        if (date === '-') return false;
        const today = new Date().toISOString().split('T')[0];
        return date < today;
    }

    function updateStats() {
        const today = new Date().toISOString().split('T')[0];

        if (pageContext === 'all') {
            statTotal.textContent = leads.length;
            statNew.textContent = leads.filter(l => l.status === 'NEW').length;
            statFollowups.textContent = leads.filter(l => l.nextFollowup === today).length;
            statConverted.textContent = leads.filter(l => l.status === 'CONVERTED').length;
        } else if (pageContext === 'assigned') {
            const myLeads = leads.filter(l => l.counselor === currentUser);
            statTotal.textContent = myLeads.length;
            statNew.textContent = myLeads.filter(l => l.status === 'NEW').length;
            statConverted.textContent = myLeads.filter(l => l.status === 'CONVERTED').length;
        }
    }

    function getStatusBadgeClass(status) {
        switch (status) {
            case 'NEW': return 'badge-new';
            case 'CONTACTED': return 'badge-contacted';
            case 'INTERESTED': return 'badge-interested';
            case 'NOT_INTERESTED': return 'badge-dropped';
            case 'CONVERTED': return 'badge-converted';
            default: return 'bg-secondary text-white';
        }
    }

    function setupEventListeners() {
        if (searchInput) searchInput.addEventListener('input', renderLeads);
        if (statusFilter) statusFilter.addEventListener('change', renderLeads);
        if (counselorFilter) counselorFilter.addEventListener('change', renderLeads);
        if (courseFilter) courseFilter.addEventListener('change', renderLeads);
        if (timeFilter) timeFilter.addEventListener('change', renderLeads);
    }

    function injectModals() {
        const container = document.getElementById('modal-container');
        if (!container) return;

        container.innerHTML = `
            <!-- View Lead Details Modal -->
            <div class="modal fade" id="viewLeadModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title fw-bold">Lead Details: <span id="view-id" class="text-primary"></span></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="row mb-4">
                                <div class="col-md-7">
                                    <h6 class="section-title mb-3 fw-bold text-muted text-uppercase small">Student Information</h6>
                                    <div class="row g-3">
                                        <div class="col-6"><label class="text-muted small d-block">Full Name</label><span id="view-name" class="fw-bold"></span></div>
                                        <div class="col-6"><label class="text-muted small d-block">Phone Number</label><span id="view-phone"></span></div>
                                        <div class="col-6"><label class="text-muted small d-block">Email Address</label><span id="view-email"></span></div>
                                        <div class="col-6"><label class="text-muted small d-block">Qualification</label><span id="view-qual"></span></div>
                                        <div class="col-6"><label class="text-muted small d-block">Interested Course</label><span id="view-course" class="badge bg-light text-dark"></span></div>
                                        <div class="col-6"><label class="text-muted small d-block">Assigned Counselor</label><span id="view-counselor" class="text-primary fw-medium"></span></div>
                                    </div>
                                    <div class="mt-4"><label class="text-muted small d-block">Internal Notes</label><div id="view-notes" class="p-3 bg-light rounded small mt-1"></div></div>
                                </div>
                                <div class="col-md-5 border-start">
                                    <h6 class="section-title mb-3 fw-bold text-muted text-uppercase small">Timeline & Activity</h6>
                                    <ul class="timeline-list small" id="timeline-list"></ul>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between align-items-center pt-3 border-top">
                                <div><label class="text-muted small d-block">Current Status</label><span id="view-status" class="badge badge-status"></span></div>
                                <div><label class="text-muted small d-block">Next Follow-up</label><span id="view-nextFollowup" class="fw-bold text-orange"></span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Assign Counselor Modal -->
            <div class="modal fade" id="assignModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <form id="assignForm">
                            <div class="modal-header"><h5 class="modal-title fw-bold">Assign Counselor</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div class="modal-body p-4"><input type="hidden" id="assign-lead-id">
                                <div class="mb-3"><label class="form-label">Select Counselor</label>
                                    <select id="counselor-select" class="form-select" required>
                                        <option value="">-- Choose Counselor --</option>
                                        <option value="Kunal Patil">Kunal Patil</option>
                                        <option value="Nikita Patil">Nikita Patil</option>
                                        <option value="Aman Deshmukh">Aman Deshmukh</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer border-0"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-primary">Save Assignment</button></div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Update Status Modal -->
            <div class="modal fade" id="updateStatusModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <form id="updateStatusForm">
                            <div class="modal-header"><h5 class="modal-title fw-bold">Update Lead Status</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div class="modal-body p-4"><input type="hidden" id="update-lead-id">
                                <div class="mb-3"><label class="form-label">New Status</label>
                                    <select id="status-select" class="form-select" required>
                                        <option value="NEW">New</option>
                                        <option value="CONTACTED">Contacted</option>
                                        <option value="INTERESTED">Interested</option>
                                        <option value="NOT_INTERESTED">Not Interested</option>
                                        <option value="CONVERTED">Converted / Admitted</option>
                                    </select>
                                </div>
                                <div class="mb-3"><label class="form-label">Next Follow-up Date</label><input type="date" class="form-control" id="followup-date"></div>
                            </div>
                            <div class="modal-footer border-0"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-primary">Update Status</button></div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Add Notes Modal -->
            <div class="modal fade" id="addNotesModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <form id="addNotesForm">
                            <div class="modal-header"><h5 class="modal-title fw-bold">Add Note</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
                            <div class="modal-body p-4"><input type="hidden" id="notes-lead-id">
                                <div class="mb-3"><label class="form-label">Note Content</label><textarea id="note-text" class="form-control" rows="4" placeholder="Type your note here..." required></textarea></div>
                            </div>
                            <div class="modal-footer border-0"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button type="submit" class="btn btn-primary">Add Note</button></div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        // Setup form submissions AFTER injection
        const assignForm = document.getElementById('assignForm');
        if (assignForm) {
            assignForm.onsubmit = function (e) {
                e.preventDefault();
                const id = document.getElementById('assign-lead-id').value;
                const counselor = document.getElementById('counselor-select').value;
                const lead = leads.find(l => l.id === id);
                if (lead) {
                    lead.counselor = counselor;
                    lead.timeline.unshift({ date: new Date().toISOString().split('T')[0], action: `Assigned to ${counselor}`, user: 'Admin' });
                    renderLeads();
                    bootstrap.Modal.getInstance(document.getElementById('assignModal')).hide();
                }
            };
        }

        const updateStatusForm = document.getElementById('updateStatusForm');
        if (updateStatusForm) {
            updateStatusForm.onsubmit = function (e) {
                e.preventDefault();
                const id = document.getElementById('update-lead-id').value;
                const status = document.getElementById('status-select').value;
                const lead = leads.find(l => l.id === id);
                if (lead) {
                    lead.status = status;
                    lead.timeline.unshift({ date: new Date().toISOString().split('T')[0], action: `Status updated to ${status}`, user: 'Admin' });
                    renderLeads();
                    updateStats();
                    bootstrap.Modal.getInstance(document.getElementById('updateStatusModal')).hide();
                }
            };
        }
        const addNotesForm = document.getElementById('addNotesForm');
        if (addNotesForm) {
            addNotesForm.onsubmit = function (e) {
                e.preventDefault();
                const id = document.getElementById('notes-lead-id').value;
                const note = document.getElementById('note-text').value;
                const lead = leads.find(l => l.id === id);
                if (lead) {
                    lead.notes = lead.notes ? lead.notes + '\n' + note : note;
                    lead.timeline.unshift({ date: new Date().toISOString().split('T')[0], action: `Note added: ${note}`, user: 'Admin' });
                    renderLeads();
                    bootstrap.Modal.getInstance(document.getElementById('addNotesModal')).hide();
                }
            };
        }

        // Delete Confirmation Modal
        const deleteConfirmModal = `
            <div class="modal fade" id="deleteLeadModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content">
                        <div class="modal-body p-4 text-center">
                            <i class="fa-solid fa-trash-can fa-4x text-danger mb-3"></i>
                            <h5 class="fw-bold">Delete Lead?</h5>
                            <p class="text-muted small">Are you sure you want to remove this lead record? This process cannot be undone.</p>
                            <input type="hidden" id="delete-lead-id">
                            <div class="d-grid gap-2 mt-4">
                                <button type="button" class="btn btn-danger" id="confirmDeleteLead">Delete</button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', deleteConfirmModal);

        if (document.getElementById('confirmDeleteLead')) {
            document.getElementById('confirmDeleteLead').onclick = function () {
                const id = document.getElementById('delete-lead-id').value;
                const index = leads.findIndex(l => l.id === id);
                if (index !== -1) {
                    leads.splice(index, 1);
                    renderLeads();
                    updateStats();
                    bootstrap.Modal.getInstance(document.getElementById('deleteLeadModal')).hide();
                }
            };
        }
        // Form handlers omission end (closing injectModals)
    }

    // Global Action Functions
    window.viewLead = function (id) {
        const lead = leads.find(l => l.id === id);
        if (!lead) return;

        document.getElementById('view-id').innerText = lead.id;
        document.getElementById('view-name').innerText = lead.name;
        document.getElementById('view-phone').innerText = lead.phone;
        document.getElementById('view-email').innerText = lead.email || 'N/A';
        document.getElementById('view-course').innerText = lead.course;
        document.getElementById('view-qual').innerText = lead.qualification || 'N/A';
        document.getElementById('view-status').innerText = lead.status;
        const statusBadge = document.getElementById('view-status');
        statusBadge.className = 'badge badge-status ' + getStatusBadgeClass(lead.status);

        document.getElementById('view-counselor').innerText = lead.counselor;
        document.getElementById('view-nextFollowup').innerText = lead.nextFollowup;
        document.getElementById('view-notes').innerText = lead.notes || 'No notes available.';

        // Timeline
        const timelineList = document.getElementById('timeline-list');
        timelineList.innerHTML = '';
        lead.timeline.forEach(item => {
            const li = document.createElement('li');
            li.className = 'timeline-item mb-3';
            li.innerHTML = `
                <div class="d-flex justify-content-between">
                    <span class="fw-bold">${item.action}</span>
                    <span class="text-muted small">${item.date}</span>
                </div>
                <div class="text-muted small">By: ${item.user}</div>
            `;
            timelineList.appendChild(li);
        });

        const modal = new bootstrap.Modal(document.getElementById('viewLeadModal'));
        modal.show();
    };

    window.assignCounselor = function (id) {
        document.getElementById('assign-lead-id').value = id;
        const modal = new bootstrap.Modal(document.getElementById('assignModal'));
        modal.show();
    };

    window.updateStatus = function (id) {
        const lead = leads.find(l => l.id === id);
        if (!lead) return;
        document.getElementById('update-lead-id').value = id;
        document.getElementById('status-select').value = lead.status;
        const modal = new bootstrap.Modal(document.getElementById('updateStatusModal'));
        modal.show();
    };

    window.addNotes = function (id) {
        document.getElementById('notes-lead-id').value = id;
        const modal = new bootstrap.Modal(document.getElementById('addNotesModal'));
        modal.show();
    };

    window.deleteLead = function (id) {
        document.getElementById('delete-lead-id').value = id;
        const modal = new bootstrap.Modal(document.getElementById('deleteLeadModal'));
        modal.show();
    };

    init();
});
