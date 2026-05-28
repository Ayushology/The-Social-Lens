import { useMemo, useState } from 'react'
import client, { AUTH_STORAGE_KEY } from '../api/client'
import { AuthContext } from './authContextObject'

function getStoredAuth() {
  return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}')
}

function storeAuth(payload) {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload))
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getStoredAuth)

  const register = async (formData) => {
    const { data } = await client.post('/auth/register', formData)
    const nextAuth = { user: data.user, token: data.token }
    storeAuth(nextAuth)
    setAuth(nextAuth)
    return data
  }

  const login = async (credentials) => {
    const { data } = await client.post('/auth/login', credentials)
    const nextAuth = { user: data.user, token: data.token }
    storeAuth(nextAuth)
    setAuth(nextAuth)
    return data
  }

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setAuth({})
  }

  const value = useMemo(
    () => ({
      user: auth.user || null,
      token: auth.token || null,
      isLoggedIn: Boolean(auth.token),
      register,
      login,
      logout,
    }),
    [auth],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
