    // js/mobile-menu.js
    (function () {
    const btn = document.getElementById('mobile-menu-toggle');
    const panel = document.getElementById('mobile-menu');
    if (!btn || !panel) return;

    function open() {
        panel.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflowY = 'hidden'; // evita scroll do fundo
    }
    function close() {
        panel.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflowY = '';
    }

    btn.addEventListener('click', () => {
        const isOpen = !panel.classList.contains('hidden');
        isOpen ? close() : open();
    });

    // fecha ao clicar em link do menu
    panel.addEventListener('click', (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (a) close();
    });

    // fecha com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') close();
    });

    // fecha ao mudar tema/idioma pelo dropdown
    ['mode-menu-mobile', 'lang-menu-mobile'].forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', (e) => {
        if (e.target.closest('[data-mode]') || e.target.closest('[data-lang]')) {
            setTimeout(close, 0);
        }
        });
    });
    })();
