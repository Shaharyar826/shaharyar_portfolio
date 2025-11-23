const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

// Models
const ContactMessage = require('./models/ContactMessage');
const Project = require('./models/Project');
const User = require('./models/User');

// Initialize admin user
const initializeAdmin = async () => {
  const adminExists = await User.findOne({ email: 'admin@shaharyar.dev' });
  if (!adminExists) {
    const admin = new User({
      email: 'admin@shaharyar.dev',
      password: 'admin123'
    });
    await admin.save();
    console.log('Admin user created: admin@shaharyar.dev / admin123');
  }
};

// Initialize default projects
const initializeProjects = async () => {
  const count = await Project.countDocuments();
  if (count === 0) {
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
    ];
    await Project.insertMany(defaultProjects);
  }
};

mongoose.connection.once('open', () => {
  initializeAdmin();
  initializeProjects();
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/content', require('./routes/content'));
app.use('/api/activity', require('./routes/activity'));

// Public routes for portfolio
app.get('/api/public/projects', async (req, res) => {
  try {
    const projects = await Project.find({ published: true }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/public/contact', async (req, res) => {
  try {
    const contact = new ContactMessage(req.body);
    await contact.save();
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));