/**
 * Central portfolio data — generated from Vikas Gurav's resume.
 * Every fact on the site comes from this file. Update it here and the whole site follows.
 */

export type Palette = { from: string; via: string; to: string; accent: string };

export const profile = {
  fullName: 'Vikas Gurav',
  displayName: 'Vikas Gurav',
  firstName: 'VIKAS',
  seriesTag: 'THE BUILD',
  /** Studio card shown at the very start of the opening sequence. */
  originalLabel: 'DEVELOPED BY VIKAS',
  role: 'Java Full Stack Developer',
  tagline: ['Java Full Stack', 'Spring Boot', 'AWS Certified'],
  intro:
    'Java Full Stack Developer with 1+ year at Capgemini building microservices applications with Java, Spring Boot, Spring Cloud and React.js, secured with JWT and role-based access. Built an AI code-generation tool with Python, FastAPI and Angular. AWS Certified Cloud Practitioner. B.Tech CGPA 8.7.',
  location: 'Mumbai, Maharashtra, India',
  email: 'vikasgurav.work@gmail.com',
  phone: '+91 9987184506',
  links: {
    linkedin: 'https://linkedin.com/in/vikas-gurav',
    github: 'https://github.com/Vikas-G6',
  },
  resumePdf: '/assets/Vikas_Gurav_Resume.pdf',
  portrait: {
    src: '/assets/portrait-720.webp',
    srcSet: '/assets/portrait-420.webp 420w, /assets/portrait-720.webp 720w, /assets/portrait-1100.webp 1100w',
    alt: 'Portrait of Vikas Gurav',
  },
  interests: ['System Design', 'Cloud Architecture (AWS)', 'AI / LLM Integration'],
};

export const education = [
  {
    school: 'Thakur College of Engineering and Technology',
    place: 'Mumbai',
    degree: 'Bachelor of Technology — Electronics and Telecommunication Engineering',
    period: '2021 – 2025',
    score: 'CGPA 8.7/10',
  },
];

export const experience = [
  {
    company: 'Capgemini',
    role: 'Software Engineer',
    place: 'India',
    period: 'July 2025 – September 2026',
    points: [
      'Built StreamAgent, an AI-powered code-generation IDE for the CTO team: users describe a UI in plain English and get Angular, React or Vue components in a VS Code-style interface with file tree, tabs, syntax highlighting and live preview.',
      'Developed the Python FastAPI backend that detects the target framework, calls an LLM through an OpenAI-compatible API, parses the output into files and streams them to the browser using Server-Sent Events (SSE).',
      'Designed a plain-text FILE/END_FILE output format with regex parsing in place of JSON, removing failures caused by invalid or truncated JSON on large LLM outputs.',
      'Built the Angular 17 and TypeScript frontend with an RxJS-based SSE client, recursive file explorer, tabbed viewer and highlight.js, isolating each file\'s state so streamed content never mixes.',
      'Wrote the project guide covering architecture, API reference, setup, known issues and knowledge transfer.',
      'Completed Capgemini\'s Java full-stack training and evaluations covering Java, Spring Boot, React.js, MySQL and REST API development.',
    ],
  },
];

export type Metric = { value: string; label: string };

export type Project = {
  id: string;
  title: string;
  year: string;
  genre: string;
  /** One-line summary shown in the quest list row. Falls back to logline when omitted. */
  summary?: string;
  logline: string;
  /** Role/capacity in the project, e.g. "Sole Developer" or "Software Engineer". */
  role?: string;
  /** One sentence describing the outcome / result. Falls back to logline when omitted. */
  outcome?: string;
  stack: string[];
  build: string[];
  features: string[];
  metrics: Metric[];
  /** Omit when the repository isn't public — the GitHub button is hidden instead of linking to a 404. */
  github?: string;
  /** Omit when no live demo exists — the Demo button is hidden. */
  demo?: string;
  palette: Palette;
  motif: 'shield' | 'flow' | 'tenants';
  /** Status shown in the quest list. Defaults to "Complete". */
  status?: 'Complete' | 'Active' | 'Planned';
};

