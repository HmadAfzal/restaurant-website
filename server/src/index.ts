import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cookieParser from 'cookie-parser';
import userTypeDefs from './typedefs/user.typedefs.js';
import userResolvers from './resolvers/user.resolver.js';

const app = express();
const httpServer = http.createServer(app);

// Configure CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(cookieParser());

const server = new ApolloServer({
  typeDefs: userTypeDefs,
  resolvers: userResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      const token = req.cookies?.jwt;
      return { token, req, res };
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
