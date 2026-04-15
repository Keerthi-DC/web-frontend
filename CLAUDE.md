---
1️⃣ Project Architecture                                                                                                            src/                                                                                                                                ├─ assets/                            # Static files – images, fonts, etc.
  ├─ components/
  │   ├─ about/                         # “About the College” pages
  │   │   ├─ CommitteesPage.jsx
  │   │   └─ VisionPage.jsx
  │   ├─ academics/                     # Academic‑level components
  │   │   ├─ AcademicCalendar.jsx
  │   │   └─ DepartmentsPage.jsx
  │   ├─ accreditations/                # Accreditation / compliance pages
  │   │   ├─ AICTEPage.jsx
  │   │   ├─ NBAPage.jsx
  │   │   ├─ AISHEPage.jsx
  │   │   └─ NAACPage.jsx
  │   ├─ admissions/                   # Admissions / application flows
  │   │   ├─ OverviewPage.jsx
  │   │   ├─ ProspectusPage.jsx
  │   │   ├─ FeeStructurePage.jsx
  │   │   └─ ScholarshipPage.jsx
  │   ├─ campusLife/                    # Campus‑life & facilities
  │   │   ├─ GymPage.jsx
  │   │   ├─ SacPage.jsx
  │   │   ├─ SportsPage.jsx
  │   │   ├─ TechnowavePage.jsx
  │   │   ├─ GreenCampusPage.jsx
  │   │   └─ Facilities.jsx
  │   ├─ common/                        # Reusable UI blocks
  │   │   ├─ Card.jsx
  │   │   ├─ SectionContainer.jsx
  │   │   ├─ GridLayout.jsx
  │   │   ├─ SectionTitle.jsx
  │   │   ├─ ReadMoreButton.jsx
  │   │   ├─ StatCard.jsx
  │   │   ├─ EventCard.jsx
  │   │   └─ ScrollToHash.jsx
  │   ├─ layout/                         # Layout skeleton
  │   │   ├─ Header/                     # Header stack
  │   │   │   ├─ DepartmentNavbar.jsx   # Current Nav
  │   │   │   └─ TopBar.jsx
  │   │   └─ Footer.jsx                 # Footer
  │   ├─ home/                          # Page‑level sections (Hero, News, etc.)
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
  │   ├─ app/                           # Non‑page app‑wide helpers
  │   │   ├─ ChatBot.jsx
  │   │   └─ BietGuide.jsx
  │   ├─ errors/                        # Error boundaries
  │   │   └─ ErrorBoundary.jsx
  │   └─ …                               # other legacy or test helpers
  ├─ hooks/                             # Custom React hooks
  │   ├─ useAudit.js
  │   ├─ useAppSync.js
  │   ├─ useDepartment.js
  │   ├─ useDepartmentMeta.js
  │   └─ …
  ├─ graphql/                            # AppSync query & mutation definitions
  │   ├─ department/
  │   │   ├─ events.js
  │   │   ├─ faculty.js
  │   │   ├─ gallery.js
  │   │   ├─ alumni.js
  │   │   ├─ achievements.js
  │   │   ├─ research.js
  │   │   └─ news.js
  │   └─ index.js                      # Export all queries for reuse
  ├─ modules/                            # Feature‑specific modules (academic, department, etc.)
  │   └─ department/                   # Example: department‑specific pages &
  │       ├─ components/
  │       │   ├─ home/
  │       │   │   ├─ GalleryPreview.jsx
  │       │   │   ├─ StudentCycle.jsx
  │       │   │   ├─ DepartmentHOD.jsx
  │       │   │   ├─ QuickLinksPreview.jsx
  │       │   │   ├─ AchievementsPreview.jsx
  │       │   │   ├─ DepartmentEventsPreview.jsx
  │       │   │   ├─ DepartmentHero.jsx
  │       │   │   ├─ DepartmentIntro.jsx
  │       │   │   ├─ PlacementStats.jsx
  │       │   │   └─ …
  │       │   └─ …
  │       └─ pages/
  │           ├─ ResultsPage.jsx
  │           ├─ DepartmentNewsletter.jsx
  │           ├─ DepartmentGallery.jsx
  │           ├─ DepartmentResearch.jsx
  │           ├─ DepartmentEvents.jsx
  │           └─ …
  ├─ pages/                             # Route wrappers (Home, Alumni, Faculty, etc.)
  │   ├─ Home.jsx
  │   ├─ ResultsPage.jsx
  │   ├─ NotificationPage.jsx
  │   ├─ ResearchPage.jsx
  │   ├─ PlacementsPage.jsx
  │   ├─ GalleryPage.jsx
  │   ├─ AlumniPage.jsx
  │   ├─ FacultyPage.jsx
  │   ├─ DepartmentEvents.jsx
  │   ├─ DepartmentAchievements.jsx
  │   ├─ DepartmentAccreditation.jsx
  │   ├─ DepartmentPeople.jsx
  │   ├─ DepartmentActivities.jsx
  │   ├─ DepartmentAlumni.jsx
  │   ├─ DepartmentHome.jsx
  │   ├─ DepartmentGallery.jsx
  │   ├─ DepartmentResearch.jsx
  │   ├─ DepartmentPlacements.jsx
  │   ├─ InnovativeTeachingPage.jsx
  │   └─ …
  ├─ services/                          # Low‑level GraphQL helpers / other services
  │   └─ graphql/                       # (empty for now – can hold API‑client instantiation)
  ├─ styles/                            # Global / CSS‑in‑JS styles
  ├─ aws-config.js                      # Holds AWS‑AppSync endpoint/env config
  ├─ App.jsx                            # React‑router, layout, and route definitions
  ├─ main.jsx                          # Entry point
  ├─ index.html                         # Static HTML shell
  └─ vite.config.js                     # Vite build & env config

