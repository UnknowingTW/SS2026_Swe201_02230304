# Activity 1 — Reactive Task Board: State and Side Effects with Hooks

Table of Contents

- Activity overview
- Starter setup (10–15 minutes)
- Part 1 – useState: local component state (Task input)
  - Concept overview (short)
  - Classroom task
- Part 2 – useEffect: side effects and lifecycle-like behavior
  - Concept overview (short)
  - Classroom task
- Part 3 – useContext: sharing theme across components
  - Concept overview (short)
  - Classroom task
- Part 4 – useReducer: managing complex task state
  - Concept overview (short)
  - Classroom task
- Part 5 – Custom hooks: reusable stateful logic
  - Concept overview (short)
  - Classroom task
- Suggested in-class flow and mini exercises
- Common mistakes to highlight (discussion points)
- Quick revision checklist for students

---

Activity overview

Title: “Reactive Task Board: State and Side Effects with Hooks”

Context: 2nd year B.E. Software Engineering, React (or React Native with minor adjustments)

Goal: By the end, students will have a small Task Board app that uses:

- useState for component-level state
- useEffect for side effects (fetching, timers, localStorage sync)
- useContext for sharing data across components without prop drilling
- useReducer for complex state transitions
- Custom hooks to encapsulate reusable stateful logic

React’s built-in hooks allow functional components to manage state and side effects without using classes, and they are the standard approach in modern React codebases.

You can run this as a 2–3 hour lab (or split into two sessions).

---

Starter setup (10–15 minutes)

Pre-requisites for students

- Node, npm or yarn installed
- Basic familiarity with React components and JSX

Scaffold

Use Vite or Create React App:

```bash
npx create-react-app hook-activity
cd hook-activity
npm start
```

Replace `src/App.js` (or `App.jsx`) with:

```jsx
// App.jsx
import React from "react";

function App() {
  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Reactive Task Board</h1>
      <p>We will gradually implement features using different React hooks.</p>
    </div>
  );
}

export default App;
```

This gives a clean starting point.

---

Part 1 – useState: local component state (Task input)

Concept overview (short)

- useState gives a functional component its own state and a setter function that triggers re-render when called.
- Typical use: inputs, toggles, counters, and small pieces of UI state.

Classroom task

Students implement a `TaskInput` component that lets the user type a task description and see it on screen.

Step instructions

- Create `src/components/TaskInput.jsx`.
- Use `useState` to store title.
- Display the current title under the input.
- Add a button “Clear” that resets title to an empty string.

Code demo

```jsx
// src/components/TaskInput.jsx
import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal"); // second piece of state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    setTitle("");
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginLeft: "0.5rem" }}
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <button type="submit" style={{ marginLeft: "0.5rem" }}>
        Add
      </button>
      <button
        type="button"
        onClick={() => setTitle("")}
        style={{ marginLeft: "0.5rem" }}
      >
        Clear
      </button>
      <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
        Preview: "{title || "(empty)"}" (priority: {priority})
      </div>
    </form>
  );
}

export default TaskInput;
```

Sample interaction

- User types: “Finish hooks lab”, chooses priority “high”, clicks Add → task is sent to parent via `onAddTask` and the form clears.

---

Part 2 – useEffect: side effects and lifecycle-like behavior

Concept overview (short)

- `useEffect` runs after rendering and is used for side effects such as timers, subscriptions, logging, and network requests.
- Cleanup functions returned from the effect run before the effect re-runs and on unmount, similar to component unmount logic.

Classroom task

Students build a `TaskStats` component that:

- Shows how many tasks exist.
- Persists the task list to `localStorage` (side effect).
- Restores tasks from `localStorage` on initial mount.

Later they will integrate this with the reducer, but you can show a simple version first.

Code demo (effect in App)

