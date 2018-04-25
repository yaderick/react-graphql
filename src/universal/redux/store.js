import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import { createLogger } from 'redux-logger';
import reducers from './reducers';
import rootSaga from './sagas';

// const logger = createLogger({});
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  // logger,
  sagaMiddleware,
];

const store = createStore(
  reducers,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

export default store;
