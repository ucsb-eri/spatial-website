import { gql } from '@apollo/client';

export const ADD_PROJECT = gql`
    mutation addProject($name: String!, $description: String!) {
        addProject(name: $name, description: $description) {
          id
          name
          description
        }
      }
` 