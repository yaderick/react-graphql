import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Demo1 from '@/views/H5/Demo1';
// import Demo2 from '@/views/H5/Demo2';
import loaderWrapper from '../container/LoaderWrapper';

const Home = loaderWrapper(() => import(/* webpackChunkName: "Home" */ '../views/Home'));
const Login = loaderWrapper(() => import(/* webpackChunkName: "Login" */ '../views/Login'));

const PublicRouter = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/demo1" component={Demo1} />
  </Switch>
);

export default PublicRouter;
