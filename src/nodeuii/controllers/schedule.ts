import * as schedule from 'node-schedule';
import log4js from 'log4js';
import houseModel from '../models/houseModel';
import { createRequestPromise } from '../utils/spiderHelper';

const logger = log4js.getLogger('globallog');

// 定时器middleware,每隔15分钟爬一次
const runEvery15Minute = async (): Promise<void> => {
  schedule.scheduleJob(
    '*/15 * * * *',
    async (): Promise<void> => {
      const pageList = await Promise.all([
        createRequestPromise(1),
        createRequestPromise(2),
        createRequestPromise(3)
      ]);
      const page = [...pageList[0], ...pageList[1], ...pageList[2]];
      const newNumber = await new Promise(
        (resolve): void => {
          let newDataNumber = 0;
          let i = 0;
          page.forEach(
            (item): void => {
              houseModel.add(item).then(
                (isSuccess): void => {
                  i += 1;
                  if (isSuccess) {
                    newDataNumber += 1;
                  }
                  if (i === page.length - 1) {
                    resolve(newDataNumber);
                  }
                }
              );
            }
          );
        }
      );
      logger.info(`抓取数据${page.length}条，新数据${newNumber}条。`);
    }
  );
};

// 每15分钟自动抓取前三页数据(房协网一个时间点不可能同时发布30套房源)
runEvery15Minute();
