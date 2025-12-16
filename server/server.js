const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const uploadImageRoute = require('./routes/uploadImages')
const calendarEventsRoute = require('./routes/calendarEvents')
const healthRoute = require('./routes/health')

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const createAdminAccount = require("./utils/admin");
const PORT = process.env.PORT || 3001;
const app = express();

// Create admin account on startup (checks if exists first)
createAdminAccount();

// NOTE: Database seeding should be done manually via:
//   npm run seed (development)
//   MONGODB_URI="..." ./azure/seed-production.sh (production)
// Do NOT auto-seed on server startup in production!

// CORS configuration - include all deployment domains
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://spatialtest.grit.ucsb.edu",
  "https://spatial.ucsb.edu",
  "https://www.spatial.ucsb.edu",
  "https://spatial-website.azurewebsites.net"
];

app.use(cors({
  origin: allowedOrigins
}))
app.use(
  '/graphql',
  cors({origin: [...allowedOrigins, "https://studio.apollographql.com"]})
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
app.use('/api', healthRoute)


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.use(express.static(path.join(__dirname, 'public')));
} else {
  app.use(express.static('public'));
}

app.get('*', (req, res) => {
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
