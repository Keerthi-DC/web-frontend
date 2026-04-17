# BIET College Website – Project Architecture

The college website follows a **React + Vite + Tailwind + AWS AppSync (GraphQL)** stack, structured using Feature-Sliced Design (FSD).

## Key Architecture Layers

┌─────────────┬──────────────────────────────────────┬─────────────────────────────────────────────────────────────────┐
│   Layer     │           Files / Folders            │                            Purpose                              │
├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
│ Services    │ `src/services/apolloClient.js`       │ Global Apollo Client configuration and AppSync integrations.    │
├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
│ Layout      │ `src/components/layout/*`            │ Global page layout, ErrorBoundaries, Header Nav & Footer UI.    │
├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
│ UI Elements │ `src/components/ui/*`                │ Reusable atomic components (Cards, FormInputs, Buttons).        │
├─────────────┼──────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
│ Features    │ `src/features/*`                     │ Feature-Sliced domain modules (home, department, news, etc).    │
│             │                                      │ Each feature strictly isolates its own pages, hooks, and views. │
└─────────────┴──────────────────────────────────────┴─────────────────────────────────────────────────────────────────┘

## Data Flow (GraphQL)

1. The application data layer is entirely managed by **Apollo Client**.
2. Feature hooks (e.g. `useNews.js`, `useDepartments.js`) execute `useQuery` to fetch data from AWS AppSync.
3. Apollo natively caches the results to ensure minimal network requests.
4. Components independently self-hydrate. Parent components **do not** prop-drill data to children.
5. If a GraphQL fetch fails or network drops, Apollo surfaces the error state and the UI gracefully handles it without crashing, backed by a global `<ErrorBoundary>`.

## Routing Flow

- The root router in `App.jsx` handles all navigation.
- **Route-Level Lazy Loading** is implemented. Every feature page is wrapped in `React.lazy()` and `<Suspense>`, meaning JavaScript bundles are only downloaded when the user actually navigates to that specific page.

## Form Handling

- All forms (e.g., Admissions Enquiry) use **React Hook Form** for state management and **Zod** for schema validation.
- Inputs are abstracted into `FormInput.jsx`, `FormSelect.jsx`, and `FormTextarea.jsx` ensuring UI consistency and mapping Zod errors natively.
- Form payloads are sanitized via `dompurify` to prevent Stored XSS attacks.

## Legacy Note: JSON & "useAudit"
*Note: In previous versions of this project (prior to April 2026), the application relied on static JSON files (`public/data/*.json`) and a legacy `useAudit` logging hook. This architecture was completely eradicated during the AppSync Migration to achieve enterprise-grade scalability. All data is now live via GraphQL.*