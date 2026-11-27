export interface Project {
  slug: string;
  title: string;
  year: string;
  role: string;
  tagline: string;
  summary: string;
  story: string;
  problem: string;
  solution: string;
  outcome: string;
  highlights: string[];
  tags: string[];
  preview: string;
  github?: string;
  liveUrl?: string;
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
  roles: ['an AI Engineer.', 'a Systems Builder.', 'a Web Developer.', 'a Problem Solver.'],
  alterAliases: ['Spider-Man.', 'Lord Sakai.', 'Ken Kaneki.', 'Rocky Bhai.'],
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
    story:
      'Valaris started as "Project E.V." out of a simple frustration: every cloud chatbot forgets who you are the moment you close the tab, lives behind someone else\'s API wall, and cannot touch your real machines or workflows. Rooted in Valor and Polaris (North Star), I wanted an equal engineering partner that stays awake 24/7 on a humble 2 GB Lenovo laptop I already owned — wired into my phone, my workstation, and my speakers with complete data ownership.',
    problem:
      'Cloud assistants are stateless and blind to local hardware, while most self-hosted agent stacks demand 8-16 GB of RAM in bloated Docker containers and hand out unrestricted shell access with zero guardrails.',
    solution:
      'Designed an event-driven multi-node mesh over Tailscale: a 24/7 Arch Linux home base running the Hermes runtime, a 4-tier cognitive memory stack (Markdown bedrock, SQLite FTS5 forensics, Honcho local memory via EmbeddingGemma, and an Obsidian knowledge graph), a Baileys WhatsApp bridge, and a PipeWire audio hub. Heavy builds offload to my Dell G15 over SSH, while a custom Jetpack Compose Android app (:8899 WebSocket) enforces a fail-closed Zero-Trust Operator Gate requiring phone BiometricPrompt approval before sensitive shell, SSH, or messaging actions execute.',
    outcome:
      'Runs continuously within a ~500 MB idle footprint on a 2 GB machine — automating meeting capture, second-brain knowledge maintenance, and multi-device task routing with zero cloud lock-in.',
    highlights: [
      '~500 MB idle RAM footprint running 24/7 on a 2 GB Lenovo Arch Linux home base',
      'Fail-closed Zero-Trust Operator Gate with Pixel 10 BiometricPrompt 120s leases (auto-revoked on screen lock)',
      '4-tier continuous memory: ground-truth Markdown, FTS5 session search, Honcho + EmbeddingGemma, Obsidian Vault',
      'Event-driven Tailscale mesh linking home server, Dell workstation offload node, and Android uplink',
    ],
    tags: ['Python', 'Kotlin', 'Jetpack Compose', 'Arch Linux', 'Tailscale', 'Zero-Trust'],
    preview: '/assets/valaris.gif',
    privateLabel: 'Private Architecture (Valaris-AI)',
    featured: true,
  },
  {
    slug: 'terminaltab',
    title: 'TerminalTab',
    year: '2026',
    role: 'Creator',
    tagline: 'Customizable keyboard-first browser new-tab workspace',
    summary:
      'Replaces the sterile browser new-tab screen with a fast, themeable command cockpit featuring live-preview themes, quick search, media utilities, and an idle screensaver minigame.',
    story:
      'As a developer, I open a new browser tab dozens of times a day — and every time, I was staring at the same sterile white search bar or ad-heavy feed. I wanted my new tab to feel like sitting down at my own custom terminal cockpit: fast, keyboard-first, styled after shows and games I actually love, and packed with utilities one keystroke away.',
    problem:
      'Default browser start pages waste prime daily real estate, while most custom new-tab extensions are bloated, track browsing habits, or paywall basic themes and widgets.',
    solution:
      'Engineered a lightweight JavaScript and Node.js start page with a retro terminal aesthetic, instant live-preview theme switching (Arcane, Cyberpunk, Demon Slayer, Oshi No Ko, Among Us, plus a randomizer), multi-engine search, and built-in tools like a 1-click MP4/MP3 YouTube downloader and system cleanup helpers. Added a 15-second idle bouncing DVD screensaver that flips into a playable Spacebar minigame.',
    outcome:
      'Became my daily-driver browser workspace across machines and continues to evolve into a local-first personal portal with zero tracking and instant load times.',
    highlights: [
      'Instant live-preview theme engine + randomizer with zero tracking or bloat',
      '15-second idle bouncing DVD screensaver that transitions into a playable Spacebar minigame',
      'Built-in YouTube MP4/MP3 downloader, quick search routing, and favorite command links',
    ],
    tags: ['JavaScript', 'Node.js', 'HTML', 'CSS'],
    preview: '/assets/terminalTab.gif',
    github: 'https://github.com/mcspidey95/TerminalTab',
    featured: true,
  },
  {
    slug: 'dungeons-ai-dragons',
    title: 'Dungeons, AI & Dragons',
    year: '2025',
    role: 'AI & Full-Stack Developer',
    tagline: 'AI tabletop RPG dungeon master with dynamic scene generation',
    summary:
      'Reimagines classic tabletop RPG sessions with an AI dungeon master that tracks character state, adjudicates choices with d20 rolls, and generates scene art on the fly.',
    story:
      'Classic tabletop D&D is pure magic because you can try anything and the world reacts — but getting a group together and prepping campaigns takes hours. Standard LLM text adventures fell flat for me because they forget your inventory after five turns and lack real stakes. I wanted a chaotic, replayable AI Dungeon Master where you could drop anyone — yourself, your friends, or a pop-culture icon — into any genre and play with real d20 tension.',
    problem:
      'Naive LLM RPG wrappers suffer from world-state drift over long sessions, burn tokens repeating static lore, and feel flat without visual atmosphere or probabilistic game mechanics.',
    solution:
      'Built a Svelte web client deployed on Vercel backed by structured LLM prompting and LangChain state management that preserves character sheets, inventory, and campaign pacing within tight token budgets. Paired freeform player inputs with simulated d20 dice rolls for uncertain outcomes and Stable Diffusion XL (SDXL) for dynamic scene artwork.',
    outcome:
      'Live at dad-thegame.vercel.app — delivers infinite, genre-agnostic solo campaigns (fantasy, sci-fi, horror, anime) where every decision and dice roll genuinely branches the story.',
    highlights: [
      'Live playable web app deployed on Vercel (dad-thegame.vercel.app)',
      'Token-efficient structured prompt orchestration preserving character and world state',
      'Simulated d20 dice-roll mechanics adjudicating risky player choices',
      'On-the-fly Stable Diffusion XL scene generation per encounter',
    ],
    tags: ['Svelte', 'LLM', 'LangChain', 'SDXL', 'JavaScript'],
    preview: '/assets/dad.gif',
    github: 'https://github.com/mcspidey95/Dungeons-AI-Dragons',
    liveUrl: 'https://dad-thegame.vercel.app/',
    featured: true,
  },
  {
    slug: 'examdesk',
    title: 'ExamDesk',
    year: '2024',
    role: 'Lead Developer',
    tagline: 'Automated exam timetables, hall seating, and invigilator engine',
    summary:
      'Desktop application that computes conflict-free university exam timetables, room seating layouts, and invigilator rosters for 200,000+ student entries in seconds.',
    story:
      'Watching university staff spend days manually juggling spreadsheets for exam timetables, hall capacities, and faculty invigilation duties — only to still hit clashes on exam morning — felt like a problem begging for a real algorithm. I built ExamDesk during college to turn days of error-prone spreadsheet chaos into a single deterministic click.',
    problem:
      'Scheduling exams across thousands of students, dozens of departments, and limited halls is a constraint-satisfaction bottleneck. Manual planning routinely causes student double-bookings, adjacent same-branch seating, and unbalanced invigilator shifts.',
    solution:
      'Built a Java constraint-satisfaction and optimization engine wrapped in a responsive Svelte and Electron desktop interface. The engine resolves timetable collisions, interleaves departments across exam halls to prevent adjacent cheating, and balances faculty invigilator rosters against capacity and shift limits.',
    outcome:
      'Processes 200,000+ student entries and cuts university exam scheduling from days of manual effort down to seconds with clash-free printable exports.',
    highlights: [
      'Processes 200,000+ student entries in seconds with zero timetable or seating clashes',
      'Cross-department seating interleaving to maximize fairness and hall utilization',
      'Automated faculty invigilator roster balancing by shift limits and availability',
    ],
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
      'Core AI architect across a 28-repository enterprise AI fleet spanning voice agents, cognitive RAG, legal/statutory intelligence, and workflow automation.',
      'Architected NeuroVault, a human-associative memory engine on Elasticsearch 8.x that replaces bloated verbatim chunking with high-density mental anchors — cutting vector storage by 90% while boosting natural recall.',
      'Engineered AIVA\'s decoupled neural TTS microservice (Kokoro ONNX) with regex-protected sentence-level audio streaming and a real-time 3D WebGL reactive orb.',
      'Built multimodal exam evaluation (vision-based handwritten answer-sheet grading against rubrics) and air-gapped statutory RAG pipelines using on-premise EmbeddingGemma models.',
      'Standardized multi-tenant FastAPI/Pydantic v2 security foundations (dual-token JWT + mandatory per-call LLM token & USD cost metering) and autonomous visual browser agents (Patchright + Gemini).',
      'Mentoring engineering interns in AI-native software architecture, structured schema modeling, and rapid full-stack prototyping.',
    ],
  },
  {
    company: 'EpicMinds Information Technology',
    location: 'Bengaluru',
    role: 'Python Developer Intern',
    period: 'Apr 2025 - Jul 2025',
    points: [
      'Built backend Python automation services, targeted RPA/Selenium harvesters, and document ingestion pipelines.',
      'Converted to full-time AI Engineer within 3 months based on production delivery speed.',
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
