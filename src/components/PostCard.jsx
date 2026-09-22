export default function PostCard({ post }) {
  return (
    <article className={`post-card${post.isLocal ? ' post-card-local' : ''}`}>
      <div className="card-meta">
        
      
      </div>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </article>
  )
}