import { ApolloServer, gql } from 'apollo-server-koa';
import * as Koa from 'koa';
import houseModel from '../models/houseModel';
import analyticsModel from '../models/analyticsModel';
import spider from '../utils/spiderHelper';

interface Iyear {
  year: number;
}

function initGraphQL(app: Koa): void {
  const typeDefs = gql`
    type House {
      _id: ID
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
      allHouses(year: Int): [House]
      spiderPageOne: PageOneArray
      pvs(routerName: String): Int
    }
  `;

  const resolvers = {
    Query: {
      // 和 type Query 中的 allHouses 对应
      allHouses: async (
        _parent: never, // 不使用第一个变量
        args: Iyear
      ): Promise<cdFang.IhouseData[]> => {
        let query = {};
        if (args.year !== 0) {
          const reg = new RegExp(`^${args.year}`);
          query = { beginTime: reg };
        }
        const allHouses = await houseModel.find(query);
        return allHouses;
      },
      spiderPageOne: async () => spider.spiderPageOne(),
      pvs: async (
        _parent: never, // 不使用第一个变量
        args: string
      ): Promise<number> => {
        const analytics = await analyticsModel.find(args);
        return analytics.length;
      }
    }
  };

  const server = new ApolloServer({ typeDefs, resolvers });
  server.applyMiddleware({ app });
}

export default initGraphQL;
