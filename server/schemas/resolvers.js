const { AuthenticationError } = require('apollo-server-express');
const { People, Projects, AdminProfile, InfoPanels, InfoContent, AccordionItem, GiveOpportunity, CarouselSlide} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    people: async () => {
      return People.find();
    },
    projects: async () => {
      return Projects.find();
    },
    infoPanels: async () => {
      return InfoPanels.find()
        .populate({
          path: 'content'
        })
        .populate({
        path: 'accordion', // populate any accordion content
        populate: {
          path: 'content' // populate content within the accordion components
        }
      })
    },
    giveOpportunities: async () => {
      return GiveOpportunity.find().sort({ order: 1 });
    },
    carouselSlides: async () => {
      return CarouselSlide.find({ active: true }).sort({ order: 1 });
    }
  },

  Mutation: {

    addPerson: async (parent, {firstName, lastName, title, image, description, research, projects, category, current, email, github, location, phone, gscholar, linkedin, x, websiteName, websiteUrl, advisors}, context) => {
      if (context.user) {
        const person = await People.create({firstName, lastName, title, image, description, research, projects, category, current, email, github, location, phone, gscholar, linkedin, x, websiteName, websiteUrl, advisors})
        return person
      }
      throw new AuthenticationError('You must be logged in to add a person');
    },

    editPerson: async (parent, {id, firstName, lastName, title, image, description, research, projects, category, current, email, github, location, phone, gscholar, linkedin, x, websiteName, websiteUrl, advisors}, context) => {
      if (context.user) {
        const updatePerson = await People.findByIdAndUpdate(
          {_id: id},
          {firstName, lastName, title, image, description, research, projects, category, current, email, github, location, phone, gscholar, linkedin, x, websiteName, websiteUrl, advisors},
          {new: true}
        )
        return updatePerson
      }
      throw new AuthenticationError('You must be logged in to edit a person');
    },

    deletePerson: async (parent, {id}, context) => {
      if (context.user) {
        const deletedPerson = await People.deleteOne({_id: id})
        const people = await People.find()
        return people
      }
      throw new AuthenticationError('You must be logged in to delete a person');
    },

    addProject: async (parent, {name, pis, summary, description, website, image}, context) => {
      if (context.user) {
        const project = await Projects.create({name, pis, summary, description, website, image})
        return project
      }
    },
    editProject: async (parent, {id, name, pis, summary, description, image}, context) => {
      if (context.user) {
        const updateProject = await Projects.findByIdAndUpdate(
          {_id: id},
          {name, pis, summary, description, image},
          {new: true}
          )
        return updateProject
      } 
    },
    deleteProject: async (parent, {id}, context) => {
      if (context.user) {
        const deletedProject = await Projects.deleteOne({_id: id})
        const projects = await Projects.find()
        return projects
      }
    },

    adminSignOn: async (parent, {email, password}) => {
      const admin = await AdminProfile.findOne({ email })
      if (!admin) {
        throw new AuthenticationError("incorrect credentials");
      }
      try {
        const correctPw = await admin.isCorrectPassword(password)
        if (!correctPw) {
          throw new AuthenticationError("incorrect credentials");
        }
        const token = signToken(admin);
        console.log(token)
        console.log("admin signed in");
        return {token, admin}
      } catch (err) {
        console.error("Error trying to login", err)
      }
    },

    addInfoPanel: async (parent, {input}, context) => {
      if (context.user) {

        let accordionItems = [];
        
        // Only process accordion if it exists and has items
        if (input.accordion && input.accordion.length > 0) {
          accordionItems = await Promise.all(
            input.accordion.map(async (accordion, index) => {
              // Create all content items for this accordion
              const contentIds = await Promise.all(
                accordion.content.map(async (infoContent) => {
                  const newContent = await InfoContent.create(infoContent);
                  return newContent._id;
                })
              );
              
              // Create the accordion item with the content IDs
              const newAccordionItem = await AccordionItem.create({
                title: accordion.title,
                content: contentIds,
                taborder: accordion.taborder !== undefined ? accordion.taborder : input.taborder,
                accordionOrder: accordion.accordionOrder !== undefined ? accordion.accordionOrder : index,
              });
              
              return newAccordionItem._id;
            })
          );
        }

        const contentItems = await Promise.all(
          input.content.flatMap(async (contentInfo) => {
            console.log(contentInfo)
            const newContent = await InfoContent.create(contentInfo);
            return newContent._id
          })
        )

        const newInfoPanel = await InfoPanels.create({
          ...input,
          content: contentItems,
          accordion: accordionItems
        })

        return newInfoPanel
      }
      throw new AuthenticationError('You must be logged in to add a panel');
    },
    editInfoPanel: async (parent, {id, input}, context) => {
      if (context.user) {
        // Process accordion items if provided
        let accordionItems = [];
        if (input.accordion && input.accordion.length > 0) {
          accordionItems = await Promise.all(
            input.accordion.map(async (accordion, index) => {
              // Create all content items for this accordion
              const contentIds = await Promise.all(
                accordion.content.map(async (infoContent) => {
                  const newContent = await InfoContent.create(infoContent);
                  return newContent._id;
                })
              );
              
              // Create the accordion item with the content IDs
              const newAccordionItem = await AccordionItem.create({
                title: accordion.title,
                content: contentIds,
                taborder: accordion.taborder !== undefined ? accordion.taborder : input.taborder,
                accordionOrder: accordion.accordionOrder !== undefined ? accordion.accordionOrder : index,
              });
              
              return newAccordionItem._id;
            })
          );
        }

        // Process content items
        const contentItems = await Promise.all(
          input.content.flatMap(async (contentInfo) => {
            const newContent = await InfoContent.create(contentInfo);
            return newContent._id
          })
        )

        // Update the panel
        const updateInfoPanel = await InfoPanels.findByIdAndUpdate(
          {_id: id},
          {
            ...input,
            content: contentItems,
            accordion: accordionItems
          },
          {new: true}
        )
        return updateInfoPanel
      }
      throw new AuthenticationError('You must be logged in to edit a panel');
    },
    deleteInfoPanel: async (parent, {id}, context) => {
      if (context.user) {
        const deletedPanel = await InfoPanels.deleteOne({_id: id})
        const panels = await InfoPanels.find()
        return panels
      }
      throw new AuthenticationError('You must be logged in to delete a panel');
    },

    // Give Opportunity mutations
    addGiveOpportunity: async (parent, {title, description, image, imageDescription, link, order}, context) => {
      if (context.user) {
        const opportunity = await GiveOpportunity.create({
          title, 
          description, 
          image, 
          imageDescription, 
          link, 
          order: order !== undefined ? order : 9999
        })
        return opportunity
      }
      throw new AuthenticationError('You must be logged in to add a giving opportunity');
    },
    editGiveOpportunity: async (parent, {id, title, description, image, imageDescription, link, order}, context) => {
      if (context.user) {
        const updateOpportunity = await GiveOpportunity.findByIdAndUpdate(
          {_id: id},
          {title, description, image, imageDescription, link, order},
          {new: true}
        )
        return updateOpportunity
      }
      throw new AuthenticationError('You must be logged in to edit a giving opportunity');
    },
    deleteGiveOpportunity: async (parent, {id}, context) => {
      if (context.user) {
        await GiveOpportunity.deleteOne({_id: id})
        const opportunities = await GiveOpportunity.find()
        return opportunities
      }
      throw new AuthenticationError('You must be logged in to delete a giving opportunity');
    },

    // Carousel Slide mutations
    addCarouselSlide: async (parent, {title, description, image, linkText, color, order, active}, context) => {
      if (context.user) {
        const slide = await CarouselSlide.create({
          title,
          description,
          image,
          linkText,
          color: color || 'white',
          order: order !== undefined ? order : 9999,
          active: active !== undefined ? active : true
        })
        return slide
      }
      throw new AuthenticationError('You must be logged in to add a carousel slide');
    },
    editCarouselSlide: async (parent, {id, title, description, image, linkText, color, order, active}, context) => {
      if (context.user) {
        const updateSlide = await CarouselSlide.findByIdAndUpdate(
          {_id: id},
          {title, description, image, linkText, color, order, active},
          {new: true}
        )
        return updateSlide
      }
      throw new AuthenticationError('You must be logged in to edit a carousel slide');
    },
    deleteCarouselSlide: async (parent, {id}, context) => {
      if (context.user) {
        await CarouselSlide.deleteOne({_id: id})
        const slides = await CarouselSlide.find()
        return slides
      }
      throw new AuthenticationError('You must be logged in to delete a carousel slide');
    },
  }
  
};

module.exports = resolvers;
