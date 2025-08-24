// js/lang-picker.js
(function initLangPicker() {
    const KEY = 'lang';
    const defs = [
        { btn: 'lang-btn', menu: 'lang-menu' },
        { btn: 'lang-btn-mobile', menu: 'lang-menu-mobile' }, // <--- mobile incluído
    ];

    function getSaved() {
        try {
        return localStorage.getItem(KEY) ||
                ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
        } catch { return 'en'; }
    }

    function setBtnLabel(btnEl, lang) {
        btnEl.textContent = lang === 'pt' ? 'PT (BR)' : 'EN (US)';
    }

    defs.forEach(({ btn, menu }) => {
        const btnEl = document.getElementById(btn);
        const menuEl = document.getElementById(menu);
        if (!btnEl || !menuEl) return;

        const initial = getSaved();
        setBtnLabel(btnEl, initial);
        if (typeof window.applyI18n === 'function') window.applyI18n(initial);

        function open() { menuEl.classList.remove('hidden'); btnEl.setAttribute('aria-expanded','true'); }
        function close(){ menuEl.classList.add('hidden');   btnEl.setAttribute('aria-expanded','false'); }

        btnEl.addEventListener('click', () => {
        menuEl.classList.contains('hidden') ? open() : close();
        });

        menuEl.addEventListener('click', (e) => {
        const li = e.target.closest('[data-lang]');
        if (!li) return;
        const lang = li.getAttribute('data-lang');
        try { localStorage.setItem(KEY, lang); } catch {}
        setBtnLabel(btnEl, lang);
        if (typeof window.applyI18n === 'function') window.applyI18n(lang);
        close();
        });

        document.addEventListener('click', (e) => {
        if (!menuEl.contains(e.target) && !btnEl.contains(e.target)) close();
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    });
})();
