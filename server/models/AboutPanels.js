const { Schema, model } = require('mongoose');

const aboutPanelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tabname: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  taborder: {
    type: Number,
    required: true,
    unique: false,
    trim: true
  },
  description: {
    type: String,
    required: true,
    minlength: [50, 'Description must be at least 50 characters'],
  }
  
});

const AboutPanels = model('AboutPanels', aboutPanelSchema);

module.exports = AboutPanels;
