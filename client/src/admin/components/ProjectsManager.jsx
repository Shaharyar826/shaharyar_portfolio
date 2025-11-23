import { useState, useEffect } from 'react'
import axios from 'axios'

const ProjectsManager = () => {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    category: '',
    liveLink: '',
    githubLink: '',
    published: true
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects', { withCredentials: true })
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      Object.keys(formData).forEach(key => {
        if (key === 'technologies') {
          data.append(key, JSON.stringify(formData[key].split(',').map(t => t.trim())))
        } else {
          data.append(key, formData[key])
        }
      })
      
      if (imageFile) {
        data.append('image', imageFile)
      }

      if (editingProject) {
        await axios.put(`/api/projects/${editingProject._id}`, data, { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } else {
        await axios.post('/api/projects', data, { 
          withCredentials: true,
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      }

      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: '',
      category: '',
      liveLink: '',
      githubLink: '',
      published: true
    })
    setImageFile(null)
    setEditingProject(null)
    setShowForm(false)
  }

  const editProject = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(', '),
      category: project.category,
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      published: project.published
    })
    setEditingProject(project)
    setShowForm(true)
  }

  const deleteProject = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    try {
      await axios.delete(`/api/projects/${id}`, { withCredentials: true })
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const togglePublished = async (id, published) => {
    try {
      await axios.put(`/api/projects/${id}`, { published: !published }, { withCredentials: true })
      fetchProjects()
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  return (
    <div style={{ padding: '40px', animation: 'fadeIn 0.3s ease-out' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#ffffff', 
            margin: '0 0 8px 0',
            letterSpacing: '-0.025em'
          }}>
            Projects
          </h1>
          <p style={{ color: '#888888', fontSize: '16px', margin: 0 }}>Manage your portfolio projects</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{
            backgroundColor: '#3b82f6',
            color: '#ffffff',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
        >
          Add Project
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
        gap: '24px' 
      }}>
        {projects.length === 0 ? (
          <div style={{
            gridColumn: '1 / -1',
            backgroundColor: '#111111',
            border: '1px solid #1f1f1f',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center'
          }}>
            <p style={{ color: '#666666', fontSize: '16px', margin: 0 }}>No projects found</p>
          </div>
        ) : (
          projects.map((project) => (
            <div 
              key={project._id} 
              style={{ 
                backgroundColor: '#111111',
                border: '1px solid #1f1f1f',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
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
              {project.thumbnail && (
                <img 
                  src={`http://localhost:5000${project.thumbnail}`} 
                  alt={project.title} 
                  style={{ 
                    width: '100%', 
                    height: '160px', 
                    objectFit: 'cover',
                    backgroundColor: '#1a1a1a'
                  }} 
                />
              )}
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff', margin: 0 }}>{project.title}</h3>
                  <span style={{ 
                    padding: '4px 8px', 
                    borderRadius: '6px', 
                    fontSize: '11px', 
                    fontWeight: '500',
                    backgroundColor: project.published ? '#0f1a0f' : '#1a0f0f',
                    color: project.published ? '#22c55e' : '#ef4444',
                    border: project.published ? '1px solid #1a2a1a' : '1px solid #2a1a1a'
                  }}>
                    {project.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                
                <p style={{ color: '#888888', fontSize: '14px', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                  {project.description.length > 80 ? project.description.substring(0, 80) + '...' : project.description}
                </p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        backgroundColor: '#1a1a1a', 
                        color: '#cccccc', 
                        padding: '4px 8px', 
                        borderRadius: '6px', 
                        fontSize: '11px',
                        fontWeight: '500',
                        border: '1px solid #2a2a2a'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span style={{ 
                      color: '#666666', 
                      fontSize: '11px',
                      padding: '4px 8px'
                    }}>
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>
                
                {project.category && (
                  <p style={{ fontSize: '12px', color: '#666666', margin: '0 0 16px 0' }}>
                    Category: {project.category}
                  </p>
                )}
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => editProject(project)}
                    style={{ 
                      backgroundColor: '#1a1a0f', 
                      color: '#eab308', 
                      border: '1px solid #2a2a1a',
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2a2a1a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1a1a0f'}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => togglePublished(project._id, project.published)}
                    style={{ 
                      backgroundColor: '#0f1a2a', 
                      color: '#3b82f6', 
                      border: '1px solid #1a2a3a',
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1a2a3a'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#0f1a2a'}
                  >
                    {project.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <button
                    onClick={() => deleteProject(project._id)}
                    style={{ 
                      backgroundColor: '#1a0f0f', 
                      color: '#ef4444', 
                      border: '1px solid #2a1a1a',
                      padding: '6px 12px', 
                      borderRadius: '6px', 
                      fontSize: '12px',
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
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div style={{ 
          position: 'fixed', 
          inset: '0', 
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '20px',
          zIndex: 1000,
          overflowY: 'auto'
        }}>
          <div style={{ 
            backgroundColor: '#111111', 
            border: '1px solid #1f1f1f',
            borderRadius: '12px',
            padding: '24px', 
            width: '100%', 
            maxWidth: '600px',
            maxHeight: '90vh',
            overflowY: 'auto',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            <h3 style={{ 
              fontSize: '20px', 
              fontWeight: '600', 
              color: '#ffffff', 
              margin: '0 0 24px 0' 
            }}>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  style={{
                    width: '100%',
                    height: '80px',
                    padding: '12px 16px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                  onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  required
                />
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Technologies</label>
                  <input
                    type="text"
                    value={formData.technologies}
                    onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                    placeholder="React, Node.js, MongoDB"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Live Link</label>
                  <input
                    type="url"
                    value={formData.liveLink}
                    onChange={(e) => setFormData({...formData, liveLink: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>GitHub Link</label>
                  <input
                    type="url"
                    value={formData.githubLink}
                    onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #2a2a2a',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                  />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#cccccc', marginBottom: '8px' }}>Project Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    backgroundColor: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    color: '#ffffff',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  style={{ width: '16px', height: '16px' }}
                />
                <label style={{ fontSize: '14px', color: '#cccccc' }}>Published</label>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ 
                    padding: '10px 20px', 
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
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#1a1a1a' : '#3b82f6',
                    color: loading ? '#666666' : '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '6px',
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
                  {loading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                </button>
              </div>
            </form>
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

export default ProjectsManager