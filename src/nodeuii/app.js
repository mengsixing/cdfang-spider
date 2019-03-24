import 'babel-polyfill';
import https from 'https';
import fs from 'fs';
import Koa from 'koa';
import serve from 'koa-static';
import cors from 'koa2-cors';
import log4js from 'log4js';

import ErrorHander from './middleware/ErrorHander';
import controller from './controllers';
import config from './config';
import './controllers/schedule';

const app = new Koa();

// 错误日志记录
log4js.configure({
  appenders: {
    globallog: {
      type: 'file',
      filename: './logs/globallog.log',
    },
  },
  categories: {
    default: {
      appenders: ['globallog'],
      level: 'error',
    },
  },
});
const logger = log4js.getLogger('globallog');
ErrorHander.init(app, logger);

// 允许跨域
app.use(cors());
controller.init(app);
// 静态资源目录
app.use(serve('client'));

// 服务器上的地址
if (fs.existsSync('/etc/letsencrypt/live/yinhengli.com/privkey.pem')) {
  const serverKey = '/etc/letsencrypt/live/yinhengli.com/privkey.pem';
  const serverCert = '/etc/letsencrypt/live/yinhengli.com/fullchain.pem';
  https
    .createServer(
      {
        key: fs.readFileSync(serverKey),
        cert: fs.readFileSync(serverCert),
      },
      app.callback(),
    )
    .listen(config.serverPort, () => {
      /* eslint no-console: 0 */
      console.log(`server is running at : https://localhost:${config.serverPort}`);
    });
} else {
  /* eslint no-console: 0 */
  console.log(`server is running at : http://localhost:${config.serverPort}`);
  app.listen(config.serverPort);
}


// export default app;
module.exports = app;
