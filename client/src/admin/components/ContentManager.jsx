import { useState, useEffect } from 'react'
import axios from 'axios'

const ContentManager = () => {
  const [content, setContent] = useState({
    hero: { name: '', title: '', description: '' },
    about: { description: '', skills: [] },
    socialLinks: { github: '', instagram: '', email: '' }
  })
  const [loading, setLoading] = useState(false)
  const [skillInput, setSkillInput] = useState('')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await axios.get('/api/content', { withCredentials: true })
      setContent(response.data)
    } catch (error) {
      console.error('Error fetching content:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await axios.put('/api/content', content, { withCredentials: true })
      alert('Content updated successfully!')
    } catch (error) {
      console.error('Error updating content:', error)
      alert('Error updating content')
    } finally {
      setLoading(false)
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !content.about.skills.includes(skillInput.trim())) {
      setContent({
        ...content,
        about: {
          ...content.about,
          skills: [...content.about.skills, skillInput.trim()]
        }
      })
      setSkillInput('')
    }
  }

  const removeSkill = (index) => {
    setContent({
      ...content,
      about: {
        ...content.about,
        skills: content.about.skills.filter((_, i) => i !== index)
      }
    })
  }

  const inputStyle = {
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
  }

  const textareaStyle = {
    ...inputStyle,
    height: '80px',
    resize: 'vertical',
    fontFamily: 'inherit',
    lineHeight: '1.5'
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
          Content
        </h1>
        <p style={{ color: '#888888', fontSize: '16px', margin: 0 }}>Manage your portfolio content</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Hero Section */}
        <div style={{ 
          backgroundColor: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: '0 0 20px 0' 
          }}>
            Hero Section
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Name</label>
              <input
                type="text"
                value={content.hero.name}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, name: e.target.value }
                })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Title</label>
              <input
                type="text"
                value={content.hero.title}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, title: e.target.value }
                })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Description</label>
              <textarea
                value={content.hero.description}
                onChange={(e) => setContent({
                  ...content,
                  hero: { ...content.hero, description: e.target.value }
                })}
                style={textareaStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div style={{ 
          backgroundColor: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: '0 0 20px 0' 
          }}>
            About Section
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Description</label>
              <textarea
                value={content.about.description}
                onChange={(e) => setContent({
                  ...content,
                  about: { ...content.about, description: e.target.value }
                })}
                style={textareaStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Skills</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill"
                  style={{ ...inputStyle, flex: 1 }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
                >
                  Add
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {content.about.skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: '#cccccc',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '500',
                      border: '1px solid #2a2a2a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '16px',
                        lineHeight: '1',
                        padding: '0',
                        width: '16px',
                        height: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={(e) => e.target.style.color = '#dc2626'}
                      onMouseOut={(e) => e.target.style.color = '#ef4444'}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div style={{ 
          backgroundColor: '#111111',
          border: '1px solid #1f1f1f',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#ffffff', 
            margin: '0 0 20px 0' 
          }}>
            Social Links
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>GitHub URL</label>
              <input
                type="url"
                value={content.socialLinks.github}
                onChange={(e) => setContent({
                  ...content,
                  socialLinks: { ...content.socialLinks, github: e.target.value }
                })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Instagram URL</label>
              <input
                type="url"
                value={content.socialLinks.instagram}
                onChange={(e) => setContent({
                  ...content,
                  socialLinks: { ...content.socialLinks, instagram: e.target.value }
                })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Email</label>
              <input
                type="email"
                value={content.socialLinks.email}
                onChange={(e) => setContent({
                  ...content,
                  socialLinks: { ...content.socialLinks, email: e.target.value }
                })}
                style={inputStyle}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#1a1a1a' : '#3b82f6',
              color: loading ? '#666666' : '#ffffff',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '500',
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
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default ContentManager