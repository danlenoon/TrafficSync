# Weekly reports

Five minutes a week. Add a new section at the top; never edit an old one.

---

## Week of 2026-10-05

**Done.** Successfully deployed the full TrafficSync stack: frontend on GitHub Pages (`https://danlenoon.github.io/TrafficSync/`), Express REST API on Render (`https://trafficsync.onrender.com`), and PostgreSQL database on Neon. Implemented the iOS 27 Liquid Glass design system with real-time clarity slider control, atomic React component refactoring, adaptive cycle calculation engine with 2s red clearance intervals, and parameterized SQL persistence for simulation snapshots.

**Stuck.** Resolved initial CORS origin alignment between GitHub Pages and Render by configuring exact comma-separated `CORS_ORIGINS` environment variables, and configured Vite base path and React Router basename to resolve subfolder 404s on GitHub Pages.

**Hours.** 18 hours.

**Next.** Record demo video, finalize private course workspace project README pointer, and complete final submission review.

---

## Week of 2026-09-28

**Done.** Built the 5-screen UI prototype in React, implemented Atomic Design directory structure (`atoms/`, `molecules/`, `organisms/`, `pages/`), added the Interactive Traffic Light Phase Builder and Phase Timings Calculator, and configured `SimulationContext` state management with `localStorage` fallback persistence.

**Stuck.** Navigating Vite build output prefixing for GitHub Pages project subpaths before establishing dynamic `base` and `basename` handling.

**Hours.** 14 hours.

**Next.** Connect Express backend repository and Neon PostgreSQL cloud database, wire up production environment variables, and secure API endpoints with HTTP Basic Authentication.

---

## Week of 2026-09-21

**Done.** Scaffolded the React application using Vite, established initial project repository structure, injected Tailwind CSS styling, and initialized documentation proposal and mockup files.

**Stuck.** Initial Vite scaffolding initialized outside target repository folder; resolved by restructuring into course template `client/` and `server/` directories.

**Hours.** 8 hours.

**Next.** Implement core UI screens, state management context, and simulation calculation engine.
