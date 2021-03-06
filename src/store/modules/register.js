import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';

const CHANGE_DOUBLE_CHECK = 'register/CHANGE_DOUBLE_CHECK';

const DOUBLE_CHECK_ID = 'register/DOUBLE_CHECK_ID';
const DOUBLE_CHECK_ID_PENDING = 'register/DOUBLE_CHECK_ID_PENDING';
const DOUBLE_CHECK_ID_SUCCESS = 'register/DOUBLE_CHECK_ID_SUCCESS';
const DOUBLE_CHECK_ID_FAILURE = 'register/DOUBLE_CHECK_ID_FAILURE';

const REGISTER = 'register/REGISTER';
const REGISTER_PENDING = 'register/REGISTER_PENDING';
const REGISTER_SUCCESS = 'register/REGISTER_SUCCESS';
const REGISTER_FAILURE = 'register/REGISTER_FAILURE';

export const doubleCheckRequest = (id) => {
  console.log('doubleCheck');
  return axios.get(`/api/verify/signup/check/${id}`);
  // return axios.get(`/verify/signup/check/${id}`);
};
export const registerRequest = (id, password, randomKey) => {
  console.log('register');
  return axios.post('/api/verify/signup', { key: randomKey, id, password });
  // return axios.post('/verify/signup', { body: { key: randomKey, id, password } });
};

export const RegisterActions = {
  changeDoubleCheck: createAction(CHANGE_DOUBLE_CHECK, value => value),
  doubleCheckId: createAction(DOUBLE_CHECK_ID, doubleCheckRequest),
  register: createAction(REGISTER, registerRequest),
};

const initialState = {
  doubleCheckPending: false,
  doubleCheckSuccess: false,
  doubleCheckFailure: false,
  registerPending: false,
  registerSuccess: false,
  registerFailure: false,
};

const register = handleActions(
  {
    [CHANGE_DOUBLE_CHECK]: state => produce(state, (draft) => {
      draft.doubleCheckSuccess = false;
    }),
    [DOUBLE_CHECK_ID_PENDING]: state => produce(state, (draft) => {
      draft.doubleCheckPending = true;
      draft.doubleCheckSuccess = false;
      draft.doubleCheckFailure = false;
    }),
    [DOUBLE_CHECK_ID_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.doubleCheckPending = false;
      draft.doubleCheckSuccess = true;
      draft.doubleCheckFailure = false;
    }),
    [DOUBLE_CHECK_ID_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.doubleCheckPending = false;
      draft.doubleCheckSuccess = false;
      draft.doubleCheckFailure = true;
    }),
    [REGISTER_PENDING]: state => produce(state, (draft) => {
      draft.registerPending = true;
      draft.registerSuccess = false;
      draft.registerFailure = false;
    }),
    [REGISTER_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.registerPending = false;
      draft.registerSuccess = true;
      draft.registerFailure = false;
    }),
    [REGISTER_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.registerPending = false;
      draft.registerSuccess = false;
      draft.registerFailure = true;
    }),
  },
  initialState,
);

export default register;
