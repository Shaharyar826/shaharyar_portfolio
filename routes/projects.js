const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const logActivity = require('../middleware/logger');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const processImage = async (buffer, filename) => {
  const mainPath = `uploads/${filename}`;
  const thumbPath = `uploads/thumb_${filename}`;
  
  await sharp(buffer)
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toFile(mainPath);
    
  await sharp(buffer)
    .resize(300, 200, { fit: 'cover' })
    .jpeg({ quality: 70 })
    .toFile(thumbPath);
    
  return { mainPath, thumbPath };
};

router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', auth, upload.single('image'), logActivity('Project created'), async (req, res) => {
  try {
    const projectData = req.body;
    
    if (req.file) {
      const filename = `${Date.now()}-${req.file.originalname}`;
      const { mainPath, thumbPath } = await processImage(req.file.buffer, filename);
      projectData.image = `/${mainPath}`;
      projectData.thumbnail = `/${thumbPath}`;
    }
    
    const project = new Project(projectData);
    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', auth, upload.single('image'), logActivity('Project updated'), async (req, res) => {
  try {
    const projectData = req.body;
    
    if (req.file) {
      const filename = `${Date.now()}-${req.file.originalname}`;
      const { mainPath, thumbPath } = await processImage(req.file.buffer, filename);
      projectData.image = `/${mainPath}`;
      projectData.thumbnail = `/${thumbPath}`;
    }
    
    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, logActivity('Project deleted'), async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;