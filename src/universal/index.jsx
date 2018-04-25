import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import store from '@/redux/store';
import Router from '@/routes';
import client from './apollo/apolloClient';

const element = (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  </Provider>
);

ReactDOM.render(
  element,
  document.getElementById('root'),
);
