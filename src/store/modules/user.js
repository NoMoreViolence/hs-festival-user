import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import * as axios from 'axios';

const CONTAIN = 'user/CONTAIN';
const MONEY_UPDATE = 'user/MONEY_UPDATE';

const BRING_DATA_OF_USER = 'BRING_DATA_OF_USER';
const BRING_DATA_OF_USER_PENDING = 'BRING_DATA_OF_USER_PENDING';
const BRING_DATA_OF_USER_SUCCESS = 'BRING_DATA_OF_USER_SUCCESS';
const BRING_DATA_OF_USER_FAILURE = 'BRING_DATA_OF_USER_FAILURE';

const bringDataOfUser = () => {
  console.log('bringDataOfUser');
  return axios.post('/', { body: { token: localStorage.getItem('token') } });
};

export const UserActions = {
  contain: createAction(CONTAIN, value => value),
  moneyUpdate: createAction(MONEY_UPDATE, value => value),
  bringDataOfUser: createAction(BRING_DATA_OF_USER, bringDataOfUser),
};

const initialState = {
  admin: false,
  username: '',
  basicInfo: '', // 학번
  luckyNumber: -1,
  money: 0,
  userBill: [],
  bringPending: false,
  bringSuccess: false,
  bringFailure: false,
};

const user = handleActions(
  {
    [CONTAIN]: (state, action) => produce(state, (draft) => {
      draft.admin = action.payload.admin;
      draft.username = action.payload.username;
      draft.basicInfo = action.payload.basicInfo;
      draft.luckyNumber = action.payload.luckyNumber;
      draft.money = action.payload.money;
      draft.userBill = action.payload.userBill;
    }),
    [MONEY_UPDATE]: (state, action) => produce(state, (draft) => {
      draft.money = action.payload;
      draft.userBill = action.payload;
    }),
    [BRING_DATA_OF_USER_PENDING]: (state, action) => produce(state, (draft) => {
      draft.bringPending = true;
      draft.bringSuccess = false;
      draft.bringFailure = false;
    }),
    [BRING_DATA_OF_USER_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.bringPending = false;
      draft.bringSuccess = true;
      draft.bringFailure = false;
      draft.admin = false;
      draft.username = '추승원';
      draft.basicInfo = 'H3120';
      draft.luckyNumber = 123;
      draft.money = 1500;
      draft.userBill = [
        {
          type: 'up',
          who: '학생회 중 한명',
          where: '응 충전이야',
          what: '응 충전이야',
          count: '응 충전이야',
          how: 1500,
        },
        {
          type: 'down',
          who: '병신아 이건 돈 쓰는거야',
          where: 'H1-1',
          what: ['핫도그', '김치'],
          count: [2, 1],
          how: 119,
        },
      ];
    }),
    [BRING_DATA_OF_USER_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.bringPending = false;
      draft.bringSuccess = false;
      draft.bringFailure = true;
    }),
  },
  initialState,
);

export default user;
