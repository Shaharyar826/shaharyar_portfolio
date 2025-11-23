import { motion } from 'framer-motion'
import './Achievements.css'

const Achievements = () => {
  const achievements = [
    { icon: '🥇', title: 'Gold Medalist', desc: 'Access Program' },
    { icon: '🏆', title: '1st Position', desc: 'Mathematics Olympiad' },
    { icon: '🎨', title: '1st Position', desc: 'Sindh Art Competition' },
    { icon: '🥋', title: '2nd Position', desc: 'Taekwondo' },
    { icon: '🎤', title: 'Event Host', desc: 'Multiple Academic Events' }
  ]

  return (
    <section id="achievements" className="achievements">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              className="achievement-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <h3>{achievement.title}</h3>
              <p>{achievement.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Achievements