/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console,no-underscore-dangle */
import DbHelper from '../utils/dbHelper';

const mongoose = DbHelper.connect();

// 创建数据库
const HouseSchema = mongoose.Schema({
  _id: String,
  area: String,
  name: String,
  number: Number,
  beginTime: String,
  endTime: String,
  status: String
});
// 创建表
const HouseCol = mongoose.model('house', HouseSchema);

const houseModel = {
  async add(item): Promise<boolean | cdFang.IhouseData> {
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
    house.save(
      (err): boolean => {
        if (err) {
          console.error(err);
          return false;
        }
        return true;
      }
    );
    return item;
  },
  async addMany(array: cdFang.IhouseData[]): Promise<void> {
    const newArray = [];
    array.forEach(
      async (item: cdFang.IhouseData): Promise<void> => {
        const findItem = await this.find({ _id: item._id });
        if (findItem.length === 0) {
          newArray.push(item);
        }
      }
    );
    HouseCol.create(
      newArray,
      (err): void => {
        if (err) {
          console.log(err, '批量插入失败。');
        }
      }
    );
  },
  update(item: cdFang.IhouseData): void {
    HouseCol.findOneAndUpdate(
      { _id: item._id },
      item,
      (err): void => {
        if (err) {
          console.log(err);
        }
      }
    );
  },
  find(query?: object): any {
    return HouseCol.find(
      query,
      (err, house): any | void => {
        if (err) console.error(err);
        return house;
      }
    );
  }
};

export default houseModel;
