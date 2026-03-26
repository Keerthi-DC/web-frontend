---
name: Department Module Guide
description: Step‑by‑step reference for extending or modifying the department feature.
type: muse-knowledge
---
# Department Feature – Developer Reference

## 1.  Where the department logic lives

- **Routing** – defined in `src/App.jsx`.  All department pages are matched under the path `/departments/:deptId/*`.
- **Pages** – `src/modules/department/pages/`.  Each file is a *controller* that pulls data and hands it to a presentation component.
- **Components** – `src/modules/department/components/h…`.  Purely presentational, props‑driven.
- **Hooks** –
  - `useDepartment` – loads the static `deptId.json` from `public/data/departments/`.
  - `useAppSync` – generic GraphQL communication.

## 2.  Typical data flow

```
deptId  ➜  useDepartment ➜  data (read‑only JSON)
          │
     useAppSync (query, variables) ➜  GraphQL data
```

The page passes *all* the JSON payloads to child components.  Example: `DepartmentHome.jsx` passes:
```js
<DepartmentHero data={data.hero} />
<DepartmentIntro data={introData} />
<DepartmentHOD data={hod} />
<FacultyPreview data={faculty} />
…
```

## 3.  Adding a new department‑specific section

1️⃣ **Create the JSON file** – `public/data/departments/<deptId>.json`.  Include any new fields needed by the new component.

2️⃣ **Create UI component** – `src/modules/department/components/h…/NewSection.jsx`.
   - Add JSDoc, PropTypes.
   - Follow existing layout conventions (`grid`, `shadow`, `rounded`).
   - Do *not* perform any API call here – just render.

3️⃣ **Create page controller** – `src/modules/department/pages/NewSection.jsx`.
   - Pull `deptId`, call `useDepartment` or `useAppSync` as required.
   - Handle `loading`, `error` and pass data to the UI component.

4️⃣ **Wire routing** – add a route in `App.jsx`:
```tsx
<Route path="/departments/:deptId/new-section" element={<NewSection/>}/>
```

5️⃣ **Style** – use Tailwind utilities to match the rest.  If you need a new utility class, add it to `tailwind.config.js`.

## 4.  Common maintenance patterns

- **Logging** – always call `useAudit(message)` at top‑level mounts or major events.
- **Loading Indicator** – use the shared `<Spinner />` component (create if missing).  Consistent UX.
- **Error Boundary** – wrap the `<Routes>` in `ErrorBoundary` so the entire app falls back gracefully.
- **Test** – create a Jest + React‑Testing‑Library spec for every new page.  Snapshot the rendered component.
- **Documentation** – update `README.md` or `PROJECT_ARCH.md` with any changes to hook API or component props.

## 5.  File duties & when to modify

| File | Purpose | Change Typical? |
|------|---------|-----------------|
| `src/modules/department/pages/DepartmentHome.jsx` | Controller + orchestrator | Yes – when adding new data fields or queries.
| `src/modules/department/pages/DepartmentEvents.jsx` | Event list | Add new query type or filtering logic.
| `src/modules/department/components/home/XXXX.jsx` | Presentational | No change unless UI overhaul.
| `src/hooks/useDepartment.js` | Static JSON loader | Only if file path or schema changes.
| `src/hooks/useAppSync.js` | Generic GraphQL wrapper | Rare – only if you switch to Apollo or need auth headers.

---
