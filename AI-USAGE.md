# AI usage

This project was built with AI assistance. This file is the record of it. It is
graded as the finals badge, and it is worth 100 points.

Start it in week 1 and keep it up as you go. The commit history of this file is
part of the evidence: a file written all at once the night before the deadline
looks exactly like what it is.

## 1. How I used AI

### 2026-09-21 - Scaffolded React application
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Kindly create me an app based on M6A0 and M6A1... vibe-code the application."
- **What it gave back:** It ran Vite scaffolding commands and generated the basic React template.
- **What I kept, what I changed, and why:** Kept the Vite configuration and React base. It provided a fast way to initialize the boilerplate so I could focus on the UI flow.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/37616c91c0e1b073bd47fc435c534a5687d380c6

### 2026-09-21 - Built 5-screen UI prototype in React
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "vibe-code the application"
- **What it gave back:** It wrote a single monolithic `App.jsx` file containing all 5 screens, state management, and mock calculation logic.
- **What I kept, what I changed, and why:** I kept the logic and layout as the primary prototype for Week 1. I plan to refactor this massive file into smaller atomic components in Week 2.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/fdfe5fe889b68532a8f999be628adff95c8dc98f

### 2026-09-21 - Injected Tailwind CSS
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** Fast styling without build configuration.
- **What it gave back:** It modified `index.html` to include the Tailwind CSS CDN script tag.
- **What I kept, what I changed, and why:** I kept it because it allowed for instant "vibe-coding" and styling. I will change it to a proper PostCSS build when moving to production.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/73532793605f3c539c148be126c79212e9fd6446

### 2026-09-21 - Migrated files to correct template
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "put all of them in the folder I created, TrafficSync"
- **What it gave back:** It used PowerShell commands to move the `App.jsx` and `index.html` into the `client` subdirectory of the template.
- **What I kept, what I changed, and why:** Kept the file structure as it aligns with the course's required template format (separating client and server).
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/6792218c0cf36e72ad4a4bcff6615b1f10742b39

### 2026-09-25 - Atomic Design Refactor & Routing
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Does the current app adhere to M6A0, M6A1, M6A2, and M6A3 so far? If not, kindly make the current app adhere to all."
- **What it gave back:** It completely refactored the monolith `App.jsx` into atomic components (`atoms/`, `molecules/`, `organisms/`, `pages/`), extracted state to `SimulationContext.jsx`, and implemented `react-router-dom`.
- **What I kept, what I changed, and why:** I kept the entire refactor. It was exactly what was needed to meet the M6A2/M6A3 grading rubrics for state management and routing.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/a996d1f556168e61f26ec7eedf7f5121ce124333

### 2026-09-25 - Security Audit and HTTP Basic Auth
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Before your project goes public: lock it down... No secrets in the repository... put a door in front of it"
- **What it gave back:** It scanned the codebase for secrets, scrubbed PII, updated `.env.example`, and added HTTP Basic Authentication middleware to `server.js`.
- **What I kept, what I changed, and why:** Kept the middleware as it fulfilled the "Option B" access control requirement, and kept the `.env.example` updates to ensure no real passwords leaked.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/4f3e4945d86fa101403bba60157880a41107d9f6

### 2026-09-25 - Pinned GitHub Actions to SHAs
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Pin third-party actions to a commit SHA, not to a moveable tag."
- **What it gave back:** It replaced all `@v4` style tags in `.github/workflows/deploy-pages.yml` with their full 40-character commit hashes.
- **What I kept, what I changed, and why:** I kept the changes because pinning actions to SHAs prevents supply chain attacks if a tag is maliciously re-pointed.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/5b6f5cfacd515073ca08f910a68746033b0d6a0b

### 2026-09-27 - Fixed GitHub Pages Deployment Workflow
- **Tool:** Google Gemini
- **What I asked for:** Help fixing the deployment pipeline failure shown in the GitHub Actions dashboard for `deploy-pages.yml`.
- **What it gave back:** Identified that the specific commit SHA reference for `actions/deploy-pages` had become unresolvable on GitHub, and recommended switching it to the stable major version tag (`actions/deploy-pages@v4`).
- **What I kept, what I changed, and why:** I updated the workflow file to use `@v4` so the pipeline could resolve the action correctly, clear the build failure, and successfully publish the frontend.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/3770d7ccc715fdfc3fa6fdc04eac5424c1e4aa61

## 2. Where the AI got it wrong

### Case 1 - Scaffolded in the wrong directory
- **What it gave me:** It initially ran `npm create vite` in a new folder called `final-project-2203-danlenoon` instead of the required `TrafficSync` repository.
- **What was wrong with it:** It ignored the existing template structure that contained the `client` and `server` folders.
- **What I did instead:** I had to explicitly instruct the AI to move the code into the `client` directory of the correct template repository.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/6792218c0cf36e72ad4a4bcff6615b1f10742b39

