/*eslint-disable */
import supertest from 'supertest';
import app from '../../dist/app';

describe('api 测试', () => {

  function request(){
    return supertest(app.listen());
  }

  it('api 返回数据格式是否正确？', () => {
    request()
      .get('/getMongoData')
      .expect(200)
      .end((err, res) => {
        const item1 = JSON.parse(res.text)[0];
        expect(item1).toHaveProperty('_id');
        expect(item1).toHaveProperty('area');
        expect(item1).toHaveProperty('name');
        expect(item1).toHaveProperty('number');
        expect(item1).toHaveProperty('beginTime');
        expect(item1).toHaveProperty('endTime');
        expect(item1).toHaveProperty('status');
        if (err) throw err;
      });
  });

  afterEach(() => {
    app.listen().close();
  });

});
