/* eslint-disable no-underscore-dangle */
import log4js from 'log4js';
import { FilterQuery } from 'mongoose';
import DbHelper from '../utils/dbHelper';

const mongoose = DbHelper.connect();
const logger = log4js.getLogger('globallog');

// 创建数据库
const HouseSchema = new mongoose.Schema({
  _id: String,
  area: String,
  name: String,
  number: Number,
  beginTime: String,
  endTime: String,
  status: String,
  price: Number
});
// 创建表
const HouseCol = mongoose.model('house', HouseSchema);

const houseModel = {
  /**
   *
   * 新增一个房源信息，若存在，则更新
   * @param {cdFang.IhouseData} item
   * @returns {(Promise<boolean | cdFang.IhouseData>)}
   */
  async add(item: cdFang.IhouseData): Promise<boolean | cdFang.IhouseData> {
    let result: boolean | cdFang.IhouseData = item;
    const findItem = await this.find({ _id: item._id });
    if (findItem.length > 0) {
      // 如果状态变更执行更新操作
      if (findItem[0].status !== item.status) {
        this.findOneAndUpdate(item);
      } else {
        result = false;
      }
    } else {
      const house = new HouseCol(item);
      result = await new Promise(resolve => {
        house.save(err => {
          if (err) {
            logger.error(JSON.stringify(err));
            resolve(false);
          }
        });
      });
    }
    return result;
  },

  /**
   *
   * 批量插入房源信息
   * @param {cdFang.IhouseData[]} array
   * @returns {Promise<void>}
   */
  async addMany(array: cdFang.IhouseData[]): Promise<void> {
    const newArray: cdFang.IhouseData[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of array) {
      const findItem = await this.find({ _id: item._id });
      if (findItem.length === 0) {
        newArray.push(item);
      }
    }

    HouseCol.create(
      newArray,
      (err): void => {
        if (err) {
          logger.error(JSON.stringify(err));
        }
      }
    );
  },

  /**
   *
   * 更新一个房源信息
   * @param {cdFang.IhouseData} item
   */
  findOneAndUpdate(item: Partial<cdFang.IhouseData>,query: FilterQuery<cdFang.IhouseData> = { _id: item._id }): void {
    HouseCol.findOneAndUpdate(
      query,
      item,
      null,
      (err) => {
        if (err) {
          logger.error(JSON.stringify(err));
        }
      }
    );
  },

  update(query: FilterQuery<cdFang.IhouseData>,item: Partial<cdFang.IhouseData>): void {
    HouseCol.updateOne(
      query,
      item,
      null,
      (err) => {
        if (err) {
          logger.error(JSON.stringify(err));
        }
      }
    );
  },

  /**
   *
   *
   * @param {object} [query]
   * @returns {cdFang.IhouseData[]}
   */
  find(query: FilterQuery<cdFang.IhouseData>): cdFang.IhouseData[] {
    return HouseCol.find(query, err => {
      if (err) {
        logger.error(JSON.stringify(err));
      }
    });
  }
};

export default houseModel;
