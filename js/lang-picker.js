    // js/lang-picker.js
    (function () {
    const btn  = document.getElementById('lang-btn');
    const menu = document.getElementById('lang-menu');
    if (!btn || !menu) return;

    const KEY = 'lang'; // 'en' | 'pt'

    function getStoredLang() {
        try {
        return localStorage.getItem(KEY) ||
                ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
        } catch { return 'en'; }
    }

    function setBtnLabel(lang) {
        btn.textContent = lang === 'pt' ? 'PT (BR)' : 'EN (US)';
    }

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }

    // inicialização
    const initial = getStoredLang();
    setBtnLabel(initial);
    // aplica idioma na UI (usa sua função global)
    if (typeof window.applyI18n === 'function') window.applyI18n(initial);

    // clicar no botão abre/fecha
    btn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        isOpen ? closeMenu() : openMenu();
    });

    // escolher idioma
    menu.addEventListener('click', (e) => {
        const li = e.target.closest('[data-lang]');
        if (!li) return;
        const lang = li.getAttribute('data-lang'); // 'en' | 'pt'
        try { localStorage.setItem(KEY, lang); } catch {}
        setBtnLabel(lang);
        if (typeof window.applyI18n === 'function') window.applyI18n(lang);
        closeMenu();
    });

    // fechar com clique fora
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
    });

    // fechar com Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });
    })();
