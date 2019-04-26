import request from 'superagent';
import cheerio from 'cheerio';
import * as util from './index';
import houseModel from '../models/houseModel';
import config from '../config';

const initspider = async (pageStart, pageEnd) => {
    const allPromises = [];
    for (let i = pageStart; i <= pageEnd; i += 1) {
        const page = new Promise((resolve) => {
            request
                .post(`${config.spiderDomain}/lottery/accept/projectList?pageNo=${i}`)
                .end((err, result) => {
                    if (err) {
                        return;
                    }
                    const $ = cheerio.load(result.res.text);
                    const trList = [];
                    $('#_projectInfo>tr').each((idx, tr) => {
                        const tdList = [];
                        $(tr)
                            .find('td')
                            .each((j, td) => {
                                tdList.push($(td).text());
                            });
                        trList.push(tdList);
                    });
                    resolve(util.transformArray(trList));
                });
        });
        allPromises.push(page);
    }
    const result = await Promise.all(allPromises).then((posts) => {
        houseModel.addMany(posts[0]);
        return posts;
    });
    return result;
};

const spiderPageOne = async () => {
    const page = await new Promise((resolve) => {
        request.post(`${config.spiderDomain}/lottery/accept/projectList`).end((err, result) => {
            if (err) {
                return;
            }
            const $ = cheerio.load(result.res.text);
            const trList = [];
            $('#_projectInfo>tr').each((idx, tr) => {
                const tdList = [];
                $(tr)
                    .find('td')
                    .each((j, td) => {
                        tdList.push($(td).text());
                    });
                trList.push(tdList);
            });
            resolve(util.transformArray(trList));
        });
    });
    // 生成一个Promise对象的数组
    const promises = page.map(item => new Promise((resolve) => {
        resolve(houseModel.add(item));
    }),);
    const successArray = await Promise.all(promises)
        .then(posts => posts.filter(item => !!item))
        .catch(() => []);
    return {
        successArray,
        allLength: page.length,
    };
};

export default {
    initspider,
    spiderPageOne,
};
