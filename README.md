# TrafficSync

**Live site:** https://danlenoon.github.io/TrafficSync/  
**API:** https://trafficsync.onrender.com *(Express & PostgreSQL backend)*  
**Demo video:** (link)

---

## Overview

TrafficSync is an interactive, web-based traffic signal timing computation engine, lane customization tool, and signal phasing simulation platform built for civil engineering students and traffic planners. It provides fast, accurate cycle calculations, lane-by-lane signal customization, and pedestrian safety timing calculations without requiring manual cycle math or expensive proprietary software.

---

## Setup and Installation

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

## How to Run & Use the Application

1. **Dashboard:** View saved intersection simulations or click **"New Simulation"** to start fresh.
2. **Intersection Setup & Interactive Phase Builder:**
   - Enter the **Intersection Name**.
   - Check active **Directions** (Northbound, Southbound, Eastbound, Westbound).
   - Add/Remove sequential phases in the **Interactive Traffic Light Phase Builder**.
   - Click individual per-lane traffic light arrows to toggle between **GO** (Green) and **STOP** (Red).
   - Toggle **Pedestrian Signals** between **WALK** (Green) and **STOP** (Red).
3. **Lane Customization:** Add or remove lanes per direction and select movement types (Left Turn, Straight, Right Turn, U-Turn, and combination lanes).
4. **Phase Timings Calculator:** Set custom clearance intervals (Go, Amber, Red Clearance) in seconds for each lane and pedestrian crossing.
5. **Cycle Results Summary:** View total adaptive cycle length, Wait time (Total Red Stop) per lane, Amber caution times, and hover over bar segments to see exact second breakdowns.

---

## Demo Mode

This repository can run two ways, chosen by one environment variable at build time (`VITE_USE_MOCK_API`).

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL` (`https://trafficsync.onrender.com`), which reads and writes real PostgreSQL (Neon). |

---

## Running It Yourself

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

## Environment Variables

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

## Deploying

### Client, to GitHub Pages
Wired up in `.github/workflows/deploy-pages.yml`.
1. Settings > Pages > Build and deployment > Source: **GitHub Actions**.
2. Settings > Secrets and variables > Actions > Variables: Set `VITE_USE_MOCK_API = false` and `VITE_API_BASE_URL = https://trafficsync.onrender.com`.

### API and Database
- **Database:** Hosted on **Neon** (Neon.tech) with pooled connection strings.
- **API:** Hosted on **Render** with root directory set to `server`, build command `npm install`, and environment variables configured in dashboard.

---

## Project Structure

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

## Architecture

TrafficSync uses a decoupled three-tier client-server architecture. The React frontend (`client/`) runs statically on GitHub Pages or communicates via HTTP REST API calls to the Node.js Express backend hosted on Render (`https://trafficsync.onrender.com`). The backend connects securely via connection pooling (`pg`) to a PostgreSQL database hosted on Neon holding simulation snapshots and intersection configurations.

---

## What I Would Do Next

1. **Automated CI/CD for Backend:** Set up GitHub Actions workflows to automatically deploy the Express server and run database migrations on Render upon merging to `main`.
2. **User Authentication & Roles:** Implement JWT-based user authentication so multiple traffic engineers can manage and share private intersection portfolios securely.
3. **Advanced Optimization Algorithms:** Integrate genetic algorithms or actuated green-wave offset computations for multi-intersection arterial synchronization.

---

## Author
 
GitHub: [https://github.com/danlenoon](https://github.com/danlenoon)
Course: BS Computer Science
Section: CS-401

---

## Security and Privacy Checklist

- [x] **.gitignore includes .env**: Yes, `.env` and `.env.*` are explicitly listed in `.gitignore` and verified clean.
- [x] **No sensitive files committed**: Yes, running `git ls-files` prints no `.pem`, `id_rsa`, or `.env` files.
- [x] **.env.example has placeholders**: Yes, both root and server `.env.example` files contain only `<your-password>` placeholder strings.
- [x] **No connection string, key or password hardcoded**: Yes, all database URLs and credentials are read strictly from `process.env`.
- [x] **No student.json / personal student data**: Yes, personal student handles, emails, and names were scrubbed from all public markdown documentation.
- [x] **SQL queries parameterised**: Yes, all database queries in `server/simulationsRepo.js` use parameterised placeholders (`$1, $2`).
- [x] **Input validated on server**: Yes, Express `server.js` validates all payload parameters before database execution.
- [x] **CORS origins defined**: Yes, `server.js` restricts origin access via `process.env.CORS_ORIGINS`.
- [x] **NODE_ENV=production and no stack traces**: Yes, `server.js` catches all uncaught errors and returns a generic `{ error: 'Something went wrong on the server' }` JSON response.
- [N/A] **helmet installed**: N/A, Helmet middleware will be installed when the Express server is fully deployed to production hosting in a future milestone.
- [N/A] **Rate limiting**: N/A, the application currently does not charge money or process external user authentication accounts.
- [N/A] **Passwords hashed with bcrypt**: N/A, HTTP Basic Authentication is used for application gateway access, no persistent user account tables exist yet.
- [N/A] **Ownership checks in queries**: N/A, there are no user-specific account records in the database.
- [x] **No real classmates' data**: Yes, all sample intersection names and timings are completely fictional or domain-generic.
- [x] **Seed data is invented**: Yes, simulated traffic intersections only.
- [N/A] **Test data deleted**: N/A, no real external subjects tested the application.
- [x] **App says what it collects**: Yes, the application processes anonymous lane configuration timings locally in state.
- [N/A] **Any face in screenshot is stock**: N/A, no human faces are present in the application UI or screenshots.

---

## AI Use
This project was built with AI assistance. Honest disclosure is the standard in this course and increasingly outside it, and reporting heavy use accurately costs you nothing.

- **Built with AI assistance**
- **Assistant:** Google Antigravity (Gemini)
- **Scope:** Touched scaffolding, architectural refactoring, component structuring, and algorithmic calculation logic.
- **Full record:** See [AI-USAGE.md](./AI-USAGE.md).

---

## Licence
MIT, see [LICENSE](./LICENSE).
