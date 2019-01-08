import 'babel-polyfill';
import https from 'https';
import fs from 'fs';
import koa from 'koa';
import serve from 'koa-static';
import cors from 'koa2-cors';
import log4js from 'log4js';

import ErrorHander from './middlewares/ErrorHander';
import router from './src/router';
import './src/schedule';

const app = new koa();

// 错误日志记录
log4js.configure({
	appenders: { globallog: { type: 'file', filename: './logs/globallog.log' } },
	categories: { default: { appenders: ['globallog'], level: 'error' } }
});
const logger = log4js.getLogger('globallog');
new ErrorHander().init(app, logger);

// 允许跨域
app.use(cors());
router.init(app);
// 静态资源目录
app.use(serve('client'));

// 我服务器上的地址
if (fs.existsSync('/etc/letsencrypt/live/yinhengli.com/privkey.pem')) {
	const serverKey = '/etc/letsencrypt/live/yinhengli.com/privkey.pem';
	const serverCert = '/etc/letsencrypt/live/yinhengli.com/fullchain.pem';
	https
		.createServer(
			{
				key: fs.readFileSync(serverKey),
				cert: fs.readFileSync(serverCert)
			},
			app
		)
		.listen(8082, () => {
			/*eslint no-console: 0 */
			console.log('server is running at : https://localhost:8082');
		});
} else {
	/*eslint no-console: 0 */
	console.log('server is running at : http://localhost:8082');
	app.listen(8082);
}
