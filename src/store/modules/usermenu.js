import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const DATAIN_TIME = 'usermenu/DATAIN_TIME';
const DATAIN_TIME_PENDING = 'usermenu/DATAIN_TIME_PENDING';
const DATAIN_TIME_SUCCESS = 'usermenu/DATAIN_TIME_SUCCESS';
const DATAIN_TIME_FAILURE = 'usermenu/DATAIN_TIME_FAILURE';

const DATAIN_STORE = 'usermenu/DATAIN_STORE';
const DATAIN_STORE_PENDING = 'usermenu/DATAIN_STORE_PENDING';
const DATAIN_STORE_SUCCESS = 'usermenu/DATAIN_STORE_SUCCESS';
const DATAIN_STORE_FAILURE = 'usermenu/DATAIN_STORE_FAILURE';

const bringUserStore = () => {
  console.log('Request user store');
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {});
  // return axios.get('/api/store', { headers: { token: localStorage.getItem('token') } });
};

const bringUserTimeTable = () => {
  console.log('Request time table');
  return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {});
  // return axios.get('/api/timetable', { headers: { token: localStorage.getItem('token') } });
};

export const UserMenuActions = {
  dataInStore: createAction(DATAIN_STORE, bringUserStore),
  dataInTime: createAction(DATAIN_TIME, bringUserTimeTable),
};

const initialState = {
  timeTable: [],
  stores: [],
};

const userMenu = handleActions(
  {
    [DATAIN_TIME_PENDING]: state => state,
    [DATAIN_TIME_SUCCESS]: (state, action) => produce(state, (draft) => {
      // draft.timeTable = action.payload;
      draft.timeTable = [
        { order: 1, time: '09:00 - 10:00', content: 'MR.탄 씨의 축사' },
        { order: 2, time: '10:00 - 13:00', content: '먹거리 장터' },
        { order: 3, time: '13:00 - 16:00', content: '공연이나 해라 이것들아' },
      ];
    }),
    [DATAIN_TIME_FAILURE]: state => state,
    [DATAIN_STORE_PENDING]: state => state,
    [DATAIN_STORE_SUCCESS]: (state, action) => produce(state, (draft) => {
      // draft.stores = action.payload;
      draft.stores = [
        {
          store_id: 1,
          introduction: 'WHY DO FUCKBOIS',
          class: 'HACK 1-1',
          items: [
            {
              item_id: 1,
              item_name: '키드밀리',
              item_price: 300,
              canbuy: true,
              item_phrase: 'HOT',
            },
            {
              item_id: 2,
              item_name: '씨잼',
              item_price: 42,
              canbuy: false,
              item_phrase: 'HOT',
            },
            {
              item_id: 3,
              item_name: '빌틀딱스',
              item_price: 42,
              canbuy: true,
              item_phrase: 'HOT',
            },
          ],
        },
        {
          store_id: 2,
          introduction: '잊지마',
          class: 'HACK 1-2',
          items: [
            {
              item_id: 4,
              item_name: '마미손',
              item_price: 300,
              canbuy: true,
              item_phrase: 'HOT',
            },
            {
              item_id: 5,
              item_name: '나플라',
              item_price: 42,
              canbuy: false,
              item_phrase: 'HOT',
            },
            {
              item_id: 6,
              item_name: '루피',
              item_price: 42,
              canbuy: true,
              item_phrase: 'HOT',
            },
          ],
        },
        {
          store_id: 3,
          introduction: '달리반 피카소',
          class: 'USN 1-1',
          items: [
            {
              item_id: 7,
              item_name: '에스프레소',
              item_price: 3600,
              canbuy: true,
              item_phrase: 'HOT',
            },
            {
              item_id: 8,
              item_name: '콜드 브루',
              item_price: 5500,
              canbuy: false,
              item_phrase: 'HOT',
            },
            {
              item_id: 9,
              item_name: '아메리카노',
              item_price: 4100,
              canbuy: true,
              item_phrase: 'HOT',
            },
          ],
        },
        {
          store_id: 4,
          introduction: 'Journey',
          class: 'USN 1-2',
          items: [
            {
              item_id: 10,
              item_name: '토끼',
              item_price: 3500,
              canbuy: true,
              item_phrase: 'HOT',
            },
            {
              item_id: 11,
              item_name: '강아지',
              item_price: 2000,
              canbuy: false,
              item_phrase: 'HOT',
            },
            {
              item_id: 12,
              item_name: '고양이',
              item_price: 5000,
              canbuy: true,
              item_phrase: 'HOT',
            },
          ],
        },
      ];
    }),
    [DATAIN_STORE_FAILURE]: state => state,
  },
  initialState,
);

export default userMenu;
