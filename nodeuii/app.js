import koa from 'koa';
import serve from 'koa-static';
import cors from 'koa2-cors';
import 'babel-polyfill';

import router from './src/router';

const app = new koa();

app.use(cors());
router.init(app);
app.use(serve('client'));

/*eslint no-console: 0 */
console.warn('server run at : localhost:3333');
app.listen(3333);
