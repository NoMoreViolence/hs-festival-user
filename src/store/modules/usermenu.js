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
  // return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {});
  return axios.get('http://52.78.136.185:3000/api/store', { headers: { token: localStorage.getItem('token') } });
};

const bringUserTimeTable = () => {
  console.log('Request time table');
  // return axios.get('https://baconipsum.com/api/?type=meat-and-filler', {});
  return axios.get('http://52.78.136.185:3000/api/timetable', { headers: { token: localStorage.getItem('token') } });
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
      draft.timeTable = action.payload.data.table;
    }),
    [DATAIN_TIME_FAILURE]: state => state,
    [DATAIN_STORE_PENDING]: state => state,
    [DATAIN_STORE_SUCCESS]: (state, action) => produce(state, (draft) => {
      // draft.stores = action.payload;
      draft.stores = action.payload.data.data.stores;
    }),
    [DATAIN_STORE_FAILURE]: state => state,
  },
  initialState,
);

export default userMenu;
