import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_RANDOM_KEY = 'register/CHANGE_RANDOM_KEY';
const CHANGE_ID = 'register/CHANGE_ID';
const DOUBLE_CHECK_ID = 'register/DOUBLE_CHECK_ID';
const DOUBLE_CHECK_ID_PENDING = 'register/DOUBLE_CHECK_ID_PENDING';
const DOUBLE_CHECK_ID_SUCCESS = 'register/DOUBLE_CHECK_ID_SUCCESS';
const DOUBLE_CHECK_ID_FAILURE = 'register/DOUBLE_CHECK_ID_FAILURE';
const CHANGE_PASSWORD = 'register/CHANGE_PASSWORD';
const CHANGE_RE_PASSWORD = 'register/CHANGE_RE_PASSWORD';

const RERISTER = 'register/REGISTER';
const RERISTER_PENDING = 'register/REGISTER_PENDING';
const RERISTER_SUCCESS = 'register/REGISTER_SUCCESS';
const RERISTER_FAILURE = 'register/REGISTER_FAILURE';

export const LoginActions = {
  changeRandomKey: createAction(CHANGE_RANDOM_KEY, value => value),
  changeId: createAction(CHANGE_ID, value => value),
  doubleCheckId: createAction(DOUBLE_CHECK_ID, value => value), // 서버 개발자랑 맞춰야 하는 부분
  changePassword: createAction(CHANGE_PASSWORD, value => value),
  changeRePassword: createAction(CHANGE_RE_PASSWORD, value => value),
  register: createAction(RERISTER, value => value), // 서버 개발자랑 맞춰보야아 함
};

const initialState = {
  randomKey: '',
  id: '',
  idChecked: false,
  idCheckPending: false,
  password: '',
  rePassword: '',
  pwChecked: false,
  registerPending: false,
};

const login = handleActions(
  {
    [CHANGE_RANDOM_KEY]: (state, action) => produce(state, (draft) => {
      draft.randomKey = action.payload;
    }),

    [CHANGE_ID]: (state, action) => produce(state, (draft) => {
      draft.id = action.payload;
    }),
    [DOUBLE_CHECK_ID_PENDING]: (state, action) => produce(state, (draft) => {
      draft.idCheckPending = true;
    }),
    [DOUBLE_CHECK_ID_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.idCheckPending = false;
    }),
    [DOUBLE_CHECK_ID_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.idCheckPending = false;
    }),

    [CHANGE_PASSWORD]: (state, action) => produce(state, (draft) => {
      if (action.payload === state.rePassword) {
        draft.pwChecked = true;
      } else {
        draft.pwChecked = false;
      }
      draft.password = action.payload;
    }),
    [CHANGE_RE_PASSWORD]: (state, action) => produce(state, (draft) => {
      if (action.payload === state.password) {
        draft.pwChecked = true;
      } else {
        draft.pwChecked = false;
      }
      draft.rePassword = action.payload;
    }),

    [RERISTER_PENDING]: (state, action) => produce(state, (draft) => {
      draft.registerPending = true;
    }),
    [RERISTER_SUCCESS]: (state, action) => produce(state, (draft) => {
      draft.registerPending = false;
    }),
    [RERISTER_FAILURE]: (state, action) => produce(state, (draft) => {
      draft.registerPending = false;
    }),
  },
  initialState,
);

export default login;
