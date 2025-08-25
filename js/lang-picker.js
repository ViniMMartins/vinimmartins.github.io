// =====================
// lang-picker.js (desktop + mobile)
// Controla UI dos botões de idioma e mantém ambos sincronizados
// Usa data-open como fonte da verdade (CSS garante display)
// =====================

'use strict';

(function () {
const KEY_PRIMARY  = 'lang';               // seu padrão atual
const KEY_FALLBACK = 'lang-preference';    // compat com versões antigas

const PICKERS = [
    { btn: 'lang-btn',        menu: 'lang-menu' },
    { btn: 'lang-btn-mobile', menu: 'lang-menu-mobile' } // pode não existir
];

const $ = (s) => document.querySelector(s);

function getSaved() {
    try {
    return localStorage.getItem(KEY_PRIMARY) ||
            localStorage.getItem(KEY_FALLBACK) ||
            ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
    } catch {
    return 'en';
    }
}

function setSaved(lang) {
    try {
    localStorage.setItem(KEY_PRIMARY, lang);
    localStorage.setItem(KEY_FALLBACK, lang); // compat
    } catch {}
}

function setHtmlLang(lang) {
    document.documentElement.lang = lang;
}

function runI18n(lang) {
    // Preferir a API do projeto; fallback mínimo
    if (typeof window.applyI18n === 'function') {
    window.applyI18n(lang);
    } else if (typeof window.setLang === 'function') {
    window.setLang(lang);
    } else {
    setHtmlLang(lang);
    }
}

function labelFor(lang) {
    return lang === 'pt' ? 'PT (BR)' : 'EN (US)';
}

function updateAllLabels(lang) {
    const label = labelFor(lang);
    const b1 = $('#lang-btn');
    const b2 = $('#lang-btn-mobile');
    if (b1) b1.textContent = label;
    if (b2) b2.textContent = label;
}

function closeOtherMenus(currentMenuEl) {
    // Fecha o menu de tema quando o de idioma abre
    const modeBtn  = $('#mode-btn');
    const modeMenu = $('#mode-menu');
    if (modeMenu && currentMenuEl !== modeMenu) {
    modeMenu.setAttribute('data-open', 'false');
    modeMenu.classList.add('hidden'); // compat
    modeBtn?.setAttribute('aria-expanded', 'false');
    }
}

function setupOne({ btn: btnId, menu: menuId }) {
    const btn  = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    if (!btn || !menu || btn.__wired) return;
    btn.__wired = true;

    // Estado inicial
    const initial = getSaved();
    updateAllLabels(initial);
    runI18n(initial);
    setHtmlLang(initial);
    btn.setAttribute('aria-expanded', 'false');

    // Garante atributo de estado coerente com classe inicial
    if (menu.classList.contains('hidden')) {
    menu.setAttribute('data-open', 'false');
    } else if (!menu.hasAttribute('data-open')) {
    menu.setAttribute('data-open', 'true');
    }

    // Abrir/fechar
    btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = menu.getAttribute('data-open') !== 'true'; // estado antes
    closeOtherMenus(menu);
    menu.setAttribute('data-open', String(willOpen));
    menu.classList.toggle('hidden', !willOpen); // compat
    btn.setAttribute('aria-expanded', String(willOpen));
    });

    // Seleção (delegação)
    menu.addEventListener('click', (e) => {
    const li = e.target.closest('[data-lang]');
    if (!li) return;
    const lang = li.getAttribute('data-lang');
    setSaved(lang);
    runI18n(lang);
    setHtmlLang(lang);
    updateAllLabels(lang);
    menu.setAttribute('data-open', 'false');
    menu.classList.add('hidden'); // compat
    btn.setAttribute('aria-expanded', 'false');
    });

    // Clique-fora / Esc — 1x para todos
    if (!window.__langPickerDocWired) {
    window.__langPickerDocWired = true;

    document.addEventListener('click', (e) => {
        PICKERS.forEach(({ btn, menu }) => {
        const b = document.getElementById(btn);
        const m = document.getElementById(menu);
        if (!b || !m) return;
        if (m.getAttribute('data-open') !== 'true') return;
        if (m.contains(e.target) || b.contains(e.target)) return; // não fecha
        m.setAttribute('data-open', 'false');
        m.classList.add('hidden');
        b.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        PICKERS.forEach(({ btn, menu }) => {
        const b = document.getElementById(btn);
        const m = document.getElementById(menu);
        if (!b || !m) return;
        m.setAttribute('data-open', 'false');
        m.classList.add('hidden');
        b.setAttribute('aria-expanded', 'false');
        });
    });
    }
}

// Expor init para o core.js orquestrar (idempotente)
window.initLangPicker = function initLangPicker() {
    PICKERS.forEach(setupOne);
};
})();
