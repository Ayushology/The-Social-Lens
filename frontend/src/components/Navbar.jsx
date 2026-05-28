import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <Link className="brand" to={isLoggedIn ? '/feed' : '/login'}>
        Caption Noir
      </Link>

      <nav className="nav-links" aria-label="Primary navigation">
        {isLoggedIn ? (
          <>
            <NavLink to="/feed">Feed</NavLink>
            <NavLink to="/create">Create</NavLink>
            <span className="user-chip">{user?.name || 'Creator'}</span>
            <button className="ghost-button" type="button" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Link className="accent-button small" to="/register">
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navbar
