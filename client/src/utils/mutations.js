import { gql } from '@apollo/client';

export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!, $title: String!, $category: String!, $description: String!, $research: String, $projects: [String], $current: Boolean!, $image: String, $email: String, $location: String, $phone: String, $gscholar: String, $linkedin: String, $website: String, $advisors: [String]) {
    addPerson(firstName: $firstName, lastName: $lastName, title: $title, category: $category, description: $description, research: $research, projects: $projects, current: $current, image: $image, email: $email, location: $location, phone: $phone, gscholar: $gscholar, linkedin: $linkedin, website: $website, advisors: $advisors) {
      firstName
      lastName
      title
      image
      category
      current
    } 
  }`

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $description: String!, $image: String) {
      addProject(name: $name, description: $description, image: $image) {
        id
        name
        description
        image
      }
    }` 

export const EDIT_PROJECT = gql`
  mutation EditProject($id: ID, $name: String, $description: String, $image: String) {
    editProject(id: $id, name: $name, description: $description, image: $image) {
      id
      name
      description
      image
    }
  }`

export const ADMIN_LOGIN = gql`
  mutation AdminSignOn($email: String!, $password: String!) {
    adminSignOn(email: $email, password: $password) {
      token  
      
    }
  }`

export const ADD_ABOUTPANEL = gql`
  mutation AddAboutPanel($name: String!, $taborder: String!, $description: String!, $tabname: String!) {
  addAboutPanel(name: $name, taborder: $taborder, description: $description, tabname: $tabname) {
    description
    name
    tabname
    taborder
  }
}`

export const EDIT_ABOUTPANEL = gql`
  mutation EditAboutPanel($id: ID!, $name: String, $tabname: String, $taborder: String, $description: String) {
  editAboutPanel(id: $id, name: $name, tabname: $tabname, taborder: $taborder, description: $description) {
    description
    id
    name
    tabname
    taborder
  }
}`

export const DELETE_ABOUTPANEL = gql`
mutation DeleteAboutPanel($id: ID!) {
  deleteAboutPanel(id: $id) {
    description
    name
    tabname
    taborder
  }
}
`
    