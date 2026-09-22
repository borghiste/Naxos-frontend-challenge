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
         
          <h1>Posts library</h1>
          
        </div>
        
      </header>

      <section className="workspace" aria-label="Posts workspace">
        <PostForm />
        <div className="posts-panel">
          {status === 'error' && (
            <div className="notice notice-error" role="alert">
              <strong>Unable to load posts</strong>
              <span>{error}</span>
              <button type="button" onClick={fetchPosts}>Load posts</button>
            </div>
          )}
          <PostList />
        </div>
      </section>
    </main>
  )
}