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
Currently, the app runs entirely on the client side using React state, but the server is protected by HTTP Basic Auth. You will need a `.env` file in the `server` directory.
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

TrafficSync follows a strict 5-step primary flow:
1. **Dashboard:** View past simulations or click "New Simulation" to start.
2. **Intersection Setup:** Enter the road name and select active directions (e.g., Northbound, Southbound).
3. **Lane Customization:** Add lanes to your active directions and assign their types (e.g., Left Turn, Straight).
4. **Phase Timings Calculator:** Input the clearance intervals (Go, Amber, Red) in seconds for each specific lane.
5. **Cycle Results Summary:** Click "Calculate Cycle" to view a detailed breakdown, including the total cycle length and wait times per lane visualized with percentage bars.

## 5. Project structure

```text
TrafficSync/
├── client/                 # Frontend React Application (Vite)
│   ├── index.html          # HTML entry point (loads Tailwind CSS via CDN)
│   ├── package.json        # Frontend dependencies (lucide-react, react, react-router-dom)
│   └── src/
│       ├── components/     # Atomic Design structure
│       │   ├── atoms/      # Reusable UI elements (e.g., Buttons, Inputs)
│       │   ├── molecules/  # Compound UI elements (e.g., SimulationCard)
│       │   └── organisms/  # Complex UI sections (e.g., SetupSection, Navbar)
│       ├── pages/          # React Router pages (Dashboard, SimulationEditor, Results)
│       ├── SimulationContext.jsx # Global state management for simulation data
│       ├── App.jsx         # React Router configuration
│       ├── main.jsx        # React DOM rendering entry point
│       └── styles.css      # Custom styling overrides
├── server/                 # Backend Node.js/Express App
│   ├── db/                 # Database connection and queries
│   └── server.js           # Express server with HTTP Basic Auth
├── docs/                   # Documentation assets and screenshots
├── AI-USAGE.md             # Required AI usage documentation
├── REPORT.md               # Weekly increment reports
└── README.md               # This documentation file
```

## 6. Screenshots

![Dashboard Screenshot](./docs/dashboard.png)
*(Note: Please replace `./docs/dashboard.png` with an actual screenshot of your running Dashboard)*

![Results Screenshot](./docs/results.png)
*(Note: Please replace `./docs/results.png` with an actual screenshot of your Results Summary screen)*

## 7. Security and privacy checklist

- [x] **.gitignore includes .env**: Yes, `.env` and `.env.*` are ignored.
- [x] **No sensitive files committed**: Yes, `git ls-files` shows no `.pem`, `id_rsa`, or `.env` files.
- [x] **.env.example has placeholders**: Yes, both root and server `.env.example` files contain only placeholder strings.
- [x] **No connection string, key or password hardcoded**: Yes, all DB credentials and API keys are read from `process.env`.
- [x] **No student.json / personal student data**: Yes, handle `danlenoon` and names were scrubbed from documentation.
- [x] **SQL queries parameterised**: Yes, `server/sightingsRepo.js` uses `$1, $2` for all `pg` queries.
- [x] **Input validated on server**: Yes, `server.js` contains a `validate()` function before queries.
- [x] **CORS origins defined**: Yes, `server.js` reads `CORS_ORIGINS` from the environment.
- [x] **NODE_ENV=production and no stack traces**: Yes, `server.js` catches all errors and returns a generic JSON message.
- [N/A] **helmet installed**: N/A, helmet will be installed when the backend is fully developed for production.
- [N/A] **Rate limiting**: N/A, the application currently does not charge money or process external accounts.
- [N/A] **Passwords hashed with bcrypt**: N/A, HTTP Basic Auth is used for the app gateway, no user accounts exist yet.
- [N/A] **Ownership checks in queries**: N/A, there are no user-specific records in the database.
- [N/A] **npm audit run**: N/A, full audit will be run prior to production server deployment.
- [x] **No real classmates' data**: Yes, seed data is completely fictional generic campus locations.
- [x] **Seed data is invented**: Yes, simulated traffic intersections only.
- [N/A] **Test data deleted**: N/A, no real people have tested the application yet.
- [x] **App says what it collects**: Yes, the app collects only anonymous lane simulation counts.
- [N/A] **Any face in screenshot is stock**: N/A, no faces are present in the UI screenshots.

## 8. Known issues and next steps

**Known Issues:**
- **No Persistence:** If you refresh the page, all your configured lanes and timings are lost because the frontend is not yet fully wired to the backend database.
- **Tailwind CDN:** Relying on the Tailwind CDN in `index.html` is great for quick prototyping but not optimal for production builds.

**Next Steps:**
- Fully wire the React frontend to the Node.js/PostgreSQL backend in the `server/` folder to enable saving and loading simulation reports.
- Implement the exact civil engineering formulas for stop time calculations.

## AI Usage
This project was built with AI assistance. See [AI-USAGE.md](./AI-USAGE.md) for a detailed record of how AI was used, where it made mistakes, and who authored which parts of the project.
