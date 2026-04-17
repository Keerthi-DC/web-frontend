# 📚 Bapuji Institute of Engineering & Technology – College Website

A modern, highly optimized enterprise website built with **React**, **Vite**, **Tailwind CSS**, and **AWS AppSync (GraphQL)**.

> **Live Demo** – https://baite.org  *(replace with your URL)*

---

## 🚀 Features

| ✔ | Feature |
|---|---------|
| 1 | **Feature-Sliced Design (FSD)** architecture for infinite scalability |
| 2 | **AWS AppSync GraphQL backend** with Apollo Client caching |
| 3 | **Route-Level Lazy Loading** (`React.lazy()`) for lightning fast First Contentful Paint |
| 4 | **Global Error Boundaries** for bulletproof fault tolerance |
| 5 | **React Hook Form + Zod** for strict schema validation and error mapping |
| 6 | Form payload sanitization via `dompurify` (XSS prevention) |
| 7 | Reusable UI Component library (`src/components/ui/`) |
| 8 | Fully responsive layout with Tailwind CSS |
| 9 | Zero prop-drilling – self-hydrating component architecture |
| 10| Clean navigation via React Router v6 |

---

## 🗂️ Folder Layout

```text
src/
├─ assets/                      # Static images, fonts
├─ components/
│   ├─ layout/                  # Header, Footer, ErrorBoundary
│   └─ ui/                      # Reusable UI (Cards, FormInputs, etc.)
├─ features/                    # Feature-Sliced domain modules
│   ├─ academics/               
│   ├─ admissions/              
│   ├─ campusLife/              
│   ├─ department/              
│   ├─ news&events/             
│   └─ ... (each contains pages/, hooks/, components/, graphql/)
├─ services/                    # Apollo Client & API logic
│   └─ apolloClient.js          
├─ App.jsx                      # Router & Lazy Loading
├─ main.jsx                     # React Root
└─ aws-config.js                # AWS Amplify / AppSync config
```

---

## 🔧 Technologies

| Category         | Tool / Library |
|-------------------|----------------|
| **Framework**     | React 18 |
| **Bundler**       | Vite |
| **Styling**      | Tailwind CSS |
| **Data Fetching**| `@apollo/client` (GraphQL) |
| **State**        | Apollo Cache |
| **Forms**        | `react-hook-form` + `zod` |
| **Routing**      | React Router v6 |

---

## 📦 Installation

```bash
git clone https://github.com/Keerthi-DC/web-frontend.git
cd web-frontend
npm install           # or yarn install
```

---
▶️ Running

```bash
npm run dev          # Development server with hot‑reload
npm run build        # Production build (dist/)
npm run preview      # Serve production build locally
```

---
🚩 Deployment

1. `npm run build` – creates `dist/` folder.
2. Deploy the `dist/` folder to any static host (Netlify, Vercel, AWS S3, GitHub Pages).

---
🎯 Future Improvements

- Add TypeScript (`.tsx`) for strict type safety.
- Server-Side Rendering (SSR) via Next.js or Remix for SEO.
- Add comprehensive Unit Tests (Vitest + React Testing Library).