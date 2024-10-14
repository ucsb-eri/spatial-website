const { AuthenticationError } = require('apollo-server-express');
const { People, Projects, AdminProfile, InfoPanels} = require('../models');
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
    }
  },

  Mutation: {

    addPerson: async (parent, {firstName, lastName, title, image, description, research, projects, category, current, email, github, location, phone, gscholar, linkedin, x, websiteName, websiteUrl, advisors}) => {
      // if (context.user) {
        const person = await People.create({firstName, lastName, title, image, description, research, projects, category, current, email, github, location, phone, gscholar, linkedin, x, websiteName, websiteUrl, advisors})
        return person
      // }
    },

    addProject: async (parent, {name, pis, summary, description, image}, context) => {
      if (context.user) {
        const project = await Projects.create({name, pis, summary, description, image})
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

    addInfoPanel: async (parent, {location, name, tabname, taborder, description, image}, context) => {
      if (context.user) {
        console.log("valid user")
        console.log(name, description)
        const aboutPanel = await InfoPanels.create({location, name, description, image, tabname, taborder})
        return aboutPanel
      }
    },
    editInfoPanel: async (parent, {id, location, name, tabname, image, taborder, description}, context) => {
      console.log("are yoyu working?")
      if (context.user) {
        console.log("valid user")
        console.log(name, description)
        const updateInfoPanel = await InfoPanels.findByIdAndUpdate(
          {_id: id},
          {location, name, description, image, tabname, taborder},
          {new: true}
          )
        return updateInfoPanel
      } 
    },
    deleteInfoPanel: async (parent, {id}, context) => {
      if (context.user) {
        const deletedPanel = await InfoPanels.deleteOne({_id: id})
        const panels = await InfoPanels.find()
        return panels
      }
    },
  }
  
};

module.exports = resolvers;
