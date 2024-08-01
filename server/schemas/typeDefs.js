const { gql } = require('apollo-server-express');


const typeDefs = gql`
  scalar Date
  scalar Int

  
  type AdminProfile {
    id: ID
    email: String
    password: String
  }
  
  type Auth {
    token: ID
    admin: AdminProfile
  }

  type People {
    _id: ID
    firstName: String
    lastName: String
    title: String
    image: String
    description: String
    category: String
    current: Boolean
    email: String
    location: String
    phone: String
    gscholar: String
    linkedin: String
    website: String
    advisors: [String]
  }

  type Projects {
    id: ID
    name: String
    startDate: Date
    endDate: Date
    description: String
    image: String
  }

  type AboutPanels {
    id: ID
    name: String
    tabname: String
    taborder: String
    description: String
  }

  type Query {
    people: [People]!
    projects: [Projects]!
    aboutPanels: [AboutPanels]!
  }

  type Mutation {

    addPerson(firstName: String!, lastName: String!, title: String!, image: String, description: String!, category: String!, current: Boolean!, email: String, location: String, phone: String, gscholar: String, linkedin: String, website: String, advisors: [String]): People!

    addProject(name: String!, description: String!, image: String): Projects!
    editProject(id: ID!, name: String, description: String, image: String): Projects!
    deleteProject(id: ID!): [Projects]!

    adminSignOn(email: String!, password: String!): Auth!

    addAboutPanel(name: String!, tabname: String!, taborder: String!, description: String!): AboutPanels!
    editAboutPanel(id: ID!, name: String, tabname: String, taborder: String, description: String): AboutPanels!
    deleteAboutPanel(id: ID!): AboutPanels!
  }
`;

module.exports = typeDefs;
