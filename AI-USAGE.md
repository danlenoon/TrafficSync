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

### The AI-written part I understand best

- **File:** `client/src/App.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/a996d1f556168e61f26ec7eedf7f5121ce124333
- **What it does and why we kept it:** This file handles the React state transitions for the 5 main screens (Dashboard, Setup, Lanes, Timings, Results). We kept it as a monolithic file for Week 1 to quickly prove that passing configuration state down a 5-step flow works, validating the core functionality before we eventually refactor it into smaller Atomic components.
