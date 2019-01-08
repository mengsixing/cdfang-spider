import mongoose from 'mongoose';

/* eslint-disable no-console,no-underscore-dangle */

mongoose.connect(
  'mongodb://localhost/test',
  {
    useNewUrlParser: true,
  },
);
const db = mongoose.connection;
db.on('error', console.error.bind(console, '连接mongodb失败。'));
db.once('open', () => {
  console.warn('连接mongodb成功。');
});
// 创建数据库
const HouseSchema = mongoose.Schema({
  _id: String,
  area: String,
  name: String,
  number: Number,
  beginTime: String,
  endTime: String,
  status: String,
});
// 创建表
const HouseCol = mongoose.model('house', HouseSchema);
const result = {
  async add(item) {
    const findItem = await this.find({ _id: item._id });
    if (findItem.length > 0) {
      // 如果状态变更执行更新操作
      if (findItem[0].status !== item.status) {
        this.update(item);
        return item;
      }
      return false;
    }
    const house = new HouseCol(item);
    house.save((err) => {
      if (err) {
        console.error(err);
        return false;
      }
      return true;
    });
    return item;
  },
  async addMany(array) {
    const newArray = [];
    array.forEach(async (item) => {
      const findItem = await this.find({ _id: item._id });
      if (findItem.length === 0) {
        newArray.push(item);
      }
    });
    HouseCol.create(newArray, (err) => {
      if (err) {
        console.log(err, '批量插入失败。');
      }
    });
  },
  update(item) {
    HouseCol.findOneAndUpdate({ _id: item._id }, item, (err) => {
      if (err) {
        console.log(err);
      }
    });
  },
  find(query) {
    return HouseCol.find(query, (err, house) => {
      if (err) return console.error(err);
      return house;
    });
  },
};

export default result;
