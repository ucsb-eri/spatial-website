const { AuthenticationError } = require('apollo-server-express');
const { People, Projects, AdminProfile, AboutPanels} = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    people: async () => {
      return People.find();
    },
    projects: async () => {
      return Projects.find();
    },
    aboutPanels: async () => {
      return AboutPanels.find()
    }
  },

  Mutation: {

    addPerson: async (parent, {firstName, lastName, title, image, description, category, current, email, location, phone, gscholar, linkedin, website, advisors}) => {
      // if (context.user) {
        const person = await People.create({firstName, lastName, title, image, description, category, current, email, location, phone, gscholar, linkedin, website, advisors})
        return person
      // }
    },

    addProject: async (parent, {name, description, image}, context) => {
      if (context.user) {
        const project = await Projects.create({name, description, image})
        return project
      }
    },
    editProject: async (parent, {id, name, description, image}, context) => {
      if (context.user) {
        const updateProject = await Projects.findByIdAndUpdate(
          {_id: id},
          {name, description, image},
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

    addAboutPanel: async (parent, {name, tabname, taborder, description}, context) => {
      if (context.user) {
        console.log("valid user")
        console.log(name, description)
        const aboutPanel = await AboutPanels.create({name, description, tabname, taborder})
        return aboutPanel
      }
    },
    editAboutPanel: async (parent, {id, name, tabname, taborder, description}, context) => {
      console.log("are yoyu working?")
      if (context.user) {
        console.log("valid user")
        console.log(name, description)
        const updateAboutPanel = await AboutPanels.findByIdAndUpdate(
          {_id: id},
          {name, description, tabname, taborder},
          {new: true}
          )
        return updateAboutPanel
      } 
    },
    deleteAboutPanel: async (parent, {id}, context) => {
      if (context.user) {
        const deletedPanel = await AboutPanels.deleteOne({_id: id})
        const panels = await AboutPanels.find()
        return panels
      }
    },
  }
  
};

module.exports = resolvers;
