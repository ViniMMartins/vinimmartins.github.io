'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;

    function setTheme(mode) {
        const isDark = mode === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', mode);
        themeBtn.textContent = isDark ? '☀️' : '🌙';
        themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        themeBtn.title = themeBtn.getAttribute('aria-label');
    }

    // aplica estado inicial
    const current = localStorage.getItem('theme') || 'light';
    setTheme(current);

    // troca no clique
    themeBtn.addEventListener('click', () => {
        const now = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(now === 'dark' ? 'light' : 'dark');
    });

    // helpers no console
    window.setTheme = setTheme;
    window.setDark = () => setTheme('dark');
    window.setLight = () => setTheme('light');
});
