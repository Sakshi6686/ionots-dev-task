const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  },
  password: {
    type: String,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  assignedProjects: [
    {
      projectId: Number,
      projectTitle: String,
      projectDescription: String,
      ProjectSkills: [String],
      status: { type: String, default: 'Not Started' },
      score: { type: Number, default: 0 },
      uploadedFile: { type: String, default: '' }, // File path for uploaded file
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
