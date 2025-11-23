const express = require('express');
const ActivityLog = require('../models/ActivityLog');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate('userId', 'email')
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;