// src/data/i18n.ts
export const i18n = {
  pt: {
    // Navbar
    navHome: 'Início',
    navAbout: 'Sobre Mim',
    navSkills: 'Skills',
    navProjects: 'Projetos',
    navContact: 'Contato',

    // Hero
    heroGreeting: 'Olá, eu sou',
    heroName: 'Lucas Pinheiro',
    heroFullGreeting: 'Olá, eu sou Lucas Pinheiro',
    heroTitle: 'Desenvolvedor Front-End',
    heroButton: 'Ver Meus Projetos',

    // About
    aboutTitle: 'Sobre Mim',
    aboutParagraph1: 'Olá, seja bem-vindo(a) ao meu portfólio! É um prazer ter você por aqui.',
    aboutParagraph2: 'Me chamo Lucas Pinheiro, sou um desenvolvedor apaixonado por criar soluções inovadoras e eficientes, com experiência sólida em tecnologias modernas. Tenho um forte domínio em React Native, TypeScript, React, NodeJS e busco sempre aprimorar minhas habilidades para entregar produtos de alta qualidade e impactar positivamente os projetos nos quais estou envolvido.',
    aboutParagraph3: 'Com uma mentalidade voltada para o aprendizado contínuo, criando aplicativos robustos, escaláveis e de fácil manutenção. Além disso, tenho experiência no desenvolvimento de soluções móveis com React Native e sou familiarizado com práticas de integração contínua e metodologias ágeis.',
    aboutParagraph4: 'Procuro oportunidades que me permitam aplicar meus conhecimentos no desenvolvimento mobile, crescer profissionalmente e contribuir para equipes que valorizem inovação, colaboração e excelência.',

    // Skills
    skillsTitle: 'Skills & Tecnologias',
    skillsFrontend: 'Frontend',
    skillsMobile: 'Mobile',
    skillsBackend: 'Backend',
    skillsTools: 'Ferramentas',

    // Projects
    projectsTitle: 'Meus Projetos',
    projectsViewGithub: 'Ver no GitHub',
    projectTodoDescription: 'Um aplicativo de gerenciamento de tarefas que permite aos usuários adicionar, editar e remover tarefas, ajudando a organizar o dia a dia de forma eficiente.',
    projectIgniteshoesDescription: 'Uma aplicação de e-commerce focada na venda de calçados, com funcionalidades como busca de produtos, carrinho de compras e checkout.',
    projectMotorlyDescription: 'O Motorly é um aplicativo que apresenta um catálogo de marcas automotivas. O projeto prioriza uma interface limpa e navegação eficiente para facilitar a descoberta rápida de veículos.',
    projectFlowpayDescription: 'FlowPay é uma solução de gestão de pagamentos que facilita a organização de transações seguras e rápidas para aplicações móveis. O projeto inclui integração com provedores de pagamento, fluxo de checkout otimizado e foco em experiência do usuário e segurança.',
    projectRemindDescription: 'Aplicativo de lembretes de remédios: cadastro de medicamentos, horários, recorrências e toasts animados. Construído com React Native + TypeScript, com animações Reanimated + Lottie e persistência via Zustand + AsyncStorage.',

    // Contact
    contactTitle: 'Contato',
    contactTagline: 'Transformando ideias em soluções digitais',
    contactEmail: 'Email',
    contactPhone: 'Telefone',
    footerText: 'Todos os direitos reservados.',
  },
  en: {
    // Navbar
    navHome: 'Home',
    navAbout: 'About',
    navSkills: 'Skills',
    navProjects: 'Projects',
    navContact: 'Contact',

    // Hero
    heroGreeting: 'Hi, I\'m',
    heroName: 'Lucas Pinheiro',
    heroFullGreeting: 'Hi, I\'m Lucas Pinheiro',
    heroTitle: 'Front-End Developer',
    heroButton: 'View My Projects',

    // About
    aboutTitle: 'About Me',
    aboutParagraph1: 'Welcome to my portfolio! It\'s a pleasure to have you here.',
    aboutParagraph2: 'My name is Lucas Pinheiro, and I\'m a developer passionate about creating innovative and efficient solutions with solid experience in modern technologies. I have a strong command of React Native, TypeScript, React, NodeJS, and I constantly seek to improve my skills to deliver high-quality products and positively impact the projects I\'m involved with.',
    aboutParagraph3: 'With a mindset focused on continuous learning, I create robust, scalable, and easy-to-maintain applications. I also have experience developing mobile solutions with React Native and am familiar with continuous integration practices and agile methodologies.',
    aboutParagraph4: 'I seek opportunities to apply my knowledge in mobile development, grow professionally, and contribute to teams that value innovation, collaboration, and excellence.',

    // Skills
    skillsTitle: 'Skills & Technologies',
    skillsFrontend: 'Frontend',
    skillsMobile: 'Mobile',
    skillsBackend: 'Backend',
    skillsTools: 'Tools',

    // Projects
    projectsTitle: 'My Projects',
    projectsViewGithub: 'View on GitHub',
    projectTodoDescription: 'A task management application that enables users to add, edit, and remove tasks, helping organize daily activities efficiently.',
    projectIgniteshoesDescription: 'An e-commerce application focused on selling shoes, featuring product search, shopping cart, and checkout functionality.',
    projectMotorlyDescription: 'Motorly is an application that presents a catalog of automotive brands. The project prioritizes a clean interface and efficient navigation for quick vehicle discovery.',
    projectFlowpayDescription: 'FlowPay is a payment management solution that facilitates secure and fast transaction organization for mobile applications. Includes payment provider integration, optimized checkout flow, and focus on user experience and security.',
    projectRemindDescription: 'Medicine reminder application: medication registration, schedules, recurrences, and animated toasts. Built with React Native + TypeScript, featuring Reanimated + Lottie animations and persistence via Zustand + AsyncStorage.',

    // Contact
    contactTitle: 'Contact',
    contactTagline: 'Turning ideas into digital solutions',
    contactEmail: 'Email',
    contactPhone: 'Phone',
    footerText: 'All rights reserved.',
  },
};

export type Language = 'pt' | 'en';
export type TranslationKey = keyof typeof i18n.pt;
