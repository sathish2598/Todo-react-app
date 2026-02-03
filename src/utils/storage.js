export function loadTodos(key) {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return []
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

export function saveTodos(key, todos) {
  try {
    localStorage.setItem(key, JSON.stringify(todos))
  } catch {
    // ignore
  }
}
