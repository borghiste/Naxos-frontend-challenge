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
        
          <h2 id="library-title">Posts</h2>
        </div>
        <label className="search-field" htmlFor="post-search">
          <span className="sr-only">Search for a post</span>
          <input
            id="post-search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            type="search"
          />
        </label>
      </div>

      {status === 'loading' && (
        <div className="loading-grid" aria-label="Loading posts">
          {Array.from({ length: 6 }, (_, index) => <div className="post-skeleton" key={index} />)}
        </div>
      )}
      {status === 'success' && filteredPosts.length === 0 && (
        <p className="state-message">0 posts found</p>
      )}
      <div className="post-grid">
        {filteredPosts.map((post) => <PostCard key={`${post.id}-${post.title}`} post={post} />)}
      </div>
    </section>
  )
}