const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const uploadImageRoute = require('./routes/uploadImages')
const calendarEventsRoute = require('./routes/calendarEvents')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const createAdminAccount = require("./utils/admin");
const seedWebsite = require('./seeders/seed');
const PORT = process.env.PORT || 3001;
const app = express();

if (process.env.NODE_ENV !== 'production') {
  createAdminAccount()
}
app.use(cors({
  origin: ["http://localhost:3000", "https://spatialtest.grit.ucsb.edu", "https://spatial.ucsb.edu"]
}))
app.use(
  '/graphql',
  cors({origin: ["http://localhost:3001", "http://localhost:3000", "https://studio.apollographql.com", "https://spatialtest.ucsb.edu"]})
)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware, 
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', uploadImageRoute)
app.use('/api', calendarEventsRoute)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  app.use(express.static('public'));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
// Call the async function to start the server
  startApolloServer(typeDefs, resolvers);
