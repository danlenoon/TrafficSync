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
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/3dc47659de18d23f477fc3709d2190a9c7452b8d

### 2026-09-21 - Built 5-screen UI prototype in React
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "vibe-code the application"
- **What it gave back:** It wrote a single monolithic `App.jsx` file containing all 5 screens, state management, and mock calculation logic.
- **What I kept, what I changed, and why:** I kept the logic and layout as the primary prototype for Week 1. I plan to refactor this massive file into smaller atomic components in Week 2.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/dbfc39b18bd9118c19d5b5c36238e2e238f57703

### 2026-09-21 - Injected Tailwind CSS
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** Fast styling without build configuration.
- **What it gave back:** It modified `index.html` to include the Tailwind CSS CDN script tag.
- **What I kept, what I changed, and why:** I kept it because it allowed for instant "vibe-coding" and styling. I will change it to a proper PostCSS build when moving to production.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/8bbff90de8eb2aa86afbb2d58082aea71461482e

### 2026-09-21 - Migrated files to correct template
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "put all of them in the folder I created, final-project-trafficsync"
- **What it gave back:** It used PowerShell commands to move the `App.jsx` and `index.html` into the `client` subdirectory of the template.
- **What I kept, what I changed, and why:** Kept the file structure as it aligns with the course's required template format (separating client and server).
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/59777ecd3b12d13794358d8a26de450b494b3695

### 2026-09-25 - Atomic Design Refactor & Routing
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Does the current app adhere to M6A0, M6A1, M6A2, and M6A3 so far? If not, kindly make the current app adhere to all."
- **What it gave back:** It completely refactored the monolith `App.jsx` into atomic components (`atoms/`, `molecules/`, `organisms/`, `pages/`), extracted state to `SimulationContext.jsx`, and implemented `react-router-dom`.
- **What I kept, what I changed, and why:** I kept the entire refactor. It was exactly what was needed to meet the M6A2/M6A3 grading rubrics for state management and routing.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/2e335ada62eb281da3004c937aa3ad9f0c662410

### 2026-09-25 - Security Audit and HTTP Basic Auth
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Before your project goes public: lock it down... No secrets in the repository... put a door in front of it"
- **What it gave back:** It scanned the codebase for secrets, scrubbed PII, updated `.env.example`, and added HTTP Basic Authentication middleware to `server.js`.
- **What I kept, what I changed, and why:** Kept the middleware as it fulfilled the "Option B" access control requirement, and kept the `.env.example` updates to ensure no real passwords leaked.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/8a43aa5d01c5c1cb98f65c768cb0b86ae7cb9fa7

### 2026-09-25 - Pinned GitHub Actions to SHAs
- **Tool:** Google Antigravity (Gemini)
- **What I asked for:** "Pin third-party actions to a commit SHA, not to a moveable tag."
- **What it gave back:** It replaced all `@v4` style tags in `.github/workflows/deploy-pages.yml` with their full 40-character commit hashes.
- **What I kept, what I changed, and why:** I kept the changes because pinning actions to SHAs prevents supply chain attacks if a tag is maliciously re-pointed.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/2a600b3e22b114a7a0248db8453325b397c6840c

## 2. Where the AI got it wrong

### Case 1 - Scaffolded in the wrong directory
- **What it gave me:** It initially ran `npm create vite` in a new folder called `TrafficSync` instead of the required `final-project-template-2203-danlenoon` repository.
- **What was wrong with it:** It ignored the existing template structure that contained the `client` and `server` folders.
- **What I did instead:** I had to explicitly instruct the AI to move the code into the `client` directory of the correct template repository.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/59777ecd3b12d13794358d8a26de450b494b3695

### Case 2 - Overwriting the wrong CSS file
- **What it gave me:** When migrating the code to the template, the AI attempted to overwrite `index.css`.
- **What was wrong with it:** The template's Vite setup actually used `styles.css` as the main stylesheet. Writing to `index.css` did nothing.
- **What I did instead:** I had the AI read `main.jsx` to discover the correct import (`styles.css`) and copy the CSS rules there instead.
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/8bbff90de8eb2aa86afbb2d58082aea71461482e

## 3. Who wrote what

### Written by me

- **File:**
- **Commit:** 
- **What it does and why it is built this way:** 

### The AI-written part I understand best

- **File:** `client/src/App.jsx`
- **Commit:** https://github.com/danlenoon/TrafficSync/commit/2e335ada62eb281da3004c937aa3ad9f0c662410
- **What it does and why we kept it:** This file handles the React state transitions for the 5 main screens (Dashboard, Setup, Lanes, Timings, Results). We kept it as a monolithic file for Week 1 to quickly prove that passing configuration state down a 5-step flow works, validating the core functionality before we eventually refactor it into smaller Atomic components.
