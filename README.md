 1. README.md (root)

  # 📚 Bapuji Institute of Engineering & Technology – College Website

  A modern, responsive site built with **React**, **Vite**, and **Tailwind CSS**.
  Content is driven entirely from JSON files for instant updates without code changes.

  > **Live Demo** – https://baite.org  *(replace with your URL)*

  ---

  ## 🚀 Features

  | ✔ | Feature |
  |---|---------|
  | 1 | Responsive layout (desktop ≈ tablet ≈ mobile) |
  | 2 | Component‑based architecture (layout, common, home sections) |
  | 3 | Data‑driven UI – all pages read JSON from `/public/data/`. |
  | 4 | Clean navigation via React Router v6 |
  | 5 | Accessible (semantic tags, ARIA, `alt` props) |
  | 6 | Image lazy‑loading & minimal JavaScript bundle |
  | 7 | SEO baked in (meta tags & OpenGraph) |
  | 8 | Hot‑Module‑Replacement (Vite dev server) |
  | 9 | ESLint + Prettier + Husky pre‑commit hooks |
  |10 | Optional page‑level routing for full listings |

  ---

  ## 🗂️ Folder Layout

  src/
  ├─ assets/                      # Static images, fonts
  ├─ components/
  │   ├─ layout/                   # Header & Footer
  │   │   ├─ Header/
  │   │   │   ├─ Navbar.jsx
  │   │   │   └─ TopBar.jsx
  │   │   └─ Footer.jsx
  │   ├─ common/                  # Reusable UI (Card, Grid, etc.)
  │   └─ home/                     # Page‑level sections (NewsSection, …)
  ├─ pages/                        # Route entry points
  ├─ services/                     # (future API helpers)
  ├─ App.jsx                      # Router & layout
  ├─ main.jsx
  └─ index.html

  public/
  └─ data/                        # JSON files for all UI content
     ├─ news.json
     ├─ events.json
     ├─ gallery.json
     ├─ campusLife.json
     ├─ research.json
     ├─ placements.json
     ├─ placementHighlights.json
     ├─ alumni.json
     └─ footer.json

  ---

  ## 🔧 Technologies

  | Category         | Tool / Library |
  |-------------------|----------------|
  | **Framework**     | React (hooks) |
  | **Bundler**       | Vite |
  | **Styling**      | Tailwind CSS (JIT) |
  | **State**        | Local component state → JSON |
  | **Routing**      | React Router v6 |
  | **Testing**      | Vitest + React Testing Library (optional) |
  | **Deployment**    | GitHub Actions → Netlify / Vercel / S3  |

  ---

  ## 📦 Installation

  ```bash
  git clone https://github.com/your-org/college-website.git
  cd college-website
  npm install           # or yarn install

  ---
  ▶️ Running

  npm run dev          # Development server with hot‑reload
  npm run build        # Production build (dist/)
  npm run preview      # Serve production build locally
  npm run lint         # Check code style
  npm run format       # Prettify all files

  ---
  📁 JSON Data Structure

  All dynamic data lives in public/data/.
  Every component fetches its JSON file with:

  fetch("/data/sections.json")
    .then(r => r.json())
    .then(setData)
    .catch(console.error);

  ┌──────────────────────────┬───────────────────────────────────────────────────────────────────────────────────┬─────────────────────────┐
  │           File           │                                  Typical Schema                                   │         Sample          │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ news.json                │ [ { id, title, description, image, date } ]                                       │ "title":"Latest update" │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ events.json              │ [ { id, title, image, eventDate, description } ]                                  │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ gallery.json             │ [ { id, image, title, category, description } ]                                   │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ campusLife.json          │ [ { id, name, image, title, description, facilities, activities, achievements } ] │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ research.json            │ [ { id, title, image, description, researchAreas, achievements } ]                │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ placements.json          │ [ { id, company, logo, description } ]                                            │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ placementHighlights.json │ [ { id, name, company, package, image } ]                                         │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ alumni.json              │ [ { id, name, image, company, position, batch, message } ]                        │                         │
  ├──────────────────────────┼───────────────────────────────────────────────────────────────────────────────────┼─────────────────────────┤
  │ footer.json              │ { logo, address, sections[], bottomLinks[], copyright }                           │                         │
  └──────────────────────────┴───────────────────────────────────────────────────────────────────────────────────┴─────────────────────────┘

  These files are plain static JSON; no server logic is required.

  ---
  🚩 Deployment

  1. npm run build – creates dist/ folder.
  2. Deploy the dist/ folder to any static host (Netlify, Vercel, AWS S3, GitHub Pages).
  3. CI pipeline (currently GitHub Actions) automatically runs npm run build on every push to main.

  ---
  🎯 Future Improvements

  - SSR – move to Next.js for better SEO.
  - Headless CMS – switch from static JSON to a CMS (Contentful, Strapi).
  - Dark mode toggle – Tailwind dark‑mode utility.
  - Infinite scroll / pagination – for news & gallery pages.
  - Accessibility audit – aXe + Lighthouse.
  - TypeScript – add static types to existing components.

  ---