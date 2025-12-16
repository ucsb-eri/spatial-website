const { Schema, model } = require('mongoose');

const carouselSlideSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  linkText: {
    type: String,
    required: false,
    trim: true
  },
  color: {
    type: String,
    required: false,
    default: 'white',
    trim: true
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
});

const CarouselSlide = model('CarouselSlide', carouselSlideSchema);

module.exports = CarouselSlide;

