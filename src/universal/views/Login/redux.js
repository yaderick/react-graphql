import { createReducer, doAction, createRequestTypes } from '../../util/redux';

export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = createRequestTypes('LOGOUT');

export const login = {
  request: user => doAction(LOGIN.REQUEST, user),
  success: token => doAction(LOGIN.SUCCESS, token),
  failure: error => doAction(LOGIN.FAILURE, error),
};

export const logout = {
  request: () => doAction(LOGOUT.REQUEST),
  success: () => doAction(LOGOUT.SUCCESS),
  failure: error => doAction(LOGOUT.FAILURE, { error }),
};

/* -- reducer --*/
const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  profile: null,
};

export default createReducer(initialState, {
  [LOGIN.REQUEST]: state => ({
    ...state,
    loading: true,
    error: null,
    loginError: null,
  }),
  [LOGIN.SUCCESS]: (state, action) =>
    ({
      ...state,
      loading: false,
      token: action.token,
      isAuthenticated: true,
    }),
  [LOGIN.FAILURE]: (state, action) =>
    ({
      ...state,
      loading: false,
      loginError: action.error,
      isAuthenticated: false,
      profile: {},
    }),
  [LOGOUT.REQUEST]: state =>
    ({
      ...state, loading: true, error: null,
    }),
  [LOGOUT.SUCCESS]: state =>
    ({
      ...state, token: '', isAuthenticated: false, loading: false, profile: {},
    }),
  [LOGOUT.FAILURE]: (state, action) =>
    ({ ...state, loading: false, error: action.error }),
});
