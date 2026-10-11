# Weekly reports

---

## Week of 2026-10-05

**Done.** Successfully deployed the full TrafficSync stack: frontend on GitHub Pages (`https://danlenoon.github.io/TrafficSync/`), Express REST API on Render (`https://trafficsync.onrender.com`), and PostgreSQL database on Neon. Implemented the iOS 27 Liquid Glass design system with real-time clarity slider control, atomic React component refactoring, adaptive cycle calculation engine with 2s red clearance intervals, and parameterized SQL persistence for simulation snapshots.

**Stuck.** Resolved initial CORS origin alignment between GitHub Pages and Render by configuring exact comma-separated `CORS_ORIGINS` environment variables, and configured Vite base path and React Router basename to resolve subfolder 404s on GitHub Pages.

**Hours.** 18 hours.

**Next.** Record demo video, finalize private course workspace project README pointer, and complete final submission review.

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
