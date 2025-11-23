const express = require('express');
const nodemailer = require('nodemailer');
const ContactMessage = require('../models/ContactMessage');
const auth = require('../middleware/auth');
const logActivity = require('../middleware/logger');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id/status', auth, logActivity('Message status updated'), async (req, res) => {
  try {
    const { status } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/reply', auth, logActivity('Message replied'), async (req, res) => {
  try {
    const { replyMessage } = req.body;
    const message = await ContactMessage.findById(req.params.id);
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: message.email,
      subject: 'Reply from Shaharyar Ali',
      text: replyMessage
    });

    message.reply = { message: replyMessage, sentAt: new Date() };
    message.status = 'replied';
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', auth, logActivity('Message deleted'), async (req, res) => {
  try {
    await ContactMessage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;