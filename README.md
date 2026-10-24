# 🚦 TrafficSync

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status">
  <img src="https://img.shields.io/badge/React-18.3-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-green.svg" alt="Express">
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-blueviolet.svg" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Made%20with-AI%20Assistance-blue.svg" alt="Made with AI Assistance">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

[![A screenshot of the main screen](docs/assets/main_screen.png)](https://danlenoon.github.io/TrafficSync/)

<p align="center">
  <strong>An intuitive, state-of-the-art interactive traffic signal timing computation engine, lane turning geometry customizer, and signal phasing simulation suite for civil engineering students, urban planners, and municipal traffic authorities.</strong>
</p>

**Live site:** https://danlenoon.github.io/TrafficSync/  
**API:** https://trafficsync.onrender.com/api/simulations  
**Demo video:** [Watch Video Presentation]()   

---

## What it does

Traffic signal timing is the science of programming the green, yellow, and red lights at road intersections so that vehicles and pedestrians can move smoothly without crashing or waiting unnecessarily long. In traditional municipal planning and academic coursework, civil engineering students and transportation engineers are forced to either calculate complex phase clearance times by hand using tedious spreadsheets or license expensive, complex proprietary desktop suites.

**TrafficSync** transforms this workflow into an accessible, responsive, error-free web experience:

* **Interactive Intersection Setup:** Name your intersection and pick from four active approaches: **Northbound (N)**, **Southbound (S)**, **Eastbound (E)**, and **Westbound (W)**. To ensure a clean user experience on mobile devices and tablets, the intersection title input is hardened with autofill protection so contact menus never obscure your view.
* **Lane Turning Customization:** Dynamically configure individual lanes per approach with single-line movement arrows (`↰` Left Turn, `↑` Straight, `↱` Right Turn, `↩` U-Turn, and combinations like `↰ ↑ ↱`). Configure dedicated pedestrian crossing safety walk signals per approach. The centered `+ Add Lane` action is positioned right beneath configured lanes with comfortable touch targets.
* **Interactive Phase Light Builder:** Add sequential signal phases with realistic 3-lens traffic signal heads. When a new phase is added, signals default to an unconfigured "off" state (`CLICK TO SET` / unconfigured), prompting deliberate configuration (`Off` ➔ `Green` ➔ `Red`) to prevent accidental conflicting greens. Pedestrian crossing walk heads are housed in a dedicated 3-column boundary with balanced spacing for status badges.
* **Adaptive Cycle Timings Calculator:** Set minimum Go time ($\ge 1\text{s}$ to $9999\text{s}$), Caution amber intervals ($0\text{s}$ to $9999\text{s}$), and Red Clearance intervals ($0\text{s}$ to $9999\text{s}$) using ergonomic press-and-hold up/down pickers that halt immediately upon release, or type numbers continuously without losing input focus.
* **Multi-Phase Clearance & Dominant Stop Time Engine:** Computes the total cycle duration, individual phase allocations, and total red stop wait times. Unlike naive calculators, TrafficSync accurately aggregates yellow caution intervals and all-red clearance intervals across intervening phases:
  * In a **two-phase intersection** (Northbound Lane 1 Straight & Northbound Pedestrian with 1s Go, 3s Caution, 2s Red Clearance), TrafficSync computes **$5\text{s}$ Total Stop** for Lane 1, **$8\text{s}$ Total Stop** for Pedestrians, and a **$9\text{s}$ Total Cycle**.
  * In a **three-phase arterial intersection** (Northbound Left Turn, Northbound Straight, Southbound Straight, Westbound Straight, Eastbound Straight, and Northbound Pedestrian), TrafficSync computes **$14\text{s}$ Total Stop** for NB Left, **$8\text{s}$ Total Stop** for NB Straight, **$17\text{s}$ Total Stop** for NB Pedestrian, and an **$18\text{s}$ Total Cycle**.
* **Liquid Glass UI & Dynamic Clarity Slider:** Features an interactive slider in the navigation bar that dynamically adjusts the application's Liquid Glass opacity, backdrop blur, and border contrast in real-time. The slider capsule is horizontally centered on mobile viewports and fluidly expands across screen widths.
* **Cloud Simulation Portfolio & Persistence:** Save completed intersections to a cloud-backed PostgreSQL database or local storage, reload them anytime for further analysis, or delete old experiments with protective confirmation modals. The "Save" action is always responsive directly below the Phase Timings Calculator.

---

## Built with

TrafficSync is engineered using a modern, decoupled full-stack JavaScript architecture adhering to strict Atomic Design standards:

* **Frontend (Client SPA):**
  * **React 18.3** — Modern declarative UI built with functional components, hooks (`useState`, `useContext`, `useMemo`, `useRef`, `useEffect`), and custom Context providers.
  * **Vite 6** — Lightning-fast development server, Hot Module Replacement (HMR), and optimized production asset compilation.
  * **Tailwind CSS & CSS Custom Properties** — Utility-first styling coupled with real-time CSS variables for dynamic Liquid Glass clarity and backdrop blur manipulation.
  * **Lucide React** — Crisp, clean iconography across controls, movement arrows, trash action buttons, and directional indicators.
  * **React Router DOM 7** — Client-side SPA routing (`/`, `/editor`, `/results`) with automated 404 fallbacks for GitHub Pages subpaths.
* **Backend (REST API Gateway):**
  * **Node.js & Express 4** — Lightweight, high-throughput RESTful API handling intersection simulation CRUD operations.
  * **HTTP Basic Authentication** — Security middleware safeguarding database endpoints against unauthorized mutation.
  * **CORS (Cross-Origin Resource Sharing)** — Strict origin-whitelisting preventing cross-site scripting and unauthorized domain requests.
* **Database & Infrastructure:**
  * **PostgreSQL on Neon (Serverless)** — Cloud database with connection pooling (`pg` pool) and JSONB support for rich intersection snapshots.
  * **GitHub Pages** — Automated continuous deployment (CI/CD) for the production client application via GitHub Actions.
  * **Render** — Cloud web service hosting the Express API gateway.

---

## Demo mode

TrafficSync features a built-in **Dual-Mode Architecture** controlled by an environment flag:

| Mode | Configuration | How It Works | Best For |
| :--- | :--- | :--- | :--- |
| **Offline Demo Mode** *(Default)* | `VITE_USE_MOCK_API=true` | The React client intercepts all API calls and reads/writes simulation snapshots directly to browser `localStorage`. No server or database required! | Instant local evaluations, classroom demos, zero-setup testing, and offline presentations. |
| **Live Database Mode** | `VITE_USE_MOCK_API=false` | The client communicates over HTTPS with the Express REST API and writes snapshots to Neon PostgreSQL. | Multi-device cloud sync, persistence, and real production environments. |

---

## API Endpoints

The Express server exposes clean, RESTful endpoints under `/api/simulations`. All mutating routes require HTTP Basic Authentication headers.

| Method | Endpoint | Description | Status Codes | Auth Required? |
| :--- | :--- | :--- | :--- | :---: |
| `GET` | `/api/simulations` | Retrieve all saved intersection simulations (ordered newest first) | `200 OK`, `500 Server Error` | Yes |
| `GET` | `/api/simulations/:id` | Retrieve a single simulation by its numerical ID | `200 OK`, `404 Not Found` | Yes |
| `POST` | `/api/simulations` | Create and save a new simulation snapshot | `201 Created`, `400 Bad Request` | Yes |
| `PUT` | `/api/simulations/:id` | Update an existing simulation snapshot | `200 OK`, `400 Bad Request`, `404 Not Found` | Yes |
| `DELETE` | `/api/simulations/:id` | Delete a saved simulation snapshot | `200 OK`, `404 Not Found` | Yes |

---

## Running it yourself

Follow these step-by-step instructions to run TrafficSync on your local computer. Every command includes an explanatory `#` comment directly above it.

### Prerequisites
* **Node.js** (v18.0.0 or higher installed on your computer)
* **npm** (bundled automatically with Node.js)
* **Git** installed on your command line

---

### Step 1: Clone the repository
Open your command terminal (PowerShell, Bash, or Command Prompt) and clone the repository:

```bash
# Clone the project repository from GitHub to your local machine
git clone https://github.com/danlenoon/TrafficSync.git

# Move into the newly cloned project directory
cd TrafficSync
```

---

### Step 2: Install and run the Frontend (Client)

The frontend runs in **Offline Demo Mode out-of-the-box**, meaning you can test all features immediately without setting up a backend server or database!

```bash
# Navigate into the client directory from the project root
cd client

# Install all frontend dependencies (React, Vite, Lucide, Tailwind)
npm install

# Start the local Vite development server
npm run dev
```

After running `npm run dev`, open your web browser and visit:  
👉 **`http://localhost:5173`**

You can immediately configure intersections, customize lanes, build phases, calculate cycles, and adjust the Liquid Glass slider in your browser!

---

### Step 3: Install and run the Backend Server (Optional)

If you want to test the full-stack architecture with the live Express server and local/cloud PostgreSQL database:

```bash
# From the client directory, navigate back to the server directory
cd ../server

# Install backend dependencies (Express, pg, cors)
npm install

# Create your local environment configuration file from the template
cp .env.example .env
```

Open `server/.env` in your text editor and fill in your database credentials:
```env
PORT=3000
DATABASE_URL=postgres://your_user:your_password@localhost:5432/trafficsync
CORS_ORIGINS=http://localhost:5173,https://danlenoon.github.io
APP_USERNAME=admin
APP_PASSWORD=your_secure_password
NODE_ENV=development
```

Run database schema setup and launch the server:

```bash
# Initialize the database table and seed realistic intersection records
npm run db:reset

# Start the Express REST API server with local environment configuration
npm start
```

Your API is now listening at **`http://localhost:3000`**!

---

## Environment variables

### Frontend (`client/`)
Configure these in `client/.env` or in your hosting build settings:

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `VITE_USE_MOCK_API` | Boolean | `true` | When `true`, saves to browser `localStorage`. When `false`, connects to the backend API. |
| `VITE_API_BASE_URL` | URL | `https://trafficsync.onrender.com` | Base URL of the live Express REST API backend. |
| `VITE_APP_USERNAME` | String | `admin` | HTTP Basic Auth username for authenticated backend requests. |
| `VITE_APP_PASSWORD` | String | *(configured)* | HTTP Basic Auth password for authenticated backend requests. |

### Backend (`server/`)
Configure these in `server/.env` or in your Render dashboard:

| Variable | Required? | Example Value | Description |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | **Yes** | `postgresql://user:pass@host/db?sslmode=require` | PostgreSQL database connection string (Neon or local). |
| `PORT` | No | `3000` | Port on which the Express server listens. |
| `CORS_ORIGINS` | **Yes** | `http://localhost:5173,https://danlenoon.github.io` | Comma-separated list of allowed web origins. |
| `APP_USERNAME` | **Yes** | `admin` | Gateway username required for Basic Auth. |
| `APP_PASSWORD` | **Yes** | `your_secure_password` | Gateway password required for Basic Auth. |
| `NODE_ENV` | No | `production` | Environment mode (`development` or `production`). |

---

## Deploying

TrafficSync is production-deployed using modern automated cloud infrastructure:

### 1. Frontend to GitHub Pages (Automated CI/CD)
The client builds via GitHub Actions on every push to `main` using `.github/workflows/deploy-pages.yml`:
* Checks out the repository.
* Installs Node.js dependencies using `npm ci`.
* Runs `npm run build` compiling Vite assets to `client/dist`.
* Uploads build artifacts and publishes seamlessly to **GitHub Pages**.

### 2. Backend to Render Web Services
* Connect the GitHub repository to [Render](https://dashboard.render.com/).
* Select **Web Service**, set **Root Directory** to `server`.
* Set **Build Command** to `npm install` and **Start Command** to `npm run start:prod`.
* Add environment variables (`DATABASE_URL`, `CORS_ORIGINS`, `APP_USERNAME`, `APP_PASSWORD`, `NODE_ENV=production`).

### 3. Database to Neon Serverless PostgreSQL
* Create a project at [Neon](https://neon.tech/).
* Copy the pooled connection string (`postgres://...sslmode=require`).
* Paste the connection string into Render's `DATABASE_URL`.

---

## Project structure

TrafficSync follows strict Atomic Design principles on the client and modular repository patterns on the server:

```text
TrafficSync/
├── .github/                          # Automated CI/CD workflows
│   └── workflows/
│       └── deploy-pages.yml          # GitHub Pages build & deployment action pipeline
├── client/                           # Frontend React 18 Application (Vite SPA)
│   ├── public/                       # Static public assets (transparent favicon)
│   │   ├── favicon.ico               # Multi-resolution browser tab icon
│   │   └── favicon.png               # High-res transparent PNG tab favicon
│   ├── src/                          # Application source code
│   │   ├── api/                      # Dual-mode API abstraction layer
│   │   │   ├── httpApi.js            # Live Fetch client with HTTP Basic Auth
│   │   │   ├── index.js              # Runtime API switcher (Mock vs. Live)
│   │   │   ├── mockApi.js            # Offline localStorage mock client
│   │   │   └── seed.json             # Seed intersection records (Del Rosario & Clark)
│   │   ├── components/               # Strict Atomic Design architecture
│   │   │   ├── atoms/                # Fundamental elements (Button, Input, Badge)
│   │   │   ├── molecules/            # Compound UI cards (SimulationCard)
│   │   │   ├── organisms/            # Core sections (Navbar, Setup, Lanes, Timings, PhaseBuilder)
│   │   │   └── DemoNotice.jsx        # Non-intrusive offline demo indicator badge
│   │   ├── pages/                    # Routed SPA screen views
│   │   │   ├── Dashboard.jsx         # Saved simulations portfolio & project launcher
│   │   │   ├── SimulationEditor.jsx  # Multi-step intersection timing & lane editor
│   │   │   └── Results.jsx           # Phasing breakdown, bar charts, & cycle metrics
│   │   ├── App.jsx                   # React Router route registry and layout container
│   │   ├── index.css                 # Global CSS styles & custom scrollbars
│   │   ├── main.jsx                  # React DOM mount point & application bootstrap
│   │   └── SimulationContext.jsx     # Global simulation state & adaptive clearance engine
│   ├── .env.example                  # Frontend environment configuration template
│   ├── index.html                    # Single-page application HTML entry point
│   ├── package.json                  # Client dependencies (React, Vite, Lucide, Tailwind)
│   └── vite.config.js                # Vite build settings & subpath base config
├── server/                           # Backend Node.js Express REST API
│   ├── db/                           # PostgreSQL database access layer
│   │   ├── pool.js                   # Neon PostgreSQL connection pool with SSL
│   │   ├── run.js                    # Cross-platform SQL migration & seed runner
│   │   ├── schema.sql                # Relational table schema with JSONB support
│   │   └── seed.sql                  # Ground-truth seed intersections
│   ├── .env.example                  # Backend environment configuration template
│   ├── Dockerfile                    # Containerization recipe for containerized hosting
│   ├── package.json                  # Server dependencies (express, pg, cors)
│   ├── server.js                     # Express REST API, auth middleware, & routes
│   └── simulationsRepo.js            # Parameterized SQL database queries
├── docs/                             # Technical documentation & design deliverables
│   ├── assets/                       # High-resolution screenshots, logos, & visuals
│   ├── 01-proposal.md                # Revised project proposal & objectives
│   ├── 02-mockup.md                  # Responsive wireframe specifications
│   ├── 03-design-system.md           # Tokens, Atomic Design architecture, & typography
│   ├── 04-weekly-reports.md          # Chronological development reports
│   ├── 05-demo-video.md              # Video presentation guide & 3-5 min script
│   ├── 06-security-and-privacy.md    # Security audit, secrets scrubbing & CORS
│   └── README.md                     # Documentation index & status summary
├── .env.example                      # Root environment configuration template
├── .gitignore                        # Git exclusion rules (.env, node_modules, dist)
├── AI-USAGE.md                       # Comprehensive AI assistance & commit attribution log
├── compose.yml                       # Docker Compose orchestration recipe
├── LICENSE                           # Open-source MIT License
├── README.md                         # Main comprehensive repository guide
└── SECURITY-CHECKLIST.md             # Security verification checklist with evidence
```

---

## Architecture

TrafficSync separates responsibilities across three discrete layers to ensure reliability, high performance, and rapid testing:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER (React 18 SPA)                               │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  Dashboard View   │  Setup & Lanes Editor  │  Phase Builder  │  Cycle Results Summary  │
│  [SimulationCard] │  [LaneCustomization]   │  [SignalHeads]  │ [Visual Phase Breakdown]│
├────────────────────────────────────────────────────────────────────────────────────────┤
│                          SimulationContext (State & Math Engine)                       │
│  • Multi-Phase Clearance Engine (Go, Caution, RC)  • Liquid Glass variable controller  │
│  • Unconfigured Light Verification                 • Session Navigation Safety Guards  │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                     ┌──────────────────────┴──────────────────────┐
                     ▼                                             ▼
        [Offline Demo Mode: LocalStorage]             [Live Mode: REST API Client]
        Instant, self-contained client state          HTTPS Basic Auth JSON Requests
                                                                   │
┌──────────────────────────────────────────────────────────────────┴─────────────────────┐
│                             SERVER LAYER (Express REST API)                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  • Security Gate: HTTP Basic Authentication middleware                                 │
│  • CORS Whitelist Origin Validation                                                    │
│  • Payload Boundary Validation (strings, numbers, direction constraints)               │
│  • Parameterized SQL Repository (simulationsRepo.js)                                   │
└───────────────────────────────────────────┬────────────────────────────────────────────┘
                                            │
                                            ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                            DATABASE LAYER (Neon PostgreSQL)                            │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  • Relational simulations table with JSONB simulation data payloads                    │
│  • Automated timestamp tracking (created_at, updated_at)                               │
│  • Encrypted SSL Connection Pooling (sslmode=require)                                  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## Screenshots

| Application Screen & State | Interface Preview & Layout Description |
| :--- | :--- |
| **Home Dashboard (Saved Simulations)** | <img src="docs/assets/saved_simulation_dashboard_desktop.png" alt="Saved Simulation Dashboard" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The TrafficSync Dashboard displaying saved simulation portfolio cards with directional badges, timestamps, deletion controls, and the "+ New Simulation" action. |
| **Home Dashboard (Mobile View)** | <img src="docs/assets/saved_simulation_dashboard_mobile.png" alt="Saved Simulation Dashboard Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Mobile presentation of saved simulations showcasing centered actions and touch-friendly card spacing. |
| **Home Dashboard (Empty State)** | <img src="docs/assets/no_saved_simulations_dashboard_desktop.png" alt="Empty Dashboard" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The clean empty state welcoming first-time users to create their inaugural intersection simulation. |
| **Simulation Editor (Initial State)** | <img src="docs/assets/simulation_editor_without_user_inputs_desktop.png" alt="Simulation Editor Initial" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The Simulation Editor before input configuration, featuring the top Back button, intersection name prompt, and approach selection toggles. |
| **Simulation Editor (Active Configuration)** | <img src="docs/assets/simulation_editor_with_user_inputs_desktop.png" alt="Simulation Editor Active" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>A fully configured intersection featuring customized lane turning movements, oval number pickers, visual signal head phases, and bottom action buttons. |
| **Simulation Editor (Mobile View)** | <img src="docs/assets/simulation_editor_with_user_inputs_mobile.png" alt="Simulation Editor Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Responsive single-column mobile layout showing centered add-lane controls, pedestrian signal matrices, and contained action buttons. |
| **Cycle Results Summary (Desktop)** | <img src="docs/assets/cycle_results_summary_desktop.png" alt="Cycle Results Summary Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Comprehensive analytical results screen displaying total stop times, calculated cycle length, and interactive color-coded percentage breakdown bars. |
| **Cycle Results Summary (Mobile)** | <img src="docs/assets/cycle_results_summary_mobile.png" alt="Cycle Results Summary Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Mobile presentation of cycle results with stacked metrics and touch-accessible percentage breakdown telemetry. |
| **Liquid Glass (Default Appearance)** | <img src="docs/assets/liquid_glass_default_appearance_desktop.png" alt="Liquid Glass Default" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Balanced medium clarity (50%) providing translucent glass styling with optimal readability. |
| **Liquid Glass (Ultra Clear Appearance)** | <img src="docs/assets/liquid_glass_ultra_clear_appearance_desktop.png" alt="Liquid Glass Ultra Clear" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>High-transparency appearance maximizing backdrop visibility while preserving element border definition. |
| **Liquid Glass (Ultra Tinted Appearance)** | <img src="docs/assets/liquid_glass_ultra_tinted_appearance_desktop.png" alt="Liquid Glass Ultra Tinted" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Solid high-contrast appearance for high-glare environments or users preferring dense opaque surfaces. |

---

## What I would do next

While TrafficSync achieves all its initial objectives, real-world transportation systems present exciting opportunities for future iterations:

* **Automated Dual-Ring NEMA Phase Conflict Detection:** Replace manual light assignment with an automatic conflict matrix algorithm that algorithmically disallows concurrent green signals on conflicting vehicular paths.
* **Dynamic Webster's Optimum Cycle Formula:** Integrate real-time traffic volume input fields (vehicles per hour per lane) to compute mathematically optimal cycle lengths based on saturation flows.
* **Interactive 3D WebGL Intersection Canvas:** Render real-time 3D vehicles and animated pedestrian crossing agents moving across the intersection in synchronization with active signal lights using Three.js.

---

## Author

**Designed and developed for TrafficSync**  
**Built by [@danlenoon](https://github.com/danlenoon)**  
**BS Computer Science | CS-401**  

---

## AI use

This project was built with **AI Assistance**. In accordance with modern engineering standards and academic transparency, we disclose the role of AI in our development lifecycle:

* **AI Assistant:** Google Antigravity (Gemini)
* **Scope of Assistance:** Component refactoring into Atomic Design, mathematical multi-phase cycle engine validation, responsive cross-device layout engineering, press-and-hold interval timer debouncing, and comprehensive rubric audit compliance.
* **Full Transparency Log:** For complete prompt transcripts, error corrections, and commit-by-commit attributions, see [AI-USAGE.md](AI-USAGE.md).

---

## Licence

This project is open-source software licensed under the **[MIT License](LICENSE)**.
