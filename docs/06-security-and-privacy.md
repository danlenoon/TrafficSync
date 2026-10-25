# Security and privacy checklist

## 1. Secrets & Credential Management

- [x] **Gitignore Enforcement:** `.gitignore` explicitly includes `.env` and `.env.*`. Running `git check-ignore -v .env` and `git ls-files .env server/.env` verifies that no secret environment files are tracked in version control.
- [x] **Committed Templates:** A sanitized `.env.example` and `server/.env.example` are committed containing solely placeholder values (`<your-password>`, `your_password`, `user:password`).
- [x] **Zero Hardcoded Secrets:** Scanned all codebases using regular expression pattern matching and `git grep`; all database connection strings, passwords, and tokens are loaded strictly via `process.env` in `server/db/pool.js` and `server/server.js`.
- [x] **Clean Repository History:** Searched `git log -p` across all repository commits for `password`, `secret`, `api_key`, and `postgres://`. No credentials exist in history; production credentials exist exclusively in Render dashboard environment settings.
- [x] **PII Anonymization:** Verified that no student names, emails, student ID numbers, or personal phone numbers exist anywhere in the public repository.

---

## 2. CI/CD & GitHub Actions Automation

- [x] **Zero Plaintext Secrets in Workflows:** Inspected `.github/workflows/deploy-pages.yml`; only public non-sensitive build variables (`VITE_USE_MOCK_API`, `VITE_API_BASE_URL`) from repository `vars` are referenced.
- [x] **No Echoing or Debugging Secrets:** Workflow logs print only standard build commands (`npm ci`, `npm run build`) without echoing environment variables.
- [x] **Sanitized Build Artifacts:** `actions/upload-pages-artifact` targets only `client/dist`, containing solely compiled static HTML, CSS, and JS bundles without `.env` or configuration artifacts.
- [x] **Immutable Commit SHAs:** All core third-party actions (`actions/checkout`, `actions/setup-node`, `actions/upload-pages-artifact`) are pinned to immutable 40-character commit hashes to defend against malicious supply-chain tampering.
- [x] **GitHub Push Protection:** GitHub secret scanning and push protection are enabled on the repository.

---

## 3. Database Layer Hardening

- [x] **Parameterized SQL Queries:** Every SQL operation in `server/simulationsRepo.js` (`getAll`, `getById`, `create`, `update`, `remove`) uses parameterized queries (`$1, $2, $3, $4`) with user values passed in the query parameter array, preventing SQL injection vulnerabilities.
- [x] **Encrypted Transport:** Neon cloud PostgreSQL is configured with mandatory SSL encryption (`sslmode=require`), requiring cryptographic TLS encapsulation for all queries.
- [x] **Principle of Least Privilege:** Database user role is scoped strictly to the `neondb` database and owns solely the `simulations` table without administrative superuser access.
- [x] **Realistic Seed Data:** Seed records in `server/db/seed.sql` and client mock data (`client/src/api/seed.json` with resilient auto-seeding fallback) feature realistic intersection names with synchronized directional and timing parameters matching the application schema.
- [x] **No Debug/Reset HTTP Routes:** Schema migrations and test seedings are performed exclusively via offline command-line scripts (`node server/db/run.js`) and cannot be triggered over HTTP.

---

## 4. Access Control & API Gateway

- [x] **HTTP Basic Authentication:** Implemented authentication middleware in `server/server.js` (lines 33–56) guarding all simulation CRUD routes (`/api/simulations` GET, POST, PUT, DELETE).
- [x] **Universal Route Protection:** The authentication gate covers every API endpoint that reads, creates, modifies, or deletes simulation snapshots.
- [x] **Environment-Backed Credentials:** Gateway credentials (`APP_USERNAME` and `APP_PASSWORD`) are loaded strictly from host environment variables and are never hardcoded in source.

---

## 5. Input Validation & Output Sanitization

- [x] **Server-Side Validation:** The server does not blindly trust client input; `validateSimulation(body)` in `server/server.js` verifies string types, length boundaries ($\le 120$ characters), and valid JSON structure before passing values to SQL repositories.
- [x] **Cross-Site Scripting (XSS) Prevention:** React JSX expressions automatically escape strings during DOM rendering, preventing HTML/script injection attacks.
- [x] **Clean Error Responses:** Express error-handling middleware returns generic JSON responses (`{ error: 'Something went wrong on the server' }`) with internal stack traces and server file paths completely suppressed.
- [x] **Strict CORS Whitelisting:** `cors({ origin: allowedOrigins })` in `server/server.js` strictly restricts browser access to verified local development (`http://localhost:5173`) and production GitHub Pages (`https://danlenoon.github.io`) origins, rejecting wildcard access.

---

## 6. Audit Summary

During the comprehensive security audit, I meticulously audited the entire codebase to ensure that all legacy development artifacts, hardcoded test credentials, and unvalidated prototype endpoints were completely scrubbed, neutralizing potential attack vectors. Furthermore, I hardened the CI/CD automation pipeline by pinning third-party GitHub Actions within `.github/workflows/deploy-pages.yml` to immutable cryptographic commit SHAs, effectively insulating the deployment workflow against malicious supply chain tampering and unauthorized upstream mutations. Finally, I validated the backend infrastructure to guarantee that the Express server rigorously enforces HTTP Basic Authentication across every database CRUD operation and strictly scopes CORS access exclusively to verified production and local development origins, safeguarding against unauthorized data access and cross-site request forgery.
