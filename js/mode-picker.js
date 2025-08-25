// =====================
// mode-picker.js
// Controla UI dos botões de tema (desktop e mobile)
// =====================

'use strict';

document.addEventListener('DOMContentLoaded', function () {
const KEY = 'color-mode';
const pickers = [
    { btn: 'mode-btn',         menu: 'mode-menu' },
    { btn: 'mode-btn-mobile',  menu: 'mode-menu-mobile' }
];

const getSaved = () => {
    try { return localStorage.getItem(KEY) || 'system'; }
    catch { return 'system'; }
};

const labelFor = (mode) =>
    mode === 'light' ? '☀️ Light' :
    mode === 'dark'  ? '🌙 Dark'  : '💻 System';

function setup({ btn: btnId, menu: menuId }) {
    const btn  = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu) return;

    // estado inicial
    btn.textContent = labelFor(getSaved());

    // abre/fecha
    btn.addEventListener('click', (e) => {
    e.stopPropagation(); // não deixa o listener global fechar antes
    menu.classList.toggle('hidden');
    btn.setAttribute('aria-expanded', menu.classList.contains('hidden') ? 'false' : 'true');
    });

    // seleção via delegação (pega clique em qualquer filho)
    menu.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-mode]');
    if (!opt) return;
    const mode = opt.getAttribute('data-mode');
    try { localStorage.setItem(KEY, mode); } catch {}
    if (window.setColorMode) window.setColorMode(mode);
    btn.textContent = labelFor(mode);
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    });

    // fecha ao clicar fora
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
