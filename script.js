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

// --- 2. Suivi de l'onglet actif au défilement (Scroll Spy) ---
const sections = document.querySelectorAll('main section[id]');
const tabLinks = document.querySelectorAll('.nav-tabs .tab-link');

function setActiveTab(id) {
    tabLinks.forEach(link => {
        const isMatch = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isMatch);
        if (isMatch) {
            link.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        }
    });
}

// Clic direct sur un onglet
tabLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const targetId = href.substring(1);
            setActiveTab(targetId);
        }
    });
});

// Détection automatique de la section visible
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveTab(entry.target.id);
            }
        });
    }, { rootMargin: '-25% 0px -65% 0px' });

    sections.forEach(sec => observer.observe(sec));
}
