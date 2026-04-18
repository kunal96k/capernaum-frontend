'use strict';

/* ================================================
   CAPERNAUM SOLUTIONS — Interactive JS Module
   Handles: Modals, Tabs, Star Ratings, Dropzone,
            Resource Filtering, View/Edit Actions
   ================================================ */

/* ===== 1. MODAL SYSTEM ===== */

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (typeof lucide !== 'undefined') {
        setTimeout(() => lucide.createIcons(), 50);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Close modal on backdrop click
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('cap-modal-backdrop')) {
        e.target.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.cap-modal-backdrop').forEach(function (modal) {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});


/* ===== 2. VIEW / EDIT / DELETE DETAIL MODAL ===== */

/**
 * Opens the view-detail modal with dynamic content.
 * @param {string} title - The title for the modal
 * @param {object} data - Key-value pairs to display
 * @param {string} mode - 'view' or 'edit'
 */
function viewRecord(title, data, mode) {
    const modalTitle = document.getElementById('detail-modal-title');
    const modalBody = document.getElementById('detail-modal-body');
    if (!modalTitle || !modalBody) return;

    const icon = mode === 'edit' ? 'edit' : 'eye';
    modalTitle.innerHTML = '<i data-lucide="' + icon + '" style="width:20px;height:20px" class="me-2"></i>' + title;

    let html = '';
    if (mode === 'edit') {
        html += '<form onsubmit="event.preventDefault(); alert(\'Changes saved successfully!\'); closeModal(\'modal-view-detail\');">';
        for (const key in data) {
            html += '<div class="mb-3">';
            html += '<label class="form-label fw-semibold">' + key + '</label>';
            html += '<input type="text" class="form-control" value="' + escapeHtml(data[key]) + '">';
            html += '</div>';
        }
        html += '</form>';
    } else {
        html += '<div class="table-responsive"><table class="table mb-0">';
        for (const key in data) {
            html += '<tr><td class="fw-semibold text-muted" style="width:40%">' + key + '</td>';
            html += '<td>' + escapeHtml(data[key]) + '</td></tr>';
        }
        html += '</table></div>';
    }

    modalBody.innerHTML = html;
    openModal('modal-view-detail');
}

/**
 * Delete a record with confirmation
 */
function deleteRecord(name) {
    if (confirm('Are you sure you want to delete "' + name + '"? This action cannot be undone.')) {
        alert('"' + name + '" has been deleted successfully.');
        // In production, this would make an API call
    }
}

/**
 * Escape HTML entities for safe display
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}


/* ===== 3. TAB SWITCHING SYSTEM ===== */

function initTabs() {
    document.querySelectorAll('.cap-tabs').forEach(function (tabNav) {
        const tabLinks = tabNav.querySelectorAll('.nav-link[data-tab]');

        tabLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (!targetContent) return;

                // Deactivate all tabs + hide all panels
                tabLinks.forEach(function (l) {
                    l.classList.remove('active');
                    const panel = document.getElementById(l.getAttribute('data-tab'));
                    if (panel) panel.classList.remove('active');
                });

                // Activate clicked tab
                this.classList.add('active');
                targetContent.classList.add('active');

                if (typeof lucide !== 'undefined') {
                    setTimeout(() => lucide.createIcons(), 50);
                }
            });
        });
    });
}


/* ===== 4. STAR RATING SYSTEM ===== */

