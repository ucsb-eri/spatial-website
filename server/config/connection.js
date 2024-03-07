const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/spatial-website', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB Connected');

  const People = mongoose.model('people'); // Adjust with your actual model

  // Query for a specific person using their _id
  const personId = '65ce5bcf248484380d088ba4'; // Replace this with the _id of the person you want to query
  People.findOne({ _id: personId }).then(person => {
    if (person) {
      console.log('Person found:', person);
    } else {
      console.log('Person not found.');
    }
  }).catch(err => {
    console.error('Error fetching person:', err);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
