import schedule from 'node-schedule';
import request from 'superagent';
import cheerio from 'cheerio';
import * as util from './util';
import myMongoose from './mongoose.js';

//定时器middleware
const runEveryMinute = async () => {
  schedule.scheduleJob('1 * * * * *',async function () {
    var page = await new Promise((resolve) => {
      request
        .post('http://171.221.172.13:8888/lottery/accept/projectList')
        .end((err, result) => {
          var $ = cheerio.load(result.res.text);
          var trList = [];
          $('#_projectInfo>tr').each((i, tr) => {
            var tdList = [];
            $(tr).find('td').each((j, td) => {
              tdList.push($(td).text());
            });
            trList.push(tdList);
          });
          resolve(util.transformArray(trList));
        });
    });
    page.forEach(item => {
      myMongoose.add(item);
    });
    console.warn('抓取成功');
  });
};

//每分钟自动抓取第一页数据
runEveryMinute();
