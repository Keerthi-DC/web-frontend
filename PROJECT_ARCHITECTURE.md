The college website follows a React + Vite + Tailwind stack.
  All UI is split into layout, common, and home tags.

  Key Components

  ┌───────────┬───────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────┐
  │   Layer   │                  Files / Folders                  │                                       Purpose                                       │
  ├───────────┼───────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
  │ Layout    │ components/layout/Header/*,                       │ Global page layout, header nav, & footer UI                                         │
  │           │ components/layout/Footer.jsx                      │                                                                                     │
  ├───────────┼───────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
  │ Common    │ components/common/*                               │ Reusable building blocks (Card, GridLayout, SectionContainer, SectionTitle,         │
  │           │                                                   │ ReadMoreButton)                                                                     │
  ├───────────┼───────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
  │ Home      │ components/home/*                                 │ Page‑level content sections pulled by Home.jsx (Hero, News, Events, Campus Life, …) │
  │ Pages     │                                                   │                                                                                     │
  ├───────────┼───────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
  │ Pages     │ pages/*.jsx                                       │ React Router pages that wrap the home sections (e.g. NewsPage.jsx shows all news in │
  │           │                                                   │  a scrollable grid)                                                                 │
  ├───────────┼───────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────┤
  │ Data      │ public/data/*.json                                │ All the static JSON files that feed the UI                                          │
  └───────────┴───────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────┘

  Data Flow

  1. Home.jsx renders sections in the prescribed order.
  2. Each section runs useEffect that fetch("/data/<file>.json").
  3. Data is stored in a component‑level useState.
  4. Rendering is purely presentational—no global store is involved.
  5. If the fetch fails, an audit‑log error is printed and a graceful “loading…” fallback is shown.

  Routing Flow

  - Root <Router> in App.jsx maps paths (/news, /gallery, etc.) to page components.
  - Page components only orchestrate the layout and embed the relevant home/* section.
  - Navigation events are routed with <Link> and audit‑logged by the useAudit hook.

  Logging / Auditing

  All audit logs come from the useAudit hook.
  Examples:

  [AUDIT] Component Mounted: HeroSection
  [AUDIT] Fetching Data: research.json
  [AUDIT] Navigation: CampusLifePage opened
  [AUDIT] Error in GallerySection: Failed to load data.

  The hook can be imported in any component:

  import { useAudit } from "../hooks/useAudit";
  const logError = useAudit("GallerySection", "gallery.json");

  Extending the Site

  1. Create a JSON file in public/data/.
  2. Create a component under src/components/home/*.
  3. Call useAudit and fetch the data.
  4. Add the component to Home.jsx.
  5. Add a route in App.jsx if a full‑listing page is needed.


  ---------------------------------------------------------------------

  ### 4. Logging Hook – `src/hooks/useAudit.js`

  Create a new folder `src/hooks` if it doesn't exist, then add the file.

  ```js
  // src/hooks/useAudit.js
  import { useEffect } from 'react';

  /**
   * useAudit
   *
   * A lightweight hook that logs common events:
   * - Component mount
   * - JSON fetch start
   * - Errors
   *
   * @param {string} component - Unique component name
   * @param {string} [jsonSource] - Optional JSON file name
   * @returns {(error: any) => void} A function to log fetch errors
   */
  export const useAudit = (component, jsonSource = '') => {
    // Log when the component mounts
    useEffect(() => {
      console.log(`[AUDIT] Component Mounted: ${component}`);
    }, []);

    // Log when the component starts fetching
    useEffect(() => {
      if (jsonSource) {
        console.log(`[AUDIT] Fetching Data: ${jsonSource}`);
      }
    }, [jsonSource]);

    // Helper to log fetch errors
    const logError = (error) => {
      console.error(`[AUDIT] Error in ${component}:`, error);
    };

    return logError; // return the helper for easy use in catch
  };

  How to use the hook

  import React, { useEffect, useState } from 'react';
  import { useAudit } from '../hooks/useAudit';

  const SampleSection = () => {
    const [data, setData] = useState(null);
    const logError = useAudit('SampleSection', 'sample.json');

    useEffect(() => {
      fetch('/data/sample.json')
        .then(r => r.json())
        .then(setData)
        .catch(logError);
    }, []);

    return <div>{data ? 'Loaded' : 'Loading…'}</div>;
  };

  export default SampleSection;

  Insert the same pattern in every component that fetches JSON.

  ---
  5. Documentation Comments (JSDoc)

  Below is a single template that you can copy to any component file.
  Adjust the descriptive lines to match the actual component.

  /**
   * ComponentName
   *
   * Purpose: Briefly describe what the component renders.
   *
   * Props:
   * - prop1: type – description
   * - prop2: type – description
   *
   * Data Source: /data/<file>.json (if data is fetched)
   *
   * Example Usage:
   * <ComponentName prop1="value" />
   *
   * @returns JSX.Element
   */

  Example – ResearchSection.jsx

  /**
   * ResearchSection
   *
   * Displays a grid of research statistics and a horizontal
   * scroll list of research labs.  Each lab card shows an
   * image, title, short description and a "Read More"
   * link to the full research page.
   *
   * Data Sources:
   * - /data/research.json  (lab list)
   *
   * @returns JSX.Element
   */

  Add a similar comment block at the top of each src/components/home/*.jsx file.

  ---
  6. Consistent Structure Reminder

  Every component should follow this skeleton:

  import React, ...;
  import { /* ... */ } from ...;

  // 1️⃣ Constants / hooks
  const SOME_VALUE = ...;

  // 2️⃣ Sub‑components
  const SubComponent = (...) => { ... };

  // 3️⃣ Main component
  const ComponentName = () => { ... };

  // 4️⃣ Export
  export default ComponentName;

  ---