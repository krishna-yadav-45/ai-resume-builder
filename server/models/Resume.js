const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
  },
  summary: String,
  experience: [{
    company: String,
    position: String,
    startDate: String,
    endDate: String,
    description: String,
  }],
  education: [{
    institution: String,
    degree: String,
    startDate: String,
    endDate: String,
    grade: String,
  }],
  skills: [String],
  projects: [{
    name: String,
    description: String,
    technologies: String,
    link: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
