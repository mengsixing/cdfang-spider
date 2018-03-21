import koa from 'koa'

import "babel-polyfill"
const request = require('superagent')
const cheerio = require('cheerio')

const app = new koa();

app.use(async (ctx) => {
  const mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/my_database');
  var result = await new Promise((resolve,reject)=>{
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
      // res.myData=trList;
      resolve(trList);
    });
  })
  ctx.body = result;
})

console.log('server run at4: localhost:3333');
app.listen(3333)
