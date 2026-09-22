export default function PostCard({ post }) {
  return (
    <article className={`post-card${post.isLocal ? ' post-card-local' : ''}`}>
      <div className="card-meta">
        <span>#{String(post.id).padStart(2, '0')}</span>
        {post.isLocal && <span className="local-label">Nuovo</span>}
      </div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  )
}