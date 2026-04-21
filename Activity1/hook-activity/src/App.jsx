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
