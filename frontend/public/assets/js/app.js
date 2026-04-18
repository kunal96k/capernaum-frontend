'use strict';

/* ===== Enable Bootstrap Popover (on element  ====== */
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))

/* ==== Enable Bootstrap Alert ====== */
//var alertList = document.querySelectorAll('.alert')
//alertList.forEach(function (alert) {
//  new bootstrap.Alert(alert)
//});

const alertList = document.querySelectorAll('.alert')
const alerts = [...alertList].map(element => new bootstrap.Alert(element))


/* ===== Role-based sidebar visibility (frontend-only) ====== */
function getRoleFromUrl() {
	try {
		const params = new URLSearchParams(window.location.search);
		const role = (params.get('role') || '').trim();
		return role ? role : null;
	} catch (e) {
		return null;
	}
}

function normalizeRole(role) {
	const r = (role || '').toString().trim().toLowerCase();
	if (!r) return 'super_admin';
	if (r === 'superadmin' || r === 'super-admin') return 'super_admin';
	if (r === 'client') return 'client';
	return r;
}

function applyRoleBasedMenuVisibility(currentRole) {
	const role = normalizeRole(currentRole);

	const roleLabel = document.getElementById('current-user-role');
	if (roleLabel) {
		const map = {
			super_admin: 'Super Admin',
			admin: 'Admin',
			manager: 'Manager',
			qa_lead: 'QA Lead',
			client: 'Client',
		};
		roleLabel.textContent = map[role] || role;
	}

	const allItems = document.querySelectorAll('[data-roles]');
	allItems.forEach((el) => {
		const allowed = (el.getAttribute('data-roles') || '')
			.split(',')
			.map((x) => normalizeRole(x))
			.filter(Boolean);
		el.classList.toggle('d-none', allowed.length > 0 && !allowed.includes(role));
	});
}

window.addEventListener('load', function () {
	const urlRole = getRoleFromUrl();
	if (urlRole) {
		localStorage.setItem('tts_role', normalizeRole(urlRole));
	}
	const storedRole = localStorage.getItem('tts_role');
	if (!storedRole && !urlRole) {
		localStorage.setItem('tts_role', 'super_admin');
	}
	applyRoleBasedMenuVisibility(storedRole || normalizeRole(urlRole) || 'super_admin');
});


/* ===== Responsive Sidepanel ====== */
const sidePanelToggler = document.getElementById('sidepanel-toggler'); 
const sidePanel = document.getElementById('app-sidepanel');  
const sidePanelDrop = document.getElementById('sidepanel-drop'); 
const sidePanelClose = document.getElementById('sidepanel-close'); 

window.addEventListener('load', function(){
	responsiveSidePanel(); 
});

window.addEventListener('resize', function(){
	responsiveSidePanel(); 
});


function responsiveSidePanel() {
    let w = window.innerWidth;
	if(w >= 1200) {
	    // if larger 
	    //console.log('larger');
		sidePanel.classList.remove('sidepanel-hidden');
		sidePanel.classList.add('sidepanel-visible');
		
	} else {
	    // if smaller
	    //console.log('smaller');
	    sidePanel.classList.remove('sidepanel-visible');
		sidePanel.classList.add('sidepanel-hidden');
	}
};

if (sidePanelToggler && sidePanel) {
    sidePanelToggler.addEventListener('click', () => {
        if (sidePanel.classList.contains('sidepanel-visible')) {
            sidePanel.classList.remove('sidepanel-visible');
            sidePanel.classList.add('sidepanel-hidden');
        } else {
            sidePanel.classList.remove('sidepanel-hidden');
            sidePanel.classList.add('sidepanel-visible');
        }
    });
}

if (sidePanelClose && sidePanelToggler) {
    sidePanelClose.addEventListener('click', (e) => {
        e.preventDefault();
        sidePanelToggler.click();
    });
}

if (sidePanelDrop && sidePanelToggler) {
    sidePanelDrop.addEventListener('click', (e) => {
        sidePanelToggler.click();
    });
}



/* ====== Mobile search ======= */
const searchMobileTrigger = document.querySelector('.search-mobile-trigger');
const searchBox = document.querySelector('.app-search-box');

if (searchMobileTrigger && searchBox) {
    searchMobileTrigger.addEventListener('click', () => {
        searchBox.classList.toggle('is-visible');
        let searchMobileTriggerIcon = document.querySelector('.search-mobile-trigger-icon');
        if (searchMobileTriggerIcon) {
            if (searchMobileTriggerIcon.classList.contains('fa-magnifying-glass')) {
                searchMobileTriggerIcon.classList.remove('fa-magnifying-glass');
                searchMobileTriggerIcon.classList.add('fa-xmark');
            } else {
                searchMobileTriggerIcon.classList.remove('fa-xmark');
                searchMobileTriggerIcon.classList.add('fa-magnifying-glass');
            }
        }
    });
}


