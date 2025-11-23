import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Dashboard.css'

const Dashboard = () => {
  const [contacts, setContacts] = useState([])
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchContacts()
    fetchProjects()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contacts')
      setContacts(response.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects')
      setProjects(response.data)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const deleteContact = async (id) => {
    try {
      await axios.delete(`/api/contacts/${id}`)
      fetchContacts()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <a href="/" className="btn btn-secondary">Back to Portfolio</a>
      </div>

      <div className="dashboard-content">
        <motion.div 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Contact Messages ({contacts.length})</h2>
          <div className="contacts-list">
            {contacts.map((contact) => (
              <motion.div 
                key={contact._id || contact.id}
                className="contact-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p className="email">{contact.email}</p>
                  <p className="message">{contact.message}</p>
                  <span className="date">{new Date(contact.createdAt).toLocaleDateString()}</span>
                </div>
                <button 
                  onClick={() => deleteContact(contact._id || contact.id)}
                  className="delete-btn"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="dashboard-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2>Projects ({projects.length})</h2>
          <div className="projects-list">
            {projects.map((project) => (
              <div key={project._id || project.id} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard