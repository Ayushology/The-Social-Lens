import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
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
      await login(form)
      navigate(location.state?.from?.pathname || '/feed', { replace: true })
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to sign in with those details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page fade-up">
      <div className="auth-copy">
        <p className="eyebrow">AI caption studio</p>
        <h1>Turn quiet images into sharp little stories.</h1>
        <p>
          Sign in to generate captions, keep your archive, and build a private feed
          of image ideas.
        </p>
      </div>

      <form className="panel auth-form" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            name="password"
            onChange={handleChange}
            required
            type="password"
            value={form.password}
          />
        </label>

        {error ? <p className="form-error">{error}</p> : null}

        <button className="accent-button" disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>

        <p className="form-note">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </section>
  )
}

export default Login
