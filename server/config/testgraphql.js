const fetch = require('node-fetch');

const graphqlQuery = {
  query: `
    query {
      people {
        _id
        firstName
        lastName
      }
    }
  `,
};

fetch('https://spatialtest.grit.ucsb.edu/graphql', { // Replace with your actual GraphQL endpoint
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(graphqlQuery),
})
  .then(res => res.json())
  .then(data => console.log(JSON.stringify(data, null, 2)))
  .catch(error => console.error('Error fetching data:', error));
