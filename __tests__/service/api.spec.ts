/*eslint-disable */
import supertest from 'supertest';
const server = require('../../dist/app.js');

describe('api 测试', () => {
  function request() {
    return supertest(server);
  }

  it('getMongoData 接口返回数据格式是否正确？', done => {
    request()
      .get('/getMongoData')
      .then(response => {
        const house = JSON.parse(response.text)[0];
        expect(house).toHaveProperty('_id');
        expect(house).toHaveProperty('area');
        expect(house).toHaveProperty('name');
        expect(house).toHaveProperty('number');
        expect(house).toHaveProperty('beginTime');
        expect(house).toHaveProperty('endTime');
        expect(house).toHaveProperty('status');
        done();
      });
  });

  it('获取 pvs 接口是否正确？', done => {
    request()
      .get('/graphql?query={pvs(routerName:%22allHouses%22)}')
      .then(response => {
        const pvsObj = JSON.parse(response.text).data;
        expect(pvsObj).toHaveProperty('pvs');
        expect(typeof pvsObj.pvs).toBe('number');
        done();
      });
  });

  it('获取房源接口是否正确？', done => {
    request()
      .get(
        '/graphql?query={%20allHouses(year:%200)%20{%20_id%20area%20name%20number%20beginTime%20endTime%20status%20}%20}'
      )
      .then(response => {
        const allHouses = JSON.parse(response.text).data.allHouses;
        expect(allHouses instanceof Array);
        const house = allHouses[0];
        expect(house).toHaveProperty('_id');
        expect(house).toHaveProperty('area');
        expect(house).toHaveProperty('name');
        expect(house).toHaveProperty('number');
        expect(house).toHaveProperty('beginTime');
        expect(house).toHaveProperty('endTime');
        expect(house).toHaveProperty('status');
        done();
      });
  });

  afterAll(() => {
    server.close();
  });
});
