import { all, fork } from 'redux-saga/effects';

import userSaga from '../../views/Login/saga';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
  ]);
}
