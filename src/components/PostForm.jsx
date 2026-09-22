import { useState } from 'react'
import { usePostsStore } from '../store/usePostsStore.js'

export default function PostForm() {
  const addPost = usePostsStore((state) => state.addPost)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [feedback, setFeedback] = useState({ type: '', message: '' })
  const [isSaving, setIsSaving] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const cleanTitle = title.trim()
    const cleanBody = body.trim()

    if (!cleanTitle || !cleanBody) {
      setFeedback({ type: 'error', message: 'Inserisci sia un titolo sia il contenuto.' })
      return
    }

    setIsSaving(true)
    setFeedback({ type: '', message: '' })

    try {
      await addPost({ title: cleanTitle, body: cleanBody })
      setTitle('')
      setBody('')
      setFeedback({ type: 'success', message: 'Post aggiunto alla raccolta.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'Impossibile aggiungere il post.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <aside className="composer-panel">
      <div className="panel-heading">
        <p className="eyebrow">Nuovo contenuto</p>
        <h2>Scrivi un post</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="post-title">Titolo</label>
        <input
          id="post-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Un titolo chiaro"
          disabled={isSaving}
        />
        <label htmlFor="post-body">Contenuto</label>
        <textarea
          id="post-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Cosa vuoi raccontare?"
          rows="6"
          disabled={isSaving}
        />
        <button className="primary-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Salvataggio...' : 'Pubblica post'}
        </button>
        {feedback.message && (
          <p className={`form-feedback ${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
            {feedback.message}
          </p>
        )}
      </form>
    </aside>
  )
}