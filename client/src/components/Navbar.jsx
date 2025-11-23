import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const smoothScroll = (e) => {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <div className="nav-logo">SA</div>
        <ul className="nav-menu">
          <li><a href="#home" onClick={smoothScroll}>Home</a></li>
          <li><a href="#skills" onClick={smoothScroll}>Skills</a></li>
          <li><a href="#projects" onClick={smoothScroll}>Projects</a></li>
          <li><a href="#achievements" onClick={smoothScroll}>Achievements</a></li>
          <li><a href="#contact" onClick={smoothScroll}>Contact</a></li>
        </ul>
      </div>
    </motion.nav>
  )
}

export default Navbar