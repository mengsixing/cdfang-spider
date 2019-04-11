import Router from 'koa-router';
import request from 'superagent';
import cheerio from 'cheerio';
import * as util from '../utils';
import houseModel from '../models/houseModel';
import config from '../config';
import initGraphQL from './graphql';


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
      houseModel.addMany(posts[0]);
      [ctx.body] = posts;
    });
  })
  .get('/getMongoData', async (ctx) => {
    let result = [];
    if (process.env.NODE_ENV === 'test') {
      result = [{
        _id: '8493C6779815042CE053AC1D15D7580C',
        area: '温江区',
        name: '明信城',
        number: 388,
        beginTime: '2019-03-22 09:00:00',
        endTime: '2019-03-24 18:00:00',
        status: '正在报名',
        __v: 0,
      }];
    } else {
      result = await houseModel.find();
    }
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
        resolve(houseModel.add(item));
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
    initGraphQL(app);
  },
};
