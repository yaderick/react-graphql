import React from 'react';
import { Switch } from 'react-router-dom';
import WithAuth from '@/components/WithAuth';
import PropTypes from 'prop-types';
import routerconfig from './routeConfig';

const PrivateRouter = () => (
  <Switch>
    {routerconfig.map(props => <WithAuth {...props} key={props.path} />)}
  </Switch>
);

PrivateRouter.propTypes = {
  path: PropTypes.string,
};

export default PrivateRouter;
