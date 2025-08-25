// =====================
// DESKTOP.JS
// =====================

export function init() {
console.log('[DESKTOP] inicializando...');

// Garante que o menu mobile fique fechado/desativado
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenu) {
    mobileMenu.classList.add('hidden');
}

const mobileBtn = document.getElementById('mobile-menu-toggle');
if (mobileBtn) {
    mobileBtn.setAttribute('aria-expanded', 'false');
}

// Se os pickers desktop já estão no DOM (#mode-btn, #lang-btn),
// eles serão controlados normalmente pelos scripts core (mode-picker.js, lang-picker.js).
}
