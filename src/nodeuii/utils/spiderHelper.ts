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
): Promise<cdFang.IhouseData[]> => new Promise(
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

const initspider = async (pageStart: number, pageEnd: number):Promise<cdFang.IhouseData[]> => {
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

const spiderPage = async (pageNo = 1): Promise<Ipage> => {
  const page: cdFang.IhouseData[] = await createRequestPromise(pageNo);
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
      posts => posts.filter((item): boolean => !!item) as cdFang.IhouseData[]
    )
    .catch(() => []);
  return {
    successArray,
    allLength: page.length
  };
};

const spiderHousePrice = async (houseName:string): Promise<number> => {
  const housePrice =  new Promise<number>((resolve)=>{
    request
    .get(
      `https://cd.lianjia.com/xiaoqu/rs${encodeURIComponent(houseName)}/`
    )
    .end(
      (err, result): void => {
        if (err) {
          return;
        }
        const $ = cheerio.load(result.text);
        let price;
        if($('.totalPrice').length === 1){
          price = Number.parseFloat($('.totalPrice').children('span').text()) || 0
        } else {
          price = 0
        }
        resolve(price)
      }
    );
  })
  return housePrice;
};

const initSpiderPrice = async (): Promise<string> => {
  const houses = await houseModel.find({price:undefined})
  houses.forEach(house=>{
    if(typeof(house.price) !== 'number'){
      request
        .get(
          `${config.spiderPriceDomain}/xiaoqu/rs${encodeURIComponent(house.name)}/`
        )
        .end(
          (err, result): void => {
            if (err) {
              return;
            }
            const $ = cheerio.load(result.text);
            let price;
            if($('.totalPrice').length === 1){
              price = Number.parseFloat($('.totalPrice').children('span').text()) || 0
            } else {
              price = 0
            }
            houseModel.update({name:house.name},{price})
          }
        );
    }
  })

  return '后台操作进行中';
};

export default {
  initspider,
  initSpiderPrice,
  spiderPage,
  spiderHousePrice
};
