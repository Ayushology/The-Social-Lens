import { useRef, useState } from 'react'
import client from '../api/client'

function Create() {
  const fileInputRef = useRef(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const selectFile = (file) => {
    if (!file) return

    setSelectedFile(file)
    setPost(null)
    setError('')
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    selectFile(event.dataTransfer.files?.[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!selectedFile) {
      setError('Choose an image before generating a caption.')
      return
    }

    const formData = new FormData()
    formData.append('image', selectedFile)

    setIsGenerating(true)
    setError('')

    try {
      const { data } = await client.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setPost(data)
    } catch (err) {
      setError(err.response?.data?.message || 'Caption generation failed.')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <section className="workspace-page fade-up">
      <div className="section-heading">
        <p className="eyebrow">Create</p>
        <h1>Upload the frame. Let the model find the line.</h1>
      </div>

      <div className="create-layout">
        <form className="panel upload-panel" onSubmit={handleSubmit}>
          <button
            className={`drop-zone ${isDragging ? 'is-dragging' : ''}`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}
            type="button"
          >
            <span>{selectedFile ? selectedFile.name : 'Drop image here'}</span>
            <small>PNG, JPG, or WEBP via multipart/form-data</small>
          </button>

          <input
            accept="image/*"
            hidden
            onChange={(event) => selectFile(event.target.files?.[0])}
            ref={fileInputRef}
            type="file"
          />

          {previewUrl ? (
            <img className="image-preview" src={previewUrl} alt="Selected upload preview" />
          ) : null}

          {error ? <p className="form-error">{error}</p> : null}

          <button className="accent-button" disabled={isGenerating} type="submit">
            {isGenerating ? 'Generating caption...' : 'Generate Caption'}
          </button>
        </form>

        <article className="panel result-panel">
          {isGenerating ? (
            <div className="generating-state">
              <div className="pulse-line" />
              <p>AI is reading the image and drafting a caption...</p>
            </div>
          ) : post ? (
            <>
              <img src={post.imageUrl} alt={post.caption} />
              <div>
                <p className="caption-text">{post.caption}</p>
                <time dateTime={post.createdAt}>
                  {new Date(post.createdAt).toLocaleString()}
                </time>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <p>Your generated post will appear here.</p>
            </div>
          )}
        </article>
      </div>
    </section>
  )
}

export default Create
