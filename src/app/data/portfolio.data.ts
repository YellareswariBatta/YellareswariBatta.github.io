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

export interface FeaturedProject {
  title: string;
  kicker: string;
  tagline: string;
  summary: string;
  live: string;
  source: string;
  shots: { id: string; label: string; src: string; alt: string }[];
  features: { icon: string; title: string; text: string }[];
  stack: string[];
}

export const PROFILE: Profile = {
  name: 'Yellareswari Batta',
  firstName: 'Yellareswari',
  title: 'Senior Frontend Engineer & UI/UX Developer · Angular & React',
  location: 'Hyderabad, India',
  email: 'mail2yellareswari@gmail.com',
  phone: '+91 94925 76855',
  phoneHref: 'tel:+919492576855',
  linkedin: 'https://www.linkedin.com/in/yellareswari-batta-b873a916b',
  github: 'https://github.com/YellareswariBatta',
  resume: 'Yellareswari_Batta_Resume.pdf',
};

/** Roles I'm applying for — shown in the hero and contact sections. */
export const OPEN_ROLES = [
  'Senior Frontend Developer',
  'Senior Angular Developer',
  'Frontend Engineer',
  'Senior UI Developer',
  'Senior Product Engineer (Frontend)',
  'UI Engineer',
  'Frontend Developer – Angular/React',
  'React Developer',
  'React.js Developer',
  'Software Engineer – Frontend',
  'UI/UX Developer',
];

export const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'featured', label: 'React app' },
  { id: 'work', label: 'Work' },
  { id: 'sandbox', label: 'Play' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
];

export const MARQUEE = [
  'Angular 20',
  'Signals',
  'React 18',
  'TypeScript',
  'RxJS',
  'NgRx',
  'React Hook Form',
  'Zod',
  'Material UI',
  'Tailwind CSS',
  'Figma',
  'Design Systems',
  'WCAG Accessibility',
  'Vite',
  'Vitest',
  'Prompt Engineering',
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
    title: 'UX design & Figma prototyping',
    description:
      'I design user flows, wireframes and interactive Figma prototypes, then build them into responsive, accessible production UI — dynamic forms, calendars, filters and purposeful motion.',
    tags: ['Figma', 'Wireframes', 'User flows', 'Interactive prototypes', 'Custom animations'],
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
    title: 'Angular & React architecture',
    description:
      'Angular (14 → 20, Signals, RxJS, NgRx) every day at work; React 18 with hooks, Router and Hook Form in my own builds.',
    tags: ['Angular', 'Signals', 'React', 'NgRx'],
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'AI-assisted engineering',
    description:
      'Prompt engineering with Cursor, Claude and ChatGPT to prototype, refactor and generate tests faster — reviewed like any other code.',
    tags: ['Prompting', 'Cursor', 'Claude'],
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
    role: 'Software Engineer · Frontend & UI',
    period: '2022 — 2024',
    summary:
      'Customer-facing commerce journeys and Salesforce-integrated enterprise tools, built in Angular with NgRx state management.',
    challenge:
      'High-traffic journeys had to load fast and work in every browser, while new Angular UIs lived alongside legacy JSP/Servlet modules.',
    approach: [
      'Built reusable components and optimised customer user journeys',
      'Managed complex app state with NgRx and RxJS',
      'Integrated REST APIs end to end, working closely with the backend team on contracts',
      'Delivered Angular upgrades while maintaining legacy modules',
    ],
    impact: [
      { value: '~30%', label: 'faster page loads' },
      { value: 'Cross-browser', label: 'consistent on every major browser' },
    ],
    stack: ['Angular', 'NgRx', 'RxJS', 'TypeScript', 'REST APIs'],
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
    description: 'Typed, tested Angular and React frontends, wired to APIs through clear contracts.',
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
    title: 'Software Engineer',
    location: 'Hyderabad',
    period: 'Jun 2022 — Aug 2024',
    highlights: [
      'Developed e-commerce and Salesforce-integrated applications for US clients with Angular, TypeScript, RxJS and NgRx.',
      'Built reusable components and optimised user journeys, reducing page load time by ~30% with cross-browser support.',
      'Integrated REST APIs and managed complex application state with NgRx and RxJS.',
      'Delivered Angular upgrades and maintained legacy JSP/Servlet modules alongside new Angular UIs.',
    ],
    stack: ['Angular', 'RxJS', 'NgRx', 'TypeScript', 'REST APIs'],
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
    title: 'Software Developer Intern',
    location: 'Bangalore',
    period: '2020',
    highlights: ['Built frontend features in Vue.js for an e-commerce application.'],
    stack: ['Vue.js', 'JavaScript', 'HTML', 'CSS'],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    icon: 'fa-brands fa-angular',
    title: 'Angular',
    items: ['Angular (14–20)', 'Signals', 'Standalone Components', 'RxJS', 'NgRx', 'Reactive Forms', 'Angular Material', 'Angular CDK', 'Lazy Loading'],
  },
  {
    icon: 'fa-brands fa-react',
    title: 'React',
    items: ['React 18', 'Hooks', 'Context API', 'React Router', 'React Hook Form', 'Zod', 'Material UI', 'dnd-kit', 'Recharts', 'Vite'],
  },
  {
    icon: 'fa-solid fa-code',
    title: 'Core web',
    items: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS / SCSS', 'Tailwind CSS', 'Responsive & Mobile-First', 'Web Performance', 'REST API Integration', 'Web Crypto API'],
  },
  {
    icon: 'fa-solid fa-pen-nib',
    title: 'UX design',
    items: ['Figma', 'Wireframing', 'User Flows', 'Interactive Prototypes', 'UX Principles', 'Design Systems', 'Design Tokens', 'Component Libraries', 'Accessibility (WCAG)', 'Micro-interactions'],
  },
  {
    icon: 'fa-solid fa-vial-circle-check',
    title: 'Testing & delivery',
    items: ['Vitest', 'React Testing Library', 'Jasmine', 'Karma', 'TDD', 'Code Reviews', 'Git', 'CI/CD (GitHub Actions)', 'Agile (Scrum/Kanban)'],
  },
  {
    icon: 'fa-solid fa-wand-magic-sparkles',
    title: 'AI-assisted engineering',
    items: ['Prompt Engineering', 'Cursor AI', 'Claude & Claude Code', 'ChatGPT', 'AI Pair Programming', 'AI Prototyping', 'AI-assisted Refactoring', 'AI Test Generation', 'Reviewing AI Output'],
  },
];

