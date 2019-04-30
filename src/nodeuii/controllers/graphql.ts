import { ApolloServer, gql } from 'apollo-server-koa';
import houseModel from '../models/houseModel';
import spider from '../utils/spiderHelper';
import Idata from '../utils/Idata';

function initGraphQL(app): void {
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

    type PageOneArray {
      successArray: [House]
      allLength: Int
    }

    type Query {
      allHouses: [House]
      spiderPageOne: PageOneArray
    }
  `;

  const resolvers = {
    Query: {
      // 和 type Query 中的 allHouses 对应
      allHouses: async (): Promise<Idata[]> => {
        const allHouses = await houseModel.find();
        return allHouses;
      },
      spiderPageOne: async () => spider.spiderPageOne()
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
}

export default initGraphQL;
