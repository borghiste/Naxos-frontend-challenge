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
      setFeedback({ type: 'error', message: 'title and text are required ' })
      return
    }

    setIsSaving(true)
    setFeedback({ type: '', message: '' })

    try {
      await addPost({ title: cleanTitle, body: cleanBody })
      setTitle('')
      setBody('')
      setFeedback({ type: 'success', message: 'Post added to the library.' })
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error instanceof Error ? error.message : 'an unexpected error occurred.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <aside className="composer-panel">
      <div className="panel-heading">
        <p className="eyebrow">New Post</p>
        <h2>Scrivi un post</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="post-title">Title</label>
        <input
          id="post-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          disabled={isSaving}
        />
        <label htmlFor="post-body">Content</label>
        <textarea
          id="post-body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Text..."
          rows="6"
          disabled={isSaving}
        />
        <button className="primary-button" type="submit" disabled={isSaving}>
          {isSaving ? 'Submitting...' : 'Add Post'}
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