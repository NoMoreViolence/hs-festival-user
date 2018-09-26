import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

export const searchUser = value => axios.get(`/api/admin/student${value}`, {
  headers: {
    token: localStorage.getItem('token'),
  },
});

export const searchUserSpending = value => axios.get(`/api/admin/spend/${value}`, {
  headers: { token: localStorage.getItem('token') },
});

const GET_USER = 'admin/GET_USER';
const GET_USER_PENDING = 'admin/GET_USER_PENDING';
const GET_USER_SUCCESS = 'admin/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'admin/GET_USER_FAILURE';

const GET_USER_SPNDING = 'admin/GET_USER_SPENDING';
const GET_USER_SPNDING_PENDING = 'admin/GET_USER_SPENDING_PENDING';
const GET_USER_SPNDING_SUCCESS = 'admin/GET_USER_SPENDING_SUCCESS';
const GET_USER_SPNDING_FAILURE = 'admin/GET_USER_SPENDING_FAILURE';

export const AdminActions = {
  searchUser: createAction(GET_USER, searchUser),
  searchUserSpending: createAction(GET_USER_SPNDING, searchUserSpending),
};

const initialState = {
  requestList: [],
};

const admin = handleActions(
  {
    [GET_USER_PENDING]: state => state,
    [GET_USER_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.requestList = action.payload.data.data.student.map(object => ({ ...object, spendingData: [] }));
    }),
    [GET_USER_FAILURE]: state => produce(state, (draft) => {
      draft.reqeustList = [];
    }),

    [GET_USER_SPNDING_PENDING]: state => state,
    [GET_USER_SPNDING_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.requestList = state.requestList.map(
        object => (object._id === action.payload.data.data.history[0]
          ? action.payload.data.data.history[0].user_id
          : -1
            ? { ...object, spendingData: action.payload.data.data.history }
            : object),
      );
    }),
    [GET_USER_SPNDING_FAILURE]: state => state,
  },
  initialState,
);

export default admin;
