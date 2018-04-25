import { delay } from 'redux-saga';
import { all, call, take, takeEvery, put } from 'redux-saga/effects';
import { login, logout, LOGIN, LOGOUT } from './redux';

export const WAIT_NEXT_ACTION_TIME = 500;// ms

// const LOGIN_CONFIG = {
//   url: '/login',
//   actionTypes: [
//     LOGIN.REQUEST,
//     LOGIN.SUCCESS,
//     LOGIN.FAILURE,
//   ],
//   method: 'POST',
// };

function* loginFlow() {
  while (true) {
    yield take(LOGIN.REQUEST);
    // fork return a Task object
    yield call(delay, WAIT_NEXT_ACTION_TIME);
    yield put(login.success());
  }
}

function* logoutFlow() {
  yield takeEvery(LOGOUT.REQUEST, function* doSaga() {
    yield call(delay, WAIT_NEXT_ACTION_TIME);
    yield put(logout.success());
  });
}

export default function* root() {
  yield all([
    loginFlow(),
    logoutFlow(),
  ]);
}
