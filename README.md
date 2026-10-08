# TrafficSync

**Live site:** https://danlenoon.github.io/TrafficSync/  
**API:** http://localhost:3000/api/simulations *(Express & PostgreSQL backend)*  
**Demo video:** (link)

This deployment is running in demo mode. The interface is real; the backend is simulated in your browser so the site works without a server. See Demo mode below.

---

## 1. Overview

TrafficSync is an interactive, web-based traffic signal timing computation engine, lane customization tool, and signal phasing simulation platform built for civil engineering students and traffic planners. It provides fast, accurate cycle calculations, lane-by-lane signal customization, and pedestrian safety timing calculations without requiring manual cycle math or expensive proprietary software.

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
   CORS_ORIGINS=http://localhost:5173
   DATABASE_URL=postgres://user:password@localhost:5432/trafficsync
   APP_USERNAME=admin
   APP_PASSWORD=your_password
   ```

3. **Start the Express API Server:**
   ```bash
   npm start
   ```
   *Note: If PostgreSQL is not connected locally, the client will fall back to using browser localStorage seamlessly for saved simulations.*

---

## 3. How to Run & Use the Application

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

## 4. Demo Mode

This repository can run two ways, chosen by one environment variable at build time.

Demo mode is the default. Only the exact string `false` turns it off, so a forgotten or mistyped variable leaves you on the simulated backend with a visible notice rather than on a silently broken build.

| `VITE_USE_MOCK_API` | What happens |
| --- | --- |
| unset, or `true` | The client answers its own requests from `localStorage`. No server, no database, nothing shared between visitors. This is what the template ships with, so the GitHub Pages link works on day one. |
| `false` | The client calls the Express API at `VITE_API_BASE_URL`, which reads and writes real PostgreSQL. |

Demo mode is a starting point and a fallback, not a finished project. Your finals submission is all three pieces deployed and talking to each other. Demo mode is there so you can build the interface in week one before the API exists, and so you have something to show if a free tier is asleep during your demo.

GitHub Pages serves files and cannot run Node, so the API and the database can never live there. They go somewhere else:

| Piece | Options |
| --- | --- |
| API | Render, Railway, Fly.io, Koyeb, a VPS, or self-hosted behind a tunnel |
| Database | Neon, Supabase, Railway, Aiven, or your own PostgreSQL |

---

## 5. Running It Yourself

### The client only, in demo mode. No database needed.
```bash
cd client
npm install
cp .env.example .env        # VITE_USE_MOCK_API stays true
npm run dev                 # http://localhost:5173
```

### The whole stack. Needs PostgreSQL, either local or hosted.
```bash
# 1. the database
docker run --name my-pg -e POSTGRES_PASSWORD=devpassword \
  -e POSTGRES_DB=trafficsync -p 5432:5432 -d postgres:17

# 2. the API
cd server
npm install
cp .env.example .env        # check DATABASE_URL
npm run db:reset            # creates the tables and adds sample rows
npm run dev                 # http://localhost:3000

# 3. the client, in another terminal
cd client
npm install
cp .env.example .env
# set VITE_USE_MOCK_API=false
npm run dev
```

Check the API on its own before you blame the client:
```bash
curl http://localhost:3000/healthz     # is the process alive
curl http://localhost:3000/readyz      # is the database reachable
curl http://localhost:3000/api/simulations
```

---

## 6. Environment Variables

None of these are committed. `.env.example` in each folder lists them with placeholder values.

| Name | Where | What it is |
| --- | --- | --- |
| `DATABASE_URL` | server | PostgreSQL connection string. Contains a password |
| `CORS_ORIGINS` | server | comma-separated origins allowed to call the API |
| `NODE_ENV` | server | production on your host |
| `PORT` | server | set by the host, do not set it yourself |
| `VITE_USE_MOCK_API` | client, at build time | only false turns demo mode off; unset means on |
| `VITE_API_BASE_URL` | client, at build time | your API's public URL, no trailing slash |

Every `VITE_` value is compiled into the built JavaScript and is public. Never put a key, a password or a connection string in one.

---

## 7. Deploying

### Client, to GitHub Pages
Already wired up in `.github/workflows/deploy-pages.yml`. Two one-time steps:
1. Settings > Pages > Build and deployment > Source: GitHub Actions. Without this the workflow goes green and publishes nothing.
2. Nothing else, until your API is live. Demo mode is the default, so the first deploy works on its own. When the API is up, add `VITE_USE_MOCK_API = false` and `VITE_API_BASE_URL` under Settings > Secrets and variables > Actions > Variables, then re-run the workflow.

The repository must be public for Pages to serve it on a free account.

### API and database
Not automated here, because most hosts deploy straight from your repository with no workflow at all. Point your host at the `server/` folder, set the environment variables in its dashboard, and run `server/db/schema.sql` once against the hosted database.

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
├── compose.yml             # Only if self-hosting
├── docs/                   # Planning documents and weekly reports
├── AI-USAGE.md             # Required AI usage documentation and commit history links
└── README.md               # Project documentation and security checklist
```

---

## 9. Architecture

TrafficSync uses a decoupled three-tier client-server architecture. The React frontend (`client/`) runs statically on GitHub Pages in demo mode (`localStorage`) or communicates via HTTP REST API calls to the Node.js Express backend (`server/`). The backend connects securely via connection pooling (`pg`) to a PostgreSQL database holding simulation snapshots and intersection configurations.

---

## 10. What I Would Do Next

1. **Automated CI/CD for Backend:** Set up GitHub Actions workflows to automatically deploy the Express server and run database migrations on Render/Railway upon merging to `main`.
2. **User Authentication & Roles:** Implement JWT-based user authentication so multiple traffic engineers can manage and share private intersection portfolios securely.
3. **Advanced Optimization Algorithms:** Integrate genetic algorithms or actuated green-wave offset computations for multi-intersection arterial synchronization.

---

## 11. Author

GitHub: [https://github.com/danlenoon](https://github.com/danlenoon)
Course and Section: BS Computer Science CS-401

---

## 12. Security and Privacy Checklist

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

## 13. AI Use
This project was built with AI assistance. Honest disclosure is the standard in this course and increasingly outside it, and reporting heavy use accurately costs you nothing.

- **Built with AI assistance**
- **Assistant:** Google Antigravity (Gemini)
- **Scope:** Touched scaffolding, architectural refactoring, component structuring, and algorithmic calculation logic.
- **Full record:** See [AI-USAGE.md](./AI-USAGE.md).

---

## 14. Licence
MIT, see [LICENSE](./LICENSE).
