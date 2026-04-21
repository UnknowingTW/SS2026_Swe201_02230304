import React, { useState } from 'react'

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('normal')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onAddTask({ id: Date.now(), title: title.trim(), priority })
    setTitle('')
    setPriority('normal')
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-row">
        <input className="task-input" type="text" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <select className="task-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-actions">
        <button className="btn primary" type="submit">Add</button>
        <button className="btn ghost" type="button" onClick={() => setTitle('')}>Clear</button>
      </div>

      <div className="preview">Preview: "{title || '(empty)'}" (priority: {priority})</div>
    </form>
  )
}

export default TaskInput
