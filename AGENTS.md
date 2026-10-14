# AGENTS.md — debayan-portfolio

> Real repo root is `debayan-portfolio/` — parent folder (`Debayan@Graphicdesigner/`) is an untracked workspace containing `portfolio-content.md`, `portfolio-website-prompt.md`, and `cv_debayan_chakraborty.pdf`. All `npm`/`git` commands must run inside `debayan-portfolio/`.

## Commands

```bash
cd debayan-portfolio
npm install          # Node >=18 required (package.json:engines)
npm run dev          # Vite dev server → http://localhost:5173
npm run build        # vite build → dist/
npm run preview      # serve dist/ for manual verification
npm run lint         # oxlint only — config is .oxlintrc.json
```

- No test, typecheck, or formatter script exists. `npm test` / `tsc --noEmit` will fail — do not add them speculatively.
- Pre-PR check is `npm run lint && npm run build`. Lint exits 0 on warnings (e.g. `react/purity` for `new Date()`, unused vars); only `react/rules-of-hooks: error` is blocking via `.oxlintrc.json:4`.
- Build is Vite 8 (`vite.config.js:6` — only `@vitejs/plugin-react`). No path aliases, no CSS modules.

## Architecture

- **Stack:** React 19 + Vite 8 + Framer Motion 14 + react-icons 5. Plain CSS — no Tailwind, no UI library, no router (single-page anchor nav).
- **Entrypoints:** `index.html:25` loads `/src/main.jsx:6` → imports `src/styles/global.css:1` (which imports `variables.css`) → mounts `src/App.jsx:15` (`MotionConfig reducedMotion="user"`). `App.jsx` renders sections in fixed order: `CustomCursor` → `Navbar` → `Hero` → `About` → `Services` → `EducationSkills` → `Experience` → `Projects` → `Testimonials` → `FAQ` → `Contact` → `Footer`.
- **Components:** `src/components/*.jsx` (13 files) — each section is one file, one CSS import (e.g. `Hero.jsx:5` → `../styles/hero.css`). `Sticker.jsx` and `Marquee.jsx` are reusable; `CustomCursor.jsx:19` is desktop-only (`matchMedia('(pointer: fine)')` + `prefers-reduced-motion`).
- **Data (edit here, not components):** `src/data/*.js` — `profile.js`, `services.js`, `projects.js`, `experience.js`, `skills.js`, `testimonials.js`, `faq.js`. All copy lives here.
- **Styles:** `src/styles/variables.css:1` is the token source (`--orange`, `--pink`, `--blue`, `--yellow`, `--green`, `--paper`, `--bg-dark`, `--bg-darker`, `--font-display/body/mono`, `--radius`, `--container`, `--nav-h`). Per-component CSS files (`hero.css`, `about.css`, etc.) + `global.css` (grid, utilities, `.noise-overlay`, `skip-link`) + `shared.css` (cursor/sticker/marquee).
- **Assets:** `public/portraits/` and `public/projects/` are served at `/portraits/*` and `/projects/*` (referenced as `/portraits/debayan-*.jpg` in `profile.js:10`). `src/assets/icons/` holds decorative SVGs bundled via Vite; `public/favicon*` + `public/icons.svg` are static. Do not put new images in `src/` expecting public-path behavior.
- **Fonts:** Google Fonts loaded in `index.html:18` (`Abril Fatface`, `Space Grotesk`, `JetBrains Mono`) — change URL + `--font-display/body/mono` in `variables.css:24` together.

## Conventions & Gotchas

- **Content edits:** Change `src/data/*.js` only. Components expect exact shapes (e.g. `profile.disciplines:4`, `profile.navLinks` → `#home/#about/#projects/#contact` anchors, `projects[].image` can be external `framerusercontent.com` URL or local `/projects/...`). Known `TODO` placeholders remain in `profile.js:17` (social URLs are generic `x.com`/`instagram.com`/`behance.net`/`dribbble.com`), `projects.js:16` (tool arrays), `experience.js:12` (empty internship description), `testimonials.js`/`faq.js` (template copy).
- **Dynamic year:** `profile.js:34` and `Hero.jsx:127` use `new Date().getFullYear()` — oxlint flags `react/purity` for this; it is intentional, do not "fix" by hardcoding the year.
- **Motion/accessibility invariants:** `MotionConfig reducedMotion="user"` in `App.jsx:17`; `global.css:239` disables animations + hides `.noise-overlay` under `prefers-reduced-motion`; `CustomCursor` hides on touch. Scroll-reveals use `whileInView viewport={{once:true}}`; hero parallax uses `useScroll` + `useTransform` (`Hero.jsx:57` — outer div handles `y`, inner handles `bob`). Keep `skip-link` (`App.jsx:18`) and `alt` text on images.
- **Torn edge:** SVG in `Hero.jsx:180` (`torn-edge`, `tearFiber` filter, `paperHighlight` gradient). Height controlled by `hero.css` `clamp(48px,8vw,96px)`.
- **Contact form:** `Contact.jsx` is frontend-only (validation + success state, no backend). Dropdown originally had duplicate "Web design"/"Web Design" — data is now normalized but check `Contact.jsx` if adding options.
- **No generated code / migrations / env files.** `.env` is gitignored (`#14` in `.gitignore`) but not used — no env loading to configure.

## Deploy

- `vercel.json:6` — `rewrites: [{source:"/(.*)",destination:"/index.html"}]` for SPA anchor fallback; `buildCommand: npm run build`, `outputDirectory: dist`.
- Remote: `origin` → `github.com/debayanseple/DebayanChakraborty-GraphicDesigner.git` (`debayan-portfolio/` is pushed as repo root for Vercel). `dist/`, `node_modules`, `.vercel` are gitignored.

## Source Docs (outside built output)

- `../portfolio-content.md` — scraped Framer content + reference-image specs + issue list (email typo, duplicate project text, etc.).
- `../portfolio-website-prompt.md` — original build prompt with section order and design direction. Do not treat either as live code; content source-of-truth after build is `src/data/*.js`.
