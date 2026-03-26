---
name: Project Architecture Diagram
description: Mermaid diagram that visualises the top‑level architecture of the site, highlighting the main modules, data flow, and dependency graph.
type: muse-knowledge
---
# Project Architecture Diagram

```mermaid
flowchart TD
    A[Browser] --> B[React App (App.jsx)]
    B -->|Routing| C{Routes}
    C -->|/| D[HomePage]
    C -->|/departments/:deptId| E[DepartmentHome]
    E -->|loads static JSON| F[useDepartment Hook]
    E -->|runs GraphQL| G[useAppSync Hook]
    G -- returns --> H[Department Components]
    D -->|imports| I[Shared Components]
    I -- fetches JSON| J[useAudit Hook]
    H -->|renders| K[Tailwind Windy UI]
```

> **How to read**: The browser sends a request to a React Single‑Page App (`App.jsx`).  React‑router decides which page component to render.  Department pages load static JSON via `useDepartment` and dynamic data via `useAppSync`, then pass everything down to presentational components that use Tailwind for styling.

---
