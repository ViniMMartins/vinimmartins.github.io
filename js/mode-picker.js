    // js/mode-picker.js
    (function () {
    const btn  = document.getElementById('mode-btn');
    const menu = document.getElementById('mode-menu');
    if (!btn || !menu) return;

    const KEY = 'color-mode';
    const labels = {
        light: { icon: '☀️', textPT: 'Tema Claro', textEN: 'Light Mode' },
        dark:  { icon: '🌙', textPT: 'Tema Escuro', textEN: 'Dark Mode' },
        system:{ icon: '💻', textPT: 'Tema do Sistema', textEN: 'System Mode' },
    };

    function currentLang() {
        try { return localStorage.getItem('lang') || 'en'; } catch { return 'en'; }
    }

    function setButtonLabel(mode) {
        const lang = currentLang();
        const t = labels[mode] || labels.system;
        const text = lang === 'pt' ? t.textPT : t.textEN;
        btn.textContent = `${t.icon} ${text}`;
    }

    function openMenu() {
        menu.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
        // foco no item selecionado
        const mode = (localStorage.getItem(KEY) || 'system');
        const item = menu.querySelector(`[data-mode="${mode}"]`);
        item && item.focus && item.focus();
    }

    function closeMenu() {
        menu.classList.add('hidden');
        btn.setAttribute('aria-expanded', 'false');
    }

    // clique no botão
    btn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        isOpen ? closeMenu() : openMenu();
    });

    // clique nas opções
    menu.addEventListener('click', (e) => {
        const li = e.target.closest('[data-mode]');
        if (!li) return;
        const mode = li.getAttribute('data-mode');
        // usa o controlador principal
        if (typeof window.setColorMode === 'function') {
        window.setColorMode(mode);
        } else {
        localStorage.setItem(KEY, mode);
        }
        setButtonLabel(mode);
        closeMenu();
    });

    // fecha com clique fora
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !btn.contains(e.target)) closeMenu();
    });

    // fecha com Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMenu();
    });

    // atualiza rótulo na troca de idioma
    document.addEventListener('click', (e) => {
        // se alguém clicar no botão de idioma, o i18n roda; atrasamos 1 tick e atualizamos
        if (e.target && (e.target.id === 'lang-toggle')) {
        setTimeout(() => {
            const mode = (localStorage.getItem(KEY) || 'system');
            setButtonLabel(mode);
            // também atualiza os textos do menu se o i18n usar data-i18n
        }, 0);
        }
    });

    // inicialização do rótulo
    const initial = (localStorage.getItem(KEY) || 'system');
    setButtonLabel(initial);
    })();
