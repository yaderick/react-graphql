import React from 'react';
import Loadable from 'react-loadable';
import LoadingIndicator from '../components/Loading';

const loaderWrapper = loader => Loadable({
  loading: () => <LoadingIndicator />,
  loader,
});

export default loaderWrapper;
