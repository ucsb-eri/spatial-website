const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: false,
    unique: false,
    trim: true,
  },
  endDate: {
    type: Date,
    required: false,
    unique: false,
    trim: true,
  },
  summary: {
    type: String,
    required: true,
    minlength: [50, 'Description must be at least 50 characters'],
  },
  description: {
    type: String,
    required: true,
    minlength: [300, 'Description must be at least 300 characters'],
  },
  pis: {
    type: String,
    required: true,
  },
  image: {
    type: String, // will store this on locally in an uploads folder
    required: false,
    unique: false,
  },
  funder: {
    type: String,
    required: false,
    unique: false
  },
  funderLogo: {
    type: String, // will store this on locally in an uploads folder
    required: false,
    unique: false,
  },
  
});

const Projects = model('Projects', projectSchema);

module.exports = Projects;
