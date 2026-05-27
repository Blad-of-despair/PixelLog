import { useEffect, useRef } from 'react'

export default function EntryModal({ isOpen, entry, onSave, onClose }) {
  const titleRef = useRef(null)
  const id = entry?.id || ''

  useEffect(() => {
    if (isOpen && titleRef.current) {
      setTimeout(() => titleRef.current.focus(), 120)
    }
  }, [isOpen])

  if (!isOpen) return null

  function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const title = data.get('title')?.toString().trim()
    const description = data.get('description')?.toString().trim()
    const tags = data.get('tags')?.toString().split(',').map((s) => s.trim()).filter(Boolean)
    if (!title) return
    onSave({ id, title, description, tags })
    form.reset()
  }

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="panel-header">
          <h2 id="modalTitle">{entry ? 'Edit Entry' : 'New Entry'}</h2>
          <button className="pixel-btn pixel-btn-sm modal-close" onClick={onClose}>&times;</button>
        </div>
        <form onSubmit={handleSubmit} onReset={onClose}>
          <label>
            Title
            <input
              ref={titleRef}
              type="text"
              name="title"
              className="pixel-input"
              defaultValue={entry?.title || ''}
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              className="pixel-input pixel-textarea"
              rows="4"
              defaultValue={entry?.description || ''}
            />
          </label>
          <label>
            Tags (comma separated)
            <input
              type="text"
              name="tags"
              className="pixel-input"
              placeholder="e.g. android, webapp, config"
              defaultValue={entry?.tags?.join(', ') || ''}
            />
          </label>
          <div className="form-actions">
            <button type="reset" className="pixel-btn pixel-btn-secondary">Cancel</button>
            <button type="submit" className="pixel-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}
