import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/public/contact', formData)
      setStatus('Message sent successfully!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      setStatus('Error sending message. Please try again.')
    }
  }

  const contacts = [
    { icon: 'fas fa-envelope', title: 'Email', info: 'shaharyar.dev@email.com', link: 'mailto:shaharyar.dev@email.com' },
    { icon: 'fab fa-github', title: 'GitHub', info: 'github.com/Shaharyar826', link: 'https://github.com/Shaharyar826' },
    { icon: 'fab fa-instagram', title: 'Instagram', info: '@shaharyar_826', link: 'https://www.instagram.com/shaharyar_826/' }
  ]

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.h2>
        <div className="contact-content">
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">Send Message</button>
            {status && <p className="status-message">{status}</p>}
          </motion.form>
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {contacts.map((contact, index) => (
              <motion.a 
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
                whileHover={{ x: 10 }}
              >
                <i className={contact.icon}></i>
                <div>
                  <h3>{contact.title}</h3>
                  <p>{contact.info}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact