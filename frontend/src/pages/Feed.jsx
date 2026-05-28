import { useEffect, useState } from 'react'
import client from '../api/client'

function Feed() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data } = await client.get('/posts')
        setPosts(Array.isArray(data) ? data : data.posts || [])
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load your feed.')
      } finally {
        setIsLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <section className="workspace-page fade-up">
      <div className="section-heading">
        <p className="eyebrow">Feed</p>
        <h1>Your caption archive, arranged for inspection.</h1>
      </div>

      {isLoading ? <p className="status-text">Loading posts...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      {!isLoading && !error && posts.length === 0 ? (
        <div className="panel empty-state">
          <p>No posts yet. Create your first AI-captioned image.</p>
        </div>
      ) : null}

      <div className="post-grid">
        {posts.map((post, index) => (
          <article
            className="post-card"
            key={post._id}
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <img src={post.imageUrl} alt={post.caption} />
            <div className="post-card-body">
              <p>{post.caption}</p>
              <time dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString()}
              </time>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Feed
