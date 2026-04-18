document.addEventListener('DOMContentLoaded', function () {
    // Mock Data for Converted Students
    const mockStudents = [
        { id: 'STD001', name: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '9876543210', course: 'Full Stack Java', conversionDate: '2025-02-10', feesPaid: '₹45,000', totalFees: '₹45,000', counselor: 'Kunal Patil', partner: 'ABC College', status: 'ADMITTED' },
        { id: 'STD002', name: 'Priya Verma', email: 'priya.v@example.com', phone: '8765432109', course: 'Data Science', conversionDate: '2025-02-15', feesPaid: '₹35,000', totalFees: '₹55,000', counselor: 'Nikita Patil', partner: 'Direct', status: 'PARTIAL' },
        { id: 'STD003', name: 'Amit Singh', email: 'amit.s@example.com', phone: '7654321098', course: 'UI/UX Design', conversionDate: '2025-03-01', feesPaid: '₹25,000', totalFees: '₹25,000', counselor: 'Aman Deshmukh', partner: 'XYZ Academy', status: 'ADMITTED' },
        { id: 'STD004', name: 'Sneha Rao', email: 'sneha.r@example.com', phone: '6543210987', course: 'Python Masterclass', conversionDate: '2025-03-05', feesPaid: '₹12,000', totalFees: '₹12,000', counselor: 'Nikita Patil', partner: 'Direct', status: 'COMPLETED' },
        { id: 'STD005', name: 'Vikram Malhotra', email: 'vikram.m@example.com', phone: '9988776655', course: 'Full Stack Java', conversionDate: '2025-03-12', feesPaid: '₹10,000', totalFees: '₹45,000', counselor: 'Kunal Patil', partner: 'ABC College', status: 'ADMITTED' }
    ];

    let students = JSON.parse(localStorage.getItem('rtts_converted_students')) || [...mockStudents];

    function persistStudents() {
        localStorage.setItem('rtts_converted_students', JSON.stringify(students));
    }

    // DOM Elements
    const studentTableBody = document.getElementById('studentTableBody');
    const studentSearchInput = document.getElementById('studentSearchInput');
    const statusFilter = document.getElementById('statusFilter');
    const courseFilter = document.getElementById('courseFilter');
    const noDataMsg = document.getElementById('noDataMsg');

    // Stats Elements
    const statTotal = document.getElementById('stat-total-conversions');
    const statRevenue = document.getElementById('stat-total-revenue');
    const statNew = document.getElementById('stat-new-conversions');

    function init() {
        if (!studentTableBody) return;
        renderStudents();
        updateStats();
        setupEventListeners();
        injectModals();
    }

    function renderStudents() {
        const query = (studentSearchInput && studentSearchInput.value.toLowerCase()) || '';
        const status = (statusFilter && statusFilter.value) || '';
        const course = (courseFilter && courseFilter.value) || '';

        let filteredStudents = students.filter(student => {
            const matchesQuery = student.name.toLowerCase().includes(query) ||
                student.id.toLowerCase().includes(query) ||
                student.email.toLowerCase().includes(query) ||
                student.course.toLowerCase().includes(query);
            const matchesStatus = !status || student.status === status;
            const matchesCourse = !course || student.course === course;

            return matchesQuery && matchesStatus && matchesCourse;
        });

        studentTableBody.innerHTML = '';
        if (filteredStudents.length === 0) {
            noDataMsg.style.display = 'block';
        } else {
            noDataMsg.style.display = 'none';
            filteredStudents.forEach(student => {
                const tr = document.createElement('tr');
                tr.innerHTML = getRowHTML(student);
                studentTableBody.appendChild(tr);
            });
        }
    }

    function getRowHTML(student) {
        const statusClass = getStatusClass(student.status);
        return `
            <td><span class="fw-semibold text-primary">#${student.id}</span></td>
            <td>
                <div class="fw-medium">${student.name}</div>
                <div class="small text-muted">${student.email}</div>
            </td>
            <td>
                <div class="fw-medium">${student.course}</div>
                <div class="small text-muted">Joined: ${student.conversionDate}</div>
            </td>
            <td>
                <div class="fw-bold text-success">${student.feesPaid}</div>
                <div class="small text-muted">Total: ${student.totalFees}</div>
            </td>
            <td>
                <div class="small">By: ${student.counselor}</div>
                <div class="small text-muted">Src: ${student.partner}</div>
            </td>
            <td><span class="badge ${statusClass}">${student.status}</span></td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary" onclick="viewStudent('${student.id}')"><i class="fa-solid fa-eye"></i></button>
            </td>
        `;
    }

    function getStatusClass(status) {
        switch (status) {
            case 'ADMITTED': return 'bg-success';
            case 'PARTIAL': return 'bg-warning text-dark';
            case 'COMPLETED': return 'bg-info';
            case 'DROPPED': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    function updateStats() {
        if (!statTotal) return;
        statTotal.textContent = students.length;

        const totalRevenue = students.reduce((acc, curr) => {
            const val = parseInt(curr.feesPaid.replace('₹', '').replace(',', '')) || 0;
            return acc + val;
        }, 0);
        if (statRevenue) statRevenue.textContent = '₹' + totalRevenue.toLocaleString('en-IN');

        const thisMonth = new Date().toISOString().substring(0, 7);
        const newThisMonth = students.filter(s => s.conversionDate.startsWith(thisMonth)).length;
        if (statNew) statNew.textContent = newThisMonth;
    }

    function setupEventListeners() {
        if (studentSearchInput) studentSearchInput.addEventListener('input', renderStudents);
        if (statusFilter) statusFilter.addEventListener('change', renderStudents);
        if (courseFilter) courseFilter.addEventListener('change', renderStudents);
    }

    function injectModals() {
        // Any specific modals for converted students can be injected here
    }

    window.viewStudent = function (id) {
        const student = students.find(s => s.id === id);
        if (!student) return;

        const paid = parseInt(student.feesPaid.replace('₹', '').replace(',', '')) || 0;
        const total = parseInt(student.totalFees.replace('₹', '').replace(',', '')) || 0;
        const remaining = total - paid;
        const percent = Math.round((paid / total) * 100) || 0;

        const modalHtml = `
            <div class="modal fade" id="studentDetailModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg overflow-hidden">
                        <div class="modal-header bg-primary text-white p-4 border-0">
                            <div class="d-flex align-items-center gap-3 w-100">
                                <div class="avatar-holder bg-white text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 50px; height: 50px; font-size: 1.25rem;">
                                    ${student.name.charAt(0)}
                                </div>
                                <div class="flex-grow-1">
                                    <h5 class="modal-title fw-bold text-white mb-0" id="vStudentName">${student.name}</h5>
                                    <span class="small opacity-75">${student.course}</span>
                                </div>
                                <span class="badge ${getStatusClass(student.status)} border border-white border-opacity-25 px-3 py-2">
                                    ${student.status}
                                </span>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div class="modal-body p-0">
                            <div class="row g-0">
                                <!-- Info Section -->
                                <div class="col-md-7 p-4 bg-white">
                                    <h6 class="text-uppercase small fw-black text-muted mb-4 opacity-50 letter-spacing-1">Candidate Overview</h6>
                                    
                                    <div class="row g-4 mb-4">
                                        <div class="col-6">
                                            <div class="tiny text-muted uppercase fw-bold mb-1">Student ID</div>
                                            <div class="fw-bold text-primary">#${student.id}</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="tiny text-muted uppercase fw-bold mb-1">Admission Date</div>
                                            <div class="fw-bold">${student.conversionDate}</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="tiny text-muted uppercase fw-bold mb-1">Email Address</div>
                                            <div class="fw-medium">${student.email}</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="tiny text-muted uppercase fw-bold mb-1">Contact Number</div>
                                            <div class="fw-medium">+91 ${student.phone}</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="tiny text-muted uppercase fw-bold mb-1">Assigned Counselor</div>
                                            <div class="fw-medium text-info"><i class="fa-solid fa-user-tie me-1"></i> ${student.counselor}</div>
                                        </div>
                                        <div class="col-6">
                                            <div class="tiny text-muted uppercase fw-bold mb-1">Referral Source</div>
                                            <div class="fw-medium">${student.partner}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                                        <i class="fa-solid fa-circle-check text-success fa-2x"></i>
                                        <div>
                                            <div class="fw-bold small">Direct Admission Confirmed</div>
                                            <div class="tiny text-muted">All documents are verified and uploaded.</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Financial Section -->
                                <div class="col-md-5 p-4 bg-light border-start">
                                    <h6 class="text-uppercase small fw-black text-muted mb-4 opacity-50 letter-spacing-1">Fee Statement</h6>
                                    
                                    <div class="mb-4">
                                        <div class="d-flex justify-content-between mb-2">
                                            <span class="small fw-bold">Payment Progress</span>
                                            <span class="small fw-bold text-primary">${percent}%</span>
                                        </div>
                                        <div class="progress" style="height: 8px; border-radius: 10px; background: rgba(0,0,0,0.05);">
                                            <div class="progress-bar bg-primary" role="progressbar" style="width: ${percent}%"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="financial-card mb-4">
                                        <div class="d-flex justify-content-between py-2 border-bottom border-dashed">
                                            <span class="small text-muted">Course Value</span>
                                            <span class="fw-bold">${student.totalFees}</span>
                                        </div>
                                        <div class="d-flex justify-content-between py-2 border-bottom border-dashed text-success fw-bold">
                                            <span class="small">Received Amount</span>
                                            <span>${student.feesPaid}</span>
                                        </div>
                                        <div class="d-flex justify-content-between py-3 text-danger fw-black h5 mb-0">
                                            <span>Outstanding</span>
                                            <span>₹${remaining.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                    
                                    <div class="d-grid gap-2">
                                        <button class="btn btn-primary py-2 fw-bold"><i class="fa-solid fa-receipt me-2"></i>Send Fee Receipt</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const container = document.getElementById('viewStudentModalContainer');
        if (container) {
            container.innerHTML = modalHtml;
            const modal = new bootstrap.Modal(document.getElementById('studentDetailModal'));
            modal.show();
        }
    };

    init();
});
