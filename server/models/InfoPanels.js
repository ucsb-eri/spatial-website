const { Schema, model } = require('mongoose');

// Image data schema with optional label
const imageDataSchema = new Schema({
  url: { type: String, required: true },
  label: { type: String, required: false, default: '' }
}, { _id: false }); // _id: false because we don't need separate IDs for embedded images

const infoContentSchema = new Schema({
  subtitle: { type: String, required: false},
  description: { type: String, required: true},
  image: [imageDataSchema] // Array of image objects with url and label
})

const InfoContent = model('InfoContent', infoContentSchema);

const accordionItemSchema = new Schema({
  title: { type: String, required: true },
  content: [{
      type: Schema.Types.ObjectId,
      ref: 'InfoContent',
    }],
    taborder: {
      type: Number,
      required: true,
      unique: false,
      trim: true
    },
    accordionOrder: {
      type: Number,
      required: true,
      unique: false,
      trim: true
    },
});

const AccordionItem = model('AccordionItem', accordionItemSchema);

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
  content: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'InfoContent'
  }],
  accordion: [{
    type: Schema.Types.ObjectId,
    ref: 'AccordionItem',
  }]
  
});

const InfoPanels = model('InfoPanels', infoPanelSchema);

module.exports = { InfoPanels, AccordionItem, InfoContent };
