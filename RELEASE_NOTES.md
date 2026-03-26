The following changes were applied:

1. Restored original `DepartmentPeople` UI by re‑adding the rendering logic.
2. Re‑wrote the file contents to use the new hooks (`useDepartment`, `useAppSync`) while keeping the original component layout.
3. Fixed import paths – they now correctly point to `hooks/useDepartment`, `hooks/useAppSync`, and the GraphQL query file.
4. Added guard logic for `staff` and `students` lists (`list || []`) to avoid undefined.map errors.
5. Resolved the JSX syntax error (`{renderCards(... ) }`).
6. Updated related hook files (`useDepartment.js`, `useAppSync.js`) and GraphQL query modules.
7. Re‑created the `src/graphql/department/events.js` and `.../faculty.js` files.
8. Centralised API config in `src/services/api.ts`.

All these changes are committed to the current git branch. The app now builds and the Department People page displays correctly.
