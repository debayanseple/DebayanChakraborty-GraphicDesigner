# Debayan Chakraborty — Digital Designer Portfolio

A single-page React (Vite) portfolio for **Debayan Chakraborty**, Kolkata-based digital designer and UI developer. Creative, modern, and slightly high-tech — scrapbook / torn-paper energy mixed with a dark tech-grid UI.

## Stack

- **React 19** + **Vite 8**
- **Framer Motion 14** for animations
- **react-icons** for icons
- Plain CSS (no heavy UI libraries)

## Quick Start

The project is already scaffolded at `debayan-portfolio/` inside the working directory.

```bash
# from the project root
cd debayan-portfolio

# install dependencies (already done once)
npm install

# start dev server
npm run dev
# → http://localhost:5173

# production build
npm run build

# preview the production build
npm run preview
```

If you are creating from scratch:

```bash
npm create vite@latest debayan-portfolio -- --template react
cd debayan-portfolio
npm install
npm install framer-motion react-icons
npm run dev
```

## Project Structure

```
src/
  components/
    Navbar.jsx          # Sticky, blur on scroll, avatar + "Available for work" pill
    Hero.jsx            # Crumpled-paper + grid, torn edge, hand-drawn ellipse, doodles
    About.jsx           # Polaroid + draggable stickers, bio, count-up stats
    Services.jsx        # 4 bento cards with hover lift + glow
    EducationSkills.jsx # Education card + tool tiles with skill rings + skill chips
    Experience.jsx      # Vertical timeline (orange period labels)
    Projects.jsx        # Bento grid, category filters, lightbox modal
    Testimonials.jsx    # Auto-scrolling marquee (pause on hover)
    FAQ.jsx             # Animated accordion
    Contact.jsx         # CTA, form (validation + success), pills, socials
    Footer.jsx          # Marquee strip + back-to-top + copyright
    CustomCursor.jsx    # Dot + trailing ring (desktop only, respects reduced-motion)
    Sticker.jsx         # Reusable rotated sticker with bob / drag
    Marquee.jsx         # Reusable marquee with duplicate aria-hidden
  data/
    profile.js          # Name, tagline, bio, phone, email (TODO), socials, stats, nav
    services.js         # 4 service cards
    projects.js         # 4 projects + categories (images from Framer, TODO for Digital Marketing)
    experience.js       # Education + Experience timeline
    skills.js           # Tools with levels + personal skills chips
    testimonials.js     # 9 testimonials (TODO: replace with real feedback)
    faq.js              # 6 Q&A (placeholder answers, TODO replace)
  styles/
    variables.css       # Design tokens (accent colors, type, layout)
    global.css          # Reset, utilities, buttons, noise overlay, skip-link
    shared.css          # Cursor, sticker, marquee
    navbar.css / hero.css / about.css / services.css / education.css
    experience.css / projects.css / testimonials.css / faq.css / contact.css / footer.css
  App.jsx
  main.jsx
index.html              # Fonts (Abril Fatface, Space Grotesk, JetBrains Mono), meta, favicon
```

All content lives in `src/data/` — edit those files without touching components.

## Design Tokens

Edit `src/styles/variables.css`:

```css
--orange: #ff7a1a;
--pink:   #ff3d8b;
--blue:   #2bb8ff;
--yellow: #ffd84a;
--green:  #3ddc84;
--paper:  #f4f1ea;
--bg-dark:   #2b2b2b;
--bg-darker: #1f1f1f;
--font-display: 'Abril Fatface', serif;
--font-body:    'Space Grotesk', sans-serif;
--font-mono:    'JetBrains Mono', monospace;
```

- **Paper hero grid**: change `background-size` and `rgba(0,0,0,0.045)` in `hero.css`.
- **Dark body grid**: adjust `44px` grid size and `rgba(255,255,255,0.022)` in `global.css` `.section-dark`.
- **Torn edge**: SVG path in `Hero.jsx` (`class="torn-edge"`), fill is `var(--bg-dark)`. Tweak points for a different jagged shape; height via `clamp(48px, 8vw, 96px)` in `hero.css`.
- **Radius / container**: `--radius`, `--radius-sm`, `--container`, `--gutter` in `variables.css`.

## Fonts

Loaded via Google Fonts in `index.html`. Swap by changing the `<link href="https://fonts.googleapis.com/...">` URL and updating `--font-display / --font-body / --font-mono` in `variables.css`.

## Content TODOs

Search for `TODO` in `src/data/`:

| File | TODO |
|------|------|
| `profile.js` | `email: 'TODO@example.com'` — confirm correct email (live site had typo `deepchakraborty@gmailcom`); replace `socials` URLs with real profiles; `portrait` / `avatar` with real photos (currently picsum placeholders); `stats` values are placeholders (2+ / 30+) |
| `skills.js` | `Figma` / `Canva` tiles marked `placeholder: true` — confirm |
| `projects.js` | `tools` arrays are placeholder — confirm per project; `Digital Marketing` description is placeholder to be rewritten |
| `experience.js` | Internship description empty — add if needed |
| `testimonials.js` | Several quotes are template placeholders (one mentions "Duncan") — replace with real client feedback |
| `faq.js` | Answers are short friendly placeholders — rewrite in your own words |

Images are swappable via URLs in `src/data/projects.js` and `src/data/profile.js:portrait`. Project images currently point to the original `framerusercontent.com` URLs from the live Framer site; replace at will (use `picsum.photos` or `images.unsplash.com` at 3:2 ratio).

## Interactions

- **Custom cursor**: fine-pointer only, hidden on touch/reduced-motion: `CustomCursor.jsx` checks `matchMedia('(pointer: fine)')` and `prefers-reduced-motion`.
- **Smooth scroll**: CSS `scroll-behavior: smooth`, respects `prefers-reduced-motion`.
- **Scroll reveals**: Framer Motion `whileInView` with `viewport={{ once: true }}`.
- **Parallax**: `useScroll` + `useTransform` on hero doodles; outer layer handles parallax, inner handles bob.
- **Draggable stickers**: Framer Motion `drag` on About polaroid stickers.
- **Noise overlay**: fixed `::before`-like `.noise-overlay` with SVG turbulence + `grain` animation (disabled on reduced-motion).
- **Accessibility**: semantic HTML, `alt` text, `:focus-visible` outlines, `MotionConfig reducedMotion="user"`, `aria-*` on Marquee duplicates, accordion, lightbox, and form.

## Build

```bash
npm run build   # → dist/
npm run preview # serves dist/
```

Deploy `dist/` to any static host (Vercel, Netlify, GitHub Pages).

## License

Content © 2025 Debayan Chakraborty. Code is this portfolio's implementation.
