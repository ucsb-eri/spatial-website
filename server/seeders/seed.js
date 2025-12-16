const { People, Projects, InfoPanels, InfoContent, AccordionItem, GiveOpportunity, CarouselSlide } = require('../models');
const peopleSeeds = require('./peopleSeeds.json');
const infoSeeds = require('./infoSeeds.json');
const projectSeeds = require('./projectSeeds.json');
const giveSeeds = require('./giveSeeds.json');
const carouselSeeds = require('./carouselSeeds.json');

async function seedWebsite() {
  // This function only seeds data if collections are EMPTY
  // It will NOT overwrite existing data
  // 
  // To force a reseed, use: npm run reseed
  // Or manually clear collections in MongoDB first

  try {
    const peopleExists = await People.find() 
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

  try {
    const projectsExists = await Projects.find()
      if (projectsExists.length == 0) {
        console.log("seeding projects")
        const projects = await Projects.insertMany(projectSeeds)
        console.log("Remodel! New projects coming in", projects)
      } else {
        console.log("We got plenty of projects to do")
      }
  } catch (err) {
    console.error("Error seeding projects", err)
  }

  try {
    const panelsExist = await InfoPanels.find()
      if (panelsExist.length == 0) {
        console.log("seeding info panels")
        console.log("seeding infoContent")
        
        // Use Promise.all with map instead of forEach to properly await all operations
        await Promise.all(infoSeeds.map(async (seed) => {
          try {
            const infoContent = await InfoContent.create(seed.content)
            
            if (seed.accordion && seed.accordion.length > 0) {
              const accordionItems = await Promise.all(seed.accordion.map(async (accordion) => {
                const accordionContent = await Promise.all(accordion.content.map(infoContent => InfoContent.create(infoContent)))
                const newAccordionItem = await AccordionItem.create({
                  title: accordion.title,
                  content: accordionContent.map(item => item._id)
                })
                return newAccordionItem
              }))
              
              await InfoPanels.create({
                ...seed,
                accordion: accordionItems.map(item => item._id),
                content: infoContent.map(item => item._id)
              })
            } else {
              await InfoPanels.create({
                ...seed,
                content: infoContent.map(item => item._id)
              })
            }
            console.log(`✓ Seeded panel: ${seed.name}`)
          } catch (err) {
            console.error(`✗ Error seeding panel "${seed.name}":`, err.message)
          }
        }))
        
        console.log("✓ All panels seeded successfully")
      } else {
        console.log("panels already installed")
      }
  } catch (err) {
    console.error("Error seeding panels: ", err)
  }

  try {
    const opportunitiesExist = await GiveOpportunity.find()
      if (opportunitiesExist.length == 0) {
        console.log("seeding give opportunities")
        const opportunities = await GiveOpportunity.insertMany(giveSeeds)
        console.log("✓ Give opportunities seeded:", opportunities.length)
      } else {
        console.log("give opportunities already exist")
      }
  } catch (err) {
    console.error("Error seeding give opportunities:", err)
  }

  try {
    const carouselExists = await CarouselSlide.find()
    if (carouselExists.length == 0) {
      console.log("seeding carousel slides")
      const slides = await CarouselSlide.insertMany(carouselSeeds)
      console.log("Carousel slides seeded:", slides.length)
    } else {
      console.log("Carousel slides already exist")
    }
  } catch (err) {
    console.error("Error seeding carousel slides:", err)
  }

}

module.exports = seedWebsite;