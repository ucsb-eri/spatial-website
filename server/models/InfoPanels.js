const { Schema, model } = require('mongoose');

const accordionContent = new Schema({
  
})

const accordionItemSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  // other fields as necessary
});

const AccordionItem = mongoose.model('AccordionItem', accordionItemSchema);

const infoPanelSchema = new Schema({
  location: {
    type: String,
    required: true,
    enum: ['about', 'events', 'opportunities'],
  },
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
  },
  image: {
    type: String,
    required: false
  },
  accordion: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AccordionItem',
  }]
  
});

const InfoPanels = model('InfoPanels', infoPanelSchema);

module.exports = InfoPanels;
