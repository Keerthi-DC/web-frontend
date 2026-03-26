---
name: Refactor Target List
description: Quick list of files that likely need refactoring for consistency, documentation, or performance.  Each line contains the path and a short note.
type: muse-knowledge
---
# Refactor–Target File List

1. `src/modules/department/pages/DepartmentHome.jsx` – mixes fetch, GraphQL, and raw state.  Split into hooks.
2. `src/modules/department/pages/DepartmentAchievements.jsx` – hard‑coded deptId constants.  Remove hard‑coding.
3. `src/modules/department/pages/DepartmentEvents.jsx` – query string in file.  Move to `graphql/department/events.js`.
4. `src/modules/department/components/home/XXX` – many lack JSDoc/PropTypes.
5. `src/hooks/useAppSync.js` – no TypeScript type safety; add error handling.
6. `src/hooks/useDepartment.js` – very similar to `useAppSync`.  Consider merging.
7. `src/components/common/EventCard.jsx` – missing alt on images.
8. `src/components/common/ScrollToHash.jsx` – missing documentation.
9. `src/services/api.js` – missing; create to centralize API_URL & API_KEY.
10. `src/App.jsx` – inline hard‑coded path strings; extract constants.

---
