Reactive Task Board — Hook Activity

This is a small starter project for the classroom activity that demonstrates React hooks: useState, useEffect, useContext, useReducer and custom hooks.

How to run

1. In the `hook-activity` folder, install dependencies:

   npm install

2. Start the dev server:

   npm run dev

3. Open http://localhost:5173 (or the URL printed by Vite).

Files included

- src/App.jsx — main app that uses theme and tasks hooks
- src/main.jsx — app entry point
- src/components/TaskInput.jsx — task input using useState
- src/components/ThemeToggleButton.jsx — toggles theme via context
- src/context/ThemeContext.jsx — theme provider and hook
- src/reducers/taskReducer.js — reducer used by useTasks
- src/hooks/useLocalStorageState.js — small custom hook
- src/hooks/useTasks.js — useReducer + persistence hook

Notes

This is minimal scaffolding. If you prefer Create React App instead of Vite, you can copy the `src/` folder into a CRA app.
