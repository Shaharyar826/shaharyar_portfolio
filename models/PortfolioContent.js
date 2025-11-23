const mongoose = require('mongoose');

const portfolioContentSchema = new mongoose.Schema({
  hero: {
    name: String,
    title: String,
    description: String
  },
  about: {
    description: String,
    skills: [String]
  },
  socialLinks: {
    github: String,
    instagram: String,
    email: String
  }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);