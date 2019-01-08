import Router from 'koa-router';
import request from 'superagent';
import cheerio from 'cheerio';
import * as util from './util';
import myMongoose from './mongoose';
import config from './config';

const router = new Router();

router
  .get('/initspider', async (ctx) => {
    const {
      query: { pageStart, pageEnd },
    } = ctx.request;
    const allPromises = [];
    for (let i = pageStart; i <= pageEnd; i += 1) {
      const page = new Promise((resolve) => {
        request
          .post(`${config.spiderDomain}/lottery/accept/projectList?pageNo=${i}`)
          .end((err, result) => {
            const $ = cheerio.load(result.res.text);
            const trList = [];
            $('#_projectInfo>tr').each((idx, tr) => {
              const tdList = [];
              $(tr)
                .find('td')
                .each((j, td) => {
                  tdList.push($(td).text());
                });
              trList.push(tdList);
            });
            resolve(util.transformArray(trList));
          });
      });
      allPromises.push(page);
      // allArray = allArray.concat();
    }
    await Promise.all(allPromises).then((posts) => {
      myMongoose.addMany(posts[0]);
      [ctx.body] = posts;
    });
  })
  .get('/getMongoData', async (ctx) => {
    const result = await myMongoose.find();
    ctx.body = result;
  })
  .get('/spiderPageOne', async (ctx) => {
    const page = await new Promise((resolve) => {
      request.post(`${config.spiderDomain}/lottery/accept/projectList`).end((err, result) => {
        const $ = cheerio.load(result.res.text);
        const trList = [];
        $('#_projectInfo>tr').each((idx, tr) => {
          const tdList = [];
          $(tr)
            .find('td')
            .each((j, td) => {
              tdList.push($(td).text());
            });
          trList.push(tdList);
        });
        resolve(util.transformArray(trList));
      });
    });
    // 生成一个Promise对象的数组
    const promises = page.map(
      item => new Promise((resolve) => {
        resolve(myMongoose.add(item));
      }),
    );
    const successArray = await Promise.all(promises)
      .then(posts => posts.filter(item => !!item))
      .catch(() => []);
    ctx.body = {
      successArray,
      allLength: page.length,
    };
  });

export default {
  init(app) {
    app.use(router.routes()).use(router.allowedMethods());
  },
};
