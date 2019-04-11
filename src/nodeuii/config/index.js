export default {
  spiderDomain: 'https://gfdj.cdfgj.gov.cn',
  serverPort: 8082,
  getStaticRoot() {
    return process.env.NODE_ENV === 'development' ? 'dist/client' : 'client';
  },
};