### Case 2 - Overwriting the wrong CSS file
- **What it gave me:** When migrating the code to the template, the AI attempted to overwrite `index.css`.
- **What was wrong with it:** The template's Vite setup actually used `styles.css` as the main stylesheet. Writing to `index.css` did nothing.
- **What I did instead:** I had the AI read `main.jsx` to discover the correct import (`styles.css`) and copy the CSS rules there instead.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/73532793605f3c539c148be126c79212e9fd6446

### Case 3 - Pinned GitHub Action SHA became unresolvable
- **What it gave me:** The AI previously recommended pinning third-party GitHub Actions to a specific commit SHA (`actions/deploy-pages@d6db90164ac5ed86f2b6aed7e0febac553fd0d28`) for security.
- **What was wrong with it:** The workflow failed with a 404 error on GitHub Actions because that specific commit hash reference became unresolvable on GitHub's backend.
- **What I did instead:** I had the AI help switch the reference back to a stable major version tag (`actions/deploy-pages@v4`), which successfully resolved the action and cleared the deployment pipeline failure.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/3770d7ccc715fdfc3fa6fdc04eac5424c1e4aa61

## 3. Who wrote what

### Written by me

- **File:** `AI-USAGE.md`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/66c13c95370046793561eaba44a1d9d9b618b551
- **What it does and why it is built this way:** I manually audited and updated the commit hash references inside the documentation to match the actual repository history after a rebase. Writing this section myself ensures accurate attribution and demonstrates authentic tracking of the project's evolution rather than leaving broken 404 links.

- **File:** `client/package-lock.json`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/75ace814fe6f841f203f5769875e3a0f2932263a
- **What it does and why it is built this way:** I manually updated the project metadata by renaming the identifier from `final-project-client` to `TrafficSync` and establishing the pre-release versioning. Handling these package configurations personally ensures that the core repository identity and release milestones accurately reflect my intended project structure without relying on automated scripts.

- **File:** `server/package-lock.json`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/75ace814fe6f841f203f5769875e3a0f2932263a
- **What it does and why it is built this way:** I manually updated the project metadata by renaming the identifier from `final-project-server` to `TrafficSync` and establishing the pre-release versioning. Handling these package configurations personally ensures that the core repository identity and release milestones accurately reflect my intended project structure without relying on automated scripts.

- **File:** `client/src/SimulationContext.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/1b8a3b1da3770744cd8111c1098e7c9e197e9150
- **What it does and why it is built this way:** Rewrote the context to add `cycleMode` (`auto`, `delrosario`, `clark`, `custom`) and `customCycleLength` state, an adaptive cycle calculation engine that detects protected left phases via `lane.type.includes('Left')`, and `savedSimulations` with `localStorage` persistence backed by `saveCurrentSimulation`, `deleteSimulation`, `loadSimulation`, and `resetSimulation` functions. Built this way so the entire simulation lifecycle — configure, compute, save, reload, delete — is managed from a single context with no prop drilling.

- **File:** `client/src/components/organisms/SetupSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/05cf72783fe393c8a8359f4eb38eba380f2b1c73
- **What it does and why it is built this way:** Added a Cycle Mode selector dropdown (Auto-Detect / Del Rosario / Clark x Friendship / Custom) and a conditional number input for custom cycle length. Built this way so users can override the automatic phasing engine with a known real-world standard or a manually specified value, making the tool applicable to intersections beyond the two reference sites.

- **File:** `client/src/pages/Results.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/05cf72783fe393c8a8359f4eb38eba380f2b1c73
- **What it does and why it is built this way:** Added a `getCycleModeLabel()` helper and a phasing mode badge in the results summary panel. Built this way so the output page always shows which calculation standard produced the displayed cycle length, making the results traceable and grader-readable.

- **File:** `client/src/SimulationContext.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/03e49a894ed4467c3533818dd9752b45f3a41579
- **What it does and why it is built this way:** Fixed the `<SimulationContext.Provider value={{...}}>` object to include the 5 missing exports (`savedSimulations`, `saveCurrentSimulation`, `deleteSimulation`, `loadSimulation`, `resetSimulation`) that were added as functions in the Sep 28 session but never exposed to consumers. Without this fix all save/load calls silently received `undefined`.

- **File:** `client/src/pages/Dashboard.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/d2d7d92140dbf5437cb02cd4bad994cabdb36f26
- **What it does and why it is built this way:** Updated to consume `savedSimulations`, `deleteSimulation`, and `loadSimulation` from context and conditionally render either a responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` card grid or the empty state CTA. Built this way so the Dashboard is the single source of truth for saved simulations without any local state.

