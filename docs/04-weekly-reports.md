# Weekly reports

## Week of 2026-10-23

**Done.** Conducted a deep architectural and compliance audit across all project deliverables against the Final Project and Builds Full-Stack JavaScript and AI rubrics. Replaced all placeholder images with real, high-resolution application screenshots of the Dashboard (`docs/assets/saved_simulation_dashboard_desktop.png`, `docs/assets/saved_simulation_dashboard_mobile.png`, `docs/assets/no_saved_simulations_dashboard_desktop.png`), Simulation Editor (`docs/assets/simulation_editor_with_user_inputs_desktop.png`, `docs/assets/simulation_editor_with_user_inputs_mobile.png`), and Cycle Results Summary (`docs/assets/cycle_results_summary_desktop.png`, `docs/assets/cycle_results_summary_mobile.png`) formatted cleanly in responsive Markdown tables with detailed descriptions. Converted the browser tab favicon to a transparent-background PNG and multi-resolution ICO. Implemented the multi-phase clearance engine across N-phase configurations with yellow and all-red clearance interval accounting ($18\text{s}$ total cycle for 3-phase arterial test vectors). Enhanced cross-device responsive UI/UX across mobile, tablet, and desktop viewports: permanently suppressed contact autofill on intersection road names, widened mobile action buttons in Dashboard and Simulation Editor, centered lane controls, and ensured consistent button containment without overflow. Fixed saved simulation timestamp timezones by preserving native UTC indicators (`Z`) in `formatSavedAt`, ensuring dashboard dates and times synchronize accurately to the user's local time zone. Updated `README.md` to comprehensively detail the complete three-tier architecture with symmetrical ASCII diagrams, step-by-step installation instructions for both frontend and backend with explanatory bash comments, environment variable specifications, and explicit author attribution. Finalized `docs/slides.html` as a ready-to-present 16:9 interactive HTML slide deck matching the 3-to-5 minute video presentation script in `docs/05-demo-video.md`.

**Stuck.** Addressed mobile browser autofill heuristic conflicts where mobile Safari and Chrome forced contact suggestions on intersection name fields by implementing RFC-compliant autocomplete suppressors. Resolved timing picker state desynchronization during continuous typing by isolating and memoizing the number picker subcomponent.

**Hours.** 18 hours.

**Next.** Complete the final 3-to-5 minute video screen recording following the structured four-part script in `docs/05-demo-video.md`, submit the public YouTube/Drive link, and push final commits to GitHub.

---

## Week of 2026-10-11

**Done.** Fixed critical UX and spatial collision bugs by engineering custom press-and-hold up/down pickers in the Phase Timings Calculator with global window mouseup and touch release listeners to prevent counter runaway. Refined the adaptive cycle math engine to compute exact red stop wait times ($8\text{s}$ Total Stop, $12\text{s}$ Total Cycle for two-phase intersections with 1s Go, 3s Amber, 2s RC) and set new phase lights to off by default (`CLICK TO SET`) to require intentional user configuration. Formulated the complete 3-to-5 minute video presentation script and designed the 3-slide Canva presentation outline in `docs/05-demo-video.md`. Expanded `AI-USAGE.md` with full commit-backed attributions for all recent features.

**Stuck.** Lane movement selection controls were initially constrained by overflow wrappers on parent direction cards, and rapid click interactions caused layout jitter; resolved by standardizing on responsive native selection controls styled with sleek custom chevron glyphs and clean boundary containment.

**Hours.** 20 hours.

**Next.** Replace screenshot placeholders with real high-resolution images, generate the 1080×1080 square graphic, and prepare the final presentation recording.

---

## Week of 2026-10-05

**Done.** Successfully deployed the full TrafficSync stack: frontend on GitHub Pages (`https://danlenoon.github.io/TrafficSync/`), Express REST API on Render (`https://trafficsync.onrender.com`), and PostgreSQL database on Neon. Implemented the Liquid Glass design system with real-time clarity slider control, atomic React component refactoring, adaptive cycle calculation engine with 2s red clearance intervals, and parameterized SQL persistence for simulation snapshots. Added confirmation modals and unsaved changes navigation warnings to safeguard project data.

**Stuck.** Resolved initial CORS origin alignment between GitHub Pages and Render by configuring exact comma-separated `CORS_ORIGINS` environment variables, and configured Vite base path and React Router basename to resolve subfolder 404s on GitHub Pages.

**Hours.** 18 hours.

**Next.** Refine interactive phase builder controls and prepare demo video assets.

---

## Week of 2026-09-28

**Done.** Dismantled the monolithic `App.jsx` into strict Atomic Design components (`atoms/`, `molecules/`, `organisms/`, `pages/`). Created `SimulationContext.jsx` to manage application state globally without prop-drilling, and integrated `react-router-dom` for route-based navigation. Refactored signal timing formulas to treat Red inputs as clearance intervals and created an adaptive calculation engine supporting 4-way intersections and T-intersections. Added Express HTTP Basic Authentication middleware to `server/server.js`, pinned GitHub Actions dependencies in `.github/workflows/deploy-pages.yml` to commit SHAs (with a `@v4` fallback for `actions/deploy-pages`), added context files to `.gitignore`, and scrubbed all student PII from public documentation.

**Stuck.** Balancing protected left-turn calculation logic for 4-way intersections versus T-intersections required refining conflict-detection algorithms. Fixed a GitHub Actions 404 build failure caused by an unresolvable commit SHA by reverting to the stable `@v4` tag for `actions/deploy-pages`.

**Hours.** 14 hours.

**Next.** Wire React context actions (`saveSimulation`, `deleteSimulation`) to Express/PostgreSQL database endpoints (`/api/simulations`) and establish production PostCSS build setup.

---

## Week of 2026-09-21

**Done.** Scaffolded the base React application using Vite inside the template's `client` folder. Generated a low-fidelity interactive HTML wireframe mapped directly from M6A0/M6A1 designs and built a functional prototype in `App.jsx` containing 5 primary navigation screens (Dashboard, Intersection Setup, Lane Customization, Phase Timings Calculator, and Cycle Results Summary). Integrated Tailwind CSS (via CDN) for rapid UI styling and installed `lucide-react` for iconography. Implemented unified React state (`useState`) to track simulation data across configuration screens and added dynamic calculation logic to generate percentage breakdowns based on user inputs.

**Stuck.** Initially ran setup and scaffolding outside of the designated project template folder (`final-project-2203-danlenoon`), resulting in `ENOENT` errors when attempting to run `npm install` from the root directory; resolved by manually migrating files into the `client` directory of the proper template repository.

**Hours.** 10 hours.

**Next.** Refactor monolithic `App.jsx` into a strict Atomic Design architecture and extract global state management into `SimulationContext.jsx`.
