---
name: Architecture Guide
description: Overview of project structure, architecture decisions, data flow, and how to extend without breaking conventions.
type: muse-knowledge
---
# Bapujji College Website – Architecture Guide

## 1.  Project Folder Layout

```
src/
 ├─ assets/                 # static assets (images, fonts)
 ├─ components/            # React components – everything is a component.
 │  ├─ layout/              # Header, Navbar, Footer
 │  ├─ common/               # reusable UI blocks (Card, Grid, EventCard…)
 │  └─ home/                 # Page‑level sections used in home and department pages
 ├─ pages/                  # Browser route wrappers (Home, NewsPage, etc.)
 ├─ modules/               # Feature modules (department, admissions, etc.)
 │  └─ department/
 │     ├─ pages/            # Each page for a department – e.g. DepartmentHome.jsx
 │     ├─ components/       # UI sub‑components reused inside the module
 │     └─ graphql/           # GraphQL query string constants
 ├─ hooks/                  # small, pure hooks (useAudit, useAppSync, useDepartment)
 ├─ services/                # Runtime constants – API_URL, API_KEY
 ├─ App.jsx                 # Main router and layout
 ├─ main.jsx                 # BrowserRouter bootstrap
 └─ index.html
```

**Key take‑aways**
- All *pages* are thin wrappers around *component* trees – the page loads data (via a hook) and passes it down.
- Data sources are **static JSON** from `public/data/` or **AppSync GraphQL**.
- All GraphQL logic lives in **hooks** or **graphql/** constants – components never hard‑code queries.
- The `useDepartment` hook is the canonical way to load a department's `deptId.json`, which stores the meta‑data required for the layout.
- The `useAppSync` hook is a generic wrapper around PostGraphQL requests, using `AbortController` to cancel pending requests.

---
