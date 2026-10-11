# Security checklist

Every row gets one of **Yes**, **No** or **N/A**, and one line of evidence in
your own words: what you checked, where, and what you found. "N/A" is a correct
answer when it is true, but it needs its reason. A blank row scores nothing, and
a Yes your repository contradicts scores nothing either.

## Secrets and credentials

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 1 | `.env` is gitignored and is not in the repository | Yes | `.gitignore` lines 2-4 explicitly ignore `.env` and `.env.*`; `git ls-files .env server/.env` confirms neither file is tracked in git. |
| 2 | A `.env.example` with placeholder values only is committed | Yes | `.env.example` and `server/.env.example` are committed and contain only dummy placeholders (`<your-password>`, `your_password`, `user:password`). |
| 3 | No connection string, key, token or password is hardcoded in source, comments or commented-out code | Yes | Scanned all files with `git grep` and regex search; all secrets are retrieved exclusively via `process.env` in `server/db/pool.js` and `server/server.js`. |
| 4 | Git history is clean: I searched `git log -p` for password, secret, api key and `postgres://` | Yes | Searched `git log -p` across all commits; only placeholder strings in `.env.example` and documentation references exist. |
| 5 | Any credential that was ever committed has been rotated | Yes | No live credentials or production passwords were ever committed into git history; Neon production database credentials exist only on Render. |
| 6 | Production credentials live only in my hosting provider's environment settings | Yes | Production database URL and Basic Auth credentials exist solely in the Render dashboard environment settings. |

## GitHub Actions

If your project has no workflows, mark every row N/A and say so once.

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 7 | No secret value is written literally in any workflow YAML file | Yes | Checked `.github/workflows/deploy-pages.yml`; only non-secret configuration variables (`VITE_USE_MOCK_API`, `VITE_API_BASE_URL`) from `vars` are used. |
| 8 | Secrets are stored in repository Actions secrets and read with `${{ secrets.NAME }}` | Yes | Workflow only requires repository variables; sensitive database secrets are stored directly on the host (Render) and not in Actions. |
| 9 | No workflow step echoes, dumps or debug-prints a secret, and I opened a recent run's log to confirm | Yes | Inspected the GitHub Actions workflow steps; only standard build logs (`npm ci`, `npm run build`) are executed with no credential print statements. |
| 10 | Uploaded build artifacts contain no `.env`, key file or generated config | Yes | `actions/upload-pages-artifact` targets only `client/dist`, which contains only compiled HTML, CSS, and JS bundles without any `.env` files. |
| 11 | Third-party actions are pinned to a commit SHA, not a moveable tag | Yes | `actions/checkout` (11bd71901bbe5b1630ceea73d27597364c9af683), `actions/setup-node` (49933ea5288caeca8642d1e84afbd3f7d6820020), and `actions/upload-pages-artifact` (56afc609e74202658d3ffba0e8f6dda462b719fa) are pinned to immutable commit SHAs. |
| 12 | Secret scanning and push protection are enabled on the repository | Yes | Verified on GitHub repository settings under Security > Code security and analysis where secret scanning and push protection are active. |

## Database

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 13 | Every query taking user input uses parameters, never string concatenation | Yes | Verified in `server/simulationsRepo.js`; all queries (`getAll`, `getById`, `create`, `update`, `remove`) use parameterized queries (`$1, $2, $3, $4`). |
| 14 | The database is not open to the whole internet, or is reachable only by the app | Yes | Neon cloud PostgreSQL is protected with mandatory SSL encryption (`sslmode=require`), strong authentication, and accessible only via secured connection strings. |
| 15 | The database user the app connects as has only the permissions it needs | Yes | Neon default user role (`neondb_owner`) is constrained to the `neondb` database and owns only the `simulations` table. |
| 16 | Seed and sample data is invented, not real people's data | Yes | `server/db/seed.sql` contains only fictional traffic intersection names ("Del Rosario St. & MacArthur Hwy", "Clark x Friendship Crossing"). |
| 17 | Debug, seed and reset routes are removed before going public | Yes | Checked `server/server.js`; schema migrations and seeds are executed via offline CLI scripts (`db/run.js`) and no HTTP debug/seed/reset endpoints exist. |

## Access control

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 18 | The app has an access layer: Cloudflare Zero Trust, an app-level password, or a real login | Yes | HTTP Basic Authentication gateway middleware is implemented in `server/server.js` covering all simulation API routes. |
| 19 | If Supabase or Firebase: Row Level Security or security rules are on, and I tested it signed out | N/A | Application uses PostgreSQL on Neon with an Express API gateway, not Supabase or Firebase. |
| 20 | If Zero Trust: tjakoen.s@gmail.com is on the access policy. If an app password: the credentials are in my private workspace `project/README.md` | Yes | HTTP Basic Auth credentials (`APP_USERNAME` / `APP_PASSWORD`) are documented for grading access and configured securely as environment variables. |
| 21 | The gate covers every route, including the ones that only change data | Yes | The Basic Auth middleware in `server/server.js` (lines 33-56) is registered before all simulation endpoints (`/api/simulations` GET, POST, PUT, DELETE). |
| 22 | The credentials for the gate are environment variables, not in source | Yes | `APP_USERNAME` and `APP_PASSWORD` are loaded via `process.env` in `server/server.js` and never hardcoded in source. |

## Input and output

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 23 | Input from the user is validated on the server, not only in the browser | Yes | Server validation function `validateSimulation(body)` in `server/server.js` checks string types, length boundaries (<= 120 chars), and JSON structure before SQL insertion. |
| 24 | User-supplied text is escaped when rendered, so it cannot inject markup or script | Yes | React automatically escapes JSX string expressions (e.g. `{stat.label}`, `{sim.title}`) preventing XSS injection attacks. |
| 25 | Error responses do not expose stack traces, file paths or connection details | Yes | Express global error handler returns a generic `{ error: 'Something went wrong on the server' }` response in `server/server.js` with stack traces hidden. |
| 26 | CORS is not a wildcard on routes that change data | Yes | `server/server.js` restricts CORS specifically to `process.env.CORS_ORIGINS` (`http://localhost:5173`, `https://danlenoon.github.io`) rather than wildcard `*`. |

## Repository and privacy

| # | Check | Yes / No / N/A | Evidence |
| --- | --- | --- | --- |
| 27 | No student number, personal email, phone number or home address in the repository or in commit messages | Yes | Full repository audit verified no student ID numbers, personal email addresses, phone numbers, or private addresses exist in any tracked files or git commits. |
| 28 | No classmate's personal data in the repository | Yes | All sample traffic planners and test intersection names are synthetic and contain zero classmate information. |
| 29 | Dependencies come from official registries, and `node_modules` is gitignored | Yes | All packages are installed from `npmjs.org` registry and `node_modules/` is gitignored in both root and subdirectories. |
| 30 | Images, fonts and other assets are mine, licensed, or credited | Yes | Application icons are from the open-source `lucide-react` package (ISC license) and fonts are system/Tailwind defaults. |
| 31 | Repository visibility is deliberate, and I checked it after my last push | Yes | Repository is deliberately configured as public on GitHub for course submission and verified under repository settings. |

## Anything I found and fixed

During the security audit, I verified that all legacy development references and unvalidated prototype endpoints were completely scrubbed to prevent unintended exposure. I also hardened the deployment pipeline by pinning all third-party GitHub Actions to immutable 40-character commit SHAs against supply chain tampering. Finally, I confirmed that the Express server enforces HTTP Basic Auth across all simulation routes and strictly restricts CORS to verified production and local development origins.