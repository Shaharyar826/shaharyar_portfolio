import { useState, useEffect } from 'react'
import axios from 'axios'

const ActivityLogs = () => {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    try {
      const response = await axios.get('/api/activity', { withCredentials: true })
      setLogs(response.data)
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  const getActionIcon = (action) => {
    if (action.includes('created')) return '✅'
    if (action.includes('updated')) return '✏️'
    if (action.includes('deleted')) return '🗑️'
    if (action.includes('replied')) return '📧'
    return '📝'
  }

  const getActionStyle = (action) => {
    if (action.includes('created')) return { color: '#22c55e', backgroundColor: '#0f1a0f', border: '1px solid #1a2a1a' }
    if (action.includes('updated')) return { color: '#eab308', backgroundColor: '#1a1a0f', border: '1px solid #2a2a1a' }
    if (action.includes('deleted')) return { color: '#ef4444', backgroundColor: '#1a0f0f', border: '1px solid #2a1a1a' }
    if (action.includes('replied')) return { color: '#3b82f6', backgroundColor: '#0f1a2a', border: '1px solid #1a2a3a' }
    return { color: '#888888', backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a' }
  }

  return (
    <div style={{ padding: '40px', animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          color: '#ffffff', 
          margin: '0 0 8px 0',
          letterSpacing: '-0.025em'
        }}>
          Activity
        </h1>
        <p style={{ color: '#888888', fontSize: '16px', margin: 0 }}>Recent system activities and changes</p>
      </div>
      
      <div style={{ 
        backgroundColor: '#111111',
        border: '1px solid #1f1f1f',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid #1f1f1f',
          backgroundColor: '#0f0f0f'
        }}>
          <h2 style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: 0 
          }}>
            Recent Activities
          </h2>
        </div>
        
        <div>
          {logs.length === 0 ? (
            <div style={{ 
              padding: '48px 24px', 
              textAlign: 'center' 
            }}>
              <p style={{ color: '#666666', fontSize: '16px', margin: 0 }}>No activity logs found</p>
            </div>
          ) : (
            logs.map((log, index) => (
              <div 
                key={log._id} 
                style={{ 
                  padding: '20px 24px', 
                  borderBottom: index < logs.length - 1 ? '1px solid #1a1a1a' : 'none',
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '16px',
                  transition: 'background-color 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0f0f0f'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ 
                  fontSize: '20px', 
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {getActionIcon(log.action)}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    marginBottom: '8px',
                    ...getActionStyle(log.action)
                  }}>
                    {log.action}
                  </div>
                  
                  {log.details && (
                    <p style={{ 
                      color: '#cccccc', 
                      fontSize: '14px', 
                      margin: '0 0 8px 0',
                      lineHeight: '1.4'
                    }}>
                      {log.details}
                    </p>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    <p style={{ 
                      fontSize: '12px', 
                      color: '#666666', 
                      margin: 0 
                    }}>
                      {new Date(log.createdAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#888888',
                      backgroundColor: '#1a1a1a',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      border: '1px solid #2a2a2a'
                    }}>
                      {log.userId?.email || 'System'}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
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

export default ActivityLogs