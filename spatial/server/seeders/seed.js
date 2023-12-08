const db = require('../config/connection');
const { People, Projects, AdminProfile } = require('../models');
const peopleSeeds = require('./peopleSeeds.json');

db.once('open', async () => {

  try {
    await People.deleteMany({});
    await People.collection.drop();
    await People.create(peopleSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
