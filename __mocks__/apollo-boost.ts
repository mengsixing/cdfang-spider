class ApolloClient {
  constructor() {}
  query() {
    return Promise.resolve({
      data: {
        allHouses: [],
      },
    });
  }
}

export default ApolloClient;
