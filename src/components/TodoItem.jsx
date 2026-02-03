import { useState, useRef, useEffect } from 'react'

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(todo.text)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  function handleEditSubmit(e) {
    e.preventDefault()
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed)
    }
    setEditing(false)
    setEditValue(todo.text)
  }

  function handleEditKeyDown(e) {
    if (e.key === 'Escape') {
      setEditValue(todo.text)
      setEditing(false)
    }
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''} ${editing ? 'editing' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      />
      {editing ? (
        <form className="todo-edit-form" onSubmit={handleEditSubmit}>
          <input
            ref={inputRef}
            type="text"
            className="todo-edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
            aria-label="Edit todo"
          />
        </form>
      ) : (
        <>
          <span
            className="todo-text"
            onDoubleClick={() => setEditing(true)}
          >
            {todo.text}
          </span>
          <button
            type="button"
            className="todo-delete"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          >
            ×
          </button>
        </>
      )}
    </li>
  )
}
