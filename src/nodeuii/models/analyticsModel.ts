import DbHelper from '../utils/dbHelper';

const mongoose = DbHelper.connect();

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
    house.save(
      (err): boolean => {
        if (err) {
          throw new Error(err);
        }
        return true;
      }
    );
    return item;
  },

  find(query: object) {
    return AnalyticsCol.find(query, (err, analytics: cdFang.Ianalytics[]) => {
      if (err) {
        throw new Error(err);
      }
      return analytics;
    });
  }
};

export default analyticsModel;
