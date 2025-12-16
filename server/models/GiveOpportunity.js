const { Schema, model } = require('mongoose');

const giveOpportunitySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  imageDescription: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
    default: 0,
  },
});

const GiveOpportunity = model('GiveOpportunity', giveOpportunitySchema);

module.exports = GiveOpportunity;


