
  ---
  1️⃣ Project Architecture

  src/
  ├─ assets/                     # Static files (images, fonts)
  ├─ components/
  │   ├─ layout/
  │   │   ├─ Header/
  │   │   │   ├─ Navbar.jsx
  │   │   │   └─ TopBar.jsx
  │   │   └─ Footer.jsx
  │   ├─ common/                # Reusable UI blocks (Card, Grid, SectionContainer, etc.)
  │   └─ home/                  # Page‑level sections (NewsSection, CampusLifeSection, …)
  ├─ pages/                     # Razor‑style route wrappers
  ├─ services/                  # API helpers – currently empty (JSON is used)
  ├─ App.jsx                    # Router & layout
  ├─ main.jsx
  └─ index.html

  ---
  2️⃣ Coding Conventions

  - File names – PascalCase for components (ComponentName.jsx), kebab‑case for JSON (section-name.json).
  - Imports – order: React → external → relative (first .../common/, then ../home/).
  - JSX Layout – Import → Constants → Sub‑components → Main component → Export.
  - State/props – camelCase, use destructuring in function signature.
  - Logging – use the useAudit hook for consistent console logging.
  - Errors – catch block logs [AUDIT] Error in <Component>: and falls back to a simple “loading…” UI.

  ---
  3️⃣ Component Design Pattern

  1. Stateless UI, except for data loading – fetch inside useEffect.
  2. Reusable sub‑components – e.g. Card, GridLayout, ReadMoreButton.
  3. JSDoc + PropTypes – every file starts with a documentation comment that details: purpose, data source, props, usage.
  4. Accessibility – all images have alt, buttons use <Link> or <button>, followed by ARIA roles where needed.

  ---
  4️⃣ JSON Data Loading

  useEffect(() => {
    fetch("/data/<file>.json")
      .then((r) => r.json())
      .then(setData)
      .catch(logError);  // useAudit for structured error log
  }, []);

  JSON files live under public/data/.
  All components fetch their own file; no global data store is required.

  ---
  5️⃣ Routing Strategy

  - react-router-dom v6 – all routes defined in src/App.jsx.
  - Navigation uses <Link> from react-router-dom.
  - Page wrappers (NewsPage.jsx, GalleryPage.jsx, etc.) import the relevant home/* section and render it.

  ---
  6️⃣ Adding a New Section

  1. Create a JSON file in public/data/ (e.g. faq.json).
  2. Create a component in src/components/home/FAQSection.jsx.
  3. Add JSDoc at the top of that file.
  4. Fetch the JSON inside useEffect.
  5. Insert the component into Home.jsx in the required order.
  6. If a full listing page is needed, add a route in App.jsx and create a wrapper page.

  ---
  7️⃣ Audit Logging (via Hook)

  All significant events (mount, fetch, error, navigation) should be logged with:

  [AUDIT] Component Mounted: <ComponentName>
  [AUDIT] Fetching Data: <file>.json
  [AUDIT] Navigation: <Target> opened

  Add the hook (see next section) and call useAudit() in every component that fetches data or mounts.

  ---
  8️⃣ Documentation Checklist

  - Every component file begins with a JSDoc block.
  - Prop types are listed clearly.
  - Data source is referenced (JSON file).
  - Example usage is given.
  - Component purpose and high‑level behaviour are described.

  ---
  Good Work – keep code readable, DRY, and maintainable!
  Feel free to reach out if you need templates for additional components.

