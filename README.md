# Road2Code 🚀

A personalized learning-roadmap generator. Pick a career track, tell it what you
already know, and it hands back an ordered checklist of stops — each with a video
and written docs — with your progress saved in the browser.

## Run it

```bash
npm install
npm run dev
```

Then open the printed `localhost` URL. `npm run build` produces a production
build in `dist/`.

## What's inside

- **Navbar** — fixed header with smooth-scroll links (Home / How it works /
  Courses / About), a scroll-aware "elevated" state, a mobile hamburger menu,
  and the login/signup + theme controls.
- **Hero** — an auto-rotating slider of the six tracks, with an animated SVG
  "road" that visually ties back to the site name.
- **How it works** — the four-step flow as a semantic `<ol>`.
- **Courses** — a card grid of all six tracks; clicking one jumps straight to
  the generator with that track pre-selected.
- **About** — what the project is and why it exists.
- **Skill input → Roadmap generator** — pick a goal, tick the skills you
  already know, and generate an ordered roadmap. Steps that match a known
  skill are pre-marked done.
- **Progress tracker** — every step has a "mark complete" toggle, backed by a
  live progress bar. Progress is written to `localStorage` per user (or to a
  shared "guest" bucket if you're not logged in), so it survives a refresh.
- **Login / Signup** — a modal with both flows. Accounts and sessions are
  stored in `localStorage` — there's no backend, so this is a **frontend-only
  demo of auth**, not real security (see the comment in `AuthContext.jsx`).
- **Dark / light mode** — a toggle in the navbar flips a `data-theme`
  attribute on `<html>`; both themes are driven entirely by CSS variables in
  `src/index.css`. The dark theme is a deep navy/indigo (`#10121c`) with warm
  amber + violet accents — not a flat black-and-neon look.

## Folder structure

```
src/
  components/     UI components (Navbar, Hero, Courses, About, HowItWorks,
                   SkillInput, Roadmap, ProgressBar, ResourceCard, AuthModal,
                   Footer)
  context/        AuthContext, ThemeContext (React Context + hooks)
  hooks/          useLocalStorage — reusable localStorage-backed state
  data/           roadmaps.js (the step data), goals.js (track metadata)
  styles/         App.css
  index.css       design tokens (CSS variables) + global reset
```

## Syllabus mapping

- **HTML/CSS** — semantic elements (`<header>`, `<nav>`, `<main>`, `<section>`,
  `<footer>`, `<ol>`), CSS custom properties for theming, responsive layout.
- **JavaScript / clean code** — components split by responsibility, a
  reusable `useLocalStorage` hook, consistent naming, no dead code.
- **DOM manipulation** — `document.documentElement.setAttribute` for theme
  switching, `scrollIntoView`, `addEventListener('scroll'/'keydown')`,
  focus management in the auth modal.
- **React basics** — functional components throughout, props, `useState`,
  `useEffect` for auth, theming, and hero behavior
  slider/timer.

## Added learning-focused features

- Daily Coding Challenge built with a functional component and `useState`.
- Expanded About page using semantic HTML and reusable components.
- Existing roadmap progress tracking remains unchanged.