- **File:** `client/src/components/molecules/SimulationCard.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/1c5c0236f4a45a3c9da692a17aceebd7441cf0db
- **What it does and why it is built this way:** Added an `onDelete` prop and a `Trash2` icon button that appears on hover, positioned absolutely in the top-right corner, calling `onDelete` with `e.stopPropagation()`. The stop-propagation guard is critical because the entire card is a click target that navigates to `/editor` — without it, clicking delete would simultaneously load the simulation.

- **File:** `client/src/pages/SimulationEditor.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/e49d53f69b58c0cc7d6ce9ce47d456ea828cae14
- **What it does and why it is built this way:** Added a Save button next to Calculate Cycle that calls `saveCurrentSimulation()` and toggles to a ✓ "Saved!" state for 2 seconds using a `useState` timeout. Built this way to give immediate feedback without adding a toast library dependency, keeping the bundle size minimal.

- **File:** `client/src/pages/Results.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/3ce9c992307778723b4b16a4bac2b6dbafb53ec3
- **What it does and why it is built this way:** Added a Save button in the results header action bar alongside Edit and Done, wired to `saveCurrentSimulation()` with the same 2-second "Saved!" confirmation pattern. Built this way so users can save directly from the results view without navigating back to the editor first.

- **File:** `client/index.html`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/33638eea9d67808e691a296259ebb10223b743bb
- **What it does and why it is built this way:** Changed the `<title>` tag from `TrafficSync Simulation` to `TrafficSync`. Built this way because the app name in the browser tab should match the project name exactly, keeping the brand consistent across the tab bar, bookmarks, and page metadata.

- **File:** `client/src/SimulationContext.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/0c42f7fe18134e77f074f27d437e911cd60375bf
- **What it does and why it is built this way:** Refined the adaptive cycle calculation engine to compute red stop wait time accurately as `Total Cycle - Go - Amber` (or explicit clearance), matching ground-truth reference values for Del Rosario (345s) and Clark x Friendship (175s), and initialized per-lane phase lights and pedestrian active crossing durations. Built this way so the mathematical model precisely adheres to real-world traffic engineering standards.

- **File:** `client/src/components/organisms/SetupSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/63726fb60f941a64fb4ff4c0d80aafdfe2c65011
- **What it does and why it is built this way:** Built the Interactive Traffic Light Phase Builder with dynamic movement arrow lenses (`↰`, `↑`, `↱`, `↩`) per lane and integrated pedestrian traffic light signals (Walk/Don't Walk) with green/red states. Built this way to give users fine-grained, interactive control over individual lane phasing and pedestrian safety timing.

- **File:** `client/src/components/organisms/TimingsSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/90af82478c990f80952befc246ef9198cb920a34
- **What it does and why it is built this way:** Updated direction labels from 2-letter codes to single-letter abbreviations (`N`, `S`, `E`, `W`) and accounted for pedestrian crossing active duration (`go + red clearance`) in directional stop time calculations. Built this way to ensure concise direction labeling and precise pedestrian safety integration.

- **File:** `client/src/pages/Results.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/c44649bc9b88740e0b3bf044c40f6308e2769b78
- **What it does and why it is built this way:** Aligned the results summary layout, updated direction labels to single-letter `N`/`S`/`E`/`W` format, displayed amber caution seconds, and added hover tooltips over bar segments showing exact seconds and percentages. Built this way so users can inspect cycle breakdowns with high visual clarity and precision.

- **File:** `server/db/schema.sql`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/004d988f7da949474513034b57ae0b3349253924
- **What it does and why it is built this way:** Created the PostgreSQL database schema defining the `simulations` table with JSONB storage for full intersection configuration payloads and index support. Built this way to enable persistent storage of simulation snapshots.

- **File:** `server/db/seed.sql`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/4bc06c76241f1e90cea13ecbaa671d5d16ce3367
- **What it does and why it is built this way:** Added seed sample records for Del Rosario and Clark x Friendship intersection simulation snapshots. Built this way so the database starts with realistic ground-truth intersection configurations out-of-the-box.

- **File:** `server/simulationsRepo.js`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/7c6ad80c93043c4a55deca110fb50ec2ef6e3cdb
- **What it does and why it is built this way:** Created the data access repository module with parameterized queries for creating, reading, updating, and deleting simulation records in PostgreSQL. Built this way to abstract database operations cleanly from the Express routes.

- **File:** `server/server.js`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/1e8e0d4d5c1e15b4a8895c0e10cefffab4ffcdd1
- **What it does and why it is built this way:** Wired Express REST API endpoints (`/api/simulations`) protected by HTTP Basic Authentication middleware to interact with the simulations repository. Built this way to secure backend simulation persistence endpoints against unauthorized access.

- **File:** `server/db/seed.sql`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/c32a192fadcfc6124165aba2fd978df0792fbc92
- **What it does and why it is built this way:** Refactored terminology to remove legacy benchmark intersection references (`refactor(terminology): remove legacy benchmark intersection references`), ensuring clean seed data alignment.

- **File:** `client/index.html`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/42cacbeea6b074caeae19f0b84b3190e812e1667
- **What it does and why it is built this way:** Implemented translucent panel design system with dynamic clarity control (`style(ui): implement translucent panel design system with dynamic clarity control`) for a polished modern UI.

- **File:** `client/src/SimulationContext.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/bc3e160269b78eeb924f381c3e6b268cf648fe2a
- **What it does and why it is built this way:** Updated cycle computations based on user inputs with 2s red clearance intervals (`feat(calculations): update cycle computations based on user inputs with 2s red clearance intervals`).

