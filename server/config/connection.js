const mongoose = require('mongoose');
require('dotenv').config()
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spatial-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');
  // Test query
  const People = mongoose.model('People'); // Adjust with your actual model
  People.findOne({}).then(doc => {
    console.log('Test document from MongoDB:', doc);
  }).catch(err => {
    console.error('Error fetching test document:', err);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

module.exports = mongoose.connection;
