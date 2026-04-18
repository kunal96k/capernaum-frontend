document.addEventListener('DOMContentLoaded', function () {
    // Mock Data with Login Credentials
    const mockUsers = [
        // Admins
        { id: 'ADM001', name: 'Super Admin', email: 'admin@rtts.com', phone: '9999999999', role: 'Super Admin', status: 'ACTIVE', joinedDate: '2025-01-01', type: 'admins', username: 'superadmin', password: 'password123', access: ['All Modules'] },
        { id: 'ADM002', name: 'System Manager', email: 'manager@rtts.com', phone: '9988776655', role: 'Manager', status: 'ACTIVE', joinedDate: '2025-02-15', type: 'admins', username: 'sysmanager', password: 'password123', access: ['Lead Management', 'Reports'] },
        { id: 'ADM003', name: 'Support Staff', email: 'support@rtts.com', phone: '8877665544', role: 'Admin', status: 'INACTIVE', joinedDate: '2025-03-10', type: 'admins', username: 'support_staff', password: 'password123', access: ['Lead Management'] },

        // Counselors
        { id: 'CNS001', name: 'Kunal Patil', email: 'kunal@rtts.com', phone: '9876543210', assignedLeads: 45, conversion: '78%', status: 'ACTIVE', joinedDate: '2025-01-10', type: 'counselors', username: 'kunal_patil', password: 'password123', access: ['Counselor Module'] },
        { id: 'CNS002', name: 'Nikita Patil', email: 'nikita@rtts.com', phone: '8765432109', assignedLeads: 38, conversion: '82%', status: 'ACTIVE', joinedDate: '2025-01-20', type: 'counselors', username: 'nikita_patil', password: 'password123', access: ['Counselor Module'] },
        { id: 'CNS003', name: 'Aman Deshmukh', email: 'aman@rtts.com', phone: '7654321098', assignedLeads: 12, conversion: '45%', status: 'ACTIVE', joinedDate: '2026-03-01', type: 'counselors', username: 'aman_d', password: 'password123', access: ['Counselor Module'] },

        // Partners
        { id: 'PRT001', name: 'ABC College Pune', type: 'Agency', phone: '020-223344', earnings: '₹45,000', status: 'ACTIVE', joinedDate: '2025-01-01', type_cat: 'partners', username: 'abc_college', password: 'password123', access: ['Partner Portal'] },
        { id: 'PRT002', name: 'XYZ Academics', type: 'Individual', phone: '9855544433', earnings: '₹12,500', status: 'PENDING', joinedDate: '2026-03-15', type_cat: 'partners', username: 'xyz_aca', password: 'password123', access: ['Partner Portal'] }
    ];

    let users = JSON.parse(localStorage.getItem('rtts_users')) || [...mockUsers];
    const pageContext = window.userPageContext || 'admins';

    function persistUsers() {
        localStorage.setItem('rtts_users', JSON.stringify(users));
    }

    // DOM Elements
    const userTableBody = document.getElementById('userTableBody');
    const userSearchInput = document.getElementById('userSearchInput');
    const statusFilter = document.getElementById('statusFilter');
    const noDataMsg = document.getElementById('noDataMsg');

    // Stats Elements
    const statTotal = document.getElementById('stat-total-users');
    const statActive = document.getElementById('stat-active-users');
    const statInactive = document.getElementById('stat-inactive-users');
    const statNew = document.getElementById('stat-new-users');

    window.addUser = function () {
        const modalElement = document.getElementById('addUserModal');
        if (modalElement) {
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        }
    };

    function init() {
        if (!userTableBody) return;
        renderUsers();
        updateStats();
        setupEventListeners();
        injectModals();
    }

    function renderUsers() {
        const query = (userSearchInput && userSearchInput.value.toLowerCase()) || '';
        const status = (statusFilter && statusFilter.value) || '';

        let filteredUsers = users.filter(user => {
            if (pageContext === 'admins' && user.type !== 'admins') return false;
            if (pageContext === 'counselors' && user.type !== 'counselors') return false;
            if (pageContext === 'partners' && user.type_cat !== 'partners') return false;

            const matchesQuery = user.name.toLowerCase().includes(query) ||
                user.id.toLowerCase().includes(query) ||
                (user.email && user.email.toLowerCase().includes(query)) ||
                (user.username && user.username.toLowerCase().includes(query));
            const matchesStatus = !status || user.status === status;

            return matchesQuery && matchesStatus;
        });

        userTableBody.innerHTML = '';
        if (filteredUsers.length === 0) {
            noDataMsg.style.display = 'block';
        } else {
            noDataMsg.style.display = 'none';
            filteredUsers.forEach(user => {
                const tr = document.createElement('tr');
                tr.innerHTML = getRowHTML(user);
                userTableBody.appendChild(tr);
            });
        }
    }

    function getRowHTML(user) {
        const isLocked = user.locked || false;
        const statusBadge = `<span class="badge ${getStatusBadgeClass(user.status)} badge-status">${user.status}</span>`;
        const lockBadge = isLocked ? `<span class="badge bg-danger ms-1" style="font-size: 10px; padding: 2px 4px;" title="Account Locked"><i class="fa-solid fa-lock"></i></span>` : '';
        
        const commonActions = `
            <div class="d-flex gap-2 justify-content-end">
                <button class="action-btn btn-view" onclick="viewUser('${user.id}')" title="View Details"><i class="fa-solid fa-eye"></i></button>
                <button class="action-btn btn-edit" onclick="editUser('${user.id}')" title="Edit Profile"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="action-btn btn-info" onclick="sendCredentials('${user.id}')" title="Send Login Credentials"><i class="fa-solid fa-paper-plane"></i></button>
                <button class="action-btn ${isLocked ? 'btn-danger text-white' : 'btn-lock'}" onclick="toggleLock('${user.id}')" title="${isLocked ? 'Unlock Account' : 'Lock Account'}">
                    <i class="fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}"></i>
                </button>
                <button class="action-btn btn-warning text-white" onclick="resetPasswordModal('${user.id}')" title="Reset Password"><i class="fa-solid fa-key"></i></button>
                <button class="action-btn btn-del" onclick="deleteUser('${user.id}')" title="Delete User"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        if (pageContext === 'admins') {
            return `
                <td><span class="fw-semibold text-primary">#${user.id}</span></td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="user-avatar-sm bg-light text-primary d-flex align-items-center justify-content-center rounded-circle me-2" style="width: 32px; height: 32px; font-size: 11px; font-weight: bold;">
                            ${user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <div class="fw-medium">${user.name}</div>
                            <div class="small text-muted">@${user.username}</div>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="small text-muted">${user.email}</div>
                    <div class="small text-muted">${user.phone}</div>
                </td>
                <td><span class="text-secondary small fw-medium">${user.role}</span></td>
                <td>${statusBadge}${lockBadge}</td>
                <td class="text-end text-nowrap">${commonActions}</td>
            `;
        } else if (pageContext === 'counselors') {
            return `
                <td><span class="fw-semibold text-primary">#${user.id}</span></td>
                <td>
                    <div class="fw-medium">${user.name}</div>
                    <div class="small text-muted">@${user.username}</div>
                </td>
                <td><span class="badge bg-light text-primary px-3">${user.assignedLeads} Leads</span></td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="progress flex-grow-1 me-2" style="height: 6px; width: 60px;">
                            <div class="progress-bar bg-success" style="width: ${user.conversion}"></div>
                        </div>
                        <span class="small fw-bold">${user.conversion}</span>
                    </div>
                </td>
                <td>${statusBadge}${lockBadge}</td>
                <td class="text-end text-nowrap">${commonActions}</td>
            `;
        } else if (pageContext === 'partners') {
            return `
                <td><span class="fw-semibold text-primary">#${user.id}</span></td>
                <td>
                    <div class="fw-medium">${user.name}</div>
                    <div class="small text-muted">@${user.username}</div>
                </td>
                <td><span class="badge bg-soft-info text-info">${user.type}</span></td>
                <td><div class="small text-muted">${user.phone}</div></td>
                <td><span class="fw-bold text-success">${user.earnings}</span></td>
                <td>${statusBadge}${lockBadge}</td>
                <td class="text-end text-nowrap">${commonActions}</td>
            `;
        }
    }

    function getStatusBadgeClass(status) {
        switch (status) {
            case 'ACTIVE': return 'badge-converted'; 
            case 'INACTIVE': return 'badge-dropped'; 
            case 'PENDING': return 'badge-followup'; 
            default: return 'bg-secondary text-white';
        }
    }

    function updateStats() {
        const today = new Date();
        const thisMonth = today.toISOString().substring(0, 7);

        let contextUsers = [];
        if (pageContext === 'admins') contextUsers = users.filter(u => u.type === 'admins');
        else if (pageContext === 'counselors') contextUsers = users.filter(u => u.type === 'counselors');
        else if (pageContext === 'partners') contextUsers = users.filter(u => u.type_cat === 'partners');

        if (statTotal) statTotal.textContent = contextUsers.length;
        if (statActive) statActive.textContent = contextUsers.filter(u => u.status === 'ACTIVE').length;
        if (statInactive) {
            if (pageContext === 'counselors') statInactive.textContent = '78%'; 
            else statInactive.textContent = contextUsers.filter(u => u.status !== 'ACTIVE').length;
        }
        if (statNew) {
            if (pageContext === 'partners') statNew.textContent = '₹65,500';
            else statNew.textContent = contextUsers.filter(u => u.joinedDate.startsWith(thisMonth)).length;
        }
    }

    function setupEventListeners() {
        if (userSearchInput) userSearchInput.addEventListener('input', renderUsers);
        if (statusFilter) statusFilter.addEventListener('change', renderUsers);
    }

    function injectModals() {
        const container = document.getElementById('user-modal-container');
        if (!container) return;

        container.innerHTML = `
            <!-- Add User Modal -->
            <div class="modal fade" id="addUserModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content shadow-lg border-0">
                        <form id="addUserForm">
                            <div class="modal-header bg-primary text-white">
                                <h5 class="modal-title fw-bold text-white"><i class="fa-solid fa-user-plus me-2 text-white"></i>Create New Account</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div class="row g-3">
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Full Name</label>
                                        <input type="text" id="add-user-name" class="form-control" placeholder="Enter full name" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Email Address</label>
                                        <input type="email" id="add-user-email" class="form-control" placeholder="example@rtts.com" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Phone Number</label>
                                        <input type="tel" id="add-user-phone" class="form-control" placeholder="Enter phone" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold font-primary">Username</label>
                                        <input type="text" id="add-user-username" class="form-control" placeholder="Choose username" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Password</label>
                                        <input type="password" id="add-user-password" class="form-control" placeholder="Create password" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Confirm Password</label>
                                        <input type="password" id="add-user-confirm" class="form-control" placeholder="Confirm password" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Status</label>
                                        <select id="add-user-status" class="form-select">
                                            <option value="ACTIVE">Active</option>
                                            <option value="INACTIVE">Inactive</option>
                                        </select>
                                    </div>
                                    ${pageContext === 'admins' ? `
                                    <div class="col-md-6">
                                        <label class="form-label fw-bold">Role & Permissions</label>
                                        <select id="add-user-role" class="form-select">
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Super Admin">Super Admin</option>
                                        </select>
                                    </div>
                                    ` : ''}
                                    <div class="col-12 mt-4">
                                        <div class="alert alert-info py-2">
                                            <small><i class="fa-solid fa-circle-info me-2"></i>New accounts will have <strong>${pageContext === 'partners' ? 'Partner Portal' : (pageContext === 'counselors' ? 'Counselor Module' : 'System Access')}</strong> enabled by default.</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer border-top-0 p-4 pt-0">
                                <button type="button" class="btn btn-secondary px-4" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary px-4"><i class="fa-solid fa-check-circle me-2"></i>Create User</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Edit User Modal -->
            <div class="modal fade" id="editUserModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content shadow-lg">
                        <form id="editUserForm">
                            <input type="hidden" id="edit-user-id-hidden">
                            <div class="modal-header">
                                <h5 class="modal-title fw-bold">Update Account Info</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4">
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Full Name</label>
                                    <input type="text" id="edit-user-name" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Email</label>
                                    <input type="email" id="edit-user-email" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Phone</label>
                                    <input type="tel" id="edit-user-phone" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Username</label>
                                    <input type="text" id="edit-user-username" class="form-control" required>
                                </div>
                                <div class="mb-3">
                                    <label class="form-label fw-bold">Status</label>
                                    <select id="edit-user-status" class="form-select">
                                        <option value="ACTIVE">Active</option>
                                        <option value="INACTIVE">Inactive</option>
                                        <option value="PENDING">Pending</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary px-4">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Reset Password Modal -->
            <div class="modal fade" id="resetPasswordModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content shadow-lg border-0">
                        <form id="resetPasswordForm">
                            <div class="modal-header bg-warning">
                                <h5 class="modal-title fw-bold"><i class="fa-solid fa-key me-2"></i>Reset User Password</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-4 text-center">
                                <div class="user-avatar-sm bg-light text-warning mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle" style="width: 50px; height: 50px;">
                                    <i class="fa-solid fa-lock fa-lg"></i>
                                </div>
                                <h6 id="reset-user-display" class="fw-bold mb-4">Resetting for: Aman Sharma</h6>
                                <input type="hidden" id="reset-user-id-hidden">
                                <div class="text-start mb-3">
                                    <label class="form-label fw-bold small">New Password</label>
                                    <input type="password" id="new-password" class="form-control" placeholder="Enter new password" required minlength="6">
                                </div>
                                <div class="text-start">
                                    <label class="form-label fw-bold small">Confirm New Password</label>
                                    <input type="password" id="confirm-new-password" class="form-control" placeholder="Confirm new password" required>
                                </div>
                            </div>
                            <div class="modal-footer border-0">
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-warning px-4">Update Password</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <!-- View User Modal -->
            <div class="modal fade" id="viewUserModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow-lg">
                        <div class="modal-header bg-light">
                            <h5 class="modal-title fw-bold">Account Profile</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-4">
                            <div class="text-center mb-4">
                                <div id="view-user-avatar" class="user-avatar-lg bg-light text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-3" style="width: 80px; height: 80px; font-size: 28px; font-weight: bold; border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
                                    JD
                                </div>
                                <h4 id="view-user-name" class="fw-bold mb-1">John Doe</h4>
                                <div id="view-user-username" class="badge bg-secondary mb-2">@johndoe</div>
                                <p id="view-user-role" class="text-muted small">Super Admin</p>
                            </div>
                            <div class="row g-3">
                                <div class="col-6">
                                    <label class="text-muted small d-block">User ID</label>
                                    <span id="view-user-id" class="fw-medium text-dark">#ADM001</span>
                                </div>
                                <div class="col-6">
                                    <label class="text-muted small d-block">Status</label>
                                    <span id="view-user-status" class="badge">ACTIVE</span>
                                </div>
                                <div class="col-12">
                                    <label class="text-muted small d-block">Login Credentials</label>
                                    <div class="p-2 bg-light rounded d-flex justify-content-between align-items-center">
                                        <code id="view-user-login-info">User: superadmin | Pwd: ********</code>
                                        <button class="btn btn-xs btn-link text-decoration-none" onclick="togglePasswordView()"><i class="fa-solid fa-eye-low-vision"></i></button>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <label class="text-muted small d-block">Module Access</label>
                                    <div id="view-user-access">
                                        <span class="badge bg-soft-primary text-primary me-1">Lead Management</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <label class="text-muted small d-block">Email</label>
                                    <span id="view-user-email" class="fw-medium text-dark small">admin@rtts.com</span>
                                </div>
                                <div class="col-6">
                                    <label class="text-muted small d-block">Phone</label>
                                    <span id="view-user-phone" class="fw-medium text-dark small">9999999999</span>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer border-0">
                            <button type="button" class="btn btn-secondary px-4 w-100" data-bs-dismiss="modal">Close Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Delete Confirmation Modal -->
            <div class="modal fade" id="deleteUserModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-sm">
                    <div class="modal-content border-0 shadow-lg">
                        <div class="modal-body p-4 text-center">
                            <div class="mb-3 text-danger"><i class="fa-solid fa-circle-exclamation fa-4x"></i></div>
                            <h5 class="fw-bold">Delete Account?</h5>
                            <p class="text-muted small">All data linked to <strong id="delete-user-name-display">this user</strong> will be permanently removed. This action is irreversible.</p>
                            <input type="hidden" id="delete-user-id-hidden">
                            <div class="d-grid gap-2 mt-4">
                                <button type="button" class="btn btn-danger py-2" id="confirmDeleteBtn">Permanently Delete</button>
                                <button type="button" class="btn btn-light" data-bs-dismiss="modal">Keep Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add Forms Event Handlers
        if (document.getElementById('addUserForm')) {
            document.getElementById('addUserForm').onsubmit = function (e) {
                e.preventDefault();
                const pass = document.getElementById('add-user-password').value;
                const confirm = document.getElementById('add-user-confirm').value;

                if (pass !== confirm) {
                    alert('Passwords do not match!');
                    return;
                }

                const newUser = {
                    id: (pageContext === 'admins' ? 'ADM' : (pageContext === 'counselors' ? 'CNS' : 'PRT')) + Math.floor(100 + Math.random() * 900),
                    name: document.getElementById('add-user-name').value,
                    email: document.getElementById('add-user-email').value,
                    phone: document.getElementById('add-user-phone').value,
                    username: document.getElementById('add-user-username').value,
                    password: pass,
                    status: document.getElementById('add-user-status').value,
                    joinedDate: new Date().toISOString().split('T')[0],
                    type: pageContext === 'partners' ? undefined : pageContext,
                    type_cat: pageContext === 'partners' ? 'partners' : undefined,
                    access: pageContext === 'admins' ? ['All Modules'] : (pageContext === 'counselors' ? ['Counselor Module'] : ['Partner Portal'])
                };

                if (pageContext === 'admins') newUser.role = document.getElementById('add-user-role').value;
                else if (pageContext === 'counselors') {
                    newUser.assignedLeads = 0;
                    newUser.conversion = '0%';
                } else {
                    newUser.type = 'Agency';
                    newUser.earnings = '₹0';
                }

                users.push(newUser);
                persistUsers();
                renderUsers();
                updateStats();
                bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
                e.target.reset();
                showToast('Success', 'account created successfully');
            };
        }

        if (document.getElementById('editUserForm')) {
            document.getElementById('editUserForm').onsubmit = function (e) {
                e.preventDefault();
                const id = document.getElementById('edit-user-id-hidden').value;
                const idx = users.findIndex(u => u.id === id);
                if (idx > -1) {
                    users[idx].name = document.getElementById('edit-user-name').value;
                    users[idx].email = document.getElementById('edit-user-email').value;
                    users[idx].phone = document.getElementById('edit-user-phone').value;
                    users[idx].username = document.getElementById('edit-user-username').value;
                    users[idx].status = document.getElementById('edit-user-status').value;
                    persistUsers();
                    renderUsers();
                    updateStats();
                    bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
                    showToast('Updated', 'Profile info saved');
                }
            };
        }

        if (document.getElementById('resetPasswordForm')) {
            document.getElementById('resetPasswordForm').onsubmit = function (e) {
                e.preventDefault();
                const pass = document.getElementById('new-password').value;
                const confirm = document.getElementById('confirm-new-password').value;
                if (pass !== confirm) { alert('Passwords mismatch!'); return; }
                const id = document.getElementById('reset-user-id-hidden').value;
                const user = users.find(u => u.id === id);
                if (user) {
                    user.password = pass;
                    persistUsers();
                    bootstrap.Modal.getInstance(document.getElementById('resetPasswordModal')).hide();
                    showToast('Key Updated', 'Password reset successfully');
                }
            };
        }

        if (document.getElementById('confirmDeleteBtn')) {
            document.getElementById('confirmDeleteBtn').onclick = function () {
                const id = document.getElementById('delete-user-id-hidden').value;
                users = users.filter(u => u.id !== id);
                persistUsers();
                renderUsers();
                updateStats();
                bootstrap.Modal.getInstance(document.getElementById('deleteUserModal')).hide();
                showToast('Deleted', 'User removed from system');
            };
        }
    }

    // Global Actions
    window.viewUser = function (id) {
        const user = users.find(u => u.id === id);
        if (!user) return;
        document.getElementById('view-user-id').textContent = '#' + user.id;
        document.getElementById('view-user-name').textContent = user.name;
        document.getElementById('view-user-username').textContent = '@' + user.username;
        document.getElementById('view-user-role').textContent = user.role || (user.type === 'counselors' ? 'Counselor' : 'Referral Partner');
        document.getElementById('view-user-email').textContent = user.email;
        document.getElementById('view-user-phone').textContent = user.phone;
        const statusEl = document.getElementById('view-user-status');
        statusEl.textContent = user.status;
        statusEl.className = 'badge ' + getStatusBadgeClass(user.status);
        document.getElementById('view-user-avatar').textContent = user.name.split(' ').map(n => n[0]).join('');
        document.getElementById('view-user-login-info').innerHTML = `User: <strong>${user.username}</strong> | Pwd: <span id="pwd-stars">********</span><input type="hidden" id="raw-pwd" value="${user.password}">`;
        
        const accessCont = document.getElementById('view-user-access');
        accessCont.innerHTML = (user.access || []).map(a => `<span class="badge bg-soft-primary text-primary me-1 border border-primary border-opacity-25">${a}</span>`).join('');

        new bootstrap.Modal(document.getElementById('viewUserModal')).show();
    };

    window.togglePasswordView = function() {
        const stars = document.getElementById('pwd-stars');
        const raw = document.getElementById('raw-pwd').value;
        if (stars.innerText === '********') stars.innerText = raw;
        else stars.innerText = '********';
    };

    window.editUser = function (id) {
        const user = users.find(u => u.id === id);
        if (!user) return;
        document.getElementById('edit-user-id-hidden').value = user.id;
        document.getElementById('edit-user-name').value = user.name;
        document.getElementById('edit-user-email').value = user.email;
        document.getElementById('edit-user-phone').value = user.phone;
        document.getElementById('edit-user-username').value = user.username;
        document.getElementById('edit-user-status').value = user.status;
        new bootstrap.Modal(document.getElementById('editUserModal')).show();
    };

    window.resetPasswordModal = function (id) {
        const user = users.find(u => u.id === id);
        if (!user) return;
        document.getElementById('reset-user-id-hidden').value = user.id;
        document.getElementById('reset-user-display').textContent = 'Resetting for: ' + user.name + ' (@' + user.username + ')';
        document.getElementById('resetPasswordForm').reset();
        new bootstrap.Modal(document.getElementById('resetPasswordModal')).show();
    };

    window.deleteUser = function (id) {
        const user = users.find(u => u.id === id);
        if (!user) return;
        document.getElementById('delete-user-id-hidden').value = id;
        document.getElementById('delete-user-name-display').textContent = user.name;
        new bootstrap.Modal(document.getElementById('deleteUserModal')).show();
    };

    window.toggleLock = function (id) {
        const user = users.find(u => u.id === id);
        if (!user) return;
        user.locked = !user.locked;
        persistUsers();
        renderUsers();
        showToast(user.locked ? 'Locked' : 'Unlocked', `Account for ${user.name} is now ${user.locked ? 'locked' : 'active'}.`);
    };

    window.sendCredentials = function (id) {
        const user = users.find(u => u.id === id);
        if (!user) return;
        if (confirm(`Send login credentials to ${user.name} (${user.email || 'No email set'})?`)) {
            showToast('Email Sent', `Credentials dispatched to ${user.email || user.username}`);
        }
    };

    function showToast(title, body) {
        console.log(`TOAST: [${title}] ${body}`);
    }

    init();
});
