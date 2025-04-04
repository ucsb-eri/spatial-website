const { Schema, model } = require('mongoose');

const peopleSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: false,
    trim: true,
  },
  title: {
    type: [String],
    required: true,
    unique: false,
    trim: true,
  },
  image: {
    type: String, // will store this on locally in an uploads folder
    required: false,
    unique: false,
  },
  description: {
    type: String,
    required: true,
    minlength: [50, 'Description must be at least 50 characters'],
    maxlength: [5000, 'Description cannot exceed 500 characters'],
  },
  research: {
    type: String,
    required: false,
    minlength: [50, 'Description must be at least 50 characters'],
  },
  projects: {
    type: [String],
    required: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Leadership', 'Affliated Faculty', 'Staff', 'Graduate Student', 'Undergrad Student', 'Center Alumnus', 'Postdoc']
  },
  current: {
    type: Boolean,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: false,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  location: {
    type: String,
    required: false,
    unique: false,
    trim: true,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    match: [/^\+\d{1,2}-\d{3}-\d{3}-\d{4}$/, 'Must match the format xxx-xxx-xxxx']
  },
  gscholar: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    match: [
      /^(ftp|http|https):\/\/[^ "]+$/,
      'Must be a valid URL format (e.g., http://example.com)',
    ],
  },
  linkedin: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    match: [
      /^(ftp|http|https):\/\/[^ "]+$/,
      'Must be a valid URL format (e.g., http://example.com)',
    ],
  },
  x: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    match: [
      /^(ftp|http|https):\/\/[^ "]+$/,
      'Must be a valid URL format (e.g., http://example.com)',
    ],
  },
  github: {
    type: String,
    required: false,
    unique: false,
    trim: true,
    match: [
      /^(ftp|http|https):\/\/[^ "]+$/,
      'Must be a valid URL format (e.g., http://example.com)',
    ],
  },
  websiteUrl: {
    type: String,
    required: false,
    trim: true,
    match: [
      /^(ftp|http|https):\/\/[^ "]+$/,
      'Must be a valid URL format (e.g., http://example.com)',
    ],
  },
  websiteName: {
    type: String,
    required: false,
    trim: true
  },
  advisors: {
    type: [String],
    required: false,
    unique: false,
    trim: true
  }
});

const People = model('People', peopleSchema);

module.exports = People;
