// =====================
// mode-controller.js
// Controla o "color-mode": 'light' | 'dark' | 'system'
// - Aplica atributo data-color-mode
// - Gerencia classe .dark (Tailwind)
// - Reage a mudanças do SO quando em 'system'
// - Expõe window.setColorMode(mode)
// =====================

(function () {
'use strict';

const KEY = 'color-mode';
const html = document.documentElement;
const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

function computeIsDark(mode) {
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    // system
    return media ? media.matches : false;
}

function apply(mode) {
    // atributo para CSS nativo (color-scheme em core.css)
    if (mode === 'system') {
    html.removeAttribute('data-color-mode');
    } else {
    html.setAttribute('data-color-mode', mode);
    }

    // classe 'dark' do Tailwind
    html.classList.toggle('dark', computeIsDark(mode));
}

function getSaved() {
    try { return localStorage.getItem(KEY) || 'system'; }
    catch { return 'system'; }
}

function setSaved(mode) {
    try { localStorage.setItem(KEY, mode); } catch {}
}

// API pública para outros scripts (ex.: pickers)
function setColorMode(mode) {
    if (mode !== 'light' && mode !== 'dark' && mode !== 'system') mode = 'system';
    setSaved(mode);
    apply(mode);
}
window.setColorMode = setColorMode;

// Inicializa com o valor salvo (theme-early.js já aplicou cedo; aqui confirmamos/fortalecemos)
const initial = getSaved();
apply(initial);

// Se estiver em 'system', reagir a mudanças do SO
if (media && media.addEventListener) {
    media.addEventListener('change', () => {
    const current = getSaved();
    if (current === 'system') apply('system');
    });
} else if (media && media.addListener) {
    // Safari antigo
    media.addListener(() => {
    const current = getSaved();
    if (current === 'system') apply('system');
    });
}
})();
