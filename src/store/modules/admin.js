import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

// 유저 검색
export const searchUser = value => axios.get(`/api/admin/student${value}`, {
  headers: {
    token: localStorage.getItem('token'),
  },
});
// 유저의 소비 내역 검색
export const searchUserSpending = value => axios.get(`/api/admin/spend/${value}`, {
  headers: { token: localStorage.getItem('token') },
});

// 모든 상점을 가져온다
export const getAllStore = () => axios.get('api/admin/store', {
  headers: { token: localStorage.getItem('token') },
});

// 상점의 canbuy를 수정한다
export const changeCanbuy = (store, item, value) => axios.patch(
  `/api/admin/store/${store}`,
  { item_id: item, canbuy: value === 'true' },
  {
    headers: { token: localStorage.getItem('token') },
  },
);

export const searchUserChargeHistory = data => axios.get(`/api/admin/charge?class_id=${data}`, {
  headers: { token: localStorage.getItem('token') },
});

const USER_CHARGE_DATA = 'admin/GET_USER_CHARGE_DATA';
const USER_CHARGE_DATA_PENDING = 'admin/GET_USER_CHARGE_DATA_PENDING';
const USER_CHARGE_DATA_SUCCESS = 'admin/GET_USER_CHARGE_DATA_SUCCESS';
const USER_CHARGE_DATA_FAILURE = 'admin/GET_USER_CHARGE_DATA_FAILURE';

const GET_USER = 'admin/GET_USER';
const GET_USER_PENDING = 'admin/GET_USER_PENDING';
const GET_USER_SUCCESS = 'admin/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'admin/GET_USER_FAILURE';

const GET_USER_SPNDING = 'admin/GET_USER_SPENDING';
const GET_USER_SPNDING_PENDING = 'admin/GET_USER_SPENDING_PENDING';
const GET_USER_SPNDING_SUCCESS = 'admin/GET_USER_SPENDING_SUCCESS';
const GET_USER_SPNDING_FAILURE = 'admin/GET_USER_SPENDING_FAILURE';

const GET_ALL_STORE = 'admin/GET_ALL_STORE';
const GET_ALL_STORE_PENDING = 'admin/GET_ALL_STORE_PENDING';
const GET_ALL_STORE_SUCCESS = 'admin/GET_ALL_STORE_SUCCESS';
const GET_ALL_STORE_FAILURE = 'admin/GET_ALL_STORE_FAILURE';

const PATCH_CANBUY = 'admin/PATCH_CANBUY';
const PATCH_CANBUY_PENDING = 'admin/PATCH_CANBUY_PENDING';
const PATCH_CANBUY_SUCCESS = 'admin/PATCH_CANBUY_SUCCESS';
const PATCH_CANBUY_FAILURE = 'admin/PATCH_CANBUY_FAILURE';

const SORT_DATA = 'admin/SORT_DATA';
const SHOW_MORE = 'admin/SHOW_MORE';

export const AdminActions = {
  searchUser: createAction(GET_USER, searchUser),
  searchUserSpending: createAction(GET_USER_SPNDING, searchUserSpending),
  getAllStore: createAction(GET_ALL_STORE, getAllStore),
  sortStoreData: createAction(SORT_DATA, value => value),
  changeCanbuy: createAction(PATCH_CANBUY, changeCanbuy),
  showStoreMore: createAction(SHOW_MORE, value => value),
  getUserChargeList: createAction(USER_CHARGE_DATA, searchUserChargeHistory),
};

const initialState = {
  requestList: [],
  allStore: [],
  sortWay: '기본',
  username: '',
  class_id: '',
  userHistory: [],
};

const admin = handleActions(
  {
    [USER_CHARGE_DATA_PENDING]: state => state,
    [USER_CHARGE_DATA_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.userHistory = action.payload.data.data.history;
    }),
    [USER_CHARGE_DATA_FAILURE]: state => state,

    [GET_USER_PENDING]: state => state,
    [GET_USER_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.requestList = action.payload.data.data.student.map(object => ({ ...object, spendingData: [] }));
    }),
    [GET_USER_FAILURE]: state => produce(state, (draft) => {
      draft.reqeustList = [];
    }),

    [GET_USER_SPNDING_PENDING]: state => state,
    /* eslint-disable */
    [GET_USER_SPNDING_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.requestList = state.requestList.map(
          object =>
            object._id === action.payload.data.data.history[0]
              ? action.payload.data.data.history[0].user_id
              : -1
                ? { ...object, spendingData: action.payload.data.data.history }
                : object,
        );
      }),
    /* eslint-disable */
    [GET_USER_SPNDING_FAILURE]: state => state,

    [GET_ALL_STORE_PENDING]: state => state,
    [GET_ALL_STORE_SUCCESS]: (state, action) =>
      produce(state, draft => {
        draft.allStore = action.payload.data.data.store.map((object, i) => ({ ...object, show: false }));
      }),
    [GET_ALL_STORE_FAILURE]: state => state,

    [PATCH_CANBUY_PENDING]: state => state,
    [PATCH_CANBUY_SUCCESS]: state => state,
    [PATCH_CANBUY_FAILURE]: state => state,

    [SHOW_MORE]: (state, action) =>
      produce(state, draft => {
        draft.allStore = state.allStore.map((object, i) => (i === action.payload ? { ...object, show: !object.show } : object));
      }),
    [SORT_DATA]: (state, action) =>
      produce(state, draft => {
        const data = JSON.parse(JSON.stringify(state.allStore));

        if (action.payload === '기본') {
          draft.allStore = data.sort((a, b) => (a.class > b.class ? 1 : -1));
        } else if (action.payload === '매출') {
          draft.allStore = data.sort((a, b) => a.income < b.income);
        } else if (action.payload === '판매') {
          draft.allStore = data.sort((a, b) => a.buyCount < b.buyCount);
        }
      }),
  },
  initialState,
);

export default admin;
