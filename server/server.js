const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const uploadImageRoute = require('./routes/uploadImages');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 5000 : 3001;
const apolloCors = process.env.NODE_ENV === 'production' ? 'https://spatialtest.grit.ucsb.edu' : 'http://localhost:3000';

const corsOptions = {
  origin: [apolloCors, 'http://localhost:5000', "https://studio.apollographql.com"],
  credentials: true,
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cors: corsOptions,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', uploadImageRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at ${apolloCors}${server.graphqlPath}`);
    });
  });
};

startApolloServer(typeDefs, resolvers);
