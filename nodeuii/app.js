import koa from 'koa';
import serve from 'koa-static';
import cors from 'koa2-cors';
import 'babel-polyfill';

import router from './src/router';
import './src/schedule';

const app = new koa();

// 允许跨域
app.use(cors());
router.init(app);
// 静态资源目录
app.use(serve('client'));

/*eslint no-console: 0 */
console.warn('server is running at : localhost:8082');
app.listen(8082);
