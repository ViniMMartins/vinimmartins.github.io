// =====================
// theme-init.js
// =====================

'use strict';

document.addEventListener('DOMContentLoaded', function () {
const KEY = 'color-mode';
const html = document.documentElement;

// pega valor salvo ou "system"
let current = localStorage.getItem(KEY) || 'system';

function setTheme(mode) {
    if (mode === 'system') {
    html.removeAttribute('data-color-mode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', prefersDark);
    } else if (mode === 'dark') {
    html.setAttribute('data-color-mode', 'dark');
    html.classList.add('dark');
    } else {
    html.setAttribute('data-color-mode', 'light');
    html.classList.remove('dark');
    }
    localStorage.setItem(KEY, mode);
}

// aplica estado inicial
setTheme(current);

// helpers globais
window.setTheme = setTheme;
window.setDark = () => setTheme('dark');
window.setLight = () => setTheme('light');
window.setSystem = () => setTheme('system');
});
