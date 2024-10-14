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
            linkedin
            github
            x
            advisors
            websiteUrl
            websiteName 
        }
    } 
`;

export const GET_PROJECTS = gql`
    query getProjects {
        projects {
        name
        pis
        summary
        description
        image
        id
        funder
        funderLogo
        }
    }
`
export const GET_INFOPANELS = gql`
    query GetInfoPanels {
        infoPanels {
        id
        location
        description
        image
        name
        tabname
        taborder
        }
  }`
