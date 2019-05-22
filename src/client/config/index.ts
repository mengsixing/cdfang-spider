import ApolloClient from 'apollo-boost';

// 默认为当前域名
let serverDomain = '';
if (process.env.NODE_ENV === 'production') {
  serverDomain = 'https://cdfangyuan.cn';
}

function getGraphqlClient(): ApolloClient<{}> {
  return new ApolloClient({
    uri: `${serverDomain}/graphql`
  });
}

const config = {
  serverDomain,
  getGraphqlClient
};

export default config;