export const projects: Project[] = [
  {
    id: 'streamagent',
    title: 'StreamAgent',
    year: '2026',
    genre: 'AI • LLM • Full Stack',
    summary: 'AI code-generation IDE — plain English to Angular / React / Vue components.',
    role: 'Sole Developer',
    outcome: 'Shipped to the Capgemini CTO team; eliminates JSON truncation failures with a plain-text FILE/END_FILE format and SSE streaming.',
    status: 'Active',
    logline: 'An AI-powered code-generation IDE for the CTO team — describe a UI in plain English, get live Angular, React or Vue components.',
    stack: ['Python', 'FastAPI', 'Angular 17', 'TypeScript', 'RxJS', 'SSE', 'LLM'],
    build: [
      'Built StreamAgent, an AI-powered code-generation IDE for the CTO team: users describe a UI in plain English and get Angular, React or Vue components in a VS Code-style interface with file tree, tabs, syntax highlighting and live preview.',
      'Developed the Python FastAPI backend that calls an LLM through an OpenAI-compatible API and streams files to the browser via Server-Sent Events (SSE). Designed a plain-text FILE/END_FILE format with regex parsing to eliminate JSON truncation failures.',
      'Built the Angular 17 frontend with an RxJS SSE client, recursive file explorer and tabbed viewer using highlight.js, isolating each file\'s state so streamed content never mixes.',
    ],
    features: [
      'Plain-English UI description → generated components',
      'Supports Angular, React and Vue output',
      'VS Code-style interface: file tree, tabs, syntax highlighting',
      'Live preview of generated components',
      'Server-Sent Events (SSE) streaming',
      'Regex-based FILE/END_FILE parsing — no JSON truncation failures',
    ],
    metrics: [
      { value: '3', label: 'frameworks supported (Angular, React, Vue)' },
      { value: 'SSE', label: 'real-time streaming to browser' },
      { value: '0', label: 'JSON truncation failures' },
    ],
    palette: { from: '#0a1a2a', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' },
    motif: 'flow',
  },
  {
    id: 'online-job-portal',
    title: 'Online Job Portal',
    year: '2025',
    genre: 'Full Stack • Microservices • Spring Cloud',
    summary: 'Microservices job portal with JWT auth, RBAC, circuit breakers and React UI.',
    role: 'Full Stack Developer',
    outcome: 'End-to-end job portal supporting employer and job-seeker roles, with Resilience4j circuit breakers keeping search alive when services go down.',
    status: 'Complete',
    logline: 'A full-stack job portal on a microservices backend — JWT auth, role-based access, circuit breakers and React UI for employers and job seekers.',
    stack: ['Java 21', 'Spring Boot', 'Spring Cloud', 'MySQL', 'React.js', 'JWT', 'Eureka', 'Resilience4j'],
    build: [
      'Built a full-stack job portal on a microservices backend (auth, admin and user services) behind a Spring Cloud API Gateway with Eureka service discovery, and a React.js frontend for employers and job seekers.',
      'Implemented stateless JWT authentication with role-based access (employer and job seeker) and ownership checks so users can only read or change their own data.',
      'Connected services with OpenFeign and added Resilience4j circuit breakers with fallbacks, so registration and job search keep working when another service is down.',
    ],
    features: [
      'Microservices: auth, admin, user services',
      'Spring Cloud API Gateway + Eureka service discovery',
      'Stateless JWT auth with role-based access (employer / job seeker)',
      'Resilience4j circuit breakers with fallbacks',
      'Role-based React pages: post jobs, search, apply, save, message',
      'JUnit 5 + Mockito tests for service layer and secured endpoints',
    ],
    metrics: [
      { value: '3', label: 'microservices (auth, admin, user)' },
      { value: 'JWT', label: 'stateless auth + RBAC' },
      { value: '2', label: 'roles: employer & job seeker' },
    ],
    github: 'https://github.com/Vikas-G6/Online-Job-Portal',
    palette: { from: '#1a0d02', via: '#8a4a07', to: '#0a0806', accent: '#ffb547' },
    motif: 'shield',
  },
  {
    id: 'ogs-gaming-store',
    title: 'OGS Gaming Store',
    year: '2025',
    genre: 'Full Stack • E-Commerce • Stripe',
    summary: 'E-commerce gaming store — Stripe payments, JWT security and React 19 frontend.',
    role: 'Full Stack Developer',
    outcome: 'Complete e-commerce platform with Stripe in test mode, admin analytics and full JUnit 5 / Mockito test coverage across four microservices.',
    status: 'Complete',
    logline: 'A microservices e-commerce gaming store with Stripe payments, JWT security and a React 19 frontend for browsing, cart and checkout.',
    stack: ['Java 17', 'Spring Boot', 'Spring Cloud', 'MySQL', 'React.js', 'Stripe', 'JWT', 'Eureka'],
    build: [
      'Built an e-commerce gaming store on a microservices architecture with user, product, cart and order services, Spring Cloud Gateway and Eureka.',
      'Secured services with JWT and role-based access (admin and customer), with BCrypt-hashed passwords and service-to-service calls through OpenFeign.',
      'Integrated Stripe payments in test mode with a simulation fallback, and built an admin analytics page.',
    ],
    features: [
      'Microservices: user, product, cart, order services',
      'Spring Cloud Gateway + Eureka',
      'JWT + RBAC (admin / customer) with BCrypt passwords',
      'Stripe payments in test mode with simulation fallback',
      'Admin analytics page',
      'React 19 + Vite frontend: browse, cart, checkout, order history',
      'JUnit 5 + Mockito tests with MockMvc and H2 test database',
    ],
    metrics: [
      { value: '4', label: 'microservices (user, product, cart, order)' },
      { value: 'Stripe', label: 'payments integrated (test mode)' },
      { value: 'React 19', label: 'frontend with Vite' },
    ],
    palette: { from: '#0f1a0a', via: '#2d6e1a', to: '#070d05', accent: '#46e3a8' },
    motif: 'tenants',
  },
];

export type Achievement = {
  id: string;
  title: string;
  org: string;
  detail: string;
  laurel: string;
  link?: string;
};

export const achievements: Achievement[] = [
  {
    id: 'capgemini',
    title: 'Software Engineer',
    org: 'Capgemini',
    detail: 'Built StreamAgent — an AI-powered code-generation IDE for the CTO team. Completed Java full-stack training covering Spring Boot, React.js, MySQL and REST APIs.',
    laurel: '1+ Year Experience',
  },
  {
    id: 'aws-ccp',
    title: 'Cloud Practitioner',
    org: 'Amazon Web Services',
    detail: 'AWS Certified Cloud Practitioner — credential verified on Credly.',
    laurel: 'AWS Certified',
    link: 'https://www.credly.com/badges/45a0e75e-ab14-40b2-a91e-9101a56fed06/public_url',
  },
  {
    id: 'btec',
    title: 'CGPA 8.7 / 10',
    org: 'B.Tech — EXTC',
    detail: 'Bachelor of Technology in Electronics and Telecommunication Engineering at Thakur College of Engineering and Technology, Mumbai.',
    laurel: 'Academic Score',
  },
  {
    id: 'streamagent',
    title: 'StreamAgent IDE',
    org: 'CTO Team · Capgemini',
    detail: 'Sole developer of an AI code-generation tool used by the CTO team. Python FastAPI backend + Angular 17 frontend with SSE streaming and live preview.',
    laurel: 'Shipped to Production',
  },
  {
    id: 'microservices',
    title: '2 Microservice Platforms',
    org: 'Personal Projects',
    detail: 'Built Online Job Portal and OGS Gaming Store — both on Spring Cloud microservices with JWT, Eureka, API Gateway and Resilience4j circuit breakers.',
    laurel: 'Full Stack Projects',
  },
];

export type Certification = { issuer: string; name: string; link: string };

export const certifications: Certification[] = [
  { issuer: 'AWS', name: 'Certified Cloud Practitioner', link: 'https://www.credly.com/badges/45a0e75e-ab14-40b2-a91e-9101a56fed06/public_url' },
];

export type Skill = { name: string; mono: string; note?: string };
export type SkillCategory = { id: string; title: string; subtitle: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    subtitle: 'Java is the primary weapon',
    skills: [
      { name: 'Java', mono: 'Jv', note: 'Primary' },
      { name: 'Python', mono: 'Py' },
      { name: 'JavaScript', mono: 'Js' },
      { name: 'TypeScript', mono: 'Ts' },
      { name: 'SQL', mono: 'Sq' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    subtitle: 'Spring ecosystem & APIs',
    skills: [
      { name: 'Spring Boot', mono: 'Sb', note: 'Core' },
      { name: 'Spring Cloud', mono: 'Sc' },
      { name: 'Spring Security', mono: 'Ss' },
      { name: 'JWT', mono: 'Jw' },
      { name: 'Spring Data JPA', mono: 'Jp' },
      { name: 'Hibernate', mono: 'Hb' },
      { name: 'REST APIs', mono: 'Re' },
      { name: 'Microservices', mono: 'Ms' },
      { name: 'Resilience4j', mono: 'R4' },
      { name: 'FastAPI', mono: 'Fa' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    subtitle: 'React, Angular & the web',
    skills: [
      { name: 'React.js', mono: 'Rx' },
      { name: 'Redux', mono: 'Rd' },
      { name: 'Angular', mono: 'An' },
      { name: 'RxJS', mono: 'Rj' },
      { name: 'HTML5', mono: 'Ht' },
      { name: 'CSS3', mono: 'Cs' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases',
    subtitle: 'Relational & NoSQL',
    skills: [
      { name: 'MySQL', mono: 'My' },
      { name: 'MongoDB', mono: 'Mg' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    subtitle: 'Unit & integration tests',
    skills: [
      { name: 'JUnit 5', mono: 'Ju' },
      { name: 'Mockito', mono: 'Mo' },
      { name: 'MockMvc', mono: 'Mv' },
      { name: 'Postman', mono: 'Pm' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Cloud',
    subtitle: 'LLM integration & AWS',
    skills: [
      { name: 'LLM Integration', mono: 'Lm' },
      { name: 'AI Agents', mono: 'Ai' },
      { name: 'Prompt Engineering', mono: 'Pe' },
      { name: 'SSE', mono: 'Se' },
      { name: 'AWS', mono: 'Aw', note: 'Certified' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Infra',
    subtitle: 'Dev workflow & shipping',
    skills: [
      { name: 'Git / GitHub', mono: 'Gt' },
      { name: 'Stripe API', mono: 'St' },
      { name: 'IntelliJ IDEA', mono: 'Ij' },
      { name: 'VS Code', mono: 'Vs' },
    ],
  },
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    subtitle: 'The core stat sheet',
    skills: [
      { name: 'DSA', mono: 'Ds' },
      { name: 'OOP', mono: 'Oo' },
      { name: 'DBMS', mono: 'Db' },
      { name: 'Operating Systems', mono: 'Os' },
      { name: 'Computer Networks', mono: 'Cn' },
    ],
  },
];

export const skillEvidence: Record<string, string[]> = {
  Java: ['StreamAgent (Capgemini)', 'Online Job Portal', 'OGS Gaming Store'],
  Python: ['StreamAgent — FastAPI backend'],
  JavaScript: ['React.js frontends', 'Angular 17 frontend'],
  TypeScript: ['StreamAgent — Angular 17 frontend'],
  SQL: ['MySQL in Job Portal & Gaming Store'],
  'Spring Boot': ['Online Job Portal', 'OGS Gaming Store'],
  'Spring Cloud': ['Online Job Portal', 'OGS Gaming Store'],
  'Spring Security': ['Online Job Portal', 'OGS Gaming Store'],
  JWT: ['Online Job Portal', 'OGS Gaming Store'],
  'Spring Data JPA': ['Online Job Portal', 'OGS Gaming Store'],
  Hibernate: ['Online Job Portal', 'OGS Gaming Store'],
  'REST APIs': ['All three projects'],
  Microservices: ['Online Job Portal', 'OGS Gaming Store'],
  Resilience4j: ['Online Job Portal — circuit breakers with fallbacks'],
  FastAPI: ['StreamAgent — Python backend'],
  'React.js': ['Online Job Portal', 'OGS Gaming Store'],
  Redux: ['Online Job Portal frontend'],
  Angular: ['StreamAgent — Angular 17 frontend'],
  RxJS: ['StreamAgent — RxJS SSE client'],
  MySQL: ['Online Job Portal', 'OGS Gaming Store'],
  'JUnit 5': ['Online Job Portal', 'OGS Gaming Store'],
  Mockito: ['Online Job Portal', 'OGS Gaming Store'],
  MockMvc: ['OGS Gaming Store — H2 test database'],
  'LLM Integration': ['StreamAgent — OpenAI-compatible API'],
  'AI Agents': ['StreamAgent — code-generation IDE'],
  'Prompt Engineering': ['StreamAgent — LLM output parsing'],
  SSE: ['StreamAgent — real-time file streaming'],
  AWS: ['AWS Certified Cloud Practitioner'],
  'Stripe API': ['OGS Gaming Store — test mode payments'],
  'Git / GitHub': ['All projects'],
  DSA: ['B.Tech Computer Science fundamentals'],
  OOP: ['Java throughout all projects'],
};

export type Episode = {
  code: string;
  title: string;
  description: string;
  tags: string[];
  runtime: string;
  palette: Palette;
};

export type Season = {
  number: number;
  title: string;
  period: string;
  synopsis: string;
  episodes: Episode[];
};

const forge: Palette = { from: '#1c1003', via: '#6b3c06', to: '#0a0806', accent: '#d4820a' };
const crimson: Palette = { from: '#24060b', via: '#6e0d1d', to: '#09070a', accent: '#c0392b' };
const ocean: Palette = { from: '#04121f', via: '#0f4c6e', to: '#05080d', accent: '#4cc9ff' };
const jade: Palette = { from: '#03150f', via: '#0d5a40', to: '#050a08', accent: '#46e3a8' };
const violet: Palette = { from: '#120822', via: '#3d1a6e', to: '#07060c', accent: '#b98bff' };

export const seasons: Season[] = [
  {
    number: 1,
    title: 'Origin Story',
    period: '2021 – 2025',
    synopsis: 'B.Tech in Electronics and Telecommunication Engineering at Thakur College of Engineering and Technology, Mumbai.',
    episodes: [
      {
        code: 'S01 E01',
        title: 'The Engineer',
        description: 'Bachelor of Technology in Electronics and Telecommunication Engineering at Thakur College of Engineering and Technology, Mumbai — finishing with a CGPA of 8.7.',
        tags: ['B.Tech', 'EXTC', 'CGPA 8.7'],
        runtime: '2021 – 2025',
        palette: forge,
      },
      {
        code: 'S01 E02',
        title: 'The Foundation',
        description: 'Built the fundamentals — DSA, OOP, DBMS, Operating Systems and Computer Networks. Java becomes the primary weapon.',
        tags: ['Java', 'DSA', 'OOP', 'DBMS'],
        runtime: 'Mumbai',
        palette: ocean,
      },
    ],
  },
  {
    number: 2,
    title: 'The Training Arc',
    period: '2025 – 2026',
    synopsis: 'Software Engineer at Capgemini — Java full-stack training, then solo-built StreamAgent, an AI code-generation IDE for the CTO team.',
    episodes: [
      {
        code: 'S02 E01',
        title: 'The Recruit',
        description: 'Joined Capgemini as a Software Engineer. Completed intensive Java full-stack training covering Java, Spring Boot, React.js, MySQL and REST API development.',
        tags: ['Capgemini', 'Java', 'Spring Boot', 'React.js'],
        runtime: 'July 2025',
        palette: forge,
      },
      {
        code: 'S02 E02',
        title: 'The Architect',
        description: 'Designed StreamAgent\'s architecture: Python FastAPI backend, OpenAI-compatible LLM API, plain-text FILE/END_FILE output format with regex parsing to eliminate JSON failures.',
        tags: ['Python', 'FastAPI', 'LLM', 'SSE'],
        runtime: 'CTO Team',
        palette: ocean,
      },
      {
        code: 'S02 E03',
        title: 'The Builder',
        description: 'Built the Angular 17 + TypeScript frontend with RxJS SSE client, recursive file explorer, tabbed viewer and highlight.js syntax highlighting.',
        tags: ['Angular 17', 'TypeScript', 'RxJS'],
        runtime: 'StreamAgent',
        palette: violet,
      },
      {
        code: 'S02 E04',
        title: 'The Deployer',
        description: 'Wrote the full project guide: architecture, API reference, setup, known issues and knowledge transfer. StreamAgent ships to the CTO team.',
        tags: ['Documentation', 'Knowledge Transfer'],
        runtime: 'Sept 2026',
        palette: jade,
      },
    ],
  },
  {
    number: 3,
    title: 'Side Quests',
    period: '2025',
    synopsis: 'Two personal projects — a full-stack job portal and an e-commerce gaming store — both on Spring Cloud microservices.',
    episodes: [
      {
        code: 'S03 E01',
        title: 'Job Portal',
        description: 'Full-stack job portal on microservices (auth, admin, user) behind Spring Cloud API Gateway with Eureka. JWT auth, RBAC and Resilience4j circuit breakers.',
        tags: ['Java 21', 'Spring Cloud', 'Eureka', 'JWT'],
        runtime: '2025',
        palette: forge,
      },
      {
        code: 'S03 E02',
        title: 'The React Chapter',
        description: 'Role-based React pages for posting and managing jobs, searching, applying, saving jobs to a basket and messaging — React Router + Axios.',
        tags: ['React.js', 'Redux', 'Axios'],
        runtime: 'Job Portal',
        palette: crimson,
      },
      {
        code: 'S03 E03',
        title: 'Gaming Store',
        description: 'OGS Gaming Store: e-commerce platform with user, product, cart and order microservices. Stripe payments, admin analytics, React 19 + Vite frontend.',
        tags: ['Java 17', 'Stripe', 'React 19', 'Vite'],
        runtime: '2025',
        palette: jade,
      },
      {
        code: 'S03 E04',
        title: 'Test Coverage',
        description: 'JUnit 5 and Mockito tests across both projects — service layer tests, MockMvc endpoint tests and H2 in-memory database for integration tests.',
        tags: ['JUnit 5', 'Mockito', 'MockMvc', 'H2'],
        runtime: 'Both Projects',
        palette: ocean,
      },
    ],
  },
  {
    number: 4,
    title: "Currently Learning",
    period: 'In progress',
    synopsis: 'The next arc: deeper System Design, Cloud Architecture on AWS and AI/LLM integration at scale.',
    episodes: [
      {
        code: 'S04 E01',
        title: 'System Design',
        description: 'Exploring distributed systems, high-availability architecture, caching strategies and large-scale API design.',
        tags: ['System Design', 'Distributed Systems'],
        runtime: 'In progress',
        palette: forge,
      },
      {
        code: 'S04 E02',
        title: 'Cloud Level Up',
        description: 'Building deeper AWS expertise beyond Cloud Practitioner — EC2, RDS, Lambda, S3 and infrastructure as code.',
        tags: ['AWS', 'Cloud Architecture', 'Lambda'],
        runtime: 'In progress',
        palette: ocean,
      },
      {
        code: 'S04 E03',
        title: 'AI at Scale',
        description: 'Taking the LLM integration experience from StreamAgent further — building production-grade AI agents and pipelines.',
        tags: ['AI Agents', 'LLM', 'Prompt Engineering'],
        runtime: 'In progress',
        palette: violet,
      },
    ],
  },
];

export type TopPick = { label: string; title: string; detail: string; palette: Palette };

export const topPicks: TopPick[] = [
  { label: 'Primary weapon', title: 'Java', detail: 'Spring Boot · Spring Cloud · Microservices', palette: forge },
  { label: 'Shipped to CTO team', title: 'StreamAgent', detail: 'AI code-generation IDE · FastAPI + Angular 17', palette: ocean },
  { label: 'Current employer', title: 'Capgemini', detail: 'Software Engineer · July 2025 – Sept 2026', palette: crimson },
  { label: 'Cloud credential', title: 'AWS CCP', detail: 'Certified Cloud Practitioner', palette: forge },
  { label: 'Architecture pattern', title: 'Microservices', detail: 'Spring Cloud · Eureka · API Gateway · Resilience4j', palette: jade },
  { label: 'Payments integration', title: 'Stripe API', detail: 'OGS Gaming Store · test mode', palette: violet },
  { label: 'Security layer', title: 'JWT + RBAC', detail: 'Spring Security · BCrypt · role-based access', palette: crimson },
  { label: 'AI feature', title: 'LLM + SSE', detail: 'OpenAI-compatible API · real-time streaming', palette: ocean },
  { label: 'Test stack', title: 'JUnit 5 + Mockito', detail: 'MockMvc · H2 · service & endpoint tests', palette: jade },
  { label: 'Next mission', title: 'System Design', detail: 'with Cloud Architecture & AI at scale', palette: violet },
];

/** Slides for the "▶ Play Intro" cinematic sequence. */
export type IntroSlide = { kicker: string; title: string; lines: string[]; chips?: string[] };

export const introSlides: IntroSlide[] = [
  {
    kicker: 'Education',
    title: 'B.Tech · EXTC',
    lines: ['Thakur College of Engineering and Technology, Mumbai', '2021 – 2025 · CGPA 8.7/10'],
    chips: ['CGPA 8.7'],
  },
  {
    kicker: 'Experience',
    title: 'Software Engineer',
    lines: ['Capgemini · July 2025 – September 2026', 'Java full-stack training + StreamAgent IDE for the CTO team'],
    chips: ['Capgemini', '1+ Year'],
  },
  {
    kicker: 'Skills',
    title: 'Java First.',
    lines: ['Spring Boot · Spring Cloud · React.js · Angular', 'FastAPI · JWT · Microservices · Resilience4j'],
    chips: ['Java', 'Spring Boot', 'React.js', 'Angular', 'FastAPI'],
  },
  {
    kicker: 'Featured Quest',
    title: 'StreamAgent IDE',
    lines: ['AI code-generation tool for the Capgemini CTO team', 'Plain English → Angular / React / Vue components · SSE streaming'],
  },
  {
    kicker: 'Side Quests',
    title: 'Two Projects',
    lines: ['Online Job Portal — Spring Cloud · JWT · React.js', 'OGS Gaming Store — Stripe · Microservices · React 19'],
  },
  {
    kicker: 'Certified',
    title: 'AWS Certified',
    lines: ['Amazon Web Services — Cloud Practitioner', 'Credential verified on Credly'],
  },
  {
    kicker: 'Next mission',
    title: 'Currently Learning',
    lines: ['System Design · Cloud Architecture (AWS) · AI at Scale'],
  },
];

export type ProfileId = 'vikas' | 'recruiter' | 'developer' | 'creative';
export type SectionId = 'about' | 'journey' | 'originals' | 'picks' | 'skills' | 'moments' | 'story';

export const viewerProfiles: {
  id: ProfileId;
  name: string;
  blurb: string;
  color: string;
  order: SectionId[];
}[] = [
  {
    id: 'vikas',
    name: 'Vikas',
    blurb: 'The full build, in order',
    color: '#d4820a',
    order: ['about', 'journey', 'originals', 'picks', 'skills', 'moments', 'story'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Experience, skills & resume first',
    color: '#4cc9ff',
    order: ['story', 'moments', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'developer',
    name: 'Developer',
    blurb: 'Projects, stack & GitHub first',
    color: '#46e3a8',
    order: ['originals', 'skills', 'journey', 'moments', 'about', 'picks', 'story'],
  },
  {
    id: 'creative',
    name: 'Explorer',
    blurb: 'Origin story & highlights first',
    color: '#d4820a',
    order: ['journey', 'picks', 'originals', 'moments', 'about', 'skills', 'story'],
  },
];

export const sectionMeta: Record<SectionId, { nav: string; card: string; meta: string; palette: Palette }> = {
  about: { nav: 'Character', card: 'Character Sheet', meta: 'Origin · Education & Experience', palette: violet },
  journey: { nav: 'Story Arc', card: 'Story Arc', meta: `${seasons.length} Arcs · ${seasons.reduce((n, s) => n + s.episodes.length, 0)} Episodes`, palette: forge },
  originals: { nav: 'Quests', card: 'Featured Quests', meta: `${projects.length} Quests · 2025–2026`, palette: crimson },
  picks: { nav: 'Top Drops', card: 'Top Drops', meta: 'Top 10 from the build', palette: jade },
  skills: { nav: 'Stat Sheet', card: 'Stat Sheet', meta: `${skillCategories.length} Categories`, palette: ocean },
  moments: { nav: 'Trophies', card: 'Trophies & Certs', meta: `${achievements.length} Trophies · ${certifications.length} Certification`, palette: forge },
  story: { nav: 'Resume', card: 'The Full Build', meta: 'Resume · View & download', palette: violet },
};
