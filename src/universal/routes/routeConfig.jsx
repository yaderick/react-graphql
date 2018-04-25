import loaderWrapper from '../container/LoaderWrapper';

const Rise = loaderWrapper(() => import(/* webpackChunkName: "Rise" */ '../views/Rise'));

const routeConfig = [{
  path: '/rise',
  component: Rise,
  key: '/rise',
}];

export default routeConfig;
