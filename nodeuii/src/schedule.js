import schedule from 'node-schedule';
import request from 'superagent';
import cheerio from 'cheerio';
import * as util from './util';
import myMongoose from './mongoose.js';

//定时器middleware
const runEveryMinute = async () => {
  schedule.scheduleJob('* 1 * * * *', async function () {
    console.warn('爬取数据...');
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
    var newNumber= await new Promise((resolve)=>{
      var newDataNumber = 0;
      var i=0;
      page.forEach((item) => {
        myMongoose.add(item).then((isSuccess=>{
          i++;
          isSuccess && newDataNumber++;
          if(i==page.length-1){
            resolve(newDataNumber);
          }
        }));
      });
    });
    
    console.warn(`抓取数据${page.length}条，新数据${newNumber}条。`);
  });
};

//每分钟自动抓取第一页数据
runEveryMinute();
