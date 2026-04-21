import { useReducer, useEffect } from 'react'
import { taskReducer, initialTaskState } from '../reducers/taskReducer'

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState)

  useEffect(() => {
    const stored = localStorage.getItem('tasks')
    if (stored) dispatch({ type: 'LOAD_FROM_STORAGE', tasks: JSON.parse(stored) })
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  return { tasks: state.tasks, dispatch }
}
