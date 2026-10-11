# Project Proposal: TrafficSync

---

## 1. What the app is for, in one sentence
TrafficSync is a simulation tool that calculates the total stop seconds for intersection lanes based on user-defined green, amber, and red phases, offering a fast, error-free alternative to manual cycle calculation.

---

## 2. Who is it for
This app is specifically for civil engineering students or traffic planners. As they open the app, they configure lane directions and input phase timings to instantly calculate traffic light cycles without relying on mental math or expensive engineering software.

---

## 3. Sections or Routes (Screens)

| # | Section / Route | What it is for |
|---|---|---|
| 1 | **Home / Dashboard (`/`)** | Displays saved intersection simulations with exact creation timestamps, direction badges, and quick actions to create new simulations or delete existing ones. |
| 2 | **Intersection Setup (`/editor`)** | A configuration screen for inputting intersection names, cycle modes (Auto-Detect, Reference Standards, Custom), and active directions (Northbound, Southbound, Eastbound, Westbound) with interactive phase building. |
| 3 | **Lane Customization (`/editor`)** | A route to specify lane counts, enlarged number badges, and movement types (Left Turn, Straight, Right Turn, U-Turn, and combination lanes). |
| 4 | **Phase Timings Calculator & Phase Builder (`/editor`)** | The core tool where users set green (Go), amber (Caution), and red clearance interval seconds for configured lanes and pedestrian crossing signals. |
| 5 | **Cycle Results Summary (`/results`)** | A dashboard outputting calculated total stop (red light) seconds per cycle, amber durations, adaptive timings, and interactive percentage breakdown bar charts. |

---

## 4. State Management & Data Flow

| Data | Shape (rough) | Who owns it | Changes when... |
|---|---|---|---|
| `intersectionInfo` | `{ intersectionName: string, cycleMode: string, customCycleLength: number, directions: object }` | `SimulationContext` | The user creates or edits a new intersection project. |
| `laneConfigs` | `{ [direction]: Array<{ type: string, go: number, amber: number, red: number }> }` | `SimulationContext` | The user adds lanes and assigns movement types. |
| `phaseTimings` | Array<{ laneId: string, go: number, amber: number, red: number }> | `SimulationContext` | The user inputs clearance intervals in seconds for specific lanes. |
| `savedSimulations` | Array<{ id: number, title: string, road_name: string, data: object, created_at: string }> | `SimulationContext` / Backend / `localStorage` | The user saves, loads, or deletes simulation snapshots. |

---

## 5. Hosting & Deployment Architecture

- **Frontend:** Deployed to **GitHub Pages** (`https://danlenoon.github.io/TrafficSync/`) via GitHub Actions. Built with Vite and React, supporting both Demo Mode (`localStorage`) and Live API mode (`VITE_USE_MOCK_API=false`).
- **Backend API:** Deployed to **Render** (`https://trafficsync.onrender.com`), built with Node.js and Express, secured with HTTP Basic Authentication and CORS restriction.
- **Database:** Hosted on **Neon** (Neon.tech) Serverless PostgreSQL, connected via pooled `DATABASE_URL` with SSL (`sslmode=require`).

---

## 6. Risks and How They Were Handled

- **Managing Deeply Nested State in React (Anticipated Risk):** Because an intersection has multiple directions, each direction has multiple lanes, and each lane has specific timings, passing this data up and down the component tree was identified as a major architectural risk in the initial proposal.
- **Resolution:** This was successfully mitigated early in Week 2 by extracting state management into `SimulationContext.jsx`, eliminating prop-drilling entirely and ensuring clean global updates across the Dashboard, Editor, and Results views.
- **CORS & Subfolder Routing on GitHub Pages (Encountered Risk):** Resolved by explicitly configuring Vite base path (`base: '/TrafficSync/'`) and React Router basename (`basename={import.meta.env.BASE_URL}`).
