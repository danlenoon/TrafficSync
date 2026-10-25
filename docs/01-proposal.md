# Proposal

## 1. What the app is for, in one sentence
**TrafficSync** is an intuitive, web-based simulation tool that calculates total stop seconds, clearance intervals, and complete cycle timings for complex road intersections based on user-defined lane turning geometries, green phases, and pedestrian crossings, offering a fast, visual, and error-free alternative to manual cycle calculation.

---

## 2. Who is it for
This app is designed specifically for **civil engineering students**, **urban traffic planners**, and **municipal transportation authorities**. Upon launching the app, users configure directional approaches (Northbound, Southbound, Eastbound, Westbound), assign custom turning lane geometries, construct sequential signal phases with visual traffic light heads, and enter timing intervals to instantly compute cycle metrics without mental math, spreadsheet errors, or expensive proprietary software suites.

---

## 3. Sections or Routes (Screens)

| # | Section / Route | Purpose & User Experience |
|---|---|---|
| 1 | **Home / Dashboard (`/`)** | Displays saved intersection simulations in responsive cards with exact creation timestamps, direction badges, and quick actions to launch new simulations or delete existing snapshots with protective confirmation warnings. On mobile devices, action buttons are centered and widened for comfortable touch interaction. |
| 2 | **Intersection Setup (`/editor` - Section 1)** | Configuration screen for inputting the intersection name, selecting operational directions, and toggling active directional approaches equipped with directional arrow indicators (`↑`, `↓`, `→`, `←`). The intersection name input suppresses browser autofill prompts across all devices to prevent mobile contact popover obstruction. |
| 3 | **Lane Customization (`/editor` - Section 2)** | Interactive tool to configure lane counts, circular number badges fitting 1 to 3 arrows in a single line, and pedestrian crossing safety walk toggles. The `+ Add Lane` action is centered directly beneath configured lanes. |
| 4 | **Phase Timings Calculator (`/editor` - Section 3)** | Input table with press-and-hold up/down pickers to adjust minimum Go time ($\ge 1\text{s}$ to $9999\text{s}$), Caution amber intervals ($0\text{s}$ to $9999\text{s}$), and Red Clearance intervals ($0\text{s}$ to $9999\text{s}$) with seamless continuous typing and synchronized hover states. |
| 5 | **Interactive Phase Light Builder (`/editor` - Section 4)** | Visual traffic light heads for vehicular lanes and pedestrian signals. Newly added phases default to an unconfigured state (`CLICK TO SET`) to require deliberate, conscious selection of non-conflicting greens (`Off` ➔ `Green` ➔ `Red`). Pedestrian signals feature strict 3-column boundary containment. |
| 6 | **Cycle Results Summary (`/results`)** | Analytical reporting dashboard outputting calculated total stop (red light) seconds, amber caution durations, total cycle length, interactive percentage timing bars, and the Liquid Glass clarity slider. |

---

## 4. State Management & Data Flow

| Data Entity | Shape / Structure | Store / Owner | Trigger for Change |
|---|---|---|---|
| `intersectionInfo` | `{ roadName: string, directions: { [dir]: boolean } }` | `SimulationContext` | User inputs name or toggles directional approaches in Setup. |
| `laneConfigs` | `{ [dir]: Array<{ id: number, type: string }> }` | `SimulationContext` | User adds or deletes lanes and assigns turning movement types in Lane Customization. |
| `phaseTimings` | `{ [laneKey]: { go: number, amber: number, red: number } }` | `SimulationContext` | User increments, decrements, or types timing seconds in the Phase Timings Calculator. |
| `phases` | `Array<{ id: number, name: string, lights: object, pedestrianLights: object }>` | `SimulationContext` | User adds phases and toggles signal lenses in the Phase Builder. |
| `savedSimulations` | `Array<{ id: number, title: string, road_name: string, data: object, created_at: string }>` | `SimulationContext` / Backend / `localStorage` | User clicks Save, Delete, or loads a project snapshot from the Dashboard. |
| `glassClarity` | `number` ($0.0$ to $1.0$) | `SimulationContext` / `localStorage` | User drags the Liquid Glass slider in the navbar, instantly updating root CSS custom properties. |

---

## 5. Hosting & Deployment Architecture

* **Frontend:** Production-deployed to **GitHub Pages** ([https://danlenoon.github.io/TrafficSync/](https://danlenoon.github.io/TrafficSync/)) via automated GitHub Actions CI/CD workflows (`.github/workflows/deploy-pages.yml`). Built with Vite and React 18, featuring dual-mode execution (Offline Demo Mode with automatic resilient `seed.json` auto-seeding and localStorage persistence vs. Live API Mode).
* **Backend API Gateway:** Deployed to **Render** ([https://trafficsync.onrender.com](https://trafficsync.onrender.com)), built with Node.js and Express 4, secured with HTTP Basic Authentication middleware, request payload validation, and CORS domain restriction.
* **Database Infrastructure:** Hosted on **Neon Serverless PostgreSQL** ([https://neon.tech](https://neon.tech)), featuring connection pooling (`pg`), JSONB snapshot payloads, and encrypted SSL transport (`sslmode=require`).

---

## 6. Risks and How They Were Handled

* **Deeply Nested Component State Management (Anticipated Risk):** Because an intersection contains directions, directions contain lanes, and lanes map to phase timing intervals and signal builder matrices, passing state via props was recognized early on as a major architectural hazard.
  * *Resolution:* Handled in Week 2 by centralizing all simulation entities within `SimulationContext.jsx`. This eliminated prop drilling, provided unified memoized cycle math, and guaranteed immediate synchrony between all editor cards and reporting screens.
* **CORS & GitHub Pages Routing Hazards (Encountered Risk):** SPA routing on GitHub Pages originally threw 404 errors when reloading subpages, and API calls to Render initially failed CORS validation.
  * *Resolution:* Configured the Vite `base` parameter and React Router's `basename` to match the repository path, added a post-build `404.html` fallback script, and configured exact comma-separated production origins in Render's `CORS_ORIGINS` environment settings.
* **Cross-Phase Clearance Interval Accumulation (Encountered Risk):** Initial calculations only accounted for opposing green times and omitted intervening caution and red clearance intervals across multi-phase spans.
  * *Resolution:* Upgraded calculation algorithms in `SimulationContext.jsx` to dynamically accumulate intervening caution amber and all-red clearance intervals across all intermediate phases, guaranteeing mathematical precision for dual-phase, triple-phase, and complex N-phase intersections.
