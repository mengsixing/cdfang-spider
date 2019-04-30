/*eslint-disable */
import * as supertest from 'supertest';
import * as app from '../../dist/app';

var server = app.listen();

describe('api 测试', () => {
  function request() {
    return supertest(server);
  }

  it('api 返回数据格式是否正确？', done => {
    return request()
      .get('/getMongoData')
      .then(response => {
        const item1 = JSON.parse(response.text)[0];
        expect(item1).toHaveProperty('_id');
        expect(item1).toHaveProperty('area');
        expect(item1).toHaveProperty('name');
        expect(item1).toHaveProperty('number');
        expect(item1).toHaveProperty('beginTime');
        expect(item1).toHaveProperty('endTime');
        expect(item1).toHaveProperty('status');
        done();
        server.close();
      });
  });
});
