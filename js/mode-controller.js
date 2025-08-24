// js/mode-controller.js
(function () {
    const KEY = 'color-mode'; // valores: 'light' | 'dark' | 'system'
    const html = document.documentElement;
    const select = document.getElementById('mode-select');

    // aplica a classe 'dark' (Tailwind) e o atributo data-color-mode
    function apply(mode) {
        // atributo para CSS nativo (color-scheme)
        if (mode === 'system') {
            html.removeAttribute('data-color-mode');
        } else {
            html.setAttribute('data-color-mode', mode);
        }

        // classe 'dark' do Tailwind
        const prefersDark = window.matchMedia &&
                            window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
        html.classList.toggle('dark', isDark);
    }

    // inicialização (pega do localStorage ou default = system)
    let saved = 'system'; // força system como default SEMPRE
    apply(saved);
    localStorage.setItem(KEY, saved);


    // sincroniza UI do <select>
    if (select) select.value = saved;

    // troca manual via select
    if (select) {
        select.addEventListener('change', () => {
            saved = select.value; // 'light' | 'dark' | 'system'
            localStorage.setItem(KEY, saved);
            apply(saved);
        });
    }

    // se estiver em 'system', reagir a mudanças do SO
    const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (media && media.addEventListener) {
        media.addEventListener('change', () => {
            const current = localStorage.getItem(KEY) || 'system';
            if (current === 'system') {
                apply('system'); // reavalia preferências
            }
        });
    }

    // helpers no console (opcional)
    window.setColorMode = (m) => {
        localStorage.setItem(KEY, m);
        apply(m);
        if (select) select.value = m;
    };
})();
