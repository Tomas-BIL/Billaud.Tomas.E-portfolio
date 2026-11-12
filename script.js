// =========================================================
// E-portfolio Tomas Billaud · Navigation fluide & Bilingue
// =========================================================

const root = document.documentElement;

// --- 1. Gestion de la langue (FR / EN) ---
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

// --- 2. Navigation fluide & suivi de l'onglet actif ---
const tabLinks = document.querySelectorAll('.nav-tabs .tab-link');
const navTabsContainer = document.querySelector('.nav-tabs');

function highlightTab(id) {
    tabLinks.forEach(link => {
        const isMatch = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isMatch);
        // Ajuste le défilement horizontal de la barre d'onglets (sans toucher au scroll de la page)
        if (isMatch && navTabsContainer) {
            const left = link.offsetLeft - (navTabsContainer.clientWidth / 2) + (link.offsetWidth / 2);
            navTabsContainer.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
        }
    });
}

// Clic sur un onglet : défilement fluide vers la section
tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                highlightTab(href.substring(1));
                if (history.pushState) {
                    history.pushState(null, null, href);
                }
            }
        }
    });
});

// Détection de la section visible au scroll
const sections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                highlightTab(entry.target.id);
            }
        });
    }, { rootMargin: '-20% 0px -70% 0px' });

    sections.forEach(sec => observer.observe(sec));
}
