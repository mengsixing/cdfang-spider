// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const request = require('superagent')
const cheerio = require('cheerio')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    //请求
    request
      .post('http://171.221.172.13:8888/lottery/accept/projectList')
      .end((err, result) => {
         var $=cheerio.load(result.res.text);
         var trList=[];
         $('#_projectInfo>tr').each((i,tr)=>{
           var tdList=[];
           $(tr).find('td').each((j,td)=>{
              tdList.push($(td).text());
           });
          trList.push(tdList);
         });
         res.myData=trList;
         app.render(req,res,'/')
      });
    
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
