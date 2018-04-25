import ApolloClient, { InMemoryCache } from 'apollo-boost';

const cache = new InMemoryCache({
  logger: console.log,
  loggerEnabled: true,
});

const client = new ApolloClient({
  uri: '/graphql',
  cache,
  connectToDevTools: true,
  request: (operation) => {
    operation.setContext({
      headers: {
        Accept: 'application/json',
        mode: 'no-cors',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
      },
    });
  },
  onError: ({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
      console.log('networkError', networkError);
    }
  },
});

export default client;
