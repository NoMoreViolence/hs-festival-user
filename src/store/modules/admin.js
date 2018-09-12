import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const GET_REQUEST_LIST = 'admin/GET_REQUEST_LIST';
const GET_REQUEST_LIST_PENDING = 'admin/GET_REQUEST_LIST_PENDING';
const GET_REQUEST_LIST_SUCCESS = 'admin/GET_REQUEST_LIST_SUCCESS';
const GET_REQUEST_LIST_FAILURE = 'admin/GET_REQUEST_LIST_FAILURE';

const CHARGE_REQUEST = 'admin/CHARGE_REQUEST';
const CHARGE_REQUEST_PENDING = 'admin/CHARGE_REQUEST_PENDING';
const CHARGE_REQUEST_SUCCESS = 'admin/CHARGE_REQUEST_SUCCESS';
const CHARGE_REQUEST_FAILURE = 'admin/CHARGE_REQUEST_FAILURE';

const CHARGE_SUBMIT = 'admin/CHARGE_SUBMIT';
const CHARGE_SUBMIT_PENDING = 'admin/CHARGE_SUBMIT_PENDING';
const CHARGE_SUBMIT_SUCCESS = 'admin/CHARGE_SUBMIT_SUCCESS';
const CHARGE_SUBMIT_FAILURE = 'admin/CHARGE_SUBMIT_FAILURE';

const GET_REQUEST_STU = 'admin/GET_REQUEST_STU';
const GET_REQUEST_STU_PENDING = 'admin/GET_REQUEST_STU_PENDING';
const GET_REQUEST_STU_SUCCESS = 'admin/GET_REQUEST_STU_SUCCESS';
const GET_REQUEST_STU_FAILURE = 'admin/GET_REQUEST_STU_FAILURE';

const GET_REQUEST_STORE = 'admin/GET_REQUEST_STU';
const GET_REQUEST_STORE_PENDING = 'admin/GET_REQUEST_PENDING';
const GET_REQUEST_STORE_SUCCESS = 'admin/GET_REQUEST_STORE_SUCCESS';
const GET_REQUEST_STORE_FAILURE = 'admin/GET_REQUEST_STORE_FAILURE';

const LOGOUT = 'login/LOGOUT';

// 자동 로그인
// Return User Infomation
export const loginAuto = () => {
  console.log('login auto');
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {
    body: { token: localStorage.getItem('token') },
  });
};
// 로그인 요청
// Just return token
export const loginRequest = (id, pw) => {
  console.log('login');
  return axios.get(
    'https://baconipsum.com/api/?type=meat-and-filler',
    {
      body: {
        id,
        pw,
      },
    },
    {},
  );
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
