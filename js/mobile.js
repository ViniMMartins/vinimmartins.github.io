// =====================
// MOBILE.JS
// =====================

export function init() {
console.log('[MOBILE] inicializando...');

const btn = document.getElementById('mobile-menu-toggle');
const panel = document.getElementById('mobile-menu');

if (btn && panel) {
    function open() {
    panel.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // evita scroll por trás
    }
    function close() {
    panel.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    }

    btn.addEventListener('click', () => {
    panel.classList.contains('hidden') ? open() : close();
    });

    // Fecha ao clicar em links dentro do menu
    panel.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) close();
    });

    // Fecha no ESC
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
    });
}

// Pickers mobile (tema/idioma) já são suportados pelos scripts core,
// porque eles cuidam também dos IDs "*-mobile".
}
