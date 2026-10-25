# 🚦 TrafficSync

<p align="center">
  <a href="https://github.com/danlenoon/TrafficSync/actions"><img src="https://img.shields.io/badge/status-active-success.svg" alt="Status"></a>
  <a href="https://react.dev"><img src="https://img.shields.io/badge/React-18.3-blue.svg" alt="React"></a>
  <a href="https://expressjs.com"><img src="https://img.shields.io/badge/Node.js-Express-green.svg" alt="Express"></a>
  <a href="https://neon.tech"><img src="https://img.shields.io/badge/PostgreSQL-Neon-blueviolet.svg" alt="PostgreSQL"></a>
  <a href="AI-USAGE.md"><img src="https://img.shields.io/badge/Made%20with-AI%20Assistance-blue.svg" alt="Made with AI Assistance"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"></a>
</p>

[![A screenshot of the main screen](docs/assets/main_screen.png)](https://danlenoon.github.io/TrafficSync/)

<p align="center">
  <strong>An intuitive, state-of-the-art interactive traffic signal timing computation engine, lane turning geometry customizer, and signal phasing simulation suite for civil engineering students, urban planners, and municipal traffic authorities.</strong>
</p>

**Live site:** [https://danlenoon.github.io/TrafficSync/](https://danlenoon.github.io/TrafficSync/)  
**API:** [https://trafficsync.onrender.com/api/simulations](https://trafficsync.onrender.com/api/simulations)  
**Demo video:** 

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
| **Offline Demo Mode** *(Default)* | `VITE_USE_MOCK_API=true` | The React client intercepts all API calls and reads/writes simulation snapshots directly to browser `localStorage` with automatic resilient seeding (`seed.json`) and empty-state fallback protection. No server or database required! | Instant local evaluations, classroom demos, zero-setup testing, and offline presentations. |
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
# Clone the project repository from GitHub to your local machine via HTTPS
git clone https://github.com/danlenoon/TrafficSync.git

# Enter the root directory of the cloned repository
cd TrafficSync

# Verify git remote connection status and current branch tracking
git remote -v
git status
```

---

### Step 2: Install and run the Frontend (Client)

The frontend runs in **Offline Demo Mode out-of-the-box**, meaning you can test all features immediately without setting up a backend server or database!

Navigate into the client directory from the project root:

```bash
# Navigate from the project root directory into the client folder
cd client

# Confirm current working directory and verify package.json existence
pwd
ls package.json
```

Install all frontend dependencies and prepare the environment:

```bash
# Install all required React 18, Vite, Lucide, and Tailwind CSS packages
npm install

# (Optional) Duplicate the template .env file to create your local .env configuration
cp .env.example .env
```

Start the local Vite development server:

```bash
# Launch the Vite local development server with hot-module replacement (HMR)
npm run dev
```

After running `npm run dev`, open your web browser and visit:  
👉 **`http://localhost:5173`**

You can immediately configure intersections, customize lanes, build phases, calculate cycles, and adjust the Liquid Glass slider in your browser!

---

### Step 3: Setup the Database (Optional)

If you intend to run the full-stack version, you will need a PostgreSQL database. Ensure you have a PostgreSQL instance running locally or in the cloud, then create a new database:

```bash
# Connect to PostgreSQL and create the target database named 'trafficsync'
createdb trafficsync

# Alternatively, you can open psql interactive shell and execute:
# CREATE DATABASE trafficsync;
```

Navigate to the server directory to prepare for schema initialization:

```bash
# Move from your current directory to the server directory
cd server

# Verify server directory contents and check database migration scripts
ls db/
```

---

### Step 4: Install and run the Backend Server (Optional)

If you want to test the full-stack architecture with the live Express server, navigate into the server directory:

```bash
# Navigate from project root or client directory into the server folder
cd server

# Verify current working directory and check for backend package.json
pwd
ls package.json
```

Install backend dependencies (Express, pg, cors, dotenv):

```bash
# Install all required backend packages and dependencies from npm registry
npm install
```

Create your local environment configuration file from the template:

```bash
# Duplicate .env.example to generate your local live .env configuration file
cp .env.example .env

# Verify that the .env file was successfully created
ls -la .env
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
# Run database migration and seed script to initialize tables
npm run db:reset

# Start the Express REST API server in development mode
npm start
```

Your API is now listening at **`http://localhost:3000`**!

---

### Step 5: Run as a Full Stack Application

To connect the Frontend to your live Backend and switch from LocalStorage to the PostgreSQL database, navigate to the client folder and configure `client/.env`:

```bash
# Navigate to the client directory from project root
cd client

# Duplicate template file to create client .env if not already present
cp .env.example .env
```

Set the following variables in `client/.env` to connect to your local backend:

```env
VITE_USE_MOCK_API=false
VITE_API_BASE_URL=http://localhost:3000
```

To run the complete full-stack application, start both the frontend and backend servers simultaneously in two separate terminal windows:

```bash
# ===========================================
# TERMINAL 1: Frontend Development Server
# ===========================================

# Navigate to client directory
cd client

# Start the Vite local development server with HMR
npm run dev
```

```bash
# ===========================================
# TERMINAL 2: Backend Express REST API Server
# ===========================================

# Navigate to server directory
cd server

# Start the Node.js Express server
npm start
```

Now, TrafficSync will save and load data directly from your PostgreSQL database instead of the browser's storage!

---

### Troubleshooting

If you encounter issues during setup, check these common solutions organized by category:

**1. Port Conflicts (5173 or 3000)**

If you see `EADDRINUSE`, a process is already using the required port. On Windows, identify the process ID (PID) and terminate it:

```bash
# Search for active process occupying port 5173 or 3000
netstat -ano | findstr :5173

# Forcefully terminate the conflicting process using its Process ID (PID)
taskkill /PID <PID_NUMBER> /F
```

On Linux or macOS, use the following commands:

```bash
# Find the process ID listening on port 5173
lsof -i :5173

# Terminate the process forcefully
kill -9 <PID>
```

**2. Database & Connection Errors**

Verify that PostgreSQL is active on your system. On Windows, open the "Services" app and ensure `postgresql-x64` is **Running**. On Linux or macOS, check the service status:

```bash
# Check systemd status of PostgreSQL service
sudo service postgresql status

# Alternatively, test connection via psql
psql -U postgres -c "SELECT version();"
```

If `npm run db:reset` fails, ensure the database `trafficsync` exists. Log into PostgreSQL and create it manually if necessary:

```bash
# Open interactive PostgreSQL terminal as superuser
psql -U postgres

# Create the target database if missing
CREATE DATABASE trafficsync;

# Exit psql interactive shell
\q
```

Check the `server/.env` format and avoid spaces around the `=` sign:

```env
DATABASE_URL=postgres://user:pass@localhost:5432/trafficsync
```

**3. Frontend-Backend Communication (CORS)**

If the frontend cannot communicate with the backend, verify the `CORS_ORIGINS` in `server/.env`. It must match your frontend's exact URL:

```env
CORS_ORIGINS=http://localhost:5173
```

Ensure your client is configured to use the API instead of Mock Mode in `client/.env`:

```env
VITE_USE_MOCK_API=false
```

**4. Node.js & Dependency Issues**

Verify you are using the supported Node.js version (v18 or higher):

```bash
# Check installed Node.js runtime version
node -v

# Check npm package manager version
npm -v
```

If dependencies are corrupted, perform a clean reinstall in both `client` and `server` directories:

```bash
# Remove node_modules and lockfiles to ensure a clean state
rm -rf node_modules package-lock.json

# Reinstall all fresh dependencies from registry
npm install
```

**5. Environment Variables Missing**

If you get `undefined` or configuration errors, ensure `.env` files exist in **BOTH** directories and contain all required keys:

```bash
# Check for existence of .env files in client and server directories
ls -la client/.env server/.env
```

**6. Script Execution Permissions**

On Linux or macOS, if binary scripts fail to run due to permissions:

```bash
# Grant executable permissions to local node binaries
chmod +x node_modules/.bin/*
```

**7. Browser-Specific Issues**

If data seems stuck or the UI is inconsistent due to stale cached state, clear your browser's LocalStorage:

```bash
# Open Browser DevTools (F12) -> Application Tab -> Local Storage -> Right-click origin -> Clear
```

**8. SSL / Self-Signed Certificate Errors (Neon / Remote PostgreSQL)**

If you experience TLS/SSL handshake failures or untrusted certificate errors when connecting to cloud PostgreSQL databases (like Neon):

```bash
# Ensure your DATABASE_URL appends the required SSL mode parameter
# Example: postgres://user:pass@host/db?sslmode=require
```

**9. Vite Build / Module Resolution Errors**

If you encounter missing module errors or `vite: command not found`:

```bash
# Ensure global or local binaries are linked correctly by reinstalling client dependencies
cd client
npm install
npm run build
```

**10. Basic Authentication Failures (401 Unauthorized)**

If backend API requests return `401 Unauthorized`, verify that your credentials match the server's environment variables:

```bash
# Check server/.env for matching authentication credentials
grep -E "APP_USERNAME|APP_PASSWORD" server/.env
```

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
TrafficSync/                                          # Root repository directory
├── .github/                                          # Automated CI/CD workflows
│   └── workflows/                                    # GitHub Actions workflows folder
│       └── deploy-pages.yml                          # GitHub Pages deployment action pipeline
├── client/                                           # Frontend React 18 Application (Vite SPA)
│   ├── src/                                          # Application source code
│   │   ├── api/                                      # Dual-mode API abstraction layer
│   │   │   ├── httpApi.js                            # Live Fetch client with HTTP Basic Auth
│   │   │   ├── index.js                              # Runtime API switcher (Mock vs. Live)
│   │   │   ├── mockApi.js                            # Offline localStorage mock client
│   │   │   └── seed.json                             # Seed intersection records (Del Rosario & Clark)
│   │   ├── components/                               # Strict Atomic Design architecture
│   │   │   ├── atoms/                                # Fundamental atomic elements
│   │   │   │   └── Button.jsx                        # Reusable styled action button component
│   │   │   ├── molecules/                            # Compound UI components
│   │   │   │   └── SimulationCard.jsx                # Saved intersection simulation preview card
│   │   │   ├── organisms/                            # Core feature sections & UI modules
│   │   │   │   ├── LanesSection.jsx                  # Lane turning geometry and customizer view
│   │   │   │   ├── Navbar.jsx                        # Application header, navigation & Liquid Glass controls
│   │   │   │   ├── PhaseBuilderSection.jsx           # Signal phase light builder & matrix
│   │   │   │   ├── SetupSection.jsx                  # Intersection naming & approach direction toggles
│   │   │   │   └── TimingsSection.jsx                # Go, caution, and red clearance time pickers
│   │   │   └── DemoNotice.jsx                        # Non-intrusive offline demo mode indicator badge
│   │   ├── pages/                                    # Routed SPA screen views
│   │   │   ├── Dashboard.jsx                         # Saved simulations portfolio & project launcher
│   │   │   ├── SimulationEditor.jsx                  # Multi-step intersection timing & lane editor
│   │   │   └── Results.jsx                           # Phasing breakdown, bar charts, & cycle metrics
│   │   ├── App.jsx                                   # React Router route registry and layout container
│   │   ├── index.css                                 # Global CSS styles & custom scrollbars
│   │   ├── main.jsx                                  # React DOM mount point & application bootstrap
│   │   ├── SimulationContext.jsx                     # Global simulation state & adaptive clearance engine
│   │   └── styles.css                                # Additional custom CSS styles
│   ├── .env.example                                  # Frontend environment configuration template
│   ├── index.html                                    # Single-page application HTML entry point
│   ├── package.json                                  # Client dependencies (React, Vite, Lucide, Tailwind)
│   └── vite.config.js                                # Vite build settings & subpath base config
├── server/                                           # Backend Node.js Express REST API
│   ├── db/                                           # PostgreSQL database access layer
│   │   ├── pool.js                                   # Neon PostgreSQL connection pool with SSL
│   │   ├── run.js                                    # Cross-platform SQL migration & seed runner
│   │   ├── schema.sql                                # Relational table schema with JSONB support
│   │   └── seed.sql                                  # Ground-truth seed intersections
│   ├── .env.example                                  # Backend environment configuration template
│   ├── Dockerfile                                    # Containerization recipe for containerized hosting
│   ├── package.json                                  # Server dependencies (express, pg, cors)
│   ├── server.js                                     # Express REST API, auth middleware, & routes
│   ├── sightingsRepo.js                              # Traffic sightings database queries
│   └── simulationsRepo.js                            # Parameterized SQL database queries
├── docs/                                             # Technical documentation & design deliverables
│   ├── assets/                                       # High-resolution screenshots & visuals
│   │   ├── cycle_results_summary_desktop.png         # Desktop analytical results summary screenshot
│   │   ├── cycle_results_summary_mobile.png          # Mobile analytical results summary screenshot
│   │   ├── liquid_glass_default_appearance_desktop.png # Desktop default Liquid Glass screenshot
│   │   ├── liquid_glass_default_appearance_mobile.jpeg # Mobile default Liquid Glass screenshot
│   │   ├── liquid_glass_ultra_clear_appearance_desktop.png # Desktop ultra-clear glass screenshot
│   │   ├── liquid_glass_ultra_clear_appearance_mobile.jpeg # Mobile ultra-clear glass screenshot
│   │   ├── liquid_glass_ultra_tinted_appearance_desktop.png # Desktop ultra-tinted glass screenshot
│   │   ├── liquid_glass_ultra_tinted_appearance_mobile.jpeg # Mobile ultra-tinted glass screenshot
│   │   ├── main_screen.png                           # Primary application screenshot visual
│   │   ├── no_saved_simulations_dashboard_desktop.png # Desktop empty dashboard screenshot
│   │   ├── no_saved_simulations_dashboard_mobile.png # Mobile empty dashboard screenshot
│   │   ├── saved_simulation_dashboard_desktop.png    # Desktop saved simulation portfolio screenshot
│   │   ├── saved_simulation_dashboard_mobile.png     # Mobile saved simulation portfolio screenshot
│   │   ├── simulation_editor_with_user_inputs_desktop.png # Desktop active editor screenshot
│   │   ├── simulation_editor_with_user_inputs_mobile.png # Mobile active editor screenshot
│   │   ├── simulation_editor_without_user_inputs_desktop.png # Desktop initial setup screenshot
│   │   └── simulation_editor_without_user_inputs_mobile.png # Mobile initial setup screenshot
│   ├── 01-proposal.md                                # Revised project proposal & objectives
│   ├── 02-mockup.md                                  # Responsive wireframe specifications
│   ├── 03-design-system.md                           # Tokens, Atomic Design architecture, & typography
│   ├── 04-weekly-reports.md                          # Chronological development reports
│   ├── 05-demo-video.md                              # Video presentation guide & 3-5 min script
│   ├── 06-security-and-privacy.md                    # Security audit, secrets scrubbing & CORS
│   └── README.md                                     # Documentation index & status summary
├── .env.example                                      # Root environment configuration template
├── .gitignore                                        # Git exclusion rules (.env, node_modules, dist)
├── AI-USAGE.md                                       # Comprehensive AI assistance & commit attribution log
├── compose.yml                                       # Docker Compose orchestration recipe
├── LICENSE                                           # Open-source MIT License
├── README.md                                         # Main comprehensive repository guide
└── SECURITY-CHECKLIST.md                             # Security verification checklist with evidence
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

Explore the responsive user interface across desktop and mobile form factors, featuring the saved simulation portfolio, interactive intersection editor, analytical cycle results breakdown, and dynamic Liquid Glass design system.

### Desktop Interfaces

| Application Screen & State | Comprehensive Layout Description & Interface Features |
| :--- | :--- |
| **Home Dashboard (Saved Simulations)** | <img src="docs/assets/saved_simulation_dashboard_desktop.png" alt="Saved Simulation Dashboard Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The master portfolio dashboard presenting saved intersection simulation cards in a responsive grid. Each card displays directional indicators, creation timestamps, quick-load triggers, and deletion controls, anchored by the prominent "+ New Simulation" action. |
| **Home Dashboard (Empty State)** | <img src="docs/assets/no_saved_simulations_dashboard_desktop.png" alt="Empty Dashboard Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The welcoming initial state displayed when no simulations are saved in local storage or database persistence, providing a clean onboarding call-to-action for new users. |
| **Simulation Editor (Initial State)** | <img src="docs/assets/simulation_editor_without_user_inputs_desktop.png" alt="Simulation Editor Initial Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The multi-step intersection configuration view prior to data entry. Features a header navigation control with a back button, intersection naming field, and interactive approach toggles (Northbound, Southbound, Eastbound, Westbound). |
| **Simulation Editor (Active Configuration)** | <img src="docs/assets/simulation_editor_with_user_inputs_desktop.png" alt="Simulation Editor Active Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>A fully parameterized intersection layout featuring custom lane turning geometries (Left Turn, Straight, Right Turn), oval number pickers for go/caution/red clearance timing intervals, interactive 3-lens signal phase builders, and sticky action buttons for saving and calculating cycle timings. |
| **Cycle Results Summary (Desktop)** | <img src="docs/assets/cycle_results_summary_desktop.png" alt="Cycle Results Summary Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The comprehensive analytical results dashboard displaying master cycle length telemetry, intersection setup overviews (active directions and total lanes), directional stop-time breakdown lists, and interactive color-coded percentage distribution progress bars with live hover tooltips. |
| **Liquid Glass (Default Appearance)** | <img src="docs/assets/liquid_glass_default_appearance_desktop.png" alt="Liquid Glass Default Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The default balanced appearance (50% clarity slider setting) showcasing translucent glassmorphic card surfaces, soft drop shadows, and high-contrast typography across the desktop navigation header and main workspace. |
| **Liquid Glass (Ultra Clear Appearance)** | <img src="docs/assets/liquid_glass_ultra_clear_appearance_desktop.png" alt="Liquid Glass Ultra Clear Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The ultra-clear appearance mode maximizing backdrop luminosity and translucency while maintaining crisp element borders and legibility for modern glass-panel design aesthetics. |
| **Liquid Glass (Ultra Tinted Appearance)** | <img src="docs/assets/liquid_glass_ultra_tinted_appearance_desktop.png" alt="Liquid Glass Ultra Tinted Desktop" width="550" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>The high-contrast tinted appearance mode providing a solid, opaque surface styling tailored for high-glare environments or users preferring dense, readable backgrounds over translucent transparency. |

### Mobile Interfaces

| Application Screen & State | Comprehensive Layout Description & Interface Features |
| :--- | :--- |
| **Home Dashboard (Saved Simulations - Mobile)** | <img src="docs/assets/saved_simulation_dashboard_mobile.png" alt="Saved Simulation Dashboard Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Optimized mobile portfolio layout with single-column simulation cards, centered touch targets, and vertically stacked action buttons ensuring seamless management on smartphones. |
| **Home Dashboard (Empty State - Mobile)** | <img src="docs/assets/no_saved_simulations_dashboard_mobile.png" alt="Empty Dashboard Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Compact empty state layout tailored for mobile viewports, guiding mobile users directly to create their first intersection configuration. |
| **Simulation Editor (Initial State - Mobile)** | <img src="docs/assets/simulation_editor_without_user_inputs_mobile.png" alt="Simulation Editor Initial Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Mobile-optimized setup view featuring collapsible card containers, touch-friendly toggle pills, and autofill-protected input fields. |
| **Simulation Editor (Active Configuration - Mobile)** | <img src="docs/assets/simulation_editor_with_user_inputs_mobile.png" alt="Simulation Editor Active Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Stacked smartphone layout presenting lane turning configurations, responsive phase building matrices, and fixed-width bottom action controls (Save & Calculate Cycle) with automatic scroll-to-top navigation. |
| **Cycle Results Summary (Mobile)** | <img src="docs/assets/cycle_results_summary_mobile.png" alt="Cycle Results Summary Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Vertical mobile analytics screen presenting master cycle duration metrics and touch-accessible percentage breakdown bars for single-handed telemetry inspection. |
| **Liquid Glass (Default Appearance - Mobile)** | <img src="docs/assets/liquid_glass_default_appearance_mobile.jpeg" alt="Liquid Glass Default Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Mobile viewport rendering of the default Liquid Glass design system, maintaining fluid blur filters and responsive navbar spacing. |
| **Liquid Glass (Ultra Clear Appearance - Mobile)** | <img src="docs/assets/liquid_glass_ultra_clear_appearance_mobile.jpeg" alt="Liquid Glass Ultra Clear Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Mobile high-transparency glass clarity appearance showcasing backdrop light filtration across smaller screen matrices. |
| **Liquid Glass (Ultra Tinted Appearance - Mobile)** | <img src="docs/assets/liquid_glass_ultra_tinted_appearance_mobile.jpeg" alt="Liquid Glass Ultra Tinted Mobile" width="280" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" /><br>Mobile high-contrast tinted appearance mode ensuring maximum legibility under direct sunlight or mobile glare. |

---

## What I would do next

While TrafficSync successfully achieves all my initial design and architectural objectives, real-world municipal transportation networks present advanced engineering challenges and opportunities for future expansion. My next major roadmap milestones include:
* **Automated Dual-Ring NEMA Phase Conflict Detection:** Replace manual phase lighting configurations with an automated NEMA dual-ring conflict matrix algorithm that programmatically validates signal states and rejects invalid overlapping green indications.
* **Dynamic Webster's Optimum Cycle Length Formula Integration:** Expand the parameter input panel to accept empirical vehicular volume counts (Vehicles Per Hour per lane) and saturation flows to compute mathematically rigorous optimum cycle times.
* **Interactive 3D WebGL Intersection Simulation Canvas:** Integrate Three.js to render real-time 3D intersection geometry complete with animated vehicle queues, turning movement trajectories, and walking pedestrians synchronized with active traffic signal phases.

---

## Author

**Designed and developed for TrafficSync**  
**Built by [@danlenoon](https://github.com/danlenoon)**  
**BS Computer Science | CS-401**  

---

## AI use

This project was developed with the assistance of artificial intelligence to accelerate prototyping, design system implementation, and algorithmic optimization. In accordance with professional engineering standards and academic transparency, I maintain complete documentation of all AI interactions:
* **AI Assistant & Platform:** Google Antigravity (Gemini)
* **Scope of Assistance:** Assisting in Atomic Design component structuring, multi-phase cycle calculation engine mathematics, responsive mobile/desktop layout engineering, oval timing picker debouncing, and rigorous grading rubric verification.
* **Complete Transparency & Commit Log:** Every prompt, generated artifact, human modification, and corresponding git commit is meticulously logged in [AI-USAGE.md](AI-USAGE.md).

---

## Licence

TrafficSync is distributed as open-source software under the terms of the **[MIT License](LICENSE)**. Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files, to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the conditions of the MIT License.
