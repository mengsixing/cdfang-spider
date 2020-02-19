import Router from 'koa-router';
import * as Koa from 'koa';
import fs from 'fs';
// eslint-disable-next-line import/no-extraneous-dependencies
import path from "path";
import houseModel from '../models/houseModel';
import spider from '../utils/spiderHelper';

const router = new Router();

router
  .get(
    '/initspider',
    async (ctx): Promise<void> => {
      const {
        query: { pageStart, pageEnd }
      } = ctx.request;

      const pageStartNumber = Number.parseInt(pageStart, 10);
      const pageEndNumber = Number.parseInt(pageEnd, 10);
      const result = await spider.initspider(pageStartNumber, pageEndNumber);
      ctx.body = result;
    }
  )
  .get(
    '/getMongoData',
    async (ctx): Promise<void> => {
      let result = [];
      if (process.env.NODE_ENV === 'test') {
        result = [
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
        result = await houseModel.find();
      }
      ctx.body = result;
    }
  )
  .get(
    '/spiderPage',
    async (ctx): Promise<void> => {
      const {
        query: { pageNo }
      } = ctx.request;
      const result = await spider.spiderPage(pageNo);
      ctx.body = result;
    }
  )
  // 支持 browserRouter
  .get(/\/20[1-9][0-9]/, ctx => {
    const file = fs.readFileSync(path.join('client/index.html'));
    ctx.set('Content-Type', 'text/html; charset=utf-8');
    ctx.body = file;
  });

export default {
  init(app: Koa): void {
    app.use(router.routes()).use(router.allowedMethods());
  }
};
