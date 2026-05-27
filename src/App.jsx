import { useState, useCallback, useRef } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import Starfield from './components/Starfield.jsx'
import Header from './components/Header.jsx'
import CalendarPanel from './components/CalendarPanel.jsx'
import TimelinePanel from './components/TimelinePanel.jsx'
import EntryModal from './components/EntryModal.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'
import Toast from './components/Toast.jsx'

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function formatDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

let toastId = 0

export default function App() {
  const [entries, setEntries] = useLocalStorage('pixellog_entries', [])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewDate, setViewDate] = useState(new Date())
  const [searchQuery, setSearchQuery] = useState('')
  const [tagFilter, setTagFilter] = useState('')
  const [toasts, setToasts] = useState([])
  const [editingEntry, setEditingEntry] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const touchStartX = useRef(0)

  const showToast = useCallback((message, type = 'success') => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addEntry = useCallback(({ title, description, tags }) => {
    setEntries((prev) => [
      ...prev,
      {
        id: generateId(),
        date: formatDateKey(selectedDate),
        title,
        description,
        tags: tags.filter(Boolean),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
    ])
    showToast('Entry saved!')
  }, [selectedDate, setEntries, showToast])

  const updateEntry = useCallback(({ id, title, description, tags }) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === id
          ? { ...e, title, description, tags: tags.filter(Boolean), updatedAt: Date.now() }
          : e
      )
    )
    showToast('Entry updated!')
  }, [setEntries, showToast])

  const deleteEntry = useCallback((id) => {
    setEntries((prev) => prev.filter((e) => e.id !== id))
    showToast('Entry deleted.')
    setDeletingId(null)
  }, [setEntries, showToast])

  const handleSave = useCallback((data) => {
    if (data.id) updateEntry(data)
    else addEntry(data)
    setShowModal(false)
    setEditingEntry(null)
  }, [addEntry, updateEntry])

  const openNewModal = useCallback(() => {
    setEditingEntry(null)
    setShowModal(true)
  }, [])

  const openEditModal = useCallback((entry) => {
    setEditingEntry(entry)
    setShowModal(true)
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setEditingEntry(null)
  }, [])

  const goToPrevMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))
  }, [])

  const goToNextMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))
  }, [])

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.changedTouches[0].screenX
  }, [])

  const handleTouchEnd = useCallback((e) => {
    const diff = touchStartX.current - e.changedTouches[0].screenX
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextMonth()
      else goToPrevMonth()
    }
  }, [goToPrevMonth, goToNextMonth])

  return (
    <>
      <Starfield />
      <Header entries={entries} />

      <main className="container">
        <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <CalendarPanel
            entries={entries}
            selectedDate={selectedDate}
            viewDate={viewDate}
            onSelectDate={setSelectedDate}
            onPrevMonth={goToPrevMonth}
            onNextMonth={goToNextMonth}
          />
        </div>

        <TimelinePanel
          entries={entries}
          selectedDate={selectedDate}
          searchQuery={searchQuery}
          tagFilter={tagFilter}
          onSearchChange={setSearchQuery}
          onTagFilterChange={setTagFilter}
          onAddEntry={openNewModal}
          onEditEntry={openEditModal}
          onDeleteEntry={setDeletingId}
        />
      </main>

      <EntryModal
        isOpen={showModal}
        entry={editingEntry}
        onSave={handleSave}
        onClose={closeModal}
      />

      <ConfirmModal
        isOpen={deletingId !== null}
        message="This can't be undone. Are you sure?"
        onConfirm={() => deleteEntry(deletingId)}
        onCancel={() => setDeletingId(null)}
      />

      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  )
}
