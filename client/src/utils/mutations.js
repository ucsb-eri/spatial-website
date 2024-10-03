import { gql } from '@apollo/client';

export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!, $title: String!, $category: String!, $description: String!, $research: String, $projects: [String], $current: Boolean!, $image: String, $email: String, $location: String, $phone: String, $gscholar: String, $linkedin: String, $x: String, $websiteUrl: String, $websiteName: String, $advisors: [String]) {
    addPerson(firstName: $firstName, lastName: $lastName, title: $title, category: $category, description: $description, research: $research, projects: $projects, current: $current, image: $image, email: $email, location: $location, phone: $phone, gscholar: $gscholar, linkedin: $linkedin, x: $x, websiteUrl: $websiteUrl, websiteName: $websiteName, advisors: $advisors) {
      firstName
      lastName
      title
      image
      category
      current
    } 
  }`

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $pis: [String]!, $summary: String!, $description: String!, $image: String) {
      addProject(name: $name, pi: $pi, summary: $summary, description: $description, image: $image) {
        id
        name
        description
        image
      }
    }` 

export const EDIT_PROJECT = gql`
  mutation EditProject($id: ID, $name: String, $pi: [String], $summary: String, $description: String, $image: String) {
    editProject(id: $id, name: $name, pi: $pi, summary: $summary, description: $description, image: $image) {
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

export const ADD_INFOPANEL = gql`
  mutation AddInfoPanel($location: String!, $name: String!, $taborder: String!, $description: String!, $tabname: String!) {
  addInfoPanel(location: $location, name: $name, taborder: $taborder, description: $description, tabname: $tabname) {
    location
    description
    name
    tabname
    taborder
  }
}`

export const EDIT_INFOPANEL = gql`
  mutation EditInfoPanel($id: ID!, $location: String, $name: String, $tabname: String, $taborder: String, $description: String) {
  editInfoPanel(id: $id, location: $location, name: $name, tabname: $tabname, taborder: $taborder, description: $description) {
    location
    description
    id
    name
    tabname
    taborder
  }
}`

export const DELETE_INFOPANEL = gql`
mutation DeleteInfoPanel($id: ID!) {
  deleteInfoPanel(id: $id) {
    location
    description
    name
    tabname
    taborder
  }
}
`
    