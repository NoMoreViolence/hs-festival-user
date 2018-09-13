import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const CONTAIN = 'user/CONTAIN'; // User Data contain

const CLEAN_DATA = 'user/CLEAN_DATA';

const ADD_STORE_PRODUCT = 'user/ADD_STORE_PRODUCT';
const DEL_STORE_PRODUCT = 'user/DEL_STORE_PRODUCT';
const UP_STORE_PRODUCT = 'user/UP_STORE_PRODUCT';
const DOWN_STORE_PRODUCT = 'user/DOWN_STORE_PRODUCT';

const GET_BILL_HISTORY = 'user/GET_HISTORY';
const GET_BILL_HISTORY_PENDING = 'user/GET_HISTORY_PENDING';
const GET_BILL_HISTORY_SUCCESS = 'user/GET_HISTORY_SUCCESS';
const GET_BILL_HISTORY_FAILURE = 'user/GET_HISTORY_FAILURE';

const BUY_PRODUCT = 'user/BUY_PRODUCT';
const BUY_PRODUCT_PENDING = 'user/BUY_PRODUCT_PENDING';
const BUY_PRODUCT_SUCCESS = 'user/BUY_PRODUCT_SUCCESS';
const BUY_PRODUCT_FAILURE = 'user/BUY_PRODUCT_FAILURE';

// Buy request
const buy = (buyData) => {
  console.log('buy');
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {});

  // return axios.post('/api/store/buy', {
  //   headers: { token: localStorage.getItem('token') },
  //   body: { items: [{ item_id: '1', item_count: '5' }, { item_id: '2', item_count: '3' }]},
  // });
};

// GET Bill history
const getBillHistory = () => {
  console.log('get bill history');

  return axios.get('https://baconipsum.com/api/?type=meat-and-filler', { body: {} });
  // return axios.get('https://baconipsum.com/api/?type=meat-and-filler', { headers: { token: localStorage.getItem('token') } });
};

export const UserActions = {
  contain: createAction(CONTAIN, value => value), // Contain user informaion
  getBillHistory: createAction(GET_BILL_HISTORY, getBillHistory),
  cleanData: createAction(CLEAN_DATA, value => value),

  add: createAction(ADD_STORE_PRODUCT, value => value), // add product
  up: createAction(UP_STORE_PRODUCT, value => value), // up product count
  down: createAction(DOWN_STORE_PRODUCT, value => value), // down product count
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
      draft.money = 18000;
      draft.storeProduct = [
        {
          item_name: '키드밀리',
          item_price: 300,
          canbuy: true,
          item_phrase: 'HOT',
          class: 'HACK 1-1',
          count: 1,
        },
      ];
    }),

    [ADD_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = [...state.storeProduct, action.payload];
    }),
    [DEL_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      // del data
      draft.storeProduct = state.storeProduct.filter(value => value.item_name !== action.payload);
    }),
    [UP_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = state.storeProduct.map(value => (value.item_name === action.payload ? { ...value, count: value.count + 1 } : value));
    }),
    [DOWN_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = state.storeProduct.map(value => (value.item_name === action.payload ? { ...value, count: value.count - 1 } : value));
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
      // draft.money = action.payload.hello
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
      draft.bill = [
        {
          _type: '소비',
          updatedAt: '2018 / 3 / 23',
          moneyFlow: {
            before: 28000,
            after: 9500,
          },
          confirmed: false,
          class: 'USN 1-1',
          items: [
            {
              item_id: 1,
              item_name: '에스프레소',
              item_price: 7200,
              item_count: 2,
            },
            {
              item_id: 1,
              item_name: '아메리카노',
              item_price: 4100,
              item_count: 1,
            },
          ],
        },
        {
          _type: '소비',
          updatedAt: '2018 / 3 / 23',
          moneyFlow: {
            before: 50000,
            after: 28000,
          },
          confirmed: true,
          class: 'USN 1-1',
          items: [
            {
              item_id: 123,
              item_name: '갈비동',
              item_price: 14000,
              item_count: 2,
            },
            {
              item_id: 34,
              item_name: '라멘',
              item_price: 8000,
              item_count: 1,
            },
          ],
        },
        {
          _type: '충전',
          updatedAt: '2018 / 3 / 23',
          moneyFlow: {
            before: 0,
            after: 50000,
          },
          admin_name: '김민구',
          admin_id: 1234,
          amount: 50000,
        },
      ];
    }),
    [GET_BILL_HISTORY_FAILURE]: state => state,
  },
  initialState,
);

export default user;
