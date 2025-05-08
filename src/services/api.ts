import i18n from '@/i18n/i18n'
import axios from 'axios'
import { parseCookies } from 'nookies'

if (!process.env.NEXT_PUBLIC_BACK_END_URL) {
  console.warn('BACK_END_URL environment variable is not set')
}
// Create axios instance with base URL from environment variables
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',

    // Lang: i18n.language,
  },
  withCredentials: true,
})

// i18n.on('languageChanged', (lng) => {
//   api.defaults.headers['lang'] = lng
// })

// Request interceptor to add auth token to headers
api.interceptors.request.use((config) => {
  const { 'auth.token': token } = parseCookies()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle HTTP errors
      switch (error.response.status) {
        case 401:
          // Handle unauthorized access
          break
        case 403:
          // Handle forbidden access
          break
        case 404:
          // Handle not found errors
          break
        case 500:
          // Handle server errors
          break
        default:
          // Handle other errors
          break
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request)
    } else {
      // Something happened in setting up the request
      console.error('Request error:', error.message)
    }

    return Promise.reject(error)
  },
)

export default api
