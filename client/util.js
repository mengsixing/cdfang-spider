import moment from 'moment';
import _ from 'lodash';

function getCurrentQuarter(month) {
	var currentMonth = month || moment().month();
	switch (currentMonth) {
	case 0:
	case 1:
	case 2:
		return {
			thisQuarterStart: moment()
				.month(0)
				.startOf('month'),
			thisQuarterEnd: moment()
				.month(2)
				.startOf('month')
		};
	case 3:
	case 4:
	case 5:
		return {
			thisQuarterStart: moment()
				.month(3)
				.startOf('month'),
			thisQuarterEnd: moment()
				.month(5)
				.startOf('month')
		};
	case 6:
	case 7:
	case 8:
		return {
			thisQuarterStart: moment()
				.month(6)
				.startOf('month'),
			thisQuarterEnd: moment()
				.month(8)
				.startOf('month')
		};
	case 9:
	case 10:
	case 11:
		return {
			thisQuarterStart: moment()
				.month(9)
				.startOf('month'),
			thisQuarterEnd: moment()
				.month(11)
				.startOf('month')
		};
	}
}

var util = {
	getAllInfo(allData) {
		var houseNumber = _.sumBy(allData, 'number');
		var buildNumber = allData.length;
		return {
			houseNumber,
			buildNumber
		};
	},
	getThisWeekInfo(allData) {
		var thisWeekStart = moment().day(0);
		var thisWeekEnd = moment().day(7);
		var weekData = _.filter(allData, item => {
			var beginTime = moment(item.beginTime);
			return beginTime > thisWeekStart && beginTime < thisWeekEnd;
		});
		var houseNumber = _.sumBy(weekData, 'number');
		var buildNumber = weekData.length;
		return {
			houseNumber,
			buildNumber
		};
	},
	getThisMonthInfo(allData) {
		var thisMonthStart = moment().startOf('month');
		var thisMonthEnd = moment().endOf('month');
		var weekData = _.filter(allData, item => {
			var beginTime = moment(item.beginTime);
			return beginTime > thisMonthStart && beginTime < thisMonthEnd;
		});
		var houseNumber = _.sumBy(weekData, 'number');
		var buildNumber = weekData.length;
		return {
			houseNumber,
			buildNumber
		};
	},
	getThisQuarterInfo(allData) {
		var time = getCurrentQuarter();
		var thisQuarterStart = time.thisQuarterStart;
		var thisQuarterEnd = time.thisQuarterEnd;
		var quarterData = _.filter(allData, item => {
			var beginTime = moment(item.beginTime);
			return beginTime > thisQuarterStart && beginTime < thisQuarterEnd;
		});
		var houseNumber = _.sumBy(quarterData, 'number');
		var buildNumber = quarterData.length;
		return {
			houseNumber,
			buildNumber
		};
	},
	sortArea(areaArray) {
		//把主城区排在前面
		const mainArea =
			'天府新区,高新南区,龙泉驿区,成华区,武侯区,青羊区,金牛区,锦江区';
		var newArray = _.sortBy(areaArray, [
			function(area) {
				return -mainArea.indexOf(area);
			}
		]);
		return newArray;
	},
	getCurrentQuarter
};

export default util;
