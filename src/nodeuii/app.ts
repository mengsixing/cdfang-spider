import Koa from 'koa';
import serve from 'koa-static';
import log4js from 'log4js';
import koaBody from 'koa-body';

import ErrorHander from './middleware/ErrorHander';
import AnalysicsHander from './middleware/AnalysicsHander';
import controller from './controllers';
import config from './config';
import './controllers/schedule';
import initGraphQL from "./graphql";

const app = new Koa();
app.use(koaBody());

// 错误日志记录
log4js.configure({
  appenders: {
    globallog: {
      type: 'file',
      filename: './logs/globallog.log'
    }
  },
  categories: {
    default: {
      appenders: ['globallog'],
      level: 'debug'
    }
  }
});
const logger = log4js.getLogger('globallog');

ErrorHander.init(app, logger);
AnalysicsHander.init(app);

// 初始化路由
controller.init(app);
// 初始化 graphql
initGraphQL(app)
// 静态资源目录
app.use(serve('client'));

// eslint-disable-next-line no-console
console.log(`server is running at : http://localhost:${config.serverPort}`);

// 全局异常捕获
process.on('uncaughtException', err => {
  logger.error(JSON.stringify(err));
});


// 导出给 jest 测试
module.exports = app.listen(config.serverPort);
