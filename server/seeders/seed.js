const db = require('../config/connection');
const { People, Projects, AdminProfile } = require('../models');
const peopleSeeds = require('./peopleSeeds.json');
// const adminSeeds = require('./adminSeed.json')

db.once('open', async () => {

  try {
    await People.deleteMany({});
    await People.collection.drop();
    await People.create(peopleSeeds);


    console.log('all done!');
  } catch (err) {
    throw err;
  }

  // try {
  //   await AdminProfile.deleteMany({});
  //   await AdminProfile.collection.drop();
  //   await AdminProfile.create(adminSeeds)

  //   console.log("got the admins!")
  // } catch (err) {
  //   throw err
  // }

  process.exit(0);
});
