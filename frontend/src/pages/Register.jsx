import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await register(form)
      navigate('/feed', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to create your account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page fade-up">
      <div className="auth-copy">
        <p className="eyebrow">Private caption lab</p>
        <h1>Start with an image. Leave with a voice.</h1>
        <p>
          Register once, then upload images and let the backend turn them into
          polished AI-generated captions.
        </p>
      </div>

      <form className="panel auth-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            autoComplete="name"
            name="name"
            onChange={handleChange}
            required
            type="text"
            value={form.name}
          />
        </label>

        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={form.email}
          />
        </label>

        <label>
          Password
          <input
            autoComplete="new-password"
            minLength="6"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={form.password}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="accent-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Creating...' : 'Register'}
        </button>

        <p className="form-note">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
