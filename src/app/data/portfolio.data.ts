// Single source of truth for portfolio content — keep in sync with the resume.

export interface Profile {
  name: string;
  firstName: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  phoneHref: string;
  linkedin: string;
  github: string;
  resume: string;
}

export interface Metric {
  value: number;
  prefix?: string;
  suffix: string;
  label: string;
  context: string;
}

export interface Capability {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  role: string;
  period: string;
  summary: string;
  challenge: string;
  approach: string[];
  impact: { value: string; label: string }[];
  stack: string[];
  visual: 'healthcare' | 'design-system' | 'commerce' | 'banking';
}

export interface ProcessStep {
  icon: string;
  title: string;
  description: string;
}

export interface Role {
  company: string;
  title: string;
  location: string;
  period: string;
  current?: boolean;
  highlights: string[];
  stack: string[];
}

export interface SkillGroup {
  icon: string;
  title: string;
  items: string[];
}

export const PROFILE: Profile = {
  name: 'Yellareswari Batta',
  firstName: 'Yellareswari',
  title: 'Senior Full Stack Engineer & UI/UX Developer',
  location: 'Hyderabad, India',
  email: 'mail2yellareswari@gmail.com',
  phone: '+91 94925 76855',
  phoneHref: 'tel:+919492576855',
  linkedin: 'https://www.linkedin.com/in/yellareswari-batta-b873a916b',
  github: 'https://github.com/YellareswariBatta',
  resume: 'Yellareswari_Batta_Resume.pdf',
};

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'sandbox', label: 'Play' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];

export const MARQUEE = [
  'Angular 20',
  'Signals',
  'React',
  'TypeScript',
  'RxJS',
  'NgRx',
  'Figma',
  'Design Systems',
  'Design Tokens',
  'WCAG Accessibility',
  'SCSS',
  'Spring Boot',
  'REST APIs',
  'MySQL',
  'Jasmine / Karma',
  'Micro-interactions',
];

export const METRICS: Metric[] = [
  { value: 5, suffix: '+', label: 'Years', context: 'designing & shipping enterprise web products' },
  { value: 30, prefix: '~', suffix: '%', label: 'Faster UI dev', context: 'with an in-house design system & tokens' },
  { value: 25, prefix: '~', suffix: '%', label: 'Smaller bundle', context: 'after leading Angular upgrades & Signals' },
  { value: 20, prefix: '~', suffix: '%', label: 'Quicker workflows', context: 'task completion time on key healthcare flows' },
  { value: 60, suffix: '%+', label: 'Test coverage', context: 'after introducing Jasmine/Karma unit testing' },
  { value: 30, prefix: '~', suffix: '%', label: 'Faster loads', context: 'on high-traffic e-commerce journeys' },
];

