import _ from 'lodash';
import dayjs from 'dayjs';

// 当前季度
function getCurrentQuarter(dayjsObject = dayjs()) {
	switch (dayjsObject.month()) {
	case 0:
	case 1:
	case 2:
		return {
			thisQuarterStart: dayjsObject.set('month', 0).startOf('month'),
			thisQuarterEnd: dayjsObject.set('month', 2).startOf('month')
		};
	case 3:
	case 4:
	case 5:
		return {
			thisQuarterStart: dayjsObject.set('month', 3).startOf('month'),
			thisQuarterEnd: dayjsObject.set('month', 5).startOf('month')
		};
	case 6:
	case 7:
	case 8:
		return {
			thisQuarterStart: dayjsObject.set('month', 6).startOf('month'),
			thisQuarterEnd: dayjsObject.set('month', 8).startOf('month')
		};
	case 9:
	case 10:
	case 11:
		return {
			thisQuarterStart: dayjsObject.set('month', 9).startOf('month'),
			thisQuarterEnd: dayjsObject.set('month', 11).startOf('month')
		};
	}
}

// 获取增长量
function getIncreaseNumber(number) {
	if (number > 0) {
		return `${number}↑`;
	} else if (number === 0) {
		return `${number}-`;
	} else {
		return `${number}↓`;
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
		var thisWeekStart = dayjs().set('day', 0);
		var thisWeekEnd = dayjs().set('day', 7);
		var weekData = _.filter(allData, item => {
			var beginTime = dayjs(item.beginTime);
			return beginTime > thisWeekStart && beginTime < thisWeekEnd;
		});
		var houseNumber = _.sumBy(weekData, 'number');
		var buildNumber = weekData.length;
		const lastWeekInfo = this._getLastWeekInfo(allData);
		const increaseHouseNumber = houseNumber - lastWeekInfo.houseNumber;
		const increaseBuildNumber = buildNumber - lastWeekInfo.buildNumber;
		return {
			houseNumber,
			buildNumber,
			increaseHouseNumber,
			increaseBuildNumber,
			increaseHouseNumberString: getIncreaseNumber(increaseHouseNumber),
			increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber)
		};
	},
	getThisMonthInfo(allData) {
		var thisMonthStart = dayjs().startOf('month');
		var thisMonthEnd = dayjs().endOf('month');
		var weekData = _.filter(allData, item => {
			var beginTime = dayjs(item.beginTime);
			return beginTime > thisMonthStart && beginTime < thisMonthEnd;
		});
		var houseNumber = _.sumBy(weekData, 'number');
		var buildNumber = weekData.length;
		const lastMonthInfo = this._getLastMonthInfo(allData);
		const increaseHouseNumber = houseNumber - lastMonthInfo.houseNumber;
		const increaseBuildNumber = buildNumber - lastMonthInfo.buildNumber;
		return {
			houseNumber,
			buildNumber,
			increaseHouseNumber,
			increaseBuildNumber,
			increaseHouseNumberString: getIncreaseNumber(increaseHouseNumber),
			increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber)
		};
	},
	getThisQuarterInfo(allData) {
		var time = getCurrentQuarter();
		var thisQuarterStart = time.thisQuarterStart;
		var thisQuarterEnd = time.thisQuarterEnd;
		var quarterData = _.filter(allData, item => {
			var beginTime = dayjs(item.beginTime);
			return beginTime > thisQuarterStart && beginTime < thisQuarterEnd;
		});
		var houseNumber = _.sumBy(quarterData, 'number');
		var buildNumber = quarterData.length;
		const lastQuarterInfo = this._getLastQuarterInfo(allData);
		const increaseHouseNumber = houseNumber - lastQuarterInfo.houseNumber;
		const increaseBuildNumber = buildNumber - lastQuarterInfo.buildNumber;
		return {
			houseNumber,
			buildNumber,
			increaseHouseNumber,
			increaseBuildNumber,
			increaseHouseNumberString: getIncreaseNumber(increaseHouseNumber),
			increaseBuildNumberString: getIncreaseNumber(increaseBuildNumber)
		};
	},
	_getLastWeekInfo(allData) {
		var thisWeekStart = dayjs()
			.set('day', 0)
			.add(-7, 'day');
		var thisWeekEnd = dayjs()
			.set('day', 7)
			.add(-7, 'day');
		var weekData = _.filter(allData, item => {
			var beginTime = dayjs(item.beginTime);
			return beginTime > thisWeekStart && beginTime < thisWeekEnd;
		});
		var houseNumber = _.sumBy(weekData, 'number');
		var buildNumber = weekData.length;
		return {
			houseNumber,
			buildNumber
		};
	},
	_getLastMonthInfo(allData) {
		var thisMonthStart = dayjs()
			.add(-1, 'month')
			.startOf('month');
		var thisMonthEnd = dayjs()
			.add(-1, 'month')
			.endOf('month');
		var weekData = _.filter(allData, item => {
			var beginTime = dayjs(item.beginTime);
			return beginTime > thisMonthStart && beginTime < thisMonthEnd;
		});
		var houseNumber = _.sumBy(weekData, 'number');
		var buildNumber = weekData.length;
		return {
			houseNumber,
			buildNumber
		};
	},
	_getLastQuarterInfo(allData) {
		var time = getCurrentQuarter(dayjs().add(-3, 'month'));
		var thisQuarterStart = time.thisQuarterStart;
		var thisQuarterEnd = time.thisQuarterEnd;
		var quarterData = _.filter(allData, item => {
			var beginTime = dayjs(item.beginTime);
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
			'天府新区,高新南区,龙泉驿区,金牛区,成华区,武侯区,青羊区,锦江区';
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