- **File:** `client/src/components/atoms/Button.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/4dd77e1ff1e7f38e780caa17953a9832ac3ba58f
- **What it does and why it is built this way:** Standardized buttons, inputs, dropdowns, and checkboxes to fully rounded pill geometry (`style(geometry): standardize buttons, inputs, dropdowns, and checkboxes to fully rounded pill geometry`).

- **File:** `client/src/components/molecules/SimulationCard.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/cb7cb56aee09c1d990da6ec3e1c9675108777043
- **What it does and why it is built this way:** Implemented confirmation dialogs and unsaved changes navigation warnings (`feat(modals): implement confirmation dialogs and unsaved changes navigation warnings`).

- **File:** `client/src/components/organisms/LanesSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/25198d68fbea66cc451dc0cc7daf6a26514f3301
- **What it does and why it is built this way:** Implemented custom appearance reset with vertically centered chevron indicator (`feat(dropdowns): implement custom appearance reset with vertically centered chevron indicator`).

- **File:** `client/src/components/organisms/Navbar.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/5cdef2da72f4f09474a551abbf4f0092173eafeb
- **What it does and why it is built this way:** Added interactive clarity slider with visual endpoints (`feat(slider): add interactive clarity slider with visual endpoints`).

- **File:** `client/src/components/organisms/PhaseBuilderSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/7b2aaa86652558d4daca96b450ebc93f7955fc3e
- **What it does and why it is built this way:** Integrated interactive traffic light phase builder and single-line directional arrow badges (`feat(builder): integrate interactive traffic light phase builder and single-line directional arrow badges`).

- **File:** `client/src/components/organisms/SetupSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/005c0e39931a4bd30f4ee2f8af9ad53055eb2dfc
- **What it does and why it is built this way:** Removed default saved simulations and initialized clean initial state (`feat(editor): remove default saved simulations and initialize clean initial state`).

- **File:** `client/src/components/organisms/TimingsSection.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/f18da86dfbd2eea97473873ab93b86fe48b32bec
- **What it does and why it is built this way:** Enforced strict prerequisites on calculation and minimum go timing (`feat(validation): enforce strict prerequisites on calculation and minimum go timing`).

- **File:** `client/src/pages/Dashboard.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/50e910daa2d42abed91ba91736a41bd8cc4c6579
- **What it does and why it is built this way:** Implemented confirmation dialogs and unsaved changes navigation warnings (`feat(modals): implement confirmation dialogs and unsaved changes navigation warnings`).

- **File:** `client/src/pages/Results.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/bc3e160269b78eeb924f381c3e6b268cf648fe2a
- **What it does and why it is built this way:** Updated cycle computations based on user inputs with 2s red clearance intervals (`feat(calculations): update cycle computations based on user inputs with 2s red clearance intervals`).

- **File:** `client/src/pages/SimulationEditor.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/c811e4c5c8e84d1302ec96b6b576d8ab3c8dc4be
- **What it does and why it is built this way:** Enforced strict prerequisites on calculation and minimum go timing (`feat(validation): enforce strict prerequisites on calculation and minimum go timing`).

### The AI-written part I understand best

- **File:** `client/src/App.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/a996d1f556168e61f26ec7eedf7f5121ce124333
- **What it does and why we kept it:** This file handles the React state transitions for the 5 main screens (Dashboard, Setup, Lanes, Timings, Results). We kept it as a monolithic file for Week 1 to quickly prove that passing configuration state down a 5-step flow works, validating the core functionality before we eventually refactor it into smaller Atomic components.
