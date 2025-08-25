// =====================
// mobile-menu.js
// =====================

'use strict';

document.addEventListener('DOMContentLoaded', function () {
const btn = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');

if (!btn || !menu) return;

function open() {
    menu.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // evita scroll do fundo
}

function close() {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

// Alterna abrir/fechar
btn.addEventListener('click', () => {
    menu.classList.contains('hidden') ? open() : close();
});

// Fecha ao clicar em link dentro do menu
menu.addEventListener('click', (e) => {
    if (e.target.closest('a[href^="#"]')) close();
});

// Fecha com tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
});
});
