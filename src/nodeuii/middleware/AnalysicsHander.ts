import * as Koa from 'koa';
import analyticsModel from '../models/analyticsModel';

const ErrorHander = {
  init(app: Koa): void {
    // 捕获 请求
    app.use(async (ctx: Koa.Context, next: Function) => {
      if (ctx.request.method !== 'OPTIONS') {
        analyticsModel.add({ ip: ctx.request.ip });
      }
      await next();
    });
  }
};

export default ErrorHander;
