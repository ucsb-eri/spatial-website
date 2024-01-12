const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI || process.env.LOCAL_MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
