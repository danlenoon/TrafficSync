# TrafficSync

**Live site:** https://danlenoon.github.io/TrafficSync/  
**API:** https://trafficsync.onrender.com/api/simulations *(Express & PostgreSQL backend)*  
**Demo video:** (link)

---

## 1. Overview

TrafficSync is an advanced, enterprise-grade interactive web-based traffic signal timing computation engine, lane customization tool, and signal phasing simulation platform built for civil engineering students, urban traffic planners, and city municipal engineers. It provides lightning-fast adaptive cycle calculations, custom lane-by-lane signal configurations, pedestrian safety timing integration, and real-time iOS 27 Liquid Glass visual aesthetics without requiring manual cycle math or expensive proprietary software.

---

## 2. Setup and Installation

### Prerequisites
- **Node.js** (v18 or newer)
- **npm** (Node Package Manager)
- **PostgreSQL** (Optional, for running backend server database features locally)

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/danlenoon/TrafficSync.git
cd TrafficSync
```

---

### Step 2: Install Dependencies & Run Frontend (Client)
The primary React application lives inside the `client` directory:
```bash
cd client
npm install
npm run dev
```
Open your browser and navigate to `http://localhost:5173`. You will land on the **TrafficSync Dashboard**.

---

### Step 3: Run Backend Server & Database (Optional)
To run the Express REST API and PostgreSQL database locally:

1. **Install Server Dependencies:**
   ```bash
   cd ../server
   npm install
   ```

2. **Configure Environment Variables:**
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=3000
   CORS_ORIGINS=http://localhost:5173,https://danlenoon.github.io
   DATABASE_URL=postgres://user:password@localhost:5432/trafficsync
   APP_USERNAME=admin
   APP_PASSWORD=your_password
   NODE_ENV=development
   ```

3. **Initialize Database Schema & Seed Data:**
   ```bash
   npm run db:reset
   ```

4. **Start the Express API Server:**
   ```bash
   npm start
   ```

---

## 3. How to Run & Use the Application

1. **Dashboard & Simulation Portfolio:** View all saved intersection simulation cards complete with exact creation timestamps, configured direction badges, and hover-revealed delete action buttons (`Trash2`). Click any card to load/edit or click **"New Simulation"** to start with a clean state. Unsaved changes trigger protective confirmation warnings.
2. **Intersection Setup & Interactive Phase Builder:**
   - Enter the **Intersection Name** and choose the **Cycle Calculation Mode** (Auto-Detect, Reference Standards, or Custom manual cycle length).
   - Check active **Directions** (Northbound, Southbound, Eastbound, Westbound) equipped with directional arrow headers (`↑`, `↓`, `→`, `←`).
   - Use the **Interactive Traffic Light Phase Builder** to construct sequential traffic phases with custom movement arrow badges (`↰`, `↑`, `↱`, `↩`) and per-lane active phase light toggles.
   - Configure **Pedestrian Traffic Signals** (Walk/Don't Walk active safety intervals).
3. **Lane Customization & Pill Geometry:** Add or remove lanes per direction with enlarged circular number badges (`w-10 h-10`) fitting 1 to 3 movement arrows in a single line. Utilize custom-styled dropdowns featuring vertically centered chevron indicators and fully rounded pill UI geometry (`rounded-full`) across all buttons, inputs, and checkboxes.
4. **Phase Timings Calculator & Adaptive Cycle Engine:** Input strict minimum Go timing (`>= 1s`) and clearance intervals. The adaptive calculation engine calculates total cycle length, amber cautions, and dominant red stop wait times adhering to civil engineering standards.
5. **Cycle Results Summary & Dynamic Clarity Control:** Inspect detailed tabular breakdowns, per-lane stop wait times, amber intervals, and interactive percentage bar segments with hover tooltips. Use the navbar **Liquid Glass Clarity Slider** (0% to 100% transparency) to dynamically customize frosted glassmorphism effects across all UI components in real-time. Click **"Done"** to reset all simulation inputs.

---

## 4. Demo Mode

This repository can run two ways, chosen by one environment variable at build time (`VITE_USE_MOCK_API`).

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL` (`https://trafficsync.onrender.com`), which reads and writes real PostgreSQL (Neon). |

---

## 5. Running It Yourself

### The client only, in demo mode. No database needed.
```bash
cd client
npm install
cp .env.example .env        # VITE_USE_MOCK_API stays true
npm run dev                 # http://localhost:5173
```

### The whole stack. Needs PostgreSQL (Neon or local).
```bash
# 1. the API
cd server
npm install
cp .env.example .env        # set DATABASE_URL (Neon) and APP_PASSWORD
npm run db:reset            # creates the tables and adds seed records
npm start                   # http://localhost:3000

# 2. the client, in another terminal
cd client
npm install
cp .env.example .env
# set VITE_USE_MOCK_API=false and VITE_API_BASE_URL=http://localhost:3000
npm run dev
```

Check the API on its own:
```bash
curl https://trafficsync.onrender.com/healthz     # is the process alive
curl https://trafficsync.onrender.com/readyz      # is the database reachable
curl -u admin:password https://trafficsync.onrender.com/api/simulations
```

