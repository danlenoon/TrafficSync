# Weekly reports

## Week of 2026-10-23

**Done.** Conducted a deep architectural and compliance audit across all project deliverables against the Final Project and Builds Full-Stack JavaScript and AI rubrics. Replaced all placeholder images with real, high-resolution application screenshots of the Dashboard (`docs/assets/dashboard.jpg`) and Cycle Results Summary (`docs/assets/results.jpg`) formatted cleanly in responsive Markdown tables with detailed captions. Generated an exact 1080×1080 square logo icon (`docs/assets/trafficsync-logo-1080x1080.png` and `.jpg`) using Lanczos resampling for presentation thumbnails. Updated `README.md` to comprehensively detail the complete three-tier architecture, step-by-step installation instructions for both frontend and backend with explanatory bash comments, environment variable specifications, and explicit author attribution. Finalized `docs/slides.html` as a ready-to-present 16:9 interactive HTML slide deck matching the 3-to-5 minute video presentation script in `docs/05-demo-video.md`.

**Stuck.** Encountered an image dimension mismatch when initial square icon generations yielded 1024×1024 rather than the strict 1080×1080 requirement; resolved by installing Pillow in the local workspace and executing a lossless Lanczos resampling script. Addressed git unstaged file cleanup to ensure a pristine working tree before final submission.

**Hours.** 16 hours.

**Next.** Complete the final 3-to-5 minute video screen recording following the structured four-part script in `docs/05-demo-video.md`, submit the public YouTube/Drive link, and push final commits to GitHub.

---

## Week of 2026-10-11

**Done.** Fixed critical UX and spatial collision bugs in the lane movement dropdown menus by inventing the fixed-coordinate **Norman Window Structure Dropdown Menu** with dynamic Y-axis collision detection (`getBoundingClientRect()`). The popover now flips above or below based on viewport space while dynamically inverting its arched semicircular curvature (`2.5rem 2.5rem 2rem 2rem` vs. `2rem 2rem 2.5rem 2.5rem`) and preventing parent card overflow clipping. Engineered custom press-and-hold up/down pickers in the Phase Timings Calculator with global window mouseup and touch release listeners to prevent counter runaway. Refined the adaptive cycle math engine to compute exact red stop wait times ($8\text{s}$ Total Stop, $12\text{s}$ Total Cycle for two-phase intersections with 1s Go, 3s Amber, 2s RC) and set new phase lights to off by default (`CLICK TO SET`) to require intentional user configuration. Formulated the complete 3-to-5 minute video presentation script and designed the 3-slide Canva presentation outline in `docs/05-demo-video.md`. Expanded `AI-USAGE.md` with full commit-backed attributions for all recent features.

**Stuck.** Dropdown menus were initially cropped by `overflow-hidden` wrappers on parent direction cards, and rapid click-and-drag interactions caused unintended movement selections; resolved by elevating the popover to a fixed viewport coordinate overlay (`z-[99999]`) and tracking mouse drag distance to differentiate scrolling from item selection.

**Hours.** 20 hours.

**Next.** Replace screenshot placeholders with real high-resolution images, generate the 1080×1080 square graphic, and prepare the final presentation recording.

---

## Week of 2026-10-05

**Done.** Successfully deployed the full TrafficSync stack: frontend on GitHub Pages (`https://danlenoon.github.io/TrafficSync/`), Express REST API on Render (`https://trafficsync.onrender.com`), and PostgreSQL database on Neon. Implemented the Liquid Glass design system with real-time clarity slider control, atomic React component refactoring, adaptive cycle calculation engine with 2s red clearance intervals, and parameterized SQL persistence for simulation snapshots. Added confirmation modals and unsaved changes navigation warnings to safeguard project data.

**Stuck.** Resolved initial CORS origin alignment between GitHub Pages and Render by configuring exact comma-separated `CORS_ORIGINS` environment variables, and configured Vite base path and React Router basename to resolve subfolder 404s on GitHub Pages.

**Hours.** 18 hours.

**Next.** Refine interactive phase builder controls, create custom Norman Window dropdown menus, and prepare demo video assets.

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
