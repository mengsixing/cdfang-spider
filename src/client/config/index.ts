import ApolloClient from 'apollo-boost';

// 默认为当前域名
const serverDomain = '';

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
