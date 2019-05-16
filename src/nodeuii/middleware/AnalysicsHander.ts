import * as Koa from 'koa';
import log4js from 'log4js';
import analyticsModel from '../models/analyticsModel';

const logger = log4js.getLogger('globallog');

const analyticsHander = {
  init(app: Koa): void {
    // 捕获 请求
    app.use(async (ctx: Koa.Context, next: Function) => {
      logger.info(ctx.req.url);
      if (ctx.method !== 'OPTIONS') {
        // graphql 请求
        if (ctx.request.url === '/graphql' && ctx.request.body.query) {
          const queryString: string = ctx.request.body.query.replace(
            /[\s|\n]/g,
            ''
          );
          const matchedArray = queryString.match(/(?<={)\w+/);
          const routerName = matchedArray == null ? '' : matchedArray[0];
          analyticsModel.add({ routerName });
        } else {
          analyticsModel.add({ routerName: ctx.request.path.substr(1) });
        }
      }
      await next();
    });
  }
};

export default analyticsHander;
