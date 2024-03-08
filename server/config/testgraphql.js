const axios = require('axios');

let graphqlEndpoint
// if (process.env.NODE_ENV === 'production'){
//     graphqlEndpoint = 'http://localhost:5000/graphql';
//     graphqlEndpoint = 'https://spatialtest.grit.ucsb.edu/graphql'
//   } else {
//     graphqlEndpoint = 'http://localhost:3001/graphql';
//   }
graphqlEndpoint = 'https://spatialtest.grit.ucsb.edu/graphql'

// Replace 'YOUR_GRAPHQL_QUERY' with your actual GraphQL query
const graphqlQuery = `
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

const testGraphQLConnection = async () => {
  try {
    const response = await axios.post(
      graphqlEndpoint,
      { query: graphqlQuery },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('GraphQL Response:', response.data);
  } catch (error) {
    console.error('Error connecting to GraphQL:', error.message);
  }
};

testGraphQLConnection();