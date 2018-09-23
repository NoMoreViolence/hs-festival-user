import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

export const searchUser = () => {
  console.log('searchUser');
  return axios.get('/');
};

// 요청 리스트
const GET_REQUEST_LIST = 'admin/GET_REQUEST_LIST';
const GET_REQUEST_LIST_PENDING = 'admin/GET_REQUEST_LIST_PENDING';
const GET_REQUEST_LIST_SUCCESS = 'admin/GET_REQUEST_LIST_SUCCESS';
const GET_REQUEST_LIST_FAILURE = 'admin/GET_REQUEST_LIST_FAILURE';

// 충전 요청
const CHARGE_REQUEST = 'admin/CHARGE_REQUEST';
const CHARGE_REQUEST_PENDING = 'admin/CHARGE_REQUEST_PENDING';
const CHARGE_REQUEST_SUCCESS = 'admin/CHARGE_REQUEST_SUCCESS';
const CHARGE_REQUEST_FAILURE = 'admin/CHARGE_REQUEST_FAILURE';

// 확인 요청
const CHARGE_SUBMIT = 'admin/CHARGE_SUBMIT';
const CHARGE_SUBMIT_PENDING = 'admin/CHARGE_SUBMIT_PENDING';
const CHARGE_SUBMIT_SUCCESS = 'admin/CHARGE_SUBMIT_SUCCESS';
const CHARGE_SUBMIT_FAILURE = 'admin/CHARGE_SUBMIT_FAILURE';

// 학생 검색
const GET_REQUEST_STU = 'admin/GET_REQUEST_STU';
const GET_REQUEST_STU_PENDING = 'admin/GET_REQUEST_STU_PENDING';
const GET_REQUEST_STU_SUCCESS = 'admin/GET_REQUEST_STU_SUCCESS';
const GET_REQUEST_STU_FAILURE = 'admin/GET_REQUEST_STU_FAILURE';

// 상점 정보 요청
const GET_REQUEST_STORE = 'admin/GET_REQUEST_STU';
const GET_REQUEST_STORE_PENDING = 'admin/GET_REQUEST_PENDING';
const GET_REQUEST_STORE_SUCCESS = 'admin/GET_REQUEST_STORE_SUCCESS';
const GET_REQUEST_STORE_FAILURE = 'admin/GET_REQUEST_STORE_FAILURE';

const requestList = () => {
  console.log('request List');
  return axios.get('/');
};

export const AdminActions = {
  getRequestList: createAction(GET_REQUEST_LIST, requestList),
};

const initialState = {
  requestList: [],
};

const admin = handleActions(
  {
    [GET_REQUEST_LIST_PENDING]: state => state,
    [GET_REQUEST_LIST_SUCCESS]: (state, action) => produce(state, (draft) => {
      // draft.requestList = action.payload;
      draft.requestList = [{ id: 1 }];
    }),
    [GET_REQUEST_LIST_FAILURE]: state => state,
  },
  initialState,
);

export default admin;
