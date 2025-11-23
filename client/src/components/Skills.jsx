import { motion } from 'framer-motion'
import './Skills.css'

const Skills = () => {
  const skills = [
    { icon: 'fab fa-react', title: 'MERN Stack', desc: 'MongoDB, Express, React, Node.js' },
    { icon: 'fab fa-python', title: 'Python + AI', desc: 'OpenCV, AI Models, Computer Vision' },
    { icon: 'fas fa-robot', title: 'n8n Automations', desc: 'Workflow automation and integration' },
    { icon: 'fas fa-chart-line', title: 'Data Science', desc: 'Analytics and machine learning' },
    { icon: 'fas fa-video', title: 'Video Editing', desc: 'CapCut and content creation' }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Skills & Technologies
        </motion.h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <i className={skill.icon}></i>
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills