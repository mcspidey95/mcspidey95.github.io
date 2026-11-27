# Manish Bhat (`mcspidey95`) — Portfolio

Live at **[mcspidey95.github.io](https://mcspidey95.github.io)** · Resume at **[mcspidey95.github.io/resume.pdf](https://mcspidey95.github.io/resume.pdf)**

Personal portfolio and interactive case-study dossier built with **Astro**, **GSAP**, and **Lenis**.

## Highlights

- **Dual-Signal Identity (`S`):** Hover/tap the pixel-art portrait or press `S` to flip between **Polaris Obsidian** (`#090B0E` / cyan) and **Spider-Sense Crimson** (`#0D0709` / crimson).
- **Dumdum Mode (`D`):** Press `D` (or click the derp-face pill) to slap caveman-English yellow Post-it notes over technical jargon as you scroll; click any note to peel it off.
- **Story-Driven Case Studies:** Dedicated `/work/[slug]` pages with cursor-following desktop previews, iris curtain transitions, and full *Spark -> Problem -> Build -> Outcome* narratives for **Valaris**, **TerminalTab**, **Dungeons, AI & Dragons**, and **ExamDesk**.
- **Command Palette (`Ctrl+K` / `Cmd+K`):** Instant keyboard navigation across projects, modes, resume PDF, and contact actions.

## Stack

- **Framework:** Astro 5 (static output + `@astrojs/sitemap`)
- **Motion & Scroll:** GSAP (`ScrollTrigger`, `SplitText`) + Lenis smooth scroll
- **Typography:** Self-hosted `Space Grotesk` & `JetBrains Mono` (`woff2`)
- **Deployment:** `master` (source) -> `gh-pages` (static `dist/` via `gh-pages`)

## Structure

```text
├── public/
│   ├── assets/          # Project GIFs, pixel-art avatars, spider favicon
│   ├── fonts/           # Self-hosted woff2 fonts
│   └── resume.pdf       # 1-page public resume (no phone number)
└── src/
    ├── components/      # Header, Footer, Loader, PixelAvatar, CommandPalette
    ├── data/site.ts     # Projects, EpicMinds experience, education, stack, Dumdum copy
    ├── engine/          # Scroll, reveals, loader, transitions, Astro router hooks
    ├── layouts/Base.astro
    ├── motion/setup.ts  # Alter-ego, Dumdum sticky-note slap, floating previews
    ├── pages/           # index.astro, work/[slug].astro, 404.astro
    └── styles/          # tokens.css, engine.css, site.css
```

## Development & Deploy

```bash
npm install
npm run dev      # Local dev server
npm run build    # Build static site to ./dist/
npx gh-pages -d dist -t
```
