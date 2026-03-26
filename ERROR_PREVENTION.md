# ERROR_PREVENTION.md

Claude must verify the following before returning code.

1. All imports exist
2. All routes exist
3. Components are correctly exported
4. JSX syntax is valid
5. Props are used correctly
6. API endpoints match API_CONTRACT.md

Claude must fix syntax errors before returning the code.