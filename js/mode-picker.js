// =====================
// mode-picker.js (desktop + mobile)
// Controla UI dos botões de tema e mantém ambos sincronizados
// Usa data-open como fonte da verdade (CSS garante display)
// =====================

'use strict';

(function () {
const KEY_PRIMARY   = 'color-mode';         // padrão atual
const KEY_FALLBACK  = 'theme-preference';   // compat

const PICKERS = [
    { btn: 'mode-btn',        menu: 'mode-menu' },
    { btn: 'mode-btn-mobile', menu: 'mode-menu-mobile' } // pode não existir
];

const $ = (s) => document.querySelector(s);

function getSaved() {
    try {
    return localStorage.getItem(KEY_PRIMARY) ||
            localStorage.getItem(KEY_FALLBACK) ||
            'system';
    } catch {
    return 'system';
    }
}

function setSaved(mode) {
    try {
    localStorage.setItem(KEY_PRIMARY, mode);
    localStorage.setItem(KEY_FALLBACK, mode); // compat
    } catch {}
}

function labelFor(mode) {
    return mode === 'light' ? '☀️ Light'
        : mode === 'dark'  ? '🌙 Dark'
        :                    '💻 System';
}

function applyTheme(mode) {
    // Preferir API do projeto; fallback mínimo para não quebrar
    if (typeof window.setColorMode === 'function') {
    window.setColorMode(mode);
    } else if (typeof window.applyTheme === 'function') {
    window.applyTheme(mode);
    } else {
    const html = document.documentElement;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = (mode === 'dark') || (mode === 'system' && prefersDark);
    html.classList.toggle('dark', isDark);
    html.dataset.colorMode = (mode === 'light' || mode === 'dark') ? mode : '';
    if (!html.dataset.colorMode) delete html.dataset.colorMode;
    }
}

function updateAllLabels(mode) {
    const label = labelFor(mode);
    const b1 = $('#mode-btn');
    const b2 = $('#mode-btn-mobile');
    if (b1) b1.textContent = label;
    if (b2) b2.textContent = label;
}

function closeOtherMenus(currentMenuEl) {
    // Fecha o menu de idioma quando o de tema abre
    const langBtn  = $('#lang-btn');
    const langMenu = $('#lang-menu');
    if (langMenu && currentMenuEl !== langMenu) {
    langMenu.setAttribute('data-open', 'false');
    langMenu.classList.add('hidden'); // compat
    langBtn?.setAttribute('aria-expanded', 'false');
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
    applyTheme(initial);
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
    // manter compat com quem ainda observa a classe:
    menu.classList.toggle('hidden', !willOpen);
    btn.setAttribute('aria-expanded', String(willOpen));
    });

    // Seleção (delegação)
    menu.addEventListener('click', (e) => {
    const opt = e.target.closest('[data-mode]');
    if (!opt) return;
    const mode = opt.getAttribute('data-mode');
    setSaved(mode);
    applyTheme(mode);
    updateAllLabels(mode);
    menu.setAttribute('data-open', 'false');
    menu.classList.add('hidden'); // compat
    btn.setAttribute('aria-expanded', 'false');
    });

    // Clique-fora / Esc — 1x para todos
    if (!window.__modePickerDocWired) {
    window.__modePickerDocWired = true;

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
window.initModePicker = function initModePicker() {
    PICKERS.forEach(setupOne);
};
})();
