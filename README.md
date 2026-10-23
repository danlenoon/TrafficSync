# 🚦 TrafficSync

<p align="center">
  <img src="https://img.shields.io/badge/status-active-success.svg" alt="Status">
  <img src="https://img.shields.io/badge/React-18.3-blue.svg" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-green.svg" alt="Express">
  <img src="https://img.shields.io/badge/PostgreSQL-Neon-blueviolet.svg" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Made%20with-AI%20Assistance-blue.svg" alt="AI Assisted">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License">
</p>

<p align="center">
  <strong>An intuitive, state-of-the-art interactive traffic signal timing computation engine, lane turning geometry customizer, and signal phasing simulation suite for civil engineering students, urban planners, and municipal traffic authorities.</strong>
</p>

**Live site:** https://danlenoon.github.io/TrafficSync/  
**API:** https://trafficsync.onrender.com/api/simulations  
**Demo video:** [Watch Video Presentation]()

[![A screenshot of the main screen](docs/assets/dashboard.jpg)](https://danlenoon.github.io/TrafficSync/)

---

## What it does

Traffic signal timing is the science of programming the green, yellow, and red lights at road intersections so that vehicles and pedestrians can move smoothly without crashing or waiting unnecessarily long. In traditional municipal planning and academic coursework, civil engineering students and transportation engineers are forced to either calculate complex phase clearance times by hand using tedious spreadsheets or license expensive, complex proprietary desktop suites.

**TrafficSync** transforms this workflow into an accessible, responsive, error-free web experience:
* **Interactive Intersection Setup:** Name your intersection and pick from four active approaches: **Northbound (N)**, **Southbound (S)**, **Eastbound (E)**, and **Westbound (W)**.
* **Lane Turning Customization:** Dynamically configure individual lanes per approach with single-line movement arrows (`↰` Left Turn, `↑` Straight, `↱` Right Turn, `↩` U-Turn, and combinations like `↰ ↑ ↱`). Configure dedicated pedestrian crossing safety walk signals per approach.
* **Interactive Phase Light Builder:** Add sequential signal phases with realistic 3-lens traffic signal heads. When a new phase is added, signals default to an unconfigured "off" state (`CLICK TO SET`), prompting deliberate configuration (`Off` ➔ `Green` ➔ `Red`) to prevent accidental conflicting greens.
* **Adaptive Cycle Timings Calculator:** Set minimum Go time ($\ge 1\text{s}$), Caution amber intervals, and Red Clearance intervals using ergonomic press-and-hold up/down pickers that halt immediately upon release.
* **Cycle Results & Dominant Stop Time Engine:** Computes the total cycle duration, individual phase allocations, and total red stop wait times. For example, in a two-phase intersection where Phase 1 serves North/South and Phase 2 serves East/West with 1s Go, 3s Amber, and 2s Red Clearance, TrafficSync computes exactly **$8\text{s}$ Total Stop** and a balanced **$12\text{s}$ Total Cycle**.
* **Liquid Glass UI & Dynamic Clarity Slider:** Features an interactive slider in the navigation bar that dynamically adjusts the application's Liquid Glass opacity, backdrop blur, and border contrast in real-time.
* **Cloud Simulation Portfolio & Persistence:** Save completed intersections to a cloud-backed PostgreSQL database, reload them anytime for further analysis, or delete old experiments with protective confirmation modals.

---

## Built with

TrafficSync is engineered using a modern, decoupled full-stack JavaScript architecture:

* **Frontend:**
  * **React 18.3** — Functional components with hooks (`useState`, `useContext`, `useMemo`, `useRef`, `useEffect`).
  * **Vite 6** — Lightning-fast development server, module bundler, and production build optimization.
  * **Tailwind CSS & CSS Custom Properties** — Utility-first responsive design coupled with dynamic CSS variables for real-time Liquid Glass clarity manipulation.
  * **Lucide React** — Crisp, clean iconography across controls, actions, and directional indicators.
  * **React Router DOM 7** — Client-side SPA routing (`/`, `/editor`, `/results`) with GitHub Pages subpath support.
* **Backend:**
  * **Node.js & Express 4** — Fast, lightweight RESTful API gateway handling simulation CRUD operations.
  * **HTTP Basic Authentication** — Built-in security middleware safeguarding database endpoints against unauthorized mutation.
  * **CORS (Cross-Origin Resource Sharing)** — Strict origin-whitelisting preventing cross-site tampering.
* **Database & Hosting:**
  * **PostgreSQL on Neon (Serverless)** — Cloud database with connection pooling (`pg` pool) and JSONB support for rich intersection snapshots.
  * **GitHub Pages** — Automated continuous deployment (CI/CD) for the production client application.
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

Follow these step-by-step instructions to run TrafficSync on your local computer.

### Prerequisites
* **Node.js** (v18.0.0 or higher installed)
* **npm** (bundled with Node.js)
* **Git** installed on your terminal

---

### Step 1: Clone the repository
Open your command terminal (PowerShell, Bash, or Command Prompt) and clone the repository:

```bash
# Clone the repository from GitHub
git clone https://github.com/danlenoon/TrafficSync.git

# Move into the project directory
cd TrafficSync
```

---

### Step 2: Install and run the Frontend (Client)

The frontend runs in Offline Demo Mode out-of-the-box, meaning you can test all features immediately without configuring a database!

```bash
# Move into the client directory
cd client

# Install frontend dependencies (React, Vite, Lucide, Tailwind)
npm install

# Start the local Vite development server
npm run dev
```

After running the command, open your web browser and visit:
👉 **`http://localhost:5173`**

You can build, test, and save traffic light simulations immediately in your browser.

---

### Step 3: Install and run the Backend Server (Optional)

If you want to test the full-stack architecture with the live Express server and local/cloud PostgreSQL database:

```bash
# From the project root, navigate into the server directory
cd ../server

# Install backend dependencies (Express, pg, cors, dotenv)
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

# Start the Express REST API server
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
| `VITE_API_USERNAME` | String | `admin` | HTTP Basic Auth username for authenticated backend requests. |
| `VITE_API_PASSWORD` | String | *(configured)* | HTTP Basic Auth password for authenticated backend requests. |

### Backend (`server/`)
Configure these in `server/.env` or in your Render dashboard:

| Variable | Required? | Example Value | Description |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | **Yes** | `postgresql://user:pass@host/db?sslmode=require` | PostgreSQL database connection string (Neon or local). |
| `PORT` | No | `3000` | Port on which the Express server listens. |
| `CORS_ORIGINS` | **Yes** | `http://localhost:5173,https://danlenoon.github.io` | Comma-separated list of allowed web origins. |
| `APP_USERNAME` | **Yes** | `admin` | Gateway username required for Basic Auth. |
| `APP_PASSWORD` | **Yes** | `supersecretpassword` | Gateway password required for Basic Auth. |
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
* Set **Build Command** to `npm install` and **Start Command** to `npm start`.
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
├── client/                           # Frontend React 18 Application (Vite SPA)
│   ├── index.html                    # Single-page application entry point & styles
│   ├── package.json                  # Client dependencies (React, Vite, Lucide)
│   ├── vite.config.js                # Vite build settings & subpath base config
│   └── src/
│       ├── api/                      # Dual-mode API abstraction
│       │   ├── httpApi.js            # Live Fetch client with HTTP Basic Auth
│       │   └── mockApi.js            # Offline localStorage mock client
│       ├── components/               # Atomic Design architecture
│       │   ├── atoms/                # Fundamental elements (Button, Input, Badge)
│       │   ├── molecules/            # Compound UI cards (SimulationCard)
│       │   └── organisms/            # Core sections (Navbar, Setup, Lanes, Timings, PhaseBuilder)
│       ├── pages/                    # Routed screen views
│       │   ├── Dashboard.jsx         # Saved simulations portfolio & project launcher
│       │   ├── SimulationEditor.jsx  # Multi-step intersection timing & lane editor
│       │   └── Results.jsx           # Phasing breakdown, bar charts & cycle metrics
│       ├── SimulationContext.jsx     # Global simulation state & adaptive math engine
│       ├── App.jsx                   # React Router routes and layout wrapper
│       ├── main.jsx                  # React DOM mount point
│       └── index.css                 # Global styles & custom-dropdown-scrollbar
├── server/                           # Backend Node.js Express REST API
│   ├── db/                           # Database layer
│   │   ├── pool.js                   # PostgreSQL connection pool with SSL
│   │   ├── schema.sql                # Relational table schema with JSONB support
│   │   ├── seed.sql                  # Ground-truth seed intersections
│   │   └── run.js                    # Database migration & seed CLI runner
│   ├── package.json                  # Server dependencies (express, pg, cors, dotenv)
│   ├── server.js                     # Express app, auth middleware & route handlers
│   └── simulationsRepo.js            # Parameterized SQL database queries
├── docs/                             # Technical documentation & design deliverables
│   ├── assets/                       # Real screenshots, logos, and visual assets
│   ├── 01-proposal.md                # Revised project proposal & objectives
│   ├── 02-mockup.md                  # Responsive wireframe specifications
│   ├── 03-design-system.md           # Tokens, Atomic Design architecture & typography
│   ├── 04-weekly-reports.md          # Chronological development reports
│   ├── 05-demo-video.md              # Video presentation guide & 3-5 min script
│   ├── 06-security-and-privacy.md    # Security audit, secrets scrubbing & CORS
│   ├── slides.html                   # Ready-to-present 16:9 interactive HTML slides
│   └── README.md                     # Documentation index & status summary
├── SECURITY-CHECKLIST.md             # Security verification checklist with evidence
├── AI-USAGE.md                       # Comprehensive AI assistance & commit attribution log
└── README.md                         # Main comprehensive repository guide
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
│  • Multi-Phase Clearance Engine (Go, Caution, RC) • Liquid Glass Variable Controller   │
│  • Unconfigured Light Verification                • Session Navigation Safety Guards   │
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

| Application Screen | Interface Preview & Layout Description |
| :---: | :--- |
| **Home Dashboard** | <img src="docs/assets/dashboard.jpg" alt="TrafficSync Dashboard" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br><strong>Caption:</strong> <em>The TrafficSync Dashboard displaying saved simulation portfolio cards with directional badges, timestamps, deletion controls, and the "+ New Simulation" action.</em> |
| **Cycle Results & Analysis** | <img src="docs/assets/results.jpg" alt="TrafficSync Cycle Results Summary" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br><strong>Caption:</strong> <em>The Cycle Results Summary screen presenting calculated red stop durations, total cycle lengths, interactive percentage timing bars, and the Liquid Glass clarity slider.</em> |

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

* **AI Assistant:** Google Gemini (Antigravity CLI Agent)
* **Scope of Assistance:** Component refactoring into Atomic Design, mathematical multi-phase cycle engine validation, responsive cross-device layout engineering, press-and-hold interval timer debouncing, and comprehensive rubric audit compliance.
* **Full Transparency Log:** For complete prompt transcripts, error corrections, and commit-by-commit attributions, see [AI-USAGE.md](AI-USAGE.md).

---

## Licence

This project is open-source software licensed under the **[MIT License](LICENSE)**.