export const CAPABILITIES: Capability[] = [
  {
    icon: 'fa-solid fa-pen-ruler',
    title: 'Figma to production UI',
    description:
      'I turn Figma designs and business requirements into responsive, user-centric interfaces — dynamic forms, calendars, filters and purposeful motion.',
    tags: ['Figma', 'Prototyping', 'UX principles', 'Custom animations'],
  },
  {
    icon: 'fa-solid fa-swatchbook',
    title: 'Design systems',
    description:
      'Token-driven component libraries that keep products consistent and let teams ship UI ~30% faster.',
    tags: ['Design tokens', 'Component libraries'],
  },
  {
    icon: 'fa-solid fa-universal-access',
    title: 'Accessible by default',
    description: 'Semantic, keyboard-friendly, WCAG-minded interfaces that work for everyone, on every screen.',
    tags: ['WCAG', 'Mobile-first'],
  },
  {
    icon: 'fa-solid fa-layer-group',
    title: 'Frontend architecture',
    description:
      'Scalable Angular (14 → 20, Signals) and React apps with RxJS, NgRx, lazy loading and clear API contracts.',
    tags: ['Angular', 'Signals', 'React', 'NgRx'],
  },
  {
    icon: 'fa-solid fa-server',
    title: 'Full stack delivery',
    description: 'Java & Spring Boot REST APIs with validation and security, backed by tuned MySQL queries.',
    tags: ['Spring Boot', 'REST', 'MySQL'],
  },
  {
    icon: 'fa-solid fa-handshake',
    title: 'Client partnership',
    description:
      'Requirement gathering, weekly demos and product discussions directly with UK & US clients — plus mentoring juniors.',
    tags: ['Workshops', 'Demos', 'Mentoring'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'healthcare',
    title: 'Enterprise Healthcare Platform',
    client: 'UK healthcare clients',
    role: 'Senior Product Engineer · Frontend & UX lead',
    period: '2024 — Present',
    summary:
      'Built from scratch in Angular 20 — owning frontend architecture, UI/UX and delivery from the first requirement to production release.',
    challenge:
      'Complex healthcare workflows had to feel simple for everyday users, while the platform stayed configurable across multiple clients.',
    approach: [
      'Gathered requirements and ran weekly demos directly with clients',
      'Designed responsive, accessible flows from Figma — dynamic forms, calendars, filters and custom animations',
      'Established a scalable component system and configurable application foundations',
      'Defined API contracts and TypeScript models with the backend team',
    ],
    impact: [
      { value: '~20%', label: 'faster task completion on key workflows' },
      { value: '~25%', label: 'smaller bundle after Signals adoption' },
      { value: '60%+', label: 'unit test coverage' },
    ],
    stack: ['Angular 20', 'Signals', 'TypeScript', 'SCSS', 'Figma', 'Jasmine/Karma'],
    visual: 'healthcare',
  },
  {
    id: 'design-system',
    title: 'Design System & Component Library',
    client: 'In-house · HealthFirst Technologies',
    role: 'Design system owner',
    period: '2024 — Present',
    summary:
      'A token-driven, in-house component library that turns design decisions into reusable, accessible Angular building blocks.',
    challenge:
      'Shipping consistent UI across products meant repeating the same patterns and relying on third-party UI libraries that didn’t match the product.',
    approach: [
      'Defined design tokens for colour, typography, spacing and motion',
      'Built reusable, accessible components with clear, typed APIs',
      'Aligned components with Figma so design and code share one vocabulary',
    ],
    impact: [
      { value: '~30%', label: 'less UI development time' },
      { value: 'Fewer', label: 'third-party UI dependencies' },
    ],
    stack: ['Angular', 'Design tokens', 'SCSS', 'Accessibility', 'Figma'],
    visual: 'design-system',
  },
  {
    id: 'commerce',
    title: 'E-commerce & Salesforce Apps',
    client: 'US clients · Girnar Newtel Solutions',
    role: 'Software Engineer (Full Stack)',
    period: '2022 — 2024',
    summary:
      'Customer-facing commerce journeys and Salesforce-integrated enterprise tools — end to end, from Angular UI to Spring Boot APIs.',
    challenge:
      'High-traffic journeys had to load fast and work in every browser, while new Angular UIs lived alongside legacy JSP/Servlet modules.',
    approach: [
      'Built reusable components and optimised customer user journeys',
      'Designed secure Spring Boot REST APIs with validation and exception handling',
      'Optimised MySQL queries on high-traffic endpoints',
      'Delivered Angular upgrades while maintaining legacy modules',
    ],
    impact: [
      { value: '~30%', label: 'faster page loads' },
      { value: 'E2E', label: 'UI, APIs and data layer' },
    ],
    stack: ['Angular', 'NgRx', 'RxJS', 'Java', 'Spring Boot', 'MySQL'],
    visual: 'commerce',
  },
  {
    id: 'banking',
    title: 'Banking & Financial Applications',
    client: 'US clients · Achala IT Solutions',
    role: 'Associate Software Engineer',
    period: '2021 — 2022',
    summary: 'Secure, responsive interfaces for financial workflows where accuracy and trust are non-negotiable.',
    challenge: 'Financial users need interfaces that feel trustworthy — secure, stable and clear under real-world use.',
    approach: [
      'Implemented business-critical features with Angular, TypeScript and RxJS',
      'Integrated REST APIs with secure, stable application behaviour',
      'Delivered production fixes and support within an Agile team',
    ],
    impact: [
      { value: 'Secure', label: 'responsive financial UIs' },
      { value: 'Agile', label: 'sprint delivery & production support' },
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS'],
    visual: 'banking',
  },
];

export const PROCESS: ProcessStep[] = [
  {
    icon: 'fa-solid fa-magnifying-glass',
    title: 'Discover',
    description: 'Requirement sessions with clients and stakeholders to understand users, constraints and goals.',
  },
  {
    icon: 'fa-solid fa-bezier-curve',
    title: 'Design',
    description: 'Flows and high-fidelity UI in Figma, grounded in UX principles and accessibility.',
  },
  {
    icon: 'fa-solid fa-cubes',
    title: 'Systemise',
    description: 'Translate designs into tokens and reusable components so every screen stays consistent.',
  },
  {
    icon: 'fa-solid fa-code',
    title: 'Build',
    description: 'Typed, tested frontends and Spring Boot APIs, connected through clear API contracts.',
  },
  {
    icon: 'fa-solid fa-rocket',
    title: 'Demo & ship',
    description: 'Weekly demos and feedback loops, then a confident production release — and iterate.',
  },
];

export const EXPERIENCE: Role[] = [
  {
    company: 'HealthFirst Technologies',
    title: 'Senior Product Engineer',
    location: 'Hyderabad',
    period: 'Sep 2024 — Present',
    current: true,
    highlights: [
      'Lead frontend architecture, UI/UX and end-to-end delivery for enterprise healthcare applications serving UK clients.',
      'Built healthcare applications from scratch with Angular 20, TypeScript and SCSS on scalable component foundations.',
      'Designed accessible interfaces from Figma — dynamic forms, calendars, filters, animations — cutting key task time by ~20%.',
      'Built an in-house design system with design tokens, cutting UI development time by ~30%.',
      'Led Angular upgrades and Signals adoption (~25% smaller bundle); introduced unit testing to 60%+ coverage.',
      'Work directly with clients on requirements and weekly demos; mentor juniors and use AI-assisted workflows (Cursor, Claude).',
    ],
    stack: ['Angular 20', 'Signals', 'TypeScript', 'SCSS', 'Figma', 'Jasmine'],
  },
  {
    company: 'Girnar Newtel Solutions',
    title: 'Software Engineer (Full Stack)',
    location: 'Hyderabad',
    period: 'Jun 2022 — Aug 2024',
    highlights: [
      'Developed full stack e-commerce and Salesforce-integrated applications for US clients.',
      'Built reusable components and optimised user journeys, reducing page load time by ~30% with cross-browser support.',
      'Designed Spring Boot REST APIs with validation, security and exception handling; optimised MySQL queries.',
      'Delivered Angular upgrades and maintained legacy JSP/Servlet modules alongside new Angular UIs.',
    ],
    stack: ['Angular', 'RxJS', 'NgRx', 'Java', 'Spring Boot', 'MySQL'],
  },
  {
    company: 'Achala IT Solutions',
    title: 'Associate Software Engineer',
    location: 'Hyderabad',
    period: 'May 2021 — May 2022',
    highlights: [
      'Developed banking and financial applications for US clients with secure, responsive interfaces.',
      'Implemented business-critical features, production fixes and REST API integrations.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'HTML', 'CSS'],
  },
  {
    company: 'Rugas Technologies',
    title: 'Full Stack Developer Intern',
    location: 'Bangalore',
    period: '2020',
    highlights: ['Built frontend features in Vue.js and backend services in Feathers.js (Node.js) for an e-commerce app.'],
    stack: ['Vue.js', 'Node.js', 'Feathers.js'],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    icon: 'fa-solid fa-window-maximize',
    title: 'Frontend',
    items: ['Angular (14–20)', 'Signals', 'React', 'React Hooks', 'TypeScript', 'JavaScript (ES6+)', 'RxJS', 'NgRx', 'HTML5', 'CSS / SCSS', 'Angular Material', 'Reactive Forms', 'Lazy Loading', 'Vue.js'],
  },
  {
    icon: 'fa-solid fa-pen-nib',
    title: 'UI / UX',
    items: ['Figma', 'Design Systems', 'Design Tokens', 'Component Libraries', 'Responsive & Mobile-First', 'Accessibility (WCAG)', 'Prototyping', 'Custom Animations'],
  },
  {
    icon: 'fa-solid fa-database',
    title: 'Backend & Data',
    items: ['Java', 'Spring Boot', 'RESTful APIs', 'API Contract Design', 'Node.js (Feathers.js)', 'JSP/Servlets', 'MySQL', 'SQL'],
  },
  {
    icon: 'fa-solid fa-vial-circle-check',
    title: 'Testing & Quality',
    items: ['Jasmine', 'Karma', 'JUnit', 'Unit Testing', 'TDD', 'Debugging', 'Code Reviews'],
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'Tools & AI',
    items: ['Git', 'CI/CD', 'AWS', 'VS Code', 'Cursor AI', 'Claude', 'ChatGPT'],
  },
  {
    icon: 'fa-solid fa-people-group',
    title: 'Practices',
    items: ['Agile (Scrum/Kanban)', 'System Design', 'Web Performance', 'Application Security', 'Client Collaboration', 'Mentoring'],
  },
];

export const EDUCATION = {
  school: 'Rajiv Gandhi University of Knowledge Technologies',
  campus: 'IIIT Nuzvid',
  degree: "Bachelor's in Computer Science",
  gpa: '9.0',
  period: '2017 — 2021',
};
