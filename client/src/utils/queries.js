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
        website
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
        content {
            id
            subtitle
            description
            image {
                url
                label
            }
        }
        accordion {
            id
            title
            taborder
            accordionOrder
            content {
                id
                subtitle
                description
                image {
                    url
                    label
                }
            }
        }
        name
        tabname
        taborder
        }
  }`

export const GET_CAROUSEL_SLIDES = gql`
    query GetCarouselSlides {
        carouselSlides {
            id
            title
            description
            image
            linkText
            color
            order
            active
        }
    }
`

export const GET_GIVE_OPPORTUNITIES = gql`
    query GetGiveOpportunities {
        giveOpportunities {
            id
            title
            description
            image
            imageDescription
            link
            order
        }
    }`
