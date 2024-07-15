const mongoose = require('mongoose');
require('dotenv').config()


let mongoURI;

if (process.env.NODE_ENV === 'production') {
  console.log("mongo uri")
  console.log(process.env.MONGODB_URI)
  console.log(process.env.MONGODB_URI_PROD)
    mongoURI = process.env.MONGODB_URI;
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