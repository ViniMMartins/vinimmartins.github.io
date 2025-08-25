// =====================
// lang-picker.js
// Controla UI dos botões de idioma (desktop e mobile)
// =====================

'use strict';

document.addEventListener('DOMContentLoaded', function () {
const KEY = 'lang';
const pickers = [
    { btn: 'lang-btn',         menu: 'lang-menu' },
    { btn: 'lang-btn-mobile',  menu: 'lang-menu-mobile' }
];

function getSaved() {
    try {
    return localStorage.getItem(KEY) ||
            ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
    } catch { return 'en'; }
}

const setBtn = (el, lang) => { if (el) el.textContent = lang === 'pt' ? 'PT (BR)' : 'EN (US)'; };

function setup({ btn: btnId, menu: menuId }) {
    const btn  = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    // estado inicial
    const initial = getSaved();
    setBtn(btn, initial);
    if (typeof window.applyI18n === 'function') window.applyI18n(initial);

    // abre/fecha
    btn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
    });

    // seleção por delegação
    menu.addEventListener('click', (e) => {
    const li = e.target.closest('[data-lang]');
    if (!li) return;
    const lang = li.getAttribute('data-lang');
    try { localStorage.setItem(KEY, lang); } catch {}
    if (typeof window.applyI18n === 'function') window.applyI18n(lang);
    setBtn(btn, lang);
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    });

    // fecha fora
    document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }
    });

    // fecha com ESC
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }
    });
}

pickers.forEach(setup);
});
