let serverDomain = 'http://localhost:8082';
if (process.env.NODE_ENV === 'production') {
  serverDomain = 'https://yinhengli.com:8082';
}

const config = {
  serverDomain,
};

export default config;
