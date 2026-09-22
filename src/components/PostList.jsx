import { usePostsStore } from '../store/usePostsStore.js'
import PostCard from './PostCard.jsx'

export default function PostList() {
  const posts = usePostsStore((state) => state.posts)
  const status = usePostsStore((state) => state.status)
  const search = usePostsStore((state) => state.search)
  const setSearch = usePostsStore((state) => state.setSearch)
  const normalizedSearch = search.trim().toLowerCase()
  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.body}`.toLowerCase().includes(normalizedSearch),
  )

  return (
    <section aria-labelledby="library-title">
      <div className="list-toolbar">
        <div>
          <p className="eyebrow">Archivio</p>
          <h2 id="library-title">Tutti i post <span>{posts.length}</span></h2>
        </div>
        <label className="search-field" htmlFor="post-search">
          <span className="sr-only">Cerca nei post</span>
          <input
            id="post-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cerca..."
            type="search"
          />
        </label>
      </div>

      {status === 'loading' && (
        <div className="loading-grid" aria-label="Caricamento dei post">
          {Array.from({ length: 6 }, (_, index) => <div className="post-skeleton" key={index} />)}
        </div>
      )}
      {status === 'success' && filteredPosts.length === 0 && (
        <p className="state-message">Nessun post corrisponde alla ricerca.</p>
      )}
      <div className="post-grid">
        {filteredPosts.map((post) => <PostCard key={`${post.id}-${post.title}`} post={post} />)}
      </div>
    </section>
  )
}