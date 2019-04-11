import { ApolloServer, gql } from 'apollo-server-koa';
import houseModel from '../models/houseModel';

function initGraphQL(app) {
  const typeDefs = gql`
    type House {
      _id: String
      area: String
      name: String
      number: Int
      beginTime: String
      endTime: String
      status: String
    }

    type Query {
      allHouses: [House]
    }
  `;

  const resolvers = {
    Query: {
      // 和 type Query 中的 allHouses 对应
      allHouses: async () => {
        const allHouses = await houseModel.find();
        return allHouses;
      },
    },
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
}

export default initGraphQL;
