import { useEffect } from 'react'

export default function Toast({ toasts, onRemove }) {
  if (!toasts.length) return null

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(toast.id), 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onRemove])

  return (
    <div
      className={`toast ${toast.type === 'error' ? 'error' : ''}`}
      onClick={() => onRemove(toast.id)}
    >
      {toast.message}
    </div>
  )
}
