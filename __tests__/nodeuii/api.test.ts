/*eslint-disable */
import * as supertest from 'supertest';
const app = require('../../dist/app.js');

var server = app.listen();

describe('api 测试', () => {
  function request() {
    return supertest(server);
  }

  it('api 返回数据格式是否正确？', done => {
    return request()
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

  afterAll(() => {
    server.close();
  });
});
