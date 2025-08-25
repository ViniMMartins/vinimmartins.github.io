/* =========================================
js/theme-early.js
Aplica o tema o mais cedo possível,
evitando FOUC e respeitando:
- color-mode: 'light' | 'dark' | 'system'
========================================= */
(function () {
try {
    const html = document.documentElement;

    // Migração: compat com chave antiga 'theme' (light/dark)
    let saved = localStorage.getItem('color-mode');
    if (!saved) {
    const legacy = localStorage.getItem('theme'); // 'light' | 'dark'
    if (legacy === 'light' || legacy === 'dark') {
        saved = legacy;
        localStorage.setItem('color-mode', saved);
    }
    }
    if (!saved) saved = 'system';

    // Aplica atributo data-color-mode e classe .dark (Tailwind)
    function applyEarly(mode) {
    if (mode === 'system') {
        html.removeAttribute('data-color-mode');
        const prefersDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;
        html.classList.toggle('dark', !!prefersDark);
    } else if (mode === 'dark') {
        html.setAttribute('data-color-mode', 'dark');
        html.classList.add('dark');
    } else {
        // light
        html.setAttribute('data-color-mode', 'light');
        html.classList.remove('dark');
    }
    }

    applyEarly(saved);
} catch {
    // Fallback seguro: modo claro
    document.documentElement.classList.remove('dark');
    document.documentElement.setAttribute('data-color-mode', 'light');
}
})();
