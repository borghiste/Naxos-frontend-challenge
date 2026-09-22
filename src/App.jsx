import { useEffect } from 'react'
import PostForm from './components/PostForm.jsx'
import PostList from './components/PostList.jsx'
import { usePostsStore } from './store/usePostsStore.js'

export default function App() {
  const fetchPosts = usePostsStore((state) => state.fetchPosts)
  const status = usePostsStore((state) => state.status)
  const error = usePostsStore((state) => state.error)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return (
    <main className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Naxos / Content desk</p>
          <h1>Posts library</h1>
          <p className="intro">
            Una raccolta semplice per leggere, cercare e aggiungere contenuti.
          </p>
        </div>
        <div className="header-mark" aria-hidden="true">N</div>
      </header>

      <section className="workspace" aria-label="Gestione dei post">
        <PostForm />
        <div className="posts-panel">
          {status === 'error' && (
            <div className="notice notice-error" role="alert">
              <strong>Non riesco a caricare i post.</strong>
              <span>{error}</span>
              <button type="button" onClick={fetchPosts}>Riprova</button>
            </div>
          )}
          <PostList />
        </div>
      </section>
    </main>
  )
}