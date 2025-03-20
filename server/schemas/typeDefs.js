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
    title: [String]
    image: String
    description: String
    research: String
    projects: [String]
    category: String
    current: Boolean
    email: String
    location: String
    phone: String
    gscholar: String
    github: String
    linkedin: String
    x: String
    websiteUrl: String
    websiteName: String
    advisors: [String]
  }

  type Projects {
    id: ID
    name: String
    startDate: Date
    endDate: Date
    pis: String
    summary: String
    description: String
    image: String
    website: String
    funder: String
    funderLogo: String
  }

  type InfoContent {
    id: ID
    subtitle: String
    description: String!
    image: [String]

  }
  
  type AccordionItem {
    id: ID
    title: String!
    content: [InfoContent]
  }

  type InfoPanels {
    id: ID
    location: String
    name: String
    pis: String
    tabname: String
    taborder: String
    content: [InfoContent]!
    accordion: [AccordionItem]
  }

  type Query {
    people: [People]!
    projects: [Projects]!
    infoPanels: [InfoPanels]!
  }

  input InfoContentInput {
    subtitle: String
    description: String!
    image: [String]
  }

  input AccordionItemInput {
    title: String!
    content: [InfoContentInput]
  }

  input InfoPanelInput {
    location: String!
    name: String!
    tabname: String!
    taborder: Int!
    content: [InfoContentInput]!
    accordion: [AccordionItemInput]
  }

  type Mutation {

    addPerson(firstName: String!, lastName: String!, title: [String]!, image: String, description: String!, research: String, projects: [String], category: String!, current: Boolean!, email: String, location: String, github: String, phone: String, gscholar: String, linkedin: String, websiteUrl: String, websiteName: String, advisors: [String]): People!

    addProject(name: String!, pis: String!, summary: String!, description: String!, image: String, funder: String, funderLogo: String): Projects!
    editProject(id: ID!, name: String, pis: String, summary: String, description: String, image: String, funder: String, funderLogo: String): Projects!
    deleteProject(id: ID!): [Projects]!

    adminSignOn(email: String!, password: String!): Auth!

    addInfoPanel(input: InfoPanelInput!): InfoPanels!
    editInfoPanel(id: ID!, name: String, tabname: String, taborder: String, description: String, image: String): InfoPanels!
    deleteInfoPanel(id: ID!): InfoPanels!
  }
`;

module.exports = typeDefs;
