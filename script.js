// =========================================================
// E-portfolio Tomas Billaud · Onglets, "Tout voir" & FR/EN
// =========================================================

const root = document.documentElement;
const body = document.body;

// --- 1. Langue (FR / EN) ---
const savedLang = localStorage.getItem('lang');
if (savedLang === 'fr' || savedLang === 'en') {
    root.lang = savedLang;
}

const langToggle = document.querySelector('.lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        root.lang = root.lang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('lang', root.lang);
    });
}

// --- 2. Vrais onglets + option "Tout voir" ---
const tabs = document.querySelectorAll('.tab[data-tab]');
const panels = document.querySelectorAll('.tab-panel[data-panel]');
const allToggle = document.querySelector('.all-toggle');
const tabsBar = document.querySelector('.tabs');

function showTab(tabId, scrollToTop = true) {
    if (!document.querySelector(`.tab-panel[data-panel="${tabId}"]`)) {
        tabId = 'accueil';
    }

    body.classList.remove('show-all');
    body.classList.add('tabbed');
    if (allToggle) allToggle.setAttribute('aria-pressed', 'false');

    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === tabId));
    tabs.forEach(t => {
        const isActive = t.dataset.tab === tabId;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        if (isActive && tabsBar) {
            const left = t.offsetLeft - (tabsBar.clientWidth / 2) + (t.offsetWidth / 2);
            tabsBar.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
        }
    });

    if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function showAll() {
    body.classList.remove('tabbed');
    body.classList.add('show-all');
    if (allToggle) allToggle.setAttribute('aria-pressed', 'true');
    tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
}

tabs.forEach(t => {
    t.addEventListener('click', () => {
        const id = t.dataset.tab;
        showTab(id, true);
        if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
});

document.querySelectorAll('[data-tab-link]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.dataset.tabLink;
        if (body.classList.contains('show-all')) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            showTab(id, true);
        }
        if (history.replaceState) history.replaceState(null, '', '#' + id);
    });
});

if (allToggle) {
    allToggle.addEventListener('click', () => {
        if (body.classList.contains('show-all')) {
            const current = (location.hash || '#accueil').slice(1);
            showTab(current, true);
        } else {
            showAll();
        }
    });
}

// Initialisation selon le hash éventuel (#projets, #parcours, etc.)
const initialHash = (location.hash || '').slice(1);
if (initialHash && document.querySelector(`.tab-panel[data-panel="${initialHash}"]`)) {
    showTab(initialHash, false);
} else {
    showTab('accueil', false);
}
