import axios from 'axios'

const AUTH_STORAGE_KEY = 'captiongen_auth'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

client.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) || '{}')

  if (auth.token) {
    config.headers.Authorization = `Bearer ${auth.token}`
  }

  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY)

      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    }

    return Promise.reject(error)
  },
)

export { AUTH_STORAGE_KEY }
export default client
