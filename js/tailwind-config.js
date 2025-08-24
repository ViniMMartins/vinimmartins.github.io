/* Este arquivo deve ser carregado ANTES do CDN do Tailwind
    (index.html -> <script src="js/tailwind-config.js"></script>
    depois o <script src="https://cdn.tailwindcss.com"></script>) */

if (!window.tailwind) window.tailwind = {};

tailwind.config = {
  darkMode: 'class', // habilita modo escuro via classe "dark" no <html>
};
