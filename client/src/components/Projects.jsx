import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Projects.css'

const Projects = () => {
  const [projects, setProjects] = useState([])

  const defaultProjects = [
    {
      title: 'School Management System',
      description: 'Complete school management solution with student, teacher, and admin portals.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      category: 'Full Stack'
    },
    {
      title: 'Fee Management System',
      description: 'Automated fee collection system with receipt generation and payment tracking.',
      technologies: ['MERN', 'PDF Generation'],
      category: 'Full Stack'
    },
    {
      title: 'King Thimble AI',
      description: 'AI-powered gem detection system using computer vision and machine learning.',
      technologies: ['Python', 'OpenCV', 'AI Models'],
      category: 'Computer Vision'
    },
    {
      title: 'YouTube Shorts Automation',
      description: 'Automated content creation system using n8n workflows and Gemini AI.',
      technologies: ['n8n', 'Gemini AI', 'Automation'],
      category: 'Automation'
    },
    {
      title: 'Learning Management System',
      description: 'Comprehensive LMS with course management, assessments, and progress tracking.',
      technologies: ['MERN Stack', 'Real-time'],
      category: 'Full Stack'
    }
  ]

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/public/projects')
        setProjects(response.data.length > 0 ? response.data : defaultProjects)
      } catch (error) {
        setProjects(defaultProjects)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-tag">{project.category}</span>
              </div>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.technologies.map((tech, i) => (
                  <span key={i}>{tech}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects