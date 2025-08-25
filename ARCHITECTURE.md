# 📐 Arquitetura Frontend — vinimmartins.github.io

Este documento descreve a organização de arquivos, fluxo de importação e responsabilidades de cada módulo.

---

## 📂 Estrutura de Pastas

```plaintext
vinimmartins.github.io/
├─ index.html
├─ assets/
│  ├─ profile.png
│  ├─ CV_ViniciusMatheusMartins_EN.pdf
│  └─ CV_ViniciusMatheusMartins_PT.pdf
├─ css/
│  ├─ core.css        # estilos comuns
│  ├─ desktop.css     # ajustes desktop (>=640px)
│  └─ mobile.css      # ajustes mobile (<=639px)
└─ js/
   ├─ theme-early.js     # aplica tema antes de renderizar
   ├─ theme-init.js      # garante consistência do tema no load
   ├─ i18n.js            # dicionário + tradução EN/PT
   ├─ mode-controller.js # controla light/dark/system
   ├─ mode-picker.js     # conecta UI do tema ao controlador
   ├─ lang-picker.js     # conecta UI de idioma ao i18n
   ├─ mobile-menu.js     # toggle do menu hamburguer
   ├─ core.js            # entrypoint comum
   ├─ desktop.js         # inicializações específicas do desktop
   └─ mobile.js          # inicializações específicas do mobile
