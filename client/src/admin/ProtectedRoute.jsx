import { useState, useEffect } from 'react'
import axios from 'axios'

const ProtectedRoute = ({ children, setIsAuthenticated }) => {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      await axios.get('/api/auth/me', { withCredentials: true })
      setAuthenticated(true)
      setIsAuthenticated(true)
    } catch (error) {
      setAuthenticated(false)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-primary text-xl">Loading...</div>
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-gray-400">Please login to access the admin dashboard.</p>
        </div>
      </div>
    )
  }

  return children
}

export default ProtectedRoute