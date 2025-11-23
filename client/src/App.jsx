import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Achievements from './components/Achievements'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading...</div>
      </div>
    )
  }
  
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />
}

const LoginRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-blue-400 text-xl">Loading...</div>
      </div>
    )
  }
  
  return isAuthenticated ? <Navigate to="/admin" replace /> : children
}

function AppContent() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin/login" element={
            <LoginRoute>
              <Login />
            </LoginRoute>
          } />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/" element={
            <>
              <Navbar />
              <Hero />
              <Skills />
              <Projects />
              <Achievements />
              <Contact />
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App