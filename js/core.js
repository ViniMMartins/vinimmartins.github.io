// =====================
// CORE.JS
// =====================

// Importa scripts base
import './theme-init.js';
import './i18n.js';
import './mode-controller.js';
import './mode-picker.js';
import './lang-picker.js';
import './mobile-menu.js'; // presente mas só é inicializado se existir botão

// Helpers globais
export function setColorMode(mode) {
if (window.setColorMode) {
    window.setColorMode(mode);
}
}

export function applyI18n(lang) {
if (window.applyI18n) {
    window.applyI18n(lang);
}
}
