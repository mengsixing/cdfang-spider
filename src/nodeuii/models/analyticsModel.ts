import log4js from 'log4js';
import DbHelper from '../utils/dbHelper';

const mongoose = DbHelper.connect();
const logger = log4js.getLogger('globallog');

// 创建数据库
const analyticsSchema = new mongoose.Schema({
  routerName: String,
  createdTime: { type: Date, default: Date.now }
});
// 创建表
const AnalyticsCol = mongoose.model('analytics', analyticsSchema);

const analyticsModel = {
  async add(item: cdFang.Ianalytics) {
    const house = new AnalyticsCol(item);
    house.save(err => {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    });
    return item;
  },

  find(query: object) {
    return AnalyticsCol.find(query, err => {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    });
  }
};

export default analyticsModel;
