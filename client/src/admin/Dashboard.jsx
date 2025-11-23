import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import axios from 'axios'
import MessagesManager from './components/MessagesManager'
import ProjectsManager from './components/ProjectsManager'
import ContentManager from './components/ContentManager'
import ActivityLogs from './components/ActivityLogs'

const Dashboard = () => {
  const [stats, setStats] = useState({ messages: 0, projects: 0, unread: 0 })
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [messages, projects] = await Promise.all([
        axios.get('/api/messages', { withCredentials: true }),
        axios.get('/api/projects', { withCredentials: true })
      ])
      
      setStats({
        messages: messages.data.length,
        projects: projects.data.length,
        unread: messages.data.filter(m => m.status === 'unread').length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  const isActive = (path) => location.pathname === path || (path === '/admin' && location.pathname === '/admin/')

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0a0a0a', 
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#ffffff'
    }}>
      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        left: '0',
        top: '0',
        width: '260px',
        height: '100vh',
        backgroundColor: '#111111',
        borderRight: '1px solid #1f1f1f',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}>
        <div style={{ padding: '32px 24px 40px' }}>
          <h1 style={{ 
            fontSize: '20px',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0 0 4px 0',
            letterSpacing: '-0.025em'
          }}>
            Admin
          </h1>
          <p style={{ color: '#666666', fontSize: '14px', margin: 0 }}>Portfolio Dashboard</p>
        </div>

        <nav style={{ flex: 1, padding: '0 16px' }}>
          {[
            { path: '/admin', icon: '📊', label: 'Overview' },
            { path: '/admin/messages', icon: '💬', label: 'Messages', badge: stats.unread },
            { path: '/admin/projects', icon: '🚀', label: 'Projects' },
            { path: '/admin/content', icon: '✏️', label: 'Content' },
            { path: '/admin/activity', icon: '📈', label: 'Activity' }
          ].map(({ path, icon, label, badge }) => (
            <Link 
              key={path}
              to={path} 
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 16px',
                margin: '4px 0',
                borderRadius: '8px',
                textDecoration: 'none',
                color: isActive(path) ? '#ffffff' : '#888888',
                backgroundColor: isActive(path) ? '#1a1a1a' : 'transparent',
                border: isActive(path) ? '1px solid #2a2a2a' : '1px solid transparent',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                if (!isActive(path)) {
                  e.target.style.backgroundColor = '#161616'
                  e.target.style.color = '#cccccc'
                }
              }}
              onMouseOut={(e) => {
                if (!isActive(path)) {
                  e.target.style.backgroundColor = 'transparent'
                  e.target.style.color = '#888888'
                }
              }}
            >
              <span style={{ marginRight: '12px', fontSize: '16px' }}>{icon}</span>
              {label}
              {badge > 0 && (
                <span style={{ 
                  backgroundColor: '#ef4444', 
                  color: 'white', 
                  fontSize: '11px', 
                  fontWeight: '600',
                  padding: '2px 6px', 
                  borderRadius: '10px', 
                  marginLeft: 'auto',
                  minWidth: '18px',
                  textAlign: 'center'
                }}>
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              padding: '12px 16px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#666666',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              marginBottom: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#161616'
              e.target.style.color = '#888888'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'
              e.target.style.color = '#666666'
            }}
          >
            <span style={{ marginRight: '12px' }}>🌐</span>
            View Site
          </Link>
          
          <button 
            onClick={handleLogout} 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#ef4444',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1a0f0f'
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent'
            }}
          >
            <span style={{ marginRight: '12px' }}>🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '260px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '40px', animation: 'fadeIn 0.3s ease-out' }}>
              <div style={{ marginBottom: '40px' }}>
                <h1 style={{ 
                  fontSize: '32px', 
                  fontWeight: '700', 
                  color: '#ffffff', 
                  margin: '0 0 8px 0',
                  letterSpacing: '-0.025em'
                }}>
                  Dashboard
                </h1>
                <p style={{ color: '#888888', fontSize: '16px', margin: 0 }}>Welcome back! Here's your portfolio overview.</p>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '24px'
              }}>
                {[
                  { title: 'Total Messages', value: stats.messages, icon: '💬', color: '#3b82f6', desc: 'Contact submissions' },
                  { title: 'Unread Messages', value: stats.unread, icon: '🔔', color: '#ef4444', desc: 'Need attention' },
                  { title: 'Total Projects', value: stats.projects, icon: '🚀', color: '#22c55e', desc: 'Portfolio projects' }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    style={{ 
                      backgroundColor: '#111111',
                      border: '1px solid #1f1f1f',
                      borderRadius: '12px',
                      padding: '24px',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.borderColor = '#2a2a2a'
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.borderColor = '#1f1f1f'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#888888', margin: 0 }}>{stat.title}</h3>
                      <span style={{ fontSize: '20px' }}>{stat.icon}</span>
                    </div>
                    <p style={{ fontSize: '28px', fontWeight: '700', color: stat.color, margin: '0 0 4px 0' }}>{stat.value}</p>
                    <p style={{ color: '#666666', fontSize: '13px', margin: 0 }}>{stat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          } />
          <Route path="/messages" element={<MessagesManager />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/content" element={<ContentManager />} />
          <Route path="/activity" element={<ActivityLogs />} />
        </Routes>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Dashboard