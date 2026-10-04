# TrafficSync

**Live site:** https://danlenoon.github.io/TrafficSync/
**API:** *(not deployed yet)*
**Demo video:** *(not deployed yet)*

## 1. Overview
TrafficSync is a React-based simulation tool that calculates the total stop seconds for intersection lanes based on user-defined green, amber, and red phases. It provides civil engineering students and traffic planners with a fast, error-free, and lightweight alternative to manual cycle calculation or expensive engineering software.

## 2. Setup and installation

**Prerequisites:**
- Node.js (v18 or newer)
- npm (Node Package Manager)

**Step 1: Clone the repository**
```bash
git clone https://github.com/danlenoon/TrafficSync.git
cd TrafficSync
```

**Step 2: Install dependencies**
The frontend code is located inside the `client` folder.
```bash
cd client
npm install
```

**Step 3: Environment and configuration**
Currently, the app runs entirely on the client side using React state, but the Express server is protected by HTTP Basic Auth. You will need a `.env` file in the `server` directory.
Example `.env`:
```env
DATABASE_URL=postgres://user:password@localhost:5432/trafficsync
APP_USERNAME=your_username
APP_PASSWORD=your_password
```

**Step 4: Database Setup**
*Note: The Node/PostgreSQL backend is planned for a future milestone. Currently, all data is simulated in-memory.*

## 3. How to run it

From the `client` directory, start the Vite development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`. You should see the **TrafficSync Dashboard** showing your saved simulations and a "New Simulation" button.

## 4. Features and usage

TrafficSync follows a strict primary flow:
1. **Dashboard:** View saved simulations or click "New Simulation" to configure a clean intersection.
2. **Intersection Setup:** Enter the road name, select active directions (Northbound, Southbound, Eastbound, Westbound), and pick your preferred Cycle Calculation & Signal Phasing Mode (Auto-Detect, 4-Way Dual-Protected Del Rosario, T-Intersection Concurrent Clark x Friendship, or Custom Manual Cycle Length).
3. **Lane Customization:** Add or remove lanes for active directions, select from 12 movement lane types (including U-Turn combinations), and toggle direction-level Pedestrian crossing options.
4. **Phase Timings Calculator:** Input clearance intervals (Go, Amber, Red Clearance) in seconds for each specific lane and pedestrian crossing.
5. **Cycle Results Summary:** View a detailed breakdown including total cycle length, per-lane stop seconds (wait time), and visual phase percentage bars.

## 5. Project structure

```text
TrafficSync/
├── client/                 # Frontend React Application (Vite)
│   ├── index.html          # HTML entry point (loads Tailwind CSS via CDN)
│   ├── package.json        # Frontend dependencies (lucide-react, react, react-router-dom)
│   └── src/
│       ├── components/     # Atomic Design structure
│       │   ├── atoms/      # Reusable UI elements (Button.jsx)
│       │   ├── molecules/  # Compound UI elements (SimulationCard.jsx)
│       │   └── organisms/  # Complex UI sections (SetupSection.jsx, LanesSection.jsx, TimingsSection.jsx, Navbar.jsx)
│       ├── pages/          # React Router pages (Dashboard.jsx, SimulationEditor.jsx, Results.jsx)
│       ├── SimulationContext.jsx # Global state management & calculation engine
│       ├── App.jsx         # React Router configuration
│       ├── main.jsx        # React DOM rendering entry point
│       └── styles.css      # Custom styling overrides
├── server/                 # Backend Node.js/Express App
│   ├── db/                 # Database connection and queries (pool.js, schema.sql, seed.sql)
│   └── server.js           # Express server with HTTP Basic Auth
├── docs/                   # Documentation assets, weekly reports, and proposal documents
├── journal/                # Reflection journal entries (week-1.md)
├── AI-USAGE.md             # Required AI usage documentation and commit history links
├── REPORT.md               # Weekly increment reports (Week 1 and Week 2)
└── README.md               # Project documentation and security checklist
```

## 6. Screenshots

![Dashboard Screenshot](./docs/dashboard.png)
*(Note: Replace `./docs/dashboard.png` with an actual screenshot of your running Dashboard)*

![Results Screenshot](./docs/results.png)
*(Note: Replace `./docs/results.png` with an actual screenshot of your Results Summary screen)*

## 7. Security and privacy checklist

- [x] **.gitignore includes .env**: Yes, `.env` and `.env.*` are explicitly listed in `.gitignore` and verified clean.
- [x] **No sensitive files committed**: Yes, running `git ls-files` prints no `.pem`, `id_rsa`, or `.env` files.
- [x] **.env.example has placeholders**: Yes, both root and server `.env.example` files contain only `<your-password>` placeholder strings.
- [x] **No connection string, key or password hardcoded**: Yes, all database URLs and credentials are read strictly from `process.env`.
- [x] **No student.json / personal student data**: Yes, personal student handles, emails, and names were scrubbed from all public markdown documentation.
- [x] **SQL queries parameterised**: Yes, all database queries in `server/sightingsRepo.js` use parameterised placeholders (`$1, $2`).
- [x] **Input validated on server**: Yes, Express `server.js` validates all payload parameters before database execution.
- [x] **CORS origins defined**: Yes, `server.js` restricts origin access via `process.env.CORS_ORIGINS`.
- [x] **NODE_ENV=production and no stack traces**: Yes, `server.js` catches all uncaught errors and returns a generic `{ error: 'Something went wrong on the server' }` JSON response.
- [N/A] **helmet installed**: N/A, Helmet middleware will be installed when the Express server is fully deployed to production hosting in a future milestone.
- [N/A] **Rate limiting**: N/A, the application currently does not charge money or process external user authentication accounts.
- [N/A] **Passwords hashed with bcrypt**: N/A, HTTP Basic Authentication is used for application gateway access, no persistent user account tables exist yet.
- [N/A] **Ownership checks in queries**: N/A, there are no user-specific account records in the database.
- [N/A] **npm audit run**: N/A, a full dependency vulnerability audit will be run prior to production deployment.
- [x] **No real classmates' data**: Yes, all sample intersection names and timings are completely fictional or domain-generic.
- [x] **Seed data is invented**: Yes, simulated traffic intersections only.
- [N/A] **Test data deleted**: N/A, no real external subjects tested the application.
- [x] **App says what it collects**: Yes, the application processes anonymous lane configuration timings locally in state.
- [N/A] **Any face in screenshot is stock**: N/A, no human faces are present in the application UI or screenshots.

## 8. Known issues and next steps

**Known Issues:**
- **Full Persistence Wiring:** Simulation data currently persists locally via `SimulationContext.jsx` and `localStorage`; full REST API wiring to the Express/PostgreSQL backend is planned for the next backend milestone.
- **Tailwind CDN:** Frontend relies on Tailwind CDN in `index.html` for rapid prototyping; PostCSS production setup is planned for future optimization.

**Next Steps:**
- Implement Express REST API endpoints (`/api/simulations`) connected to PostgreSQL in `server/db/schema.sql`.
- Convert Tailwind CDN to PostCSS build setup in Vite.

## AI Usage
This project was built with AI assistance. See [AI-USAGE.md](./AI-USAGE.md) for a detailed record of how AI was used, where it made mistakes, and who authored which parts of the project.
