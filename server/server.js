const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const uploadImageRoute = require('./routes/uploadImages')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const { People, Projects, AdminProfile } = require('./models');
const peopleSeeds = require('./seeders/peopleSeeds.json')


const app = express();

let PORT
let apolloCors
if (process.env.NODE_ENV === 'production'){
  apolloCors =  'https://spatialtest.grit.ucsb.edu'
  PORT = 5000
} else {
  apolloCors = 'http://localhost:3000'
  PORT = 3001
}
app.use(cors(
  {
    origin: apolloCors,
  },
  {
    origin: 'http://localhost:5000'
  },
  {
    origin: "https://studio.apollographql.com",
    credentials: true
  }, 

))
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cors: {
    "origin": apolloCors,
    "credentials": true
  }, 
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', uploadImageRoute)



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}




// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', async () => {

    try {
      await People.deleteMany({});
      await People.collection.drop();
      await People.create(peopleSeeds);


      console.log('all done!');
    } catch (err) {
      throw err;
    }

    process.exit(0);

    // app.listen(PORT, () => {
    //   console.log(`API server running on port ${PORT}!`);
    //   console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    // })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
