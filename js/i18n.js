// =====================
// i18n.js
// =====================

'use strict';

/* Dicionário EN/PT */
const i18n = {
    en: {
    'meta.title': 'Vinicius Martins Resume',
    'meta.description': 'Senior Automation Developer at Practia Global',
    'nav.resume': 'Resume',
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.projects': 'Projects',
    'nav.cv': 'CV',
    'nav.contact': 'Contact',
    'hero.subtitle': 'Senior Automation Developer at Practia Global',
    'hero.ctaProjects': 'Projects',
    'hero.ctaContact': 'Talk to me',
    'about.title': 'About',
    'about.body': `Since the beginning of my career, I have been drawn to technology and how it can be used to drive innovation and transformation. As a Developer, I have the opportunity to apply my passion in my daily profession, working on projects that involve automation, development, and process improvement.<br><br>My career path is marked by extensive experience working with multidisciplinary teams, always aiming to achieve the best results through clear and effective communication. Working on different projects has allowed me to develop collaborative skills and adaptability to work with various profiles of people and contexts, always aiming for the delivery of excellent work.<br><br>With a Bachelor’s degree in Computer Science and technical training in Computer Networks, I have been in contact with technology from an early age. Since 2013, I have worked with resources and technologies in various areas, including Programming and Development, Operating Systems, Projects, among others.<br><br>I have also participated in Programming Marathons (Hackathons) in the past, including the Hackathon - Code of Law and the HackMED - Conference and Health Hackathon, where I had the opportunity to work as a team and develop technological solutions to real problems. These were valuable experiences that allowed me to learn and develop skills in problem-solving and teamwork.`,
    'works.title': 'Works',
    'projects.title': 'Featured Personal Projects',
    'projects.compraFacil.badge': 'Ongoing project',
    'projects.compraFacil.desc': 'Home system for purchase and stock control with 2D reader (QR/EAN). Built with Flask + SQLite, lookup in Open Food Facts.',
    'projects.code': 'Code',
    'projects.docs': 'Docs',
    'cv.lead': 'Access my full CV below:',
    'cv.openEn': 'Open CV (EN)',
    'cv.downloadEn': 'Download CV (EN)',
    'cv.openPt': 'Open CV (PT)',
    'cv.downloadPt': 'Download CV (PT)',
    'contact.title': 'Contact',
    'contact.emailLabel': 'Email:',
    'label.theme': 'Theme',
    'label.language': 'Language',
    'mode.light': 'Light',
    'mode.dark': 'Dark',
    'mode.system': 'System'
    },
    pt: {
    'meta.title': 'Vinicius Martins Resumo',
    'meta.description': 'Desenvolvedor Sênior de Automação na Practia Global',
    'nav.resume': 'Resumo',
    'nav.about': 'Sobre',
    'nav.work': 'Trabalhos',
    'nav.projects': 'Projetos',
    'nav.cv': 'CV',
    'nav.contact': 'Contato',
    'hero.subtitle': 'Desenvolvedor Sênior de Automação na Practia Global',
    'hero.ctaProjects': 'Projetos',
    'hero.ctaContact': 'Fale comigo',
    'about.title': 'Sobre',
    'about.body': `Desde o início da minha carreira, fui atraído pela tecnologia e como ela pode ser usada para impulsionar a inovação e a transformação. Como Desenvolvedor, tenho a oportunidade de aplicar minha paixão em minha profissão diariamente, trabalhando em projetos que envolvem automação, desenvolvimento e melhoria de processos.<br><br>Minha trajetória profissional é marcada por uma ampla experiência em trabalhar com equipes multidisciplinares, sempre buscando alcançar os melhores resultados por meio de uma comunicação clara e eficaz. Atuar em diferentes projetos me permitiu desenvolver habilidades colaborativas e adaptabilidade para trabalhar com diferentes perfis de pessoas e contextos, visando sempre a entrega de um trabalho de excelência.<br><br>Bacharel em Ciência da Computação e com formação técnica em Rede de Computadores, tive contato com tecnologia desde muito cedo. Desde 2013, tenho trabalhado com recursos e tecnologias em diversas áreas, incluindo Programação e Desenvolvimento, Sistemas Operacionais, Projetos, entre outras.<br><br>Também participei de Maratonas de Programação (Hackathons) no passado, incluindo o Hackathon - Code of Law e o HackMED - Conference and Health Hackathon, onde tive a oportunidade de trabalhar em equipe e desenvolver soluções tecnológicas para problemas reais. Foram experiências valiosas que me permitiram aprender e desenvolver habilidades em resolução de problemas e trabalho em equipe.`,
    'works.title': 'Experiências Profissionais',
    'projects.title': 'Projetos Pessoais em Destaque',
    'projects.compraFacil.badge': 'Em andamento',
    'projects.compraFacil.desc': 'Sistema doméstico de compras e controle de estoque com leitor 2D (QR/EAN). Feito com Flask + SQLite e consulta ao Open Food Facts.',
    'projects.code': 'Código',
    'projects.docs': 'Documentação',
    'cv.lead': 'Acesse meu CV completo abaixo:',
    'cv.openEn': 'Abrir CV (EN)',
    'cv.downloadEn': 'Baixar CV (EN)',
    'cv.openPt': 'Abrir CV (PT)',
    'cv.downloadPt': 'Baixar CV (PT)',
    'contact.title': 'Contato',
    'contact.emailLabel': 'E-mail:',
    'label.theme': 'Tema',
    'label.language': 'Idioma',
    'mode.light': 'Claro',
    'mode.dark': 'Escuro',
    'mode.system': 'Sistema'
}
};

/* Função principal */
function applyI18n(lang) {
const dict = i18n[lang] || i18n.en;

// Atualiza <html lang>
document.documentElement.setAttribute('lang', lang === 'pt' ? 'pt-BR' : 'en');

// Meta tags
const metaTitleEl = document.getElementById('meta-title');
const metaDescEl = document.getElementById('meta-description');
if (metaTitleEl) metaTitleEl.textContent = dict['meta.title'];
if (metaDescEl) metaDescEl.setAttribute('content', dict['meta.description']);

// Todos os elementos com data-i18n
document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (!dict[key]) return;
    if (key === 'about.body') {
    node.innerHTML = dict[key]; // precisa aceitar <br>
    } else {
    node.textContent = dict[key];
    }
});

try { localStorage.setItem('lang', lang); } catch (_) {}
}
window.applyI18n = applyI18n;

/* Inicializa idioma ao carregar */
(function initLang() {
let stored = 'en';
try {
    stored = localStorage.getItem('lang') ||
            ((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
} catch (_) {}
applyI18n(stored);
})();
