import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import loginReducer from '@/views/Login/redux';

const rootReducer = combineReducers({
  router: routerReducer,
  loginReducer,
});

export default rootReducer;