```jsx
// src/App.jsx
import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";

function App() {
  const [tasks, setTasks] = useState(() => {
    // lazy initialization from localStorage
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    // side effect: sync tasks to localStorage whenever they change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h1>Reactive Task Board</h1>
      <TaskInput onAddTask={handleAddTask} />
      <p>Total tasks: {tasks.length}</p>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} ({t.priority})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Optional exercise

Ask students to add a `useEffect` that logs to the console whenever the number of tasks changes, and another that sets `document.title` to "Tasks: X".

---

Part 3 – useContext: sharing theme across components

Concept overview (short)

- `useContext` lets components read a value from a React context without passing props through every level (“prop drilling”).
- Common use cases: theme, authentication, user settings, or global configuration.

Classroom task

Students create a `ThemeContext` so that:

- The whole app can switch between “light” and “dark”.
- Multiple components can read the current theme without receiving props manually.

Step instructions

- Create `src/context/ThemeContext.jsx`.
- Provide `theme` and `toggleTheme` from a context provider.
- Wrap `<App />` with `ThemeProvider` in `main.jsx` or `index.js`.
- Consume the context in two components (for example, in `App` and in a new `ThemeToggleButton`).

Context code

```jsx
// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
```

Wire it in `main.jsx`

```jsx
// src/main.jsx (or index.js)
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);
```

Consume in App and a toggle button

```jsx
// src/components/ThemeToggleButton.jsx
import React from "react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}

export default ThemeToggleButton;

// src/App.jsx (updated)
import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => setTasks((prev) => [...prev, task]);

  const background = theme === "light" ? "#ffffff" : "#222222";
  const color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", background, color, minHeight: "100vh" }}>
      <h1>Reactive Task Board</h1>
      <ThemeToggleButton />
      <TaskInput onAddTask={handleAddTask} />
      <p>Total tasks: {tasks.length}</p>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title} ({t.priority})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Mini exercise

- Ask students to create a `Header` component that also reads theme using `useTheme` and changes its style accordingly.

---

Part 4 – useReducer: managing complex task state

Concept overview (short)

- `useReducer` is an alternative to `useState` for complex state; it uses a reducer function `(state, action) => newState` and a `dispatch` function.
- It is helpful when state has multiple subfields or when next state depends on the previous state in non-trivial ways.

Classroom task

Students refactor task state from `useState` to `useReducer` and add additional actions:

- `ADD_TASK`
- `TOGGLE_DONE`
- `CLEAR_COMPLETED`

Reducer code

```js
// src/reducers/taskReducer.js
export const initialTaskState = {
  tasks: [],
};

export function taskReducer(state, action) {
  switch (action.type) {
    case "LOAD_FROM_STORAGE":
      return { ...state, tasks: action.tasks };
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.task] };
    case "TOGGLE_DONE":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done } : t
        ),
      };
    case "CLEAR_COMPLETED":
      return {
        ...state,
        tasks: state.tasks.filter((t) => !t.done),
      };
    default:
      return state;
  }
}
```

Integrating `useReducer` in App

```jsx
// src/App.jsx (useReducer version)
import React, { useReducer, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { taskReducer, initialTaskState } from "./reducers/taskReducer";

function App() {
  const { theme } = useTheme();
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // Load tasks once on mount
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      dispatch({ type: "LOAD_FROM_STORAGE", tasks: JSON.parse(stored) });
    }
  }, []);

  // Persist whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  const handleAddTask = (task) => {
    dispatch({ type: "ADD_TASK", task: { ...task, done: false } });
  };

  const background = theme === "light" ? "#ffffff" : "#222222";
  const color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", background, color, minHeight: "100vh" }}>
      <h1>Reactive Task Board</h1>
      <ThemeToggleButton />
      <TaskInput onAddTask={handleAddTask} />

      <p>Total tasks: {state.tasks.length}</p>
      <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
        Clear completed
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {state.tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "TOGGLE_DONE", id: t.id })}
              />
              <span
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  marginLeft: "0.5rem",
                }}
              >
                {t.title} ({t.priority})
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Exercise

- Add an `EDIT_TASK` action that lets the user edit a task’s title.
- Ask students to write the reducer case and wire it to a small edit form.

---

Part 5 – Custom hooks: reusable stateful logic

Concept overview (short)

- Custom hooks are plain functions that call other hooks and encapsulate reusable stateful or side-effect logic.
- They allow sharing behavior (not JSX) between components without changing the component hierarchy.

Classroom task

Students extract repeated logic into two custom hooks:

- `useLocalStorageState` for saving and loading a value from `localStorage`.
- (Optional) `useTasks` that wraps `useReducer + persistence`.

Custom hook 1: `useLocalStorageState`

Hook code

```js
// src/hooks/useLocalStorageState.js
import { useState, useEffect } from "react";

