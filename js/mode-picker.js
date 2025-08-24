    // js/mode-picker.js
    (function initThemePicker() {
    const KEY = 'color-mode';
    const defs = [
        { btn: 'mode-btn', menu: 'mode-menu' },
        { btn: 'mode-btn-mobile', menu: 'mode-menu-mobile' },
    ];

    function getSaved() {
        try { return localStorage.getItem(KEY) || 'system'; } catch { return 'system'; }
    }
    const labels = {
        light: { icon: '☀️', pt: 'Tema Claro', en: 'Light Mode' },
        dark:  { icon: '🌙', pt: 'Tema Escuro', en: 'Dark Mode' },
        system:{ icon: '💻', pt: 'Tema do Sistema', en: 'System Mode' },
    };
    const lang = (() => { try { return localStorage.getItem('lang') || 'en'; } catch { return 'en'; } })();

    function setBtnLabel(btnEl, mode) {
        const t = labels[mode] || labels.system;
        btnEl.textContent = `${t.icon} ${lang === 'pt' ? t.pt : t.en}`;
    }

    function applyMode(mode) {
        if (typeof window.setColorMode === 'function') {
        window.setColorMode(mode);
        } else {
        try { localStorage.setItem(KEY, mode); } catch {}
        const html = document.documentElement;
        const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = mode === 'dark' || (mode === 'system' && prefers);
        html.classList.toggle('dark', isDark);
        if (mode === 'system') html.removeAttribute('data-color-mode');
        else html.setAttribute('data-color-mode', mode);
        }
    }

    defs.forEach(({ btn, menu }) => {
        const btnEl = document.getElementById(btn);
        const menuEl = document.getElementById(menu);
        if (!btnEl || !menuEl) return;

        // estado inicial
        const initial = getSaved();
        setBtnLabel(btnEl, initial);

        function open() { menuEl.classList.remove('hidden'); btnEl.setAttribute('aria-expanded','true'); }
        function close(){ menuEl.classList.add('hidden');   btnEl.setAttribute('aria-expanded','false'); }

        btnEl.addEventListener('click', () => {
        menuEl.classList.contains('hidden') ? open() : close();
        });

        menuEl.addEventListener('click', (e) => {
        const li = e.target.closest('[data-mode]');
        if (!li) return;
        const mode = li.getAttribute('data-mode');
        applyMode(mode);
        setBtnLabel(btnEl, mode);
        close();
        });

        document.addEventListener('click', (e) => {
        if (!menuEl.contains(e.target) && !btnEl.contains(e.target)) close();
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
    });
    })();