---

## 6. Environment Variables

None of these are committed. `.env.example` in each folder lists them with placeholder values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server (.env / Render) | PostgreSQL connection string (Neon) |
| `CORS_ORIGINS` | server (.env / Render) | comma-separated origins allowed to call the API (`https://danlenoon.github.io`) |
| `NODE_ENV` | server (.env / Render) | `development` locally, `production` on host |
| `PORT` | server | set by the host, do not set it yourself |
| `VITE_USE_MOCK_API` | client (GitHub Actions Variable) | `false` to connect to Render API, unset for demo mode |
| `VITE_API_BASE_URL` | client (GitHub Actions Variable) | `https://trafficsync.onrender.com` |

---

## 7. Deploying

### Client, to GitHub Pages
Wired up in `.github/workflows/deploy-pages.yml`.
1. Settings > Pages > Build and deployment > Source: **GitHub Actions**.
2. Settings > Secrets and variables > Actions > Variables: Set `VITE_USE_MOCK_API = false` and `VITE_API_BASE_URL = https://trafficsync.onrender.com`.

### API and Database
- **Database:** Hosted on **Neon** (Neon.tech) with pooled connection strings.
- **API:** Hosted on **Render** with root directory set to `server`, build command `npm install`, and environment variables configured in dashboard.

---

## 8. Project Structure

```text
TrafficSync/
├── client/                 # Frontend React Application (Vite)
│   ├── index.html          # HTML entry point (loads Tailwind CSS via CDN)
│   ├── package.json        # Frontend dependencies (lucide-react, react, react-router-dom)
│   └── src/
│       ├── api/            # ONE interface (httpApi.js, mockApi.js), chosen by VITE_USE_MOCK_API
│       ├── components/     # Atomic Design structure
│       │   ├── atoms/      # Reusable UI elements (Button.jsx)
│       │   ├── molecules/  # Compound UI elements (SimulationCard.jsx)
│       │   └── organisms/  # Complex UI sections (SetupSection.jsx, LanesSection.jsx, TimingsSection.jsx, Navbar.jsx)
│       ├── pages/          # React Router pages (Dashboard.jsx, SimulationEditor.jsx, Results.jsx)
│       ├── SimulationContext.jsx # Global state, adaptive cycle math & phase logic
│       ├── App.jsx         # React Router configuration
│       ├── main.jsx        # React DOM rendering entry point
│       └── styles.css      # Custom styling overrides
├── server/                 # Express API & PostgreSQL
│   ├── db/                 # Database schema, seed data, and connection pool (pool.js, schema.sql, seed.sql)
│   ├── simulationsRepo.js  # Parameterized SQL database queries for simulations
│   └── server.js           # Express server with HTTP Basic Auth middleware
├── docs/                   # Planning documents and weekly reports
├── AI-USAGE.md             # Required AI usage documentation and commit history links
└── README.md               # Project documentation and security checklist
```

---

## 9. Architecture

TrafficSync uses a decoupled three-tier client-server architecture. The React frontend (`client/`) runs statically on GitHub Pages or communicates via HTTP REST API calls to the Node.js Express backend hosted on Render (`https://trafficsync.onrender.com`). The backend connects securely via connection pooling (`pg`) to a PostgreSQL database hosted on Neon holding simulation snapshots and intersection configurations.

---

## 10. What I Would Do Next (Pushing Beyond Limits & Boundaries)

1. **Real-Time WebSockets & Multi-User Collaboration:** Integrate WebSockets (Socket.io) into the Express backend and React frontend so multiple urban planners can co-edit and visualize live intersection signal timings concurrently in real-time across distributed client sessions.
2. **AI-Driven Genetic Algorithm Arterial Optimization:** Implement a machine learning optimization module on the backend utilizing genetic algorithms to automatically compute green-wave progression offsets across multi-intersection urban corridors, minimizing vehicle delay and fuel emissions city-wide.
3. **Interactive 3D Intersection Simulation Engine:** Replace 2D schematic lane badges with an immersive Three.js WebGL 3D simulation canvas, rendering animated vehicles, pedestrian crossing agents, and dynamic traffic signal lights reacting in real-time to computed cycle parameters.
4. **Automated CI/CD & Infrastructure as Code (IaC):** Establish comprehensive GitHub Actions pipelines for automated database migrations, unit testing (`jest`/`pg-mem`), and zero-downtime containerized deployments (Docker/Kubernetes) on cloud infrastructure.

---

## 11. Author

**Danielle (danlenoon)**  
Course: CS-401 (6APSI)  
GitHub: [https://github.com/danlenoon](https://github.com/danlenoon)

---

## 12. AI Use
This project was built with AI assistance. Honest disclosure is the standard in this course and increasingly outside it, and reporting heavy use accurately costs you nothing.

- **Built with AI assistance**
- **Assistant:** Google Antigravity (Gemini)
- **Scope:** Touched scaffolding, architectural refactoring, component structuring, and algorithmic calculation logic.
- **Full record:** See [AI-USAGE.md](./AI-USAGE.md).

---

## 13. Licence
MIT, see [LICENSE](./LICENSE).
