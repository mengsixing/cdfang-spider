// import { ObjectID } from 'mongodb'
import spider from '../../utils/spiderHelper';
import houseModel from '../../models/houseModel';
import analyticsModel from '../../models/analyticsModel';

interface Iyear {
  year: number;
}

interface Ipvs {
  routerName: string;
}

export default {
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

    let allHouses;
    if (process.env.NODE_ENV === 'test') {
      allHouses = [
        {
          _id: '8493C6779815042CE053AC1D15D7580C',
          area: '温江区',
          name: '明信城',
          number: 388,
          beginTime: '2019-03-22 09:00:00',
          endTime: '2019-03-24 18:00:00',
          status: '正在报名',
          __v: 0
        }
      ];
    } else {
      allHouses = await houseModel.find(query);
    }
    return allHouses;
  },
  spiderPageOne: async () => spider.spiderPage(),
  pvs: async (
    _parent: never, // 不使用第一个变量
    args: Ipvs
  ): Promise<number> => {
    let analytics;
    if (process.env.NODE_ENV === 'test') {
      analytics = {
        length: 7864
      };
    } else {
      analytics = await analyticsModel.find(args);
    }
    return analytics.length;
  }
};
