import { gql } from '@apollo/client';

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