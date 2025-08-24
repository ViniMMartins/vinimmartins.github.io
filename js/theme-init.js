'use strict';

/* Este arquivo apenas integra um botão opcional (#theme-toggle) ao
    controlador principal (mode-controller.js). Se o botão não existir,
    nada é feito. O estado real é salvo em localStorage('color-mode'). */

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const btn = document.getElementById('theme-toggle');   // opcional
    const select = document.getElementById('mode-select'); // opcional
    const KEY = 'color-mode'; // 'light' | 'dark' | 'system'

    // usa o apply do mode-controller se disponível; caso contrário, aplica localmente
    const apply = (mode) => {
        if (typeof window.setColorMode === 'function') {
        window.setColorMode(mode);
        return;
        }
        // fallback: aplica aqui mesmo (espelha o modo do mode-controller.js)
        const prefersDark = window.matchMedia &&
                            window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isDark = mode === 'dark' || (mode === 'system' && prefersDark);

        if (mode === 'system') {
        html.removeAttribute('data-color-mode');
        } else {
        html.setAttribute('data-color-mode', mode);
        }
        html.classList.toggle('dark', isDark);
        try { localStorage.setItem(KEY, mode); } catch (_) {}
        if (select) select.value = mode;
    };

    const iconize = () => {
        if (!btn) return;
        // se estiver escuro agora, mostramos ☀️ (ação para clarear); senão 🌙
        const isDarkNow = html.classList.contains('dark');
        btn.textContent = isDarkNow ? '☀️' : '🌙';
        btn.setAttribute('aria-label', isDarkNow ? 'Switch to light mode' : 'Switch to dark mode');
        btn.title = btn.getAttribute('aria-label');
    };

    // estado inicial: só atualiza o ícone (o modo em si já foi aplicado pelo theme-early/mode-controller)
    iconize();

    // clique do botão: alterna apenas entre light/dark (ignora system)
    if (btn) {
        btn.addEventListener('click', () => {
        const next = html.classList.contains('dark') ? 'light' : 'dark';
        apply(next);
        iconize();
        });
    }

    // se o usuário mudar pelo <select>, mantenha o ícone coerente
    if (select) {
        select.addEventListener('change', () => {
        // mode-controller já aplicará; aqui só atualizamos o ícone
        // (por segurança, chamamos iconize após um microtask)
        queueMicrotask(iconize);
        });
    }

    // mudanças externas (outras abas) — mantenha o ícone em sincronia
    window.addEventListener('storage', (e) => {
        if (e.key === KEY) {
        // estado visual já será reavaliado por mode-controller no próximo tick
        queueMicrotask(iconize);
        }
    });

    // também reagir a mudanças do SO quando em 'system'
    const media = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    if (media && media.addEventListener) {
        media.addEventListener('change', () => {
        const current = localStorage.getItem(KEY) || 'system';
        if (current === 'system') queueMicrotask(iconize);
        });
    }
});
