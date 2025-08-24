/* Aplica tema inicial antes do carregamento do Tailwind
    -> Usa a mesma chave do mode-controller.js: 'color-mode'
    -> Default: 'system' (segue preferências do SO até o usuário escolher) */

(function () {
    try {
        const stored = localStorage.getItem('color-mode'); // 'light' | 'dark' | 'system'
        const mode = stored || 'system';  // <-- default sempre "system"

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

        document.documentElement.classList.toggle('dark', isDark);

        if (mode === 'system') {
        document.documentElement.removeAttribute('data-color-mode');
        } else {
        document.documentElement.setAttribute('data-color-mode', mode);
        }
    } catch {
        document.documentElement.classList.remove('dark');
        document.documentElement.setAttribute('data-color-mode', 'system');
    }
})();

