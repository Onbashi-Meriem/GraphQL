import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
const { importSchema } = require('graphql-import');
// import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// import http from 'http';



// const server = new ApolloServer({
//     typeDefs: importSchema('./graphql/types/schema.graphql'),
//     resolvers

// });

// const app = express();
// server.applyMiddleware({ app });

// app.listen({ port: 4001 }, () => {
//     console.log(`Server ready at http://localhost:4001${server.graphqlPath}`);
// })

async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
      typeDefs:importSchema('./graphql/types/schema.graphql'),
      resolvers:require('./graphql/resolvers/index'),
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });
    await new Promise(resolve => httpServer.listen({ port: 4001 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }