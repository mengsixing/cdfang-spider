import * as request from 'superagent';
import * as cheerio from 'cheerio';
import * as util from './index';
import houseModel from '../models/houseModel';
import config from '../config';

const initspider = async (pageStart: number, pageEnd: number) => {
  const allPromises = [];
  for (let i = pageStart; i <= pageEnd; i += 1) {
    const page = new Promise(
      (resolve): void => {
        request
          .post(`${config.spiderDomain}/lottery/accept/projectList?pageNo=${i}`)
          .end(
            (err, result): void => {
              if (err) {
                return;
              }
              const $ = cheerio.load(result.text);
              const trList: string[][] = [];
              $('#_projectInfo>tr').each(
                (idx, tr): void => {
                  const tdList: string[] = [];
                  $(tr)
                    .find('td')
                    .each(
                      (j, td): void => {
                        tdList.push($(td).text());
                      }
                    );
                  trList.push(tdList);
                }
              );
              resolve(util.transformArray(trList));
            }
          );
      }
    );
    allPromises.push(page);
  }
  const result = await Promise.all(allPromises).then(
    (posts: cdFang.IhouseData[][]): cdFang.IhouseData[] => {
      houseModel.addMany(posts[0]);
      return posts[0];
    }
  );
  return result;
};

interface Ipage {
  successArray: cdFang.IhouseData[];
  allLength: number;
}

const spiderPageOne = async (): Promise<Ipage> => {
  const page: cdFang.IhouseData[] = await new Promise(
    (resolve): void => {
      request.post(`${config.spiderDomain}/lottery/accept/projectList`).end(
        (err, result): void => {
          if (err) {
            return;
          }
          const $ = cheerio.load(result.text);
          const trList: string[][] = [];
          $('#_projectInfo>tr').each(
            (idx, tr): void => {
              const tdList: string[] = [];
              $(tr)
                .find('td')
                .each(
                  (j, td): void => {
                    tdList.push($(td).text());
                  }
                );
              trList.push(tdList);
            }
          );
          resolve(util.transformArray(trList));
        }
      );
    }
  );
  // 生成一个Promise对象的数组
  const promises = page.map(
    (item): Promise<cdFang.IhouseData | boolean> =>
      new Promise(
        (resolve): void => {
          resolve(houseModel.add(item));
        }
      )
  );
  const successArray = await Promise.all(promises)
    .then(
      (posts: cdFang.IhouseData[]): cdFang.IhouseData[] =>
        posts.filter((item): boolean => !!item)
    )
    .catch((): cdFang.IhouseData[] => []);
  return {
    successArray,
    allLength: page.length
  };
};

export default {
  initspider,
  spiderPageOne
};