---
2️⃣ Coding Conventions

- File names – PascalCase for components (ComponentName.jsx), kebab‑case for JSON (section-name.json).
- Imports – order: React → external → relative (…/common/, then …/home/).
- JSX Layout – Import → Constants → Sub‑components → Main component → Export.
- State/props – camelCase, use destructuring in function signature.
- Logging – use the useAudit hook for consistent console logging.
- Errors – catch block logs [AUDIT] Error in <Component>: and falls back to a simple “loading…” UI.

---
3️⃣ Component Design Pattern

1. Stateless UI, except for data loading – fetch inside useEffect.
2. Reusable sub‑components – e.g. Card, GridLayout, ReadMoreButton.
3. JSDoc + PropTypes – every file starts with a documentation comment that details: purpose, data source, props, usage.
4. Accessibility – all images have alt, buttons use <Link> or <button>, followed by ARIA roles where needed.

---
4️⃣ GraphQL Data Loading

All dynamic data is now fetched from the AWS AppSync GraphQL endpoint.  The AppSync URL and auth token are configured via environment variables:

- `REACT_APP_APPSYNC_ENDPOINT` – the GraphQL endpoint URL.
- `REACT_APP_APPSYNC_AUTH_TOKEN` – JWT or API key for authentication.

```ts
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const GET_NEWS = gql`
  query GetNews {
    news {
      id
      title
      summary
      date
    }
  }
`;

export const NewsSection = () => {
  const { data, loading, error } = useQuery(GET_NEWS);
  useAudit(`Fetching %cNews %cquery`, GET_NEWS, 'color: #5f9ea0');
  ...
};
```

- The `useAudit` hook logs the query, response size, and any errors.
- During development, components that only need static content can still point to a local JSON file for quick prototyping.

---
5️⃣ JSON Data Fallback (Development Only)

For components that are still in the prototyping phase or do not require live data, fallback to the existing `/data/<file>.json` structure:

```ts
fetch("/data/<file>.json")
  .then(r => r.json())
  .then(setData)
  .catch(e => useAudit(`Error fetching <file>.json`, e));
```

Remember to switch to the GraphQL `useQuery` pattern before merging into main.

---
6️⃣ Routing Strategy

- react-router-dom v6 – all routes defined in src/App.jsx.
- Navigation uses <Link> from react-router-dom.
- Page wrappers (NewsPage.jsx, GalleryPage.jsx, …) import the relevant home/* section and render it.

---
7️⃣ Adding a New Section

1. Create the GraphQL query file under `src/services/graphql/` (e.g. `faq.js`).
2. Create a component in `src/components/home/FAQSection.jsx`.
3. Add a JSDoc block at the top of that file.
4. Use `@apollo/client`’s `useQuery` to fetch data in `useEffect`‑like behavior.
5. Insert the component into Home.jsx in the required order.
6. If a full listing page is needed, add a route in App.jsx and create a wrapper page.

---
8️⃣ Audit Logging (Enhanced for GraphQL)

All significant events (mount, GraphQL query, query result, navigation) should be logged with:

```
[AUDIT] Component Mounted: <ComponentName>
[AUDIT] GraphQL Query Started: <QUERY_NAME>
[AUDIT] GraphQL Result [<N> items]
[AUDIT] GraphQL Error: <error message>
[AUDIT] Navigation: <Target> opened
```

The `useAudit` hook should accept an optional `type` parameter (`'query'`, `'mutation'`, `'navigation'`) to tag logs accordingly.

---
9️⃣ Documentation Checklist

- Every component file begins with a JSDoc block.
- Prop types are listed clearly.
- Data source is referenced (JSON file or GraphQL query).
- Example usage is given.
- Component purpose and high‑level behaviour are described.

---
🔟 Good Work – keep code readable, DRY, and maintainable! 
Feel free to reach out if you need templates for additional components.
