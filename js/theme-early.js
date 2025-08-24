/* Aplica tema inicial SEM depender do SO */
(function () {
    try {
        const stored = localStorage.getItem('theme'); // 'dark' | 'light' | null
        const mode = stored || 'light'; // default = light
        document.documentElement.classList.toggle('dark', mode === 'dark');
    } catch (_) {
        // fallback se localStorage indisponível
        document.documentElement.classList.remove('dark');
    }
})();