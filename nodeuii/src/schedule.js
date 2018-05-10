import schedule from 'node-schedule';
import request from 'superagent';
import cheerio from 'cheerio';
import * as util from './util';
import myMongoose from './mongoose.js';


function grabPage(pageNo) {
	return new Promise((resolve) => {
		request
			.post('http://171.221.172.13:8888/lottery/accept/projectList?pageNo=' + pageNo)
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
}

//定时器middleware,每隔15分钟爬一次
const runEvery15Minute = async () => {
	schedule.scheduleJob('*/15 * * * *', async function () {
		console.warn('爬取数据...');
		var pageList = await Promise.all([grabPage(1),grabPage(2),grabPage(3)]);
		var page=[...pageList[0],...pageList[1],...pageList[2]];
		var newNumber = await new Promise((resolve) => {
			var newDataNumber = 0;
			var i = 0;
			page.forEach((item) => {
				myMongoose.add(item).then((isSuccess => {
					i++;
					isSuccess && newDataNumber++;
					if (i == page.length - 1) {
						resolve(newDataNumber);
					}
				}));
			});
		});
		console.warn(`抓取数据${page.length}条，新数据${newNumber}条。`);
	});
};

//每15分钟自动抓取前三页数据(房协网一个时间点不可能同时发布30套房源)
runEvery15Minute();
