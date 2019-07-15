const mongoDBHost =
  process.env.BUILD_ENV === 'docker'
    ? 'mongodb://database/test'
    : 'mongodb://localhost/test';

export default {
  spiderDomain: 'http://zw.cdzj.chengdu.gov.cn',
  serverPort: 8082,
  // 和 docker-compose 里的 mongo 容器相对应
  databaseUrl: mongoDBHost
};
