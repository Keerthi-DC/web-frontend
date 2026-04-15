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

## 🗂️ Folder Layout (Updated)

```
src/
... (rest unchanged for brevity)
```


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

## 🚧 Updated Architecture

```
src/
├─ assets/                       # Static images, fonts
├─ components/                    # Reusable React components
│   ├─ about/                      # About‑the‑College pages
│   │   ├─ CommitteesPage.jsx
│   │   └─ VisionPage.jsx
│   ├─ academics/                  # Academic‑level content
│   │   ├─ AcademicCalendar.jsx
│   │   └─ DepartmentsPage.jsx
│   ├─ accreditations/            # Accreditation & compliance pages
│   │   ├─ AICTEPage.jsx
│   │   ├─ NBAPage.jsx
│   │   ├─ AISHEPage.jsx
│   │   └─ NAACPage.jsx
│   ├─ admissions/                 # Admissions workflow components
│   │   ├─ OverviewPage.jsx
│   │   ├─ ProspectusPage.jsx
│   │   ├─ FeeStructurePage.jsx
│   │   └─ ScholarshipPage.jsx
│   ├─ campusLife/                 # Campus‑life & facilities UI
│   │   ├─ GymPage.jsx
│   │   ├─ SacPage.jsx
│   │   ├─ SportsPage.jsx
│   │   ├─ TechnowavePage.jsx
│   │   ├─ GreenCampusPage.jsx
│   │   └─ Facilities.jsx
│   ├─ common/                     # Generic UI building blocks (Card, Grid, etc.)
│   │   ├─ Card.jsx
│   │   ├─ SectionContainer.jsx
│   │   ├─ GridLayout.jsx
│   │   ├─ SectionTitle.jsx
│   │   ├─ ReadMoreButton.jsx
│   │   ├─ StatCard.jsx
│   │   ├─ EventCard.jsx
│   │   └─ ScrollToHash.jsx
│   ├─ layout/                     # Layout scaffolding (Header, Footer, etc.)
│   │   ├─ Header/
│   │   │   ├─ DepartmentNavbar.jsx
│   │   │   └─ TopBar.jsx
│   │   └─ Footer.jsx
│   ├─ home/                        # Page‑level sections (Hero, News, etc.)
│   │   ├─ HeroSection.jsx
│   │   ├─ QuickFacts.jsx
│   │   ├─ AnnouncementBar.jsx
│   │   ├─ InstituteIntroSection.jsx
│   │   ├─ NewsSection.jsx
│   │   ├─ EventSection.jsx
│   │   ├─ ProgramsSection.jsx
│   │   ├─ CampusLifeSection.jsx
│   │   ├─ ResearchSection.jsx
│   │   ├─ PlacementSection.jsx
│   │   ├─ GallerySection.jsx
│   │   ├─ AlumniSection.jsx
│   │   ├─ CallToActionSection.jsx
│   │   └─ DepartmentsSection.jsx
│   ├─ app/                         # App‑wide utilities (chat, guide)
│   │   ├─ ChatBot.jsx
│   │   └─ BietGuide.jsx
│   ├─ errors/                     # Error boundaries
│   │   └─ ErrorBoundary.jsx
│   └─ … (legacy or testing helpers)
├─ hooks/                          # Custom React hooks
│   ├─ useAudit.js
│   ├─ useAppSync.js
│   ├─ useDepartment.js
│   ├─ useDepartmentMeta.js
│   └─ …
├─ graphql/                        # AppSync queries and mutations
│   ├─ department/
│   │   ├─ events.js
│   │   ├─ faculty.js
│   │   ├─ gallery.js
│   │   ├─ alumni.js
│   │   ├─ achievements.js
│   │   ├─ research.js
│   │   └─ news.js
│   └─ index.js
├─ modules/                        # Feature modules (e.g., department)
│   └─ department/
│       ├─ components/
│       │   └─ home/
│       │       ├─ GalleryPreview.jsx
│       │       ├─ StudentCycle.jsx
│       │       ├─ DepartmentHOD.jsx
│       │       ├─ QuickLinksPreview.jsx
│       │       ├─ AchievementsPreview.jsx
│       │       ├─ DepartmentEventsPreview.jsx
│       │       ├─ DepartmentHero.jsx
│       │       ├─ DepartmentIntro.jsx
│       │       ├─ PlacementStats.jsx
│       │       └─ …
│       │   └─ …
│       └─ pages/
│           ├─ ResultsPage.jsx
│           ├─ DepartmentNewsletter.jsx
│           ├─ DepartmentGallery.jsx
│           ├─ DepartmentResearch.jsx
│           ├─ DepartmentEvents.jsx
│           └─ …
├─ pages/                          # Route wrappers
│   ├─ Home.jsx
│   ├─ ResultsPage.jsx
│   ├─ NotificationPage.jsx
│   ├─ ResearchPage.jsx
│   ├─ PlacementsPage.jsx
│   ├─ GalleryPage.jsx
│   └─ … (other page wrappers)
├─ services/                        # Low‑level GraphQL helpers
│   └─ graphql/                 # (currently empty—placeholder)
├─ styles/                          # Global styles / Tailwind config
├─ aws-config.js                    # AWS AppSync endpoint & auth config
├─ App.jsx                          # React‑router & layout definitions
├─ main.jsx                         # Application entry point
├─ index.html                       # Root HTML file
└─ vite.config.js                  # Vite build configuration
```


  ---