function initStarRatings() {
    document.querySelectorAll('.cap-star-rating').forEach(function (container) {
        const stars = container.querySelectorAll('.cap-star');

        stars.forEach(function (star) {
            star.addEventListener('mouseenter', function () {
                const val = parseInt(this.getAttribute('data-value'));
                stars.forEach(function (s) {
                    const sVal = parseInt(s.getAttribute('data-value'));
                    if (sVal <= val) {
                        s.classList.remove('fa-regular');
                        s.classList.add('fa-solid');
                        s.style.color = '#f59e0b';
                    } else if (!s.classList.contains('active')) {
                        s.classList.remove('fa-solid');
                        s.classList.add('fa-regular');
                        s.style.color = '#d6d9e0';
                    }
                });
            });

            star.addEventListener('click', function () {
                const val = parseInt(this.getAttribute('data-value'));
                stars.forEach(function (s) {
                    const sVal = parseInt(s.getAttribute('data-value'));
                    if (sVal <= val) {
                        s.classList.remove('fa-regular');
                        s.classList.add('fa-solid', 'active');
                        s.style.color = '#f59e0b';
                    } else {
                        s.classList.remove('fa-solid', 'active');
                        s.classList.add('fa-regular');
                        s.style.color = '#d6d9e0';
                    }
                });
                container.setAttribute('data-rating', val);
            });
        });

        container.addEventListener('mouseleave', function () {
            const currentRating = parseInt(container.getAttribute('data-rating') || '0');
            stars.forEach(function (s) {
                const sVal = parseInt(s.getAttribute('data-value'));
                if (sVal <= currentRating) {
                    s.classList.remove('fa-regular');
                    s.classList.add('fa-solid', 'active');
                    s.style.color = '#f59e0b';
                } else {
                    s.classList.remove('fa-solid', 'active');
                    s.classList.add('fa-regular');
                    s.style.color = '#d6d9e0';
                }
            });
        });
    });
}


/* ===== 5. DROPZONE ===== */

function initDropzones() {
    document.querySelectorAll('.cap-dropzone').forEach(function (zone) {
        const fileInput = zone.querySelector('input[type="file"]');

        zone.addEventListener('click', function () {
            if (fileInput) fileInput.click();
        });

        zone.addEventListener('dragover', function (e) {
            e.preventDefault();
            zone.classList.add('dragover');
        });

        zone.addEventListener('dragleave', function (e) {
            e.preventDefault();
            zone.classList.remove('dragover');
        });

        zone.addEventListener('drop', function (e) {
            e.preventDefault();
            zone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) handleDroppedFiles(e.dataTransfer.files, zone);
        });

        if (fileInput) {
            fileInput.addEventListener('change', function () {
                if (this.files.length > 0) handleDroppedFiles(this.files, zone);
            });
        }
    });
}

function handleDroppedFiles(files, zone) {
    const namesList = Array.from(files).map(f => f.name).join(', ');
    const para = zone.querySelector('p.fw-semibold');
    if (para) para.textContent = files.length + ' file(s) selected';
    const subPara = zone.querySelector('p.text-muted');
    if (subPara) subPara.textContent = namesList;
}


/* ===== 6. RESOURCE FILTERING ===== */

function filterResources(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.cap-resource-list').forEach(function (list) {
        list.querySelectorAll('.cap-resource-item').forEach(function (item) {
            const name = item.querySelector('.cap-resource-name');
            if (name) {
                item.style.display = name.textContent.toLowerCase().includes(q) ? 'flex' : 'none';
            }
        });
    });
}


/* ===== 7. TOAST NOTIFICATIONS ===== */

function showToast(message, type) {
    type = type || 'success';
    const colors = { success: '#198754', error: '#dc3545', info: '#0d6efd', warning: '#fd7e14' };
    const icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };

    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:20px;right:20px;z-index:99999;padding:12px 20px;border-radius:8px;color:#fff;font-weight:600;font-size:0.875rem;box-shadow:0 4px 20px rgba(0,0,0,0.15);display:flex;align-items:center;gap:8px;animation:capFadeIn 0.3s ease;max-width:400px;';
    toast.style.background = colors[type] || colors.success;
    toast.innerHTML = '<span style="font-size:1.1rem">' + icons[type] + '</span> ' + message;

    document.body.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(function () { toast.remove(); }, 300);
    }, 3000);
}


/* ===== 8. INITIALIZATION ===== */

document.addEventListener('DOMContentLoaded', function () {
    initTabs();
    initStarRatings();
    initDropzones();

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
