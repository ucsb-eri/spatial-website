import { gql } from '@apollo/client';

export const QUERY_PEOPLE = gql`
    query Query {
        people {
            _id
            firstName
            lastName
            title
            description
            research
            projects
            image
            category
            current
            email
            location
            phone
            gscholar
            websiteUrl
            websiteName 
        }
    } 
`;

export const GET_PROJECTS = gql`
    query getProjects {
        projects {
        name
        description
        image
        id
        }
    }
`
export const GET_ABOUTPANELS = gql`
    query GetAboutPanels {
        aboutPanels {
        id
        description
        name
        tabname
        taborder
        }
  }`
