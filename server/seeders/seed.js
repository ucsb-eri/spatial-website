const { People, Projects } = require('../models');
const peopleSeeds = require('./peopleSeeds.json');

async function seedPeople() {

  try {
    const peopleExists = await People.find() 
    console.log(peopleExists)
      if (peopleExists.length == 0) {
        console.log("seeding people")
        const people = await People.insertMany(peopleSeeds)
        console.log("new people in the building", people)
      } else {
        console.log("people in the building")
      } 
  } catch (err) {
    console.error("Error seeding people: ", err)
  }
}

module.exports = seedPeople;