import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import * as axios from 'axios';

const DATAIN = 'usermenu/DATAIN';

const UPDATE_STORE = 'usermenu/UPDATE_STORE';
const UPDATE_STORE_PENDING = 'usermenu/UPDATE_STORE_PENDING';
const UPDATE_STORE_SUCCESS = 'usermenu/UPDATE_STORE_SUCCESS';
const UPDATE_STORE_FAILURE = 'usermenu/UPDATE_STORE_FAILURE';

const ADD_STORE_PRODUCT = 'usermenu/ADD_STORE_PRODUCT';
const DEL_STORE_PRODUCT = 'usermenu/DEL_STORE_PRODUCT';
const UP_STORE_PRODUCT = 'usermenu/UP_STORE_PRODUCT';
const DOWN_STORE_PRODUCT = 'usermenu/DOWN_STORE_PRODUCT';

const BUY = 'usermenu/BUY';
const BUY_PENDING = 'usermenu/BUY_PENDING';
const BUY_SUCCESS = 'usermenu/BUY_SUCCESS';
const BUY_FAILURE = 'usermenu/BUY_FAILURE';

const storeUpdate = () => {
  console.log('store update');
  return axios.default.get('/', { body: { token: localStorage.getItem('token') } });
};

const buy = (hello) => {
  console.log(buy);
  return axios.default.get('/', { body: { store: hello, token: localStorage.getItem('token') } });
};

export const UserMenuActions = {
  dataIn: createAction(DATAIN, value => value),
  update: createAction(UPDATE_STORE, storeUpdate),

  add: createAction(ADD_STORE_PRODUCT, value => value),
  Up: createAction(UP_STORE_PRODUCT, value => value),
  Down: createAction(DOWN_STORE_PRODUCT, value => value),
  del: createAction(ADD_STORE_PRODUCT, value => value),

  buy: createAction(BUY),
};

const initialState = {
  timeTable: [],
  stores: [],
  myStoreProduct: [],
};

const userMenu = handleActions(
  {
    [DATAIN]: (state, action) => produce(state, (draft) => {
      draft.timeTable = [
        { time: '09:00 - 10:00', what: 'MR.탄 씨의 축사' },
        { time: '10:00 - 13:00', what: '먹거리 장터' },
        { time: '13:00 - 16:00', what: '공연이나 해라 이것들아' },
      ];
      draft.stores = [
        {
          storename: 'H1-1',
          what: [
            { name: '핫도그', price: 10, stock: 301 },
            { name: '김치', price: 99, stock: 305 },
            { name: '드래곤', price: 234, stock: 3000 },
          ],
        },
        {
          storename: 'H1-2',
          what: [
            { name: '머그컵', price: 340, stock: 23 },
            { name: '간장게장', price: 5934, stock: 123 },
            { name: '휴대폰', price: 2000, stock: 3123 },
          ],
        },
        {
          storename: 'H1-3',
          what: [
            { name: '에스프레소', price: 3600, stock: 12 },
            { name: '콜드브루', price: 4100, stock: 13 },
            { name: '아메리카노', price: 4100, stock: 14 },
          ],
        },
      ];
      draft.myStoreProduct = [];
    }),
    [UPDATE_STORE_PENDING]: (state, action) => produce(state, (draft) => {
      draft.pending = true;
      draft.success = false;
      draft.failure = false;
    }),
    [UPDATE_STORE_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.pending = false;
      draft.success = true;
      draft.failure = false;
    }),
    [UPDATE_STORE_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.pending = false;
      draft.success = false;
      draft.failure = true;
    }),
    [ADD_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      //  add Data
      const addData = state.stores
        .filter(value => value.storename === action.payload.className)
        .what.filter(value => value.name === action.payload.product);
      addData.count = 1;

      draft.myStoreProduct = Array.push(state.myStoreProduct, addData);
    }),
    [DEL_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      // del data
      draft.myStoreProduct = state.myStoreProduct.filter(value => value.name !== action.payload);
    }),
    [UP_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.myStoreProduct = state.myStoreProduct.map(
        value => (value.name === action.payload ? { ...value, count: value.count + 1 } : value),
      );
    }),
    [DOWN_STORE_PRODUCT]: (state, action) => produce(state, (draft) => {
      draft.myStoreProduct = state.myStoreProduct.map(
        value => (value.name === action.payload ? { ...value, count: value.count - 1 } : value),
      );
    }),

    [BUY_PENDING]: (state, action) => produce(state, (draft) => {}),
    [BUY_SUCCESS]: (state, action) => produce(state, (draft) => {}),
    [BUY_FAILURE]: (state, action) => produce(state, (draft) => {}),
  },
  initialState,
);

export default userMenu;
