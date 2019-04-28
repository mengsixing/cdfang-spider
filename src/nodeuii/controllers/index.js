import Router from 'koa-router';
import houseModel from '../models/houseModel';
import initGraphQL from './graphql';
import spider from '../utils/spiderHelper';


const router = new Router();

router
  .get('/initspider', async (ctx) => {
    const {
      query: { pageStart, pageEnd },
    } = ctx.request;
    const result = await spider.initspider(pageStart, pageEnd);
    ctx.body = result;
  })
  .get('/getMongoData', async (ctx) => {
    let result = [];
    if (process.env.NODE_ENV === 'test') {
      result = [{
        _id: '8493C6779815042CE053AC1D15D7580C',
        area: '温江区',
        name: '明信城',
        number: 388,
        beginTime: '2019-03-22 09:00:00',
        endTime: '2019-03-24 18:00:00',
        status: '正在报名',
        __v: 0,
      }];
    } else {
      result = await houseModel.find();
    }
    ctx.body = result;
  })
  .get('/spiderPageOne', async (ctx) => {
    const result = await spider.spiderPageOne();
    ctx.body = result;
  });

export default {
  init(app) {
    app.use(router.routes()).use(router.allowedMethods());
    initGraphQL(app);
  },
};
