
import React from 'react';
// import { Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';

const history = createBrowserHistory();

const BasicRouter = () => (
  <Router history={history}>
    <div>
      <PrivateRouter />
      <PublicRouter />
    </div>
  </Router>
);

export default BasicRouter;
