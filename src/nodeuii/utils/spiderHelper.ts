import * as request from 'superagent';
import * as cheerio from 'cheerio';
import * as util from './index';
import houseModel from '../models/houseModel';
import config from '../config';

interface Ipage {
  successArray: cdFang.IhouseData[];
  allLength: number;
}

export const createRequestPromise = (
  pageNo: number
): Promise<cdFang.IhouseData[]> => {
  return new Promise(
    (resolve): void => {
      request
        .post(
          `${config.spiderDomain}/lottery/accept/projectList?pageNo=${pageNo}`
        )
        .end(
          (err, result): void => {
            if (err) {
              return;
            }
            const $ = cheerio.load(result.text);
            const trList: string[][] = [];
            $('#_projectInfo>tr').each(
              (i, tr): void => {
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
};

const initspider = async (pageStart: number, pageEnd: number) => {
  const allPromises = [];
  for (let i = pageStart; i <= pageEnd; i += 1) {
    allPromises.push(createRequestPromise(i));
  }

  const result = await Promise.all(allPromises).then(
    (posts: cdFang.IhouseData[][]): cdFang.IhouseData[] => {
      houseModel.addMany(posts[0]);
      return posts[0];
    }
  );
  return result;
};

const spiderPageOne = async (): Promise<Ipage> => {
  const page: cdFang.IhouseData[] = await createRequestPromise(1);
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
