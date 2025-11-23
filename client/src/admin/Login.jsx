import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await login(formData)
    if (result.success) {
      navigate('/admin')
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#111111',
        border: '1px solid #1f1f1f',
        padding: '40px',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 8px 0',
            letterSpacing: '-0.025em'
          }}>
            Welcome Back
          </h1>
          <p style={{ color: '#666666', fontSize: '14px', margin: 0 }}>Sign in to your admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#cccccc', 
              marginBottom: '8px' 
            }}>
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              fontSize: '14px', 
              fontWeight: '500', 
              color: '#cccccc', 
              marginBottom: '8px' 
            }}>
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div style={{ 
              color: '#ef4444', 
              fontSize: '14px',
              padding: '12px 16px',
              backgroundColor: '#1a0f0f',
              border: '1px solid #2a1a1a',
              borderRadius: '8px'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#1a1a1a' : '#3b82f6',
              color: loading ? '#666666' : '#ffffff',
              padding: '12px 16px',
              borderRadius: '8px',
              fontWeight: '500',
              fontSize: '14px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#2563eb'
              }
            }}
            onMouseOut={(e) => {
              if (!loading) {
                e.target.style.backgroundColor = '#3b82f6'
              }
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          backgroundColor: '#0f0f0f', 
          border: '1px solid #1a1a1a',
          borderRadius: '8px',
          textAlign: 'center' 
        }}>
          <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 4px 0' }}>Demo Credentials:</p>
          <p style={{ fontSize: '13px', color: '#888888', margin: 0, fontFamily: 'monospace' }}>
            admin@shaharyar.dev / admin123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login