export function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```

Usage example (simple version without reducer)

```jsx
// src/App.jsx (simpler variant using custom hook)
import React from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

function App() {
  const { theme } = useTheme();
  const [tasks, setTasks] = useLocalStorageState("tasks", []);

  const handleAddTask = (task) => {
    setTasks((prev) => [...prev, { ...task, done: false }]);
  };

  const background = theme === "light" ? "#ffffff" : "#222222";
  const color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", background, color, minHeight: "100vh" }}>
      <h1>Reactive Task Board</h1>
      <ThemeToggleButton />
      <TaskInput onAddTask={handleAddTask} />
      <p>Total tasks: {tasks.length}</p>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Optional custom hook 2: `useTasks`

If time allows, students can encapsulate `useReducer + sync` in a dedicated hook:

```js
// src/hooks/useTasks.js
import { useReducer, useEffect } from "react";
import { taskReducer, initialTaskState } from "../reducers/taskReducer";

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      dispatch({ type: "LOAD_FROM_STORAGE", tasks: JSON.parse(stored) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  return { tasks: state.tasks, dispatch };
}
```

Usage in App becomes very compact:

```jsx
// src/App.jsx
import React from "react";
import TaskInput from "./components/TaskInput";
import ThemeToggleButton from "./components/ThemeToggleButton";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();

  const background = theme === "light" ? "#ffffff" : "#222222";
  const color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", background, color, minHeight: "100vh" }}>
      <h1>Reactive Task Board</h1>
      <ThemeToggleButton />
      <TaskInput
        onAddTask={(task) =>
          dispatch({ type: "ADD_TASK", task: { ...task, done: false } })
        }
      />
      <p>Total tasks: {tasks.length}</p>
      <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
        Clear completed
      </button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() =>
                  dispatch({ type: "TOGGLE_DONE", id: t.id })
                }
              />
              <span
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  marginLeft: "0.5rem",
                }}
              >
                {t.title}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

---

Suggested in-class flow and mini exercises

You can structure the classroom activity as:

- Phase 1 (useState + basic UI)
  - Students implement TaskInput and display tasks in App.
- Phase 2 (useEffect)
  - Add localStorage sync and document title update.
- Phase 3 (useContext)
  - Add theme context and toggle across components.
- Phase 4 (useReducer)
  - Refactor tasks to use a reducer, add advanced actions.
- Phase 5 (Custom hooks)
  - Extract reusable logic into `useLocalStorageState` and optionally `useTasks`.

Short exercises

- Add filtering: show “All / Active / Completed” tasks using either local `useState` or reducer actions.
- Add a “createdAt” timestamp and show a small badge for tasks created in the last 5 minutes.
- Use `useEffect` with `setInterval` to update a “Clock” component in the header.

---

Common mistakes to highlight (discussion points)

You can briefly discuss these while students work:

- Updating state directly instead of using setters or returning new objects in reducers (mutating `state.tasks` instead of copying).
- Forgetting dependency arrays or using the wrong dependencies in `useEffect`, causing infinite loops or stale values.
- Using `useContext` without wrapping components in the corresponding provider, leading to null or default values.
- Making reducers non-pure (performing side effects inside `taskReducer` instead of in effects).
- Writing custom hooks that sometimes call hooks and sometimes do not, violating the Rules of Hooks (hooks must be called unconditionally at the top level).

---

Quick revision checklist for students

Students should be able to:

- Explain when to use `useState` vs `useReducer` for state.
- Implement `useEffect` for fetching, persistence, or subscriptions with correct cleanup.
- Create and consume a context with `useContext` to avoid prop drilling.
- Design a reducer with clear action types and pure state transitions.
- Extract repeated hook logic into a custom hook and reuse it across components.

This single activity lets them touch each hook in a realistic, cohesive mini-application while keeping the code size manageable and exam-aligned.

---

Last changed by: [your name]

Published: [date]
