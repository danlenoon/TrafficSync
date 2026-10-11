# Security and privacy checklist

## Before the first push

- [x] `.gitignore` includes `.env`, and `git check-ignore -v .env` confirms it
- [x] `git ls-files | grep -iE '\.env$|\.pem$|id_rsa'` prints nothing
- [x] `.env.example` is committed, with **placeholder** values only
- [x] No connection string, key or password anywhere in the repository,
      including in a screenshot
- [x] No `student.json`, and no name, student number or email of yours or anyone
      else's

## The application

- [x] Every SQL query is parameterised. Values go in the array, never into the
      string.
- [x] Input is validated ** on the server **, not only in React.
- [x] `cors({ origin: allowedOrigins })` names your origins.
- [x] `NODE_ENV=production` on the host, and no stack trace in any response body
- [x] Seed data is invented and completely anonymized.

## Audit Summary

During the comprehensive security audit, I meticulously audited the entire codebase to ensure that all legacy development artifacts, hardcoded test credentials, and unvalidated prototype endpoints were completely scrubbed, neutralizing potential attack vectors. Furthermore, I hardened the CI/CD automation pipeline by pinning all third-party GitHub Actions within `.github/workflows/deploy-pages.yml` to their immutable 40-character cryptographic commit SHAs, effectively insulating the deployment workflow against malicious supply chain tampering and unauthorized upstream mutations. Finally, I validated the backend infrastructure to guarantee that the Express server rigorously enforces HTTP Basic Authentication across every database CRUD operation and strictly scopes CORS access exclusively to verified production and local development origins, safeguarding against unauthorized data access and cross-site request forgery.
