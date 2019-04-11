import ApolloClient from 'apollo-boost';

let serverDomain = 'http://localhost:8082';
if (process.env.NODE_ENV === 'production') {
  serverDomain = 'https://yinhengli.com:8082';
}

function getGraphqlClient() {
  return new ApolloClient({
    uri: `${serverDomain}/graphql`,
  });
}

const config = {
  serverDomain,
  getGraphqlClient,
};

export default config;
