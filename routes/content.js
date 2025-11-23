const express = require('express');
const PortfolioContent = require('../models/PortfolioContent');
const auth = require('../middleware/auth');
const logActivity = require('../middleware/logger');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let content = await PortfolioContent.findOne();
    if (!content) {
      content = new PortfolioContent({
        hero: {
          name: 'Shaharyar Ali',
          title: 'AI & MERN Stack Developer',
          description: 'I build AI systems, full-stack applications, and automated content workflows.'
        },
        about: {
          description: 'Passionate developer with expertise in AI and full-stack development.',
          skills: ['MERN Stack', 'Python + AI', 'n8n Automations', 'Data Science', 'Video Editing']
        },
        socialLinks: {
          github: 'https://github.com/Shaharyar826',
          instagram: 'https://www.instagram.com/shaharyar_826/',
          email: 'shaharyar.dev@email.com'
        }
      });
      await content.save();
    }
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/', auth, logActivity('Portfolio content updated'), async (req, res) => {
  try {
    let content = await PortfolioContent.findOne();
    if (!content) {
      content = new PortfolioContent(req.body);
    } else {
      Object.assign(content, req.body);
    }
    await content.save();
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;