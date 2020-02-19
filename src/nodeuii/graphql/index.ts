import { ApolloServer } from 'apollo-server-koa';
import * as Koa from 'koa';
import {readFileSync} from 'fs'
// eslint-disable-next-line import/no-extraneous-dependencies
import { join } from "path";
import resolvers from "./resolvers";

const typeDefs = readFileSync(join(__dirname,'./typeDefs.graphql'), 'UTF-8')

function initGraphQL(app: Koa): void {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
}

export default initGraphQL;
