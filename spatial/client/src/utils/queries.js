import { gql } from '@apollo/client';

export const QUERY_PEOPLE = gql`
    query Query {
        people {
            _id
            firstName
            lastName
            title
            description
            image
            category
            current
            email
            location
            phone
            gscholar
            website {
                label
                url
                }
        }
    }
    
`;

export const GET_PROJECTS = gql`
    query getProjects {
        projects {
        name
        description
        id
        }
    }
`

// export const QUERY_SINGLE_PROFILE = gql`
//   query singleProfile($profileId: ID!) {
//     profile(profileId: $profileId) {
//       _id
//       name
//       skills
//     }
//   }
// `;