export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay open" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="modal confirm-modal">
        <div className="panel-header">
          <h2>Delete Entry?</h2>
        </div>
        <p className="confirm-message">{message || "This can't be undone. Are you sure?"}</p>
        <div className="form-actions">
          <button className="pixel-btn pixel-btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="pixel-btn pixel-btn-danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  )
}
