# Yellareswari Batta — Portfolio

Personal portfolio of **Yellareswari Batta**, Senior Full Stack Engineer & UI/UX Developer.

**Live:** https://yellareswaribatta.github.io/

## Highlights

- **Live design tokens** — pick an accent or toggle dark mode in the hero and the whole site re-themes through CSS custom properties.
- **Drag & drop sandbox** — build a small app screen inside a phone mock-up (Angular CDK), with keyboard-friendly add/remove and screen-reader announcements.
- **Case studies** with illustrative, hand-built UI previews.
- **Motion** — staggered reveals, scroll-driven animations, 3D tilt, magnetic buttons and a cursor follower, all disabled under `prefers-reduced-motion`.
- **Accessible** — semantic landmarks, skip link, visible focus states and WCAG AA contrast.

## Tech

Angular 21 (standalone components, Signals, zoneless) · TypeScript · SCSS · Angular CDK · Vitest

All content lives in [`src/app/data/portfolio.data.ts`](src/app/data/portfolio.data.ts), so updating the site after a resume change means editing a single file.

## Develop

```bash
npm install
npm start          # http://localhost:4200/
npm test           # unit tests (Vitest)
npm run build      # production build → dist/yellareswari-portfolio/browser
```

## Deploy (GitHub Pages)

```bash
npm run deploy     # builds and publishes to the gh-pages branch
```
