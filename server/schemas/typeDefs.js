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

  type ImageData {
    url: String!
    label: String
  }

  type InfoContent {
    id: ID
    subtitle: String
    description: String!
    image: [ImageData]

  }
  
  type AccordionItem {
    id: ID
    title: String!
    content: [InfoContent]
    taborder: Int
    accordionOrder: Int
  }

  type InfoPanels {
    id: ID
    location: String
    name: String
    pis: String
    tabname: String
    taborder: Int
    content: [InfoContent]!
    accordion: [AccordionItem]
  }

  type GiveOpportunity {
    id: ID
    title: String!
    description: String!
    image: String
    imageDescription: String
    link: String!
    order: Int!
  }

  type CarouselSlide {
    id: ID
    title: String!
    description: String!
    image: String!
    linkText: String
    color: String
    order: Int!
    active: Boolean!
  }

  type Query {
    people: [People]!
    projects: [Projects]!
    infoPanels: [InfoPanels]!
    giveOpportunities: [GiveOpportunity]!
    carouselSlides: [CarouselSlide]!
  }

  input ImageDataInput {
    url: String!
    label: String
  }

  input InfoContentInput {
    subtitle: String
    description: String!
    image: [ImageDataInput]
  }

  input AccordionItemInput {
    title: String!
    content: [InfoContentInput]
    taborder: Int
    accordionOrder: Int
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

    addPerson(firstName: String!, lastName: String!, title: [String]!, image: String, description: String!, research: String, projects: [String], category: String!, current: Boolean!, email: String, location: String, github: String, phone: String, gscholar: String, linkedin: String, x: String, websiteUrl: String, websiteName: String, advisors: [String]): People!
    editPerson(id: ID!, firstName: String, lastName: String, title: [String], image: String, description: String, research: String, projects: [String], category: String, current: Boolean, email: String, location: String, github: String, phone: String, gscholar: String, linkedin: String, x: String, websiteUrl: String, websiteName: String, advisors: [String]): People!
    deletePerson(id: ID!): [People]!

    addProject(name: String!, pis: String!, summary: String!, description: String!, image: String, funder: String, funderLogo: String): Projects!
    editProject(id: ID!, name: String, pis: String, summary: String, description: String, image: String, funder: String, funderLogo: String): Projects!
    deleteProject(id: ID!): [Projects]!

    adminSignOn(email: String!, password: String!): Auth!

    addInfoPanel(input: InfoPanelInput!): InfoPanels!
    editInfoPanel(id: ID!, input: InfoPanelInput!): InfoPanels!
    deleteInfoPanel(id: ID!): [InfoPanels]!

    addGiveOpportunity(title: String!, description: String!, image: String, imageDescription: String, link: String!, order: Int): GiveOpportunity!
    editGiveOpportunity(id: ID!, title: String, description: String, image: String, imageDescription: String, link: String, order: Int): GiveOpportunity!
    deleteGiveOpportunity(id: ID!): [GiveOpportunity]!

    addCarouselSlide(title: String!, description: String!, image: String!, linkText: String, color: String, order: Int, active: Boolean): CarouselSlide!
    editCarouselSlide(id: ID!, title: String, description: String, image: String, linkText: String, color: String, order: Int, active: Boolean): CarouselSlide!
    deleteCarouselSlide(id: ID!): [CarouselSlide]!
  }
`;

module.exports = typeDefs;
