import { useState, useEffect } from 'react'
import axios from 'axios'

const MessagesManager = () => {
  const [messages, setMessages] = useState([])
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/api/messages', { withCredentials: true })
      setMessages(response.data)
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`/api/messages/${id}/status`, { status }, { withCredentials: true })
      fetchMessages()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const sendReply = async (id) => {
    if (!replyText.trim()) return
    
    setLoading(true)
    try {
      await axios.post(`/api/messages/${id}/reply`, { replyMessage: replyText }, { withCredentials: true })
      setReplyText('')
      setSelectedMessage(null)
      fetchMessages()
      alert('Reply sent successfully!')
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Error sending reply')
    } finally {
      setLoading(false)
    }
  }

  const deleteMessage = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return
    
    try {
      await axios.delete(`/api/messages/${id}`, { withCredentials: true })
      fetchMessages()
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const getStatusStyle = (status) => {
    switch (status) {
      case 'unread': return { backgroundColor: '#1a0f0f', color: '#ef4444', border: '1px solid #2a1a1a' }
      case 'read': return { backgroundColor: '#1a1a0f', color: '#eab308', border: '1px solid #2a2a1a' }
      case 'replied': return { backgroundColor: '#0f1a0f', color: '#22c55e', border: '1px solid #1a2a1a' }
      default: return { backgroundColor: '#1a1a1a', color: '#888888', border: '1px solid #2a2a2a' }
    }
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
          Messages
        </h1>
        <p style={{ color: '#888888', fontSize: '16px', margin: 0 }}>Manage contact form submissions</p>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.length === 0 ? (
          <div style={{
            backgroundColor: '#111111',
            border: '1px solid #1f1f1f',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666666', fontSize: '16px', margin: 0 }}>No messages found</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message._id} 
              style={{ 
                backgroundColor: '#111111', 
                border: '1px solid #1f1f1f',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#2a2a2a'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#1f1f1f'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', margin: '0 0 4px 0' }}>{message.name}</h3>
                  <p style={{ color: '#888888', fontSize: '14px', margin: '0 0 8px 0' }}>{message.email}</p>
                  <span style={{ 
                    display: 'inline-block', 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '12px', 
                    fontWeight: '500',
                    textTransform: 'capitalize',
                    ...getStatusStyle(message.status)
                  }}>
                    {message.status}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#666666' }}>
                  {new Date(message.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </div>
              </div>
              
              <p style={{ color: '#cccccc', marginBottom: '16px', lineHeight: '1.5' }}>{message.message}</p>
              
              {message.reply && (
                <div style={{ 
                  backgroundColor: '#0f0f0f', 
                  border: '1px solid #1a1a1a',
                  padding: '16px', 
                  borderRadius: '8px', 
                  marginBottom: '16px' 
                }}>
                  <h4 style={{ fontSize: '13px', fontWeight: '500', color: '#3b82f6', margin: '0 0 8px 0' }}>Your Reply:</h4>
                  <p style={{ color: '#cccccc', margin: '0 0 8px 0', lineHeight: '1.5' }}>{message.reply.message}</p>
                  <p style={{ fontSize: '12px', color: '#666666', margin: 0 }}>
                    Sent: {new Date(message.reply.sentAt).toLocaleString()}
                  </p>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {message.status === 'unread' && (
                  <button
                    onClick={() => updateStatus(message._id, 'read')}
                    style={{ 
                      backgroundColor: '#1a1a0f', 
                      color: '#eab308', 
                      border: '1px solid #2a2a1a',
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2a2a1a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a0f'}
                  >
                    Mark as Read
                  </button>
                )}
                
                {message.status !== 'replied' && (
                  <button
                    onClick={() => setSelectedMessage(message)}
                    style={{ 
                      backgroundColor: '#0f1a2a', 
                      color: '#3b82f6', 
                      border: '1px solid #1a2a3a',
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1a2a3a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#0f1a2a'}
                  >
                    Reply
                  </button>
                )}
                
                <button
                  onClick={() => deleteMessage(message._id)}
                  style={{ 
                    backgroundColor: '#1a0f0f', 
                    color: '#ef4444', 
                    border: '1px solid #2a1a1a',
                    padding: '6px 12px', 
                    borderRadius: '6px', 
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2a1a1a'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1a0f0f'}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedMessage && (
        <div style={{ 
          position: 'fixed', 
          inset: '0', 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '20px',
          zIndex: 1000
        }}>
          <div style={{ 
            backgroundColor: '#111111', 
            border: '1px solid #1f1f1f',
            borderRadius: '12px',
            padding: '24px', 
            width: '100%', 
            maxWidth: '500px',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#ffffff', 
              margin: '0 0 16px 0' 
            }}>
              Reply to {selectedMessage.name}
            </h3>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
              style={{ 
                width: '100%', 
                height: '120px', 
                padding: '12px 16px', 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #2a2a2a', 
                borderRadius: '8px', 
                color: '#ffffff', 
                fontSize: '14px',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                lineHeight: '1.5',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{ 
                  padding: '8px 16px', 
                  color: '#888888', 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#cccccc'}
                onMouseOut={(e) => e.target.style.color = '#888888'}
              >
                Cancel
              </button>
              <button
                onClick={() => sendReply(selectedMessage._id)}
                disabled={loading || !replyText.trim()}
                style={{ 
                  backgroundColor: loading || !replyText.trim() ? '#1a1a1a' : '#3b82f6', 
                  color: loading || !replyText.trim() ? '#666666' : '#ffffff', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  border: 'none', 
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: loading || !replyText.trim() ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  if (!loading && replyText.trim()) {
                    e.target.style.backgroundColor = '#2563eb'
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading && replyText.trim()) {
                    e.target.style.backgroundColor = '#3b82f6'
                  }
                }}
              >
                {loading ? 'Sending...' : 'Send Reply'}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default MessagesManager