import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const CONTAIN = 'user/CONTAIN'; // User Data contain

const CLEAN_DATA = 'user/CLEAN_DATA';

const ADD_STORE_PRODUCT = 'user/ADD_STORE_PRODUCT';
const DEL_STORE_PRODUCT = 'user/DEL_STORE_PRODUCT';
const UP_STORE_PRODUCT = 'user/UP_STORE_PRODUCT';
const DOWN_STORE_PRODUCT = 'user/DOWN_STORE_PRODUCT';

const GET_BILL_HISTORY = 'user/GET_BILL_HISTORY';
const GET_BILL_HISTORY_PENDING = 'user/GET_BILL_HISTORY_PENDING';
const GET_BILL_HISTORY_SUCCESS = 'user/GET_BILL_HISTORY_SUCCESS';
const GET_BILL_HISTORY_FAILURE = 'user/GET_BILL_HISTORY_FAILURE';

const CANCEL_BILL = 'user/CANCEL_BILL';
const CANCEL_BILL_PENDING = 'user/CANCEL_BILL_PENDING';
const CANCEL_BILL_SUCCESS = 'user/CANCEL_BILL_SUCCESS';
const CANCEL_BILL_FAILURE = 'user/CANCEL_BILL_FAILURE';

const CONFIRM_BILL = 'user/CONFIRM_BILL';
const CONFIRM_BILL_PENDING = 'user/CONFIRM_BILL_PENDING';
const CONFIRM_BILL_SUCCESS = 'user/CONFIRM_BILL_SUCCESS';
const CONFIRM_BILL_FAILURE = 'user/CONFIRM_BILL_FAILURE';

const BUY_PRODUCT = 'user/BUY_PRODUCT';
const BUY_PRODUCT_PENDING = 'user/BUY_PRODUCT_PENDING';
const BUY_PRODUCT_SUCCESS = 'user/BUY_PRODUCT_SUCCESS';
const BUY_PRODUCT_FAILURE = 'user/BUY_PRODUCT_FAILURE';

// Buy request
const buy = (buyData) => {
  console.log('buy');
  console.log(buyData);
  console.log(localStorage.getItem('token'));
  return axios.post('/api/store/buy', buyData, {
    headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/json' },
  });
};

// GET Bill history
const getBillHistory = () => {
  console.log('get bill history');
  return axios.get('/api/history', { headers: { token: localStorage.getItem('token') } });
  // return axios.get('/api/history', { headers: { token: localStorage.getItem('token') } });
};

// Confirm bill
const confirmBill = (id) => {
  console.log('confirm bill');
  return axios.get(`/api/history/${id}/use`, { headers: { token: localStorage.getItem('token') } });
  // return axios.get(`/api/history/${id}/use`, { headers: { token: localStorage.getItem('token') } });
};

// Confirm bill
const cancelBill = (id) => {
  console.log('cancel bill');
  return axios.get(`/api/history/${id}/cancel`, { headers: { token: localStorage.getItem('token') } });
  // return axios.get(`/api/history/${id}/cancel`, { headers: { token: localStorage.getItem('token') } });
};

export const UserActions = {
  contain: createAction(CONTAIN, value => value), // Contain user informaion
  getBillHistory: createAction(GET_BILL_HISTORY, getBillHistory),
  confirmBill: createAction(CONFIRM_BILL, confirmBill),
  cancelBill: createAction(CANCEL_BILL, cancelBill),
  cleanData: createAction(CLEAN_DATA, value => value),

  add: createAction(ADD_STORE_PRODUCT, value => value), // add product
  up: createAction(UP_STORE_PRODUCT, value => value), // up product item_count
  down: createAction(DOWN_STORE_PRODUCT, value => value), // down product item_count
  del: createAction(DEL_STORE_PRODUCT, value => value), // del product
  buy: createAction(BUY_PRODUCT, buy), // buy product
};

const initialState = {
  admin: false, // 관리자 구분
  name: '', // 이름
  id: '', // 학번
  _id: -1, // 럭키 넘버
  // About Store
  money: 0,
  bill: [],
  storeProduct: [],
  buyPending: false,
  buySuccess: false,
  buyFailure: false,
};

const user = handleActions(
  {
    [CLEAN_DATA]: () => initialState,
    [CONTAIN]: (state, action) => produce(state, (draft) => {
      draft.admin = action.payload.admin;
      draft.name = action.payload.name;
      draft.id = action.payload.id;
      draft._id = action.payload._id;
      draft.money = action.payload.money;
      // draft.money = action.payload.money;
    }),

    [ADD_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = [...state.storeProduct, action.payload];
    }),
    [DEL_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      // del data
      draft.storeProduct = state.storeProduct.filter(value => value.name !== action.payload);
    }),
    [UP_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = state.storeProduct.map(
        value => (value.name === action.payload ? { ...value, item_count: value.item_count + 1 } : value),
      );
    }),
    [DOWN_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = state.storeProduct.map(
        value => (value.name === action.payload ? { ...value, item_count: value.item_count - 1 } : value),
      );
    }),

    [BUY_PRODUCT_PENDING]: (state, action) => produce(state, (draft) => {
      draft.buyPending = true;
      draft.buySuccess = false;
      draft.buyFailure = false;
    }),
    [BUY_PRODUCT_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.buyPending = false;
      draft.buySuccess = true;
      draft.buyFailure = false;
      draft.storeProduct = [];
      draft.money = state.money - action.payload.data.data.items[0].reduce((i, c) => i + c.item_price, 0);
      // draft.myBill = [{}];
    }),
    [BUY_PRODUCT_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.buyPending = false;
      draft.buySuccess = false;
      draft.buyFailure = true;
    }),

    [GET_BILL_HISTORY_PENDING]: state => state,
    [GET_BILL_HISTORY_SUCCESS]: (state, action) => produce(state, (draft) => {
      // draft.bill = action.payload;
      draft.bill = action.payload.data;
    }),
    [GET_BILL_HISTORY_FAILURE]: state => state,
    [CANCEL_BILL_PENDING]: state => state,
    [CANCEL_BILL_SUCCESS]: state => state,
    [CANCEL_BILL_FAILURE]: state => state,
    [CONFIRM_BILL_PENDING]: state => state,
    [CONFIRM_BILL_SUCCESS]: state => state,
    [CONFIRM_BILL_FAILURE]: state => state,
  },
  initialState,
);

export default user;
