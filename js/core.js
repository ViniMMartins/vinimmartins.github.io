// =====================
// CORE.JS (modular / orquestrador)
// =====================

// Ordem importa: primeiro tema/i18n base, depois controladores e UI
import './theme-init.js';
import './i18n.js';
import './mode-controller.js';
import './mode-picker.js';
import './lang-picker.js';
import './mobile-menu.js';

// --- Guards para evitar reboots múltiplos
if (!window.__app) window.__app = {};
if (!window.__app.__coreBooted) {
window.__app.__coreBooted = true;

// Boot idempotente em DOM pronto
const boot = () => {
    // Alguns módulos expõem inits globais; chamamos só se existirem e só 1x
    const callOnce = (key) => {
    const fn = window[key];
    if (typeof fn === 'function' && !fn.__wired) {
        try { fn(); } catch (e) { console.error(`[core] Erro ao executar ${key}:`, e); }
        fn.__wired = true;
    }
    };

    // 1) Controlador de tema (aplica classe dark/System) antes da UI
    callOnce('initModeController');

    // 2) I18n (carrega/garante textos) + fallbacks/observer (se existir)
    callOnce('initI18n');
    callOnce('wireI18nFallbacks');

    // 3) UI desktop: pickers
    callOnce('initModePicker');
    callOnce('initLangPicker');

    // 4) UI mobile: menu (usa data-open e delegação dentro do módulo)
    callOnce('initMobileMenu');

    // Retrocompatibilidade: se módulos não registraram, definimos shims
    if (typeof window.setColorMode !== 'function' && typeof window.applyTheme === 'function') {
    window.setColorMode = window.applyTheme;
    }
    if (typeof window.applyI18n !== 'function' && typeof window.setLang === 'function') {
    window.applyI18n = window.setLang;
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
    boot();
}
}

// Helpers globais/exportados — mantêm a API que você já usa
export function setColorMode(mode) {
if (typeof window.setColorMode === 'function') {
    window.setColorMode(mode);
} else if (typeof window.applyTheme === 'function') {
    window.applyTheme(mode); // fallback
} else {
    console.warn('[core] Nenhum setColorMode/applyTheme disponível.');
}
}

export function applyI18n(lang) {
if (typeof window.applyI18n === 'function') {
    window.applyI18n(lang);
} else if (typeof window.setLang === 'function') {
    window.setLang(lang); // fallback
} else {
    console.warn('[core] Nenhum applyI18n/setLang disponível.');
}
}