export const FEATURED: FeaturedProject = {
  title: 'Job Application Tracker',
  kicker: 'Personal project · React 18',
  tagline: 'A colourful, drag-and-drop Kanban for the job hunt.',
  summary:
    'Designed and built end to end in React: track applications across a Kanban board, get follow-up nudges and see progress on a live dashboard. Front-end only — everything stays in the browser.',
  live: 'https://yellareswaribatta.github.io/job-application-tracker/',
  source: 'https://github.com/YellareswariBatta/job-application-tracker',
  shots: [
    { id: 'board', label: 'Board', src: 'projects/board.webp', alt: 'Kanban board with Applied, Interviewing, Offer and Rejected columns of job cards' },
    { id: 'dashboard', label: 'Dashboard', src: 'projects/dashboard.webp', alt: 'Dashboard with response rate, status donut chart and weekly applications bar chart' },
    { id: 'landing', label: 'Landing', src: 'projects/landing.webp', alt: 'Landing page reading “Land your next role, one application at a time”' },
  ],
  features: [
    { icon: 'fa-solid fa-grip', title: 'Drag-and-drop board', text: 'Mouse, touch and keyboard drag with dnd-kit, plus undo for every move.' },
    { icon: 'fa-solid fa-list-check', title: 'Validated forms', text: 'React Hook Form + Zod, and a paste-a-job-advert helper that pre-fills fields.' },
    { icon: 'fa-solid fa-chart-pie', title: 'Insightful dashboard', text: 'Response rate, hiring funnel and a weekly goal ring, charted with Recharts.' },
    { icon: 'fa-solid fa-shield-halved', title: 'Private by design', text: 'Browser-only accounts with salted PBKDF2 hashing via the Web Crypto API.' },
    { icon: 'fa-solid fa-scale-balanced', title: 'Offer comparison', text: 'Compare up to three offers with an effective hourly rate estimate.' },
    { icon: 'fa-solid fa-palette', title: 'Themes & exports', text: 'Light/dark mode, five colour themes, and JSON, CSV and .ics export.' },
  ],
  stack: ['React 18', 'Vite', 'React Router', 'Material UI', 'Tailwind CSS', 'dnd-kit', 'React Hook Form', 'Zod', 'Recharts', 'Vitest', 'React Testing Library', 'GitHub Actions'],
};

/** Side-by-side snippets for the Angular ⇄ React switcher. */
export const FRAMEWORK_SNIPPETS = {
  angular: `@Component({
  selector: 'app-status-card',
  template: \`
    <article class="card">
      <h3>{{ company() }}</h3>
      <app-badge [status]="status()" />
      <button (click)="advance()">Move forward</button>
    </article>
  \`,
})
export class StatusCard {
  company = input.required<string>();
  status = signal<Status>('applied');

  advance() {
    this.status.update(next);
  }
}`,
  react: `export function StatusCard({ company }: Props) {
  const [status, setStatus] = useState<Status>('applied');

  return (
    <article className="card">
      <h3>{company}</h3>
      <Badge status={status} />
      <button onClick={() => setStatus(next)}>
        Move forward
      </button>
    </article>
  );
}`,
};

export const FRAMEWORK_PAIRS = [
  { topic: 'State', angular: 'Signals & computed', react: 'useState & useMemo' },
  { topic: 'Async', angular: 'RxJS & effects', react: 'Hooks & effects' },
  { topic: 'App state', angular: 'NgRx', react: 'Context API' },
  { topic: 'Forms', angular: 'Reactive Forms', react: 'React Hook Form + Zod' },
  { topic: 'UI kit', angular: 'Material & CDK', react: 'Material UI & Tailwind' },
  { topic: 'Testing', angular: 'Jasmine, Karma, Vitest', react: 'Vitest & Testing Library' },
];

export const EDUCATION = {
  school: 'Rajiv Gandhi University of Knowledge Technologies',
  campus: 'IIIT Nuzvid',
  degree: "Bachelor's in Computer Science",
  gpa: '9.0',
  period: '2017 — 2021',
};
