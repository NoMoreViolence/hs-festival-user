import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const ERROR = 'login/ERROR';

const LOGIN = 'login/LOGIN';
const LOGIN_PENDING = 'login/LOGIN_PENDING';
const LOGIN_SUCCESS = 'login/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'login/LOGIN_FAILURE';

const LOGIN_AUTO = 'login/LOGIN_AUTO';
const LOGIN_AUTO_PENDING = 'login/LOGIN_AUTO_PENDING';
const LOGIN_AUTO_SUCCESS = 'login/LOGIN_AUTO_SUCCESS';
const LOGIN_AUTO_FAILURE = 'login/LOGIN_AUTO_FAILURE';

const LOGOUT = 'login/LOGOUT';

// 자동 로그인
// Return User Infomation
export const loginAuto = () => {
  console.log('login auto');

  return axios.get('http://52.78.136.185:3000/api/verify/login', { headers: { token: localStorage.getItem('token') } });
};
// 로그인 요청
// Just return token
export const loginRequest = (id, pw) => {
  console.log('login');

  return axios.post('http://52.78.136.185:3000/api/verify/login', {
    id,
    password: pw,
  });
};

export const LoginActions = {
  login: createAction(LOGIN, loginRequest),
  loginAuto: createAction(LOGIN_AUTO, loginAuto),
  logout: createAction(LOGOUT, value => value),
  error: createAction(ERROR, value => value),
};

const initialState = {
  pending: false,
  logined: false,
  error: false,
};

const login = handleActions(
  {
    [ERROR]: state => produce(state, (draft) => {
      draft.logined = false;
    }),
    [LOGOUT]: state => produce(state, (draft) => {
      draft.logined = false;
    }),

    [LOGIN_PENDING]: state => produce(state, (draft) => {
      draft.pending = true;
      draft.error = false;
    }),
    [LOGIN_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.pending = false;
      draft.error = false;
      draft.logined = true;
    }),
    [LOGIN_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.pending = false;
      draft.error = true;
    }),
    [LOGIN_AUTO_PENDING]: state => produce(state, (draft) => {
      draft.pending = true;
      draft.error = false;
    }),
    [LOGIN_AUTO_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.pending = false;
      draft.error = false;
      draft.logined = true;
    }),
    [LOGIN_AUTO_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.pending = false;
      draft.error = true;
    }),
  },
  initialState,
);

export default login;
