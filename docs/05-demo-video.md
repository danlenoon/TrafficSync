# Demo Video

**Link:** [https://drive.google.com/file/d/1PjfBFxyJiyv46H7BzruSbd5xOpTnLiVT/view?usp=sharing](https://drive.google.com/file/d/1PjfBFxyJiyv46H7BzruSbd5xOpTnLiVT/view?usp=sharing)

## 1. Overview & Scope
The **TrafficSync** demonstration video deliverable showcases the complete end-to-end user workflow, system architecture, AI usage audit, and future engineering roadmap in a polished 5-minute presentation.

---

## 2. Presentation Segment Blueprint

| Segment | Time Window | What is Covered |
| :--- | :--- | :--- |
| **1. Problem** | 0:01 – 0:19 | The engineering difficulty of manual intersection signal timing. Introduces TrafficSync as a browser-based simulation tool that makes signal timing fast, visual, and correct. |
| **2. End-to-End Live Demo** | 0:20 – 1:38 | Full workflow on the live deployed URL (`https://danlenoon.github.io/TrafficSync/`): pre-seeded simulation portfolio cards (Fil-Am Friendship Highway × Clark Main Gate; MacArthur Highway × Brgy. Del Rosario Road), creating a new "Roxas Boulevard Ped Xing" simulation, Intersection Setup, Lane Customization, Interactive Traffic Light Phase Builder, Phase Timings Calculator, and the Cycle Results Summary. |
| **3. Tech Stack** | 1:39 – 2:05 | Full-stack architecture: React 18, Vite 6, Tailwind CSS, Atomic Design component hierarchy (`atoms/` → `molecules/` → `organisms/` → `pages/`), Liquid Glass dynamic clarity engine, Express REST API with HTTP Basic Authentication and CORS whitelisting, Neon PostgreSQL with JSONB simulation snapshots, and Offline Demo Mode via `localStorage` and `seed.json`. |
| **4. Simulation Context & AI Usage Audit** | 2:07 – 3:56 | Code-level walkthrough of `client/src/SimulationContext.jsx` (line 366, `const results = useMemo`). Explains the multi-phase clearance engine — cross-phase caution and red clearance accumulation — with a concrete example: 1 s go, 3 s caution, 2 s red clearance yields a 9 s total cycle, 5 s stop for the vehicle lane, and 8 s stop for the pedestrian crossing. Documents Google Antigravity (Gemini) assistance (engine math validation, Atomic Design refactor, press-and-hold debounce at 80 ms intervals, mobile autofill suppression) versus independently authored contributions (problem framing, intersection logic, seed data, all documentation). Discloses two AI failures: wrong scaffold directory and unresolvable GitHub Actions SHA. Full audit in `AI-USAGE.md`. |
| **5. Challenges & Roadmap** | 3:58 – 4:58 | Three engineering challenges: cross-phase clearance accumulation, mobile autofill suppression (`autoComplete`, `autoCorrect`, `autoCapitalize`, `spellCheck` all required simultaneously), and GitHub Pages 404 routing via a custom `404.html` query-parameter redirect. Three future enhancements: NEMA conflict detection, Webster's Optimum Cycle formula, and a 3D WebGL intersection canvas. |

---

## 3. Slide Deck Outline

| Slide | Agenda | Screen Time |
| :---: | :--- | :--- |
| 1 | Opening | 0:00 – 0:01 |
| 2 | Problem | 0:01 – 0:19 |
| 3 | Transition to Live Demo | 0:19 – 0:20 |
| — | *Live browser demo* | 0:20 – 1:38 |
| — | Transition to Tech Stack | 1:38 – 1:39 |
| 4 | Tech Stack | 1:39 – 2:05 |
| 5 | Transition to Simulation Context and AI Usage | 2:05 – 2:07 |
| — | *Code editor: `SimulationContext.jsx`* | 2:07 – 3:17 |
| — | *Code editor: `AI-USAGE.md`* | 3:17 – 3:56 |
| — | Transition to Challenges | 3:56 – 3:58 |
| 6 | Challenges | 3:58 – 4:30 |
| 7 | What I'd Do Next | 4:30 – 4:58 |
| 8 | Closing | 4:58 – 4:59 |

**Slide design tokens:** 1920 × 1080 px canvas, navy-to-slate diagonal gradient (`#0F172A → #1E293B`), Inter typography, Liquid Glass frosted cards (`rgba(255,255,255,0.08)` fill, `rgba(255,255,255,0.18)` border, 24 px corner radius), and the TrafficSync color palette (`#2563EB` primary blue, `#16A34A` success green, `#F59E0B` amber caution, `#DC2626` stop red).

---

## 4. Pre-Recording Protocol & Execution Checklist
The following production checklist was strictly completed before recording:
* [x] Opened the deployed URL (`https://danlenoon.github.io/TrafficSync/`) at least 5 minutes early to wake the Render API and Neon PostgreSQL database.
* [x] Confirmed both pre-seeded simulation cards visible on the Dashboard: "Fil-Am Friendship Highway × Clark Main Gate" and "MacArthur Highway × Brgy. Del Rosario Road" (sourced from `client/src/api/seed.json` and `server/db/seed.sql`).
* [x] Opened `client/src/SimulationContext.jsx` in the code editor, scrolled to line 366 (`const results = useMemo`) and ready to display for the AI audit segment.
* [x] Opened `AI-USAGE.md` in a second editor tab for a brief reference flash during the AI audit.
* [x] Loaded slide deck in Presenter View (16:9, 1920 × 1080 px), ready to Alt+Tab between slides, browser, and code editor.
* [x] Closed all personal browser tabs; only the TrafficSync tab visible.
* [x] Verified microphone input levels and screen capture resolution (1080p, 60 fps).
* [x] Completed a full practice run of the live demo flow (name → directions → lanes → phase builder → timings → calculate) before the real take.

---

## 5. Fallback Strategy
In accordance with professional engineering standards, offline fallback mechanisms ensure the application remains fully functional even during network interruptions or API maintenance:
* **Offline Demo Mode:** Setting `VITE_USE_MOCK_API=true` in `client/.env` redirects all API calls to `client/src/api/mockApi.js`, which reads from `client/src/api/seed.json` using `localStorage` for full CRUD simulation without any backend dependency.
* **Screenshot Fallback:** High-resolution screenshots of all application screens are stored in `docs/assets/` and can substitute for a live demo if network conditions degrade during recording.
* **Pre-recorded Fallback:** The submitted Google Drive recording (`https://drive.google.com/file/d/1PjfBFxyJiyv46H7BzruSbd5xOpTnLiVT/view?usp=sharing`) serves as the canonical, permanent deliverable.