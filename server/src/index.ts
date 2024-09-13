import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import userTypeDefs from './typedefs/user.typedefs.js';
import userResolvers from './resolvers/user.resolver.js';
interface MyContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer(app);


const server = new ApolloServer<MyContext>({
  typeDefs:userTypeDefs,
  resolvers:userResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();


app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req,res }) => ({ token: req.headers.token, res }),
  }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);