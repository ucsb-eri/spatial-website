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

export const EDIT_PERSON = gql`
  mutation EditPerson($id: ID!, $firstName: String, $lastName: String, $title: [String], $category: String, $description: String, $research: String, $projects: [String], $current: Boolean, $image: String, $email: String, $location: String, $phone: String, $gscholar: String, $linkedin: String, $x: String, $github: String, $websiteUrl: String, $websiteName: String, $advisors: [String]) {
    editPerson(id: $id, firstName: $firstName, lastName: $lastName, title: $title, category: $category, description: $description, research: $research, projects: $projects, current: $current, image: $image, email: $email, location: $location, phone: $phone, gscholar: $gscholar, linkedin: $linkedin, x: $x, github: $github, websiteUrl: $websiteUrl, websiteName: $websiteName, advisors: $advisors) {
      _id
      firstName
      lastName
      title
      image
      category
      current
    } 
  }`

export const DELETE_PERSON = gql`
  mutation DeletePerson($id: ID!) {
    deletePerson(id: $id) {
      _id
      firstName
      lastName
    }
  }`

export const ADD_PROJECT = gql`
  mutation addProject($name: String!, $pis: String!, $summary: String!, $description: String!, $image: String, $funder: String, $funderLogo: String) {
      addProject(name: $name, pis: $pis, summary: $summary, description: $description, image: $image, funder: $funder, funderLogo: $funderLogo) {
        id
        name
        description
        image
        funder
        funderLogo
      }
    }` 

export const EDIT_PROJECT = gql`
  mutation EditProject($id: ID!, $name: String, $pis: String, $summary: String, $description: String, $image: String, $funder: String, $funderLogo: String) {
    editProject(id: $id, name: $name, pis: $pis, summary: $summary, description: $description, image: $image, funder: $funder, funderLogo: $funderLogo) {
      id
      name
      description
      image
      funder
      funderLogo
    }
  }`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      name
    }
  }`

export const ADMIN_LOGIN = gql`
  mutation AdminSignOn($email: String!, $password: String!) {
    adminSignOn(email: $email, password: $password) {
      token  
      
    }
  }`

export const ADD_INFOPANEL = gql`
  mutation AddInfoPanel($input: InfoPanelInput!) {
    addInfoPanel(input: $input) {
      id
      location
      name
      tabname
      taborder
    }
  }`

export const EDIT_INFOPANEL = gql`
  mutation EditInfoPanel($id: ID!, $input: InfoPanelInput!) {
    editInfoPanel(id: $id, input: $input) {
      id
      location
      name
      tabname
      taborder
    }
  }`

export const DELETE_INFOPANEL = gql`
  mutation DeleteInfoPanel($id: ID!) {
    deleteInfoPanel(id: $id) {
      id
      location
      name
      tabname
      taborder
    }
  }`

export const ADD_CAROUSEL_SLIDE = gql`
  mutation AddCarouselSlide($title: String!, $description: String!, $image: String!, $linkText: String, $color: String, $order: Int, $active: Boolean) {
    addCarouselSlide(title: $title, description: $description, image: $image, linkText: $linkText, color: $color, order: $order, active: $active) {
      id
      title
      description
      image
      linkText
      color
      order
      active
    }
  }`

export const EDIT_CAROUSEL_SLIDE = gql`
  mutation EditCarouselSlide($id: ID!, $title: String, $description: String, $image: String, $linkText: String, $color: String, $order: Int, $active: Boolean) {
    editCarouselSlide(id: $id, title: $title, description: $description, image: $image, linkText: $linkText, color: $color, order: $order, active: $active) {
      id
      title
      description
      image
      linkText
      color
      order
      active
    }
  }`

export const DELETE_CAROUSEL_SLIDE = gql`
  mutation DeleteCarouselSlide($id: ID!) {
    deleteCarouselSlide(id: $id) {
      id
      title
    }
  }`

export const ADD_GIVE_OPPORTUNITY = gql`
  mutation AddGiveOpportunity($title: String!, $description: String!, $image: String, $imageDescription: String, $link: String!, $order: Int) {
    addGiveOpportunity(title: $title, description: $description, image: $image, imageDescription: $imageDescription, link: $link, order: $order) {
      id
      title
      description
      image
      imageDescription
      link
      order
    }
  }`

export const EDIT_GIVE_OPPORTUNITY = gql`
  mutation EditGiveOpportunity($id: ID!, $title: String, $description: String, $image: String, $imageDescription: String, $link: String, $order: Int) {
    editGiveOpportunity(id: $id, title: $title, description: $description, image: $image, imageDescription: $imageDescription, link: $link, order: $order) {
      id
      title
      description
      image
      imageDescription
      link
      order
    }
  }`

export const DELETE_GIVE_OPPORTUNITY = gql`
  mutation DeleteGiveOpportunity($id: ID!) {
    deleteGiveOpportunity(id: $id) {
      id
      title
    }
  }`
    