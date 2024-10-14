import { gql } from '@apollo/client';

export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!, $title: [String]!, $category: String!, $description: String!, $research: String, $projects: [String], $current: Boolean!, $image: String, $email: String, $location: String, $phone: String, $gscholar: String, $linkedin: String, $x: String, $github: String, $websiteUrl: String, $websiteName: String, $advisors: [String]) {
    addPerson(firstName: $firstName, lastName: $lastName, title: $title, category: $category, description: $description, research: $research, projects: $projects, current: $current, image: $image, email: $email, location: $location, phone: $phone, gscholar: $gscholar, linkedin: $linkedin, x: $x, github: $github, websiteUrl: $websiteUrl, websiteName: $websiteName, advisors: $advisors) {
      firstName
      lastName
      title
      image
      category
      current
    } 
  }`

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $pis: [String]!, $summary: String!, $description: String!, $image: String, $funder: String, $funderLogo: String) {
      addProject(name: $name, pi: $pi, summary: $summary, description: $description, image: $image, funder: $funder, funderLogo: $funderLogo) {
        id
        name
        description
        image
        funder
        funderLogo
      }
    }` 

export const EDIT_PROJECT = gql`
  mutation EditProject($id: ID, $name: String, $pi: [String], $summary: String, $description: String, $image: String, $funder: String, $funderLogo: String) {
    editProject(id: $id, name: $name, pi: $pi, summary: $summary, description: $description, image: $image, funder: $funder, funderLogo: $funderLogo) {
      id
      name
      description
      image
      funder
      funderLogo
    }
  }`

export const ADMIN_LOGIN = gql`
  mutation AdminSignOn($email: String!, $password: String!) {
    adminSignOn(email: $email, password: $password) {
      token  
      
    }
  }`

export const ADD_INFOPANEL = gql`
  mutation AddInfoPanel($location: String!, $name: String!, $taborder: String!, $description: String!, $image: String, $tabname: String!) {
  addInfoPanel(location: $location, name: $name, taborder: $taborder, image: $image, description: $description, tabname: $tabname) {
    location
    description
    name
    image
    tabname
    taborder
  }
}`

export const EDIT_INFOPANEL = gql`
  mutation EditInfoPanel($id: ID!, $location: String, $name: String, $image: String, $tabname: String, $taborder: String, $description: String) {
  editInfoPanel(id: $id, location: $location, name: $name, tabname: $tabname, image: $image, taborder: $taborder, description: $description) {
    location
    description
    id
    name
    image
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
    