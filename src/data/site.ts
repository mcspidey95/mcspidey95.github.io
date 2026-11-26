export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  tags: string[];
  preview: string;
  github?: string;
  privateLabel?: string;
  featured?: boolean;
}

export const site = {
  name: 'Manish Bhat',
  handle: 'mcspidey95',
  role: 'AI Engineer',
  location: 'Bengaluru, IN',
  coords: '12.9716 N / 77.5946 E',
  url: 'https://mcspidey95.github.io',
  email: 'manishbhat666@gmail.com',
  github: 'https://github.com/mcspidey95',
  resume: '/resume.pdf',
  description:
    'AI Engineer at EpicMinds building production agentic systems, local-first AI infrastructure, and interactive web software.',
  roles: ['AI Engineer', 'Agentic Systems Builder', 'Full-Stack Developer'],
  alterAliases: ['Friendly Neighborhood Spidey', 'Lord Sakai', 'Ken Kaneki', 'Rocky Bhai'],
  socials: [
    { label: 'GitHub', href: 'https://github.com/mcspidey95' },
    { label: 'Email', href: 'mailto:manishbhat666@gmail.com' },
  ],
};

export const projects: Project[] = [
  {
    slug: 'valaris',
    title: 'Valaris',
    year: '2026',
    role: 'Architect & Solo Builder',
    tagline: '24/7 multi-node personal AI ecosystem across Linux, Android, and cloud',
    summary:
      'A local-first autonomous AI co-pilot running 24/7 on a 2 GB Lenovo home server, wired into a Pixel 10 Kotlin companion app, a Dell workstation offload node, and a fail-closed biometric security gate.',
    problem:
      'Cloud chatbots forget context the moment a tab closes, cannot safely touch local hardware or messaging bridges, and burn memory when run as bloated container stacks.',
    solution:
      'Designed an event-driven multi-node mesh over Tailscale: a 24/7 Arch Linux home base running the Hermes runtime, Baileys WhatsApp bridge, PipeWire audio hub, and Vault Sentinel, paired with a native Jetpack Compose Android uplink (:8899 WebSocket) and a fail-closed Zero-Trust Operator Gate requiring phone biometric approval for sensitive actions.',
    outcome:
      'Runs continuously within ~500 MB idle footprint, automates meeting capture, Obsidian knowledge-graph maintenance, and multi-device task routing with zero cloud lock-in.',
    tags: ['Python', 'Kotlin', 'Jetpack Compose', 'Arch Linux', 'Tailscale', 'Zero-Trust'],
    preview: '/assets/pfp2.jpg',
    privateLabel: 'Private Architecture (Valaris-AI)',
    featured: true,
  },
  {
    slug: 'dungeons-ai-dragons',
    title: 'Dungeons, AI & Dragons',
    year: '2025',
    role: 'AI & Full-Stack Developer',
    tagline: 'AI tabletop RPG dungeon master with dynamic scene generation',
    summary:
      'Reimagines classic tabletop RPG sessions with an AI dungeon master that tracks character state, narrates branching encounters, and generates scene art on the fly.',
    problem:
      'Traditional LLM text adventures lose world state over long sessions and burn tokens repeating static lore.',
    solution:
      'Built a Svelte web client backed by structured LLM prompting, state-aware turn memory, Stable Diffusion XL scene art, and adaptive audio cues.',
    outcome:
      'Delivers responsive multiplayer-style storytelling with tight token budgets and persistent campaign pacing.',
    tags: ['Svelte', 'LLM', 'LangChain', 'SDXL', 'JavaScript'],
    preview: '/assets/dad.gif',
    github: 'https://github.com/mcspidey95/Dungeons-AI-Dragons',
    featured: true,
  },
  {
    slug: 'terminaltab',
    title: 'TerminalTab',
    year: '2026',
    role: 'Creator',
    tagline: 'Customizable keyboard-first browser new-tab workspace',
    summary:
      'Replaces the sterile browser new-tab screen with a fast, themeable command surface featuring shortcuts, widgets, and utility tools.',
    problem:
      'Default browser start pages waste every new tab on static search bars and clutter.',
    solution:
      'Engineered a lightweight JavaScript and Node.js start page with retro themes, quick-launch commands, and modular utilities.',
    outcome:
      'Actively maintained daily-driver workspace evolving into a local-first personal portal.',
    tags: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
    preview: '/assets/terminalTab.gif',
    github: 'https://github.com/mcspidey95/TerminalTab',
    featured: true,
  },
  {
    slug: 'examdesk',
    title: 'ExamDesk',
    year: '2024',
    role: 'Lead Developer',
    tagline: 'Automated exam timetables, hall seating, and invigilator engine',
    summary:
      'Desktop application that computes conflict-free university exam timetables, room seating layouts, and invigilator rosters in seconds.',
    problem:
      'Manual exam scheduling across thousands of students and rooms takes days and regularly introduces seat or invigilator clashes.',
    solution:
      'Built a Java constraint engine wrapped in a Svelte and Electron desktop interface capable of processing 200,000+ student entries.',
    outcome:
      'Cuts scheduling time from days to seconds with deterministic, clash-free exports.',
    tags: ['Java', 'Svelte', 'Electron', 'Node.js'],
    preview: '/assets/examdesk.gif',
    github: 'https://github.com/mcspidey95/ExamDesk',
    featured: true,
  },
];

export const experience = [
  {
    company: 'EpicMinds Information Technology',
    location: 'Bengaluru',
    role: 'AI Engineer',
    period: 'Aug 2025 - Present',
    points: [
      'Architecting production AI workflows, structured LLM pipelines, and internal engineering tooling.',
      'Mentoring engineering interns in AI-native software design, JSON/schema modeling, and rapid prototyping.',
    ],
  },
  {
    company: 'EpicMinds Information Technology',
    location: 'Bengaluru',
    role: 'Python Developer Intern',
    period: 'Apr 2025 - Jul 2025',
    points: [
      'Built backend Python automation services and data pipelines ahead of full-time conversion.',
    ],
  },
];

export const education = [
  {
    school: 'Presidency University, Bengaluru',
    degree: 'BTech in Computer Science & Engineering (AI & ML)',
    period: '2021 - 2025',
    grade: '8.51 CGPA',
    highlights: [
      'Course Topper in Data Structures & Algorithms (1st among 2,400 students).',
      'Winner of AIdeathon at Global Academy of Technology (AI waterlogging management).',
    ],
  },
];

export const capabilityGroups = [
  {
    title: 'AI & Agents',
    items: ['LLM Orchestration', 'LangChain', 'Prompt & Schema Design', 'RAG & Local Inference', 'TensorFlow / Keras', 'Stable Diffusion'],
  },
  {
    title: 'Full-Stack & Mobile',
    items: ['TypeScript / JS', 'Astro / React / Svelte', 'Node.js', 'Kotlin / Jetpack Compose', 'Electron', '.NET / C#'],
  },
  {
    title: 'Systems & Infra',
    items: ['Arch Linux', 'Systemd & PipeWire', 'Tailscale Mesh', 'WebSockets', 'Git & GitHub Actions', 'Zero-Trust Tooling'],
  },
  {
    title: 'Languages',
    items: ['Python', 'TypeScript', 'Java', 'Kotlin', 'C / C#', 'SQL'],
  },
];
