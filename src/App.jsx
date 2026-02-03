import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { loadTodos, saveTodos } from './utils/storage'

const STORAGE_KEY = 'todo-react-app'

export default function App() {
  const [todos, setTodos] = useState(() => loadTodos(STORAGE_KEY))

  useEffect(() => {
    saveTodos(STORAGE_KEY, todos)
  }, [todos])

  function addTodo(text) {
    if (!text.trim()) return
    setTodos((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text: text.trim(), completed: false },
    ])
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  function editTodo(id, newText) {
    if (!newText.trim()) return
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: newText.trim() } : t))
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Todo</h1>
        <p className="tagline">One list. No clutter.</p>
      </header>
      <TodoForm onSubmit={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
      />
    </div>
  )
}
