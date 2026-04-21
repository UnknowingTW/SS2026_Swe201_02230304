import React from 'react'
import { useTheme } from '../context/ThemeContext'

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button className="btn ghost" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export default ThemeToggleButton
