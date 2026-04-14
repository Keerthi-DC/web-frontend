Purpose
-------
This file gives concrete, repo-specific instructions an AI coding agent should know before editing or adding code in this project.

Quick summary
- Tech stack: React (18) + Vite + Tailwind CSS.
- Data-driven: most UI content comes from static JSON under `public/data/` (some components import JSON directly).
- GraphQL/AppSync: optional AppSync integration via environment variables and `useAppSync` hook.

High-level architecture (why it matters)
- Routes & pages: `src/App.jsx` wires all top-level routes. Department pages are implemented under `src/modules/department` and use nested routes.
- UI composition: reusable pieces live in `src/components/{layout,common,home,...}`. Page entry points live in `src/pages` or `src/modules/department/pages`.
- Data flow: two patterns exist:
  - fetch at runtime: many components call `fetch('/data/<file>.json')` inside useEffect (see `src/components/*` and `README.md`).
  - static import: a few components import JSON directly, e.g. `src/components/about/Facilities.jsx` imports `../../data/facilities.json`.
  Keep both patterns in mind when modifying data-dependant components.

Integration points & environment
- AppSync / GraphQL: `src/services/api.ts` reads these env vars: `VITE_APPSYNC_URL`, `VITE_APPSYNC_API_KEY`, `VITE_APPSYNC_TENANT_ID`.
  - Hook: `src/hooks/useAppSync.js` posts { query, variables } to `API_URL` with `x-api-key`. Reference before changing GraphQL behavior.
- AWS Amplify: `src/aws-config.js` configures Amplify Auth. It's imported by `src/main.jsx` and `src/App.jsx` — editing Auth behavior usually happens here.

Developer workflows (concrete commands)
- Install: `npm install` (or `yarn`).
- Dev server: `npm run dev` (Vite). Files in `public/data/` are served statically at `/data/*.json`.
- Build: `npm run build` (Vite build) and `npm run preview` to preview production build.
- Lint: `npm run lint` (runs eslint).
- Note: Husky pre-commit hook is configured to run `npm run test`, but there is no `test` script in `package.json`—this is a repo-specific mismatch to be aware of. To run tests manually, use the installed test runner (jest) like `npx jest` or add a `test` script to package.json.

Conventions and patterns to follow
- Data files: Add or update JSON under `public/data/`. Components expect specific shapes — consult `README.md`, `PROJECT_ARCHITECTURE.md`, and example files (e.g. `public/data/facilities.json`).
- Adding a page:
  1. Add JSON to `public/data/` if the page is data-driven.
  2. Create component under `src/components/<area>/` or `src/pages/`.
  3. Wire the route in `src/App.jsx` (or in `src/modules/department` for dept pages).
- Department module: `src/modules/department` is semi‑self‑contained. Use the existing patterns (hooks like `useDepartment`, components in `modules/department/components`, pages in `modules/department/pages`) for new department features.
- Hooks & services: place hooks in `src/hooks` and API helpers in `src/services` (see `useAppSync.js` and `api.ts`).

Safety and edge notes
- Fetch patterns use AbortController — preserve signal usage when refactoring async fetch logic (see `src/hooks/useAppSync.js`).
- Environment variables: Vite exposes env via `import.meta.env.VITE_*`. Do not hardcode secrets in source; use `.env.local` in dev and CI secrets in CI/CD.

Examples (where to look)
- Route list: `src/App.jsx` — shows all top-level routes and department routes.
- AppSync hook: `src/hooks/useAppSync.js` — example GraphQL POST, error handling and loading state.
- API envs: `src/services/api.ts` — which env vars the project expects.
- Data-driven components: `src/components/about/Facilities.jsx` (imports `src/data/facilities.json`), `src/components/about/AboutOverviewPage.jsx` (fetches `/data/overview.json`).
- Dept pages: `src/modules/department/pages/DepartmentEvents.jsx` (uses `useAppSync`), `src/modules/department/components/` (examples of previews and lists).

If something is unclear
- Ask for the intended deployment target (Netlify, Vercel, S3) and whether AppSync is used in production. Also confirm whether to add a `test` script to package.json or update Husky.

Keep edits small and validated
- After edits, run `npm run dev` and confirm the affected page loads and data is served from `/data/<file>.json` or AppSync.
- For GraphQL changes, validate env vars are present and test queries via `useAppSync` consumer components.

End of instructions