import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const BACK_TO_START = 'user/BACK_TO_START'; // All clear

const CONTAIN = 'user/CONTAIN'; // User Data contain
const MONEY_UPDATE = 'user/MONEY_UPDATE'; // Update current money
const MONEY_UPDATE_PENDING = 'user/MONEY_UPDATE_PENDING'; // Update current money
const MONEY_UPDATE_SUCCESS = 'user/MONEY_UPDATE_SUCCESS'; // Update current money
const MONEY_UPDATE_FAILURE = 'user/MONEY_UPDATE_FAILURE'; // Update current money

const ADD_STORE_PRODUCT = 'usermenu/ADD_STORE_PRODUCT';
const DEL_STORE_PRODUCT = 'usermenu/DEL_STORE_PRODUCT';
const UP_STORE_PRODUCT = 'usermenu/UP_STORE_PRODUCT';
const DOWN_STORE_PRODUCT = 'usermenu/DOWN_STORE_PRODUCT';

const BUY = 'usermenu/BUY';
const BUY_PENDING = 'usermenu/BUY_PENDING';
const BUY_SUCCESS = 'usermenu/BUY_SUCCESS';
const BUY_FAILURE = 'usermenu/BUY_FAILURE';

// Buy request
const buy = (hello) => {
  console.log('buy');
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {
    headers: { token: localStorage.getItem('token') },
    body: { store: hello },
  });

  // return axios.get('/api/store/buy', {
  //   headers: { token: localStorage.getItem('token') },
  //   body: { store: hello },
  // });
};

const updateBill = () => {
  console.log('update Bill');
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler');
  // return axios.get('/api/store/log', { headers: localStorage.getItem('token') });
};

export const UserActions = {
  backToStart: createAction(BACK_TO_START, value => value),
  contain: createAction(CONTAIN, value => value), // Contain user informaion
  moneyUpdate: createAction(MONEY_UPDATE, updateBill), // Update Money  & Bills

  add: createAction(ADD_STORE_PRODUCT, value => value), // add product
  up: createAction(UP_STORE_PRODUCT, value => value), // up product count
  down: createAction(DOWN_STORE_PRODUCT, value => value), // down product count
  del: createAction(DEL_STORE_PRODUCT, value => value), // del product
  buy: createAction(BUY, buy), // buy product
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
    [BACK_TO_START]: state => initialState,
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
      draft.bill = [
        {
          chargeType: false,
          storename: 'H1-3',
          what: [{ name: '에스프레소', price: 7200, number: 2 }, { name: '콜드브루', price: 4100, number: 1 }],
          approved: false,
        },
        {
          chargeType: false,
          storename: 'H1-1',
          what: [{ name: '에스프레소', price: 7200, number: 2 }, { name: '콜드브루', price: 4100, number: 1 }],
          approved: true,
        },
        {
          chargeType: true,
          recharger: '인승진',
          approver: '',
          how: 10000,
          approved: false,
        },
        {
          chargeType: true,
          recharger: '윤지훈',
          approver: '김민구',
          how: 5000,
          approved: true,
        },
      ];
    }),

    [MONEY_UPDATE_PENDING]: state => state,
    [MONEY_UPDATE_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.money = action.payload.money;
      draft.bill = action.payload.bill;
    }),
    [MONEY_UPDATE_FAILURE]: state => state,

    [ADD_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = [...state.storeProduct, action.payload];
    }),
    [DEL_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      // del data
      draft.storeProduct = state.storeProduct.filter(value => value.item_name !== action.payload);
    }),
    [UP_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = state.storeProduct.map(
        value => (value.item_name === action.payload ? { ...value, count: value.count + 1 } : value),
      );
    }),
    [DOWN_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.storeProduct = state.storeProduct.map(
        value => (value.item_name === action.payload ? { ...value, count: value.count - 1 } : value),
      );
    }),

    [BUY_PENDING]: (state, action) => produce(state, (draft) => {
      draft.buyPending = true;
      draft.buySuccess = false;
      draft.buyFailure = false;
    }),
    [BUY_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.buyPending = false;
      draft.buySuccess = true;
      draft.buyFailure = false;
      draft.storeProduct = [];
      // draft.money = action.payload.hello
      // draft.myBill = [{}];
    }),
    [BUY_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.buyPending = false;
      draft.buySuccess = false;
      draft.buyFailure = true;
    }),
  },
  initialState,
);

export default user;
