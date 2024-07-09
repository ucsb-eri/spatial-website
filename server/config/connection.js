const mongoose = require('mongoose');
require('dotenv').config()

let mongoURI;

if (process.env.NODE_ENV === 'production') {
    mongoURI = process.env.MONGODB_URI_PROD;
} else {
    mongoURI = 'mongodb://127.0.0.1:27017/spatial-website';
}

mongoose.connect(
   mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
