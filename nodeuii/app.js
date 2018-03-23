import koa from 'koa';
import 'babel-polyfill';
import serve from 'koa-static';

import router from './src/router';
import './src/schedule';

const app = new koa();

app.use(serve('./dist'));
router.init(app);

//404中间件
app.use(async (ctx,next) => {
  if(ctx.status == 404){
    ctx.redirect('/404.html');
  }else {
    next();
  }
});

console.warn('server run at: localhost:3333');
app.listen(3333);
