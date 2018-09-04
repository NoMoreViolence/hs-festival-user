import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

const CHANGE_ID = 'login/CHANGE_ID';
const CHANGE_PASSWORD = 'login/CHANGE_PASSWORD';

export const LoginActions = {
  changeId: createAction(CHANGE_ID, value => value),
  changePassword: createAction(CHANGE_PASSWORD, value => value),
};

const initialState = {
  id: '',
  password: '',
};

const login = handleActions(
  {
    [CHANGE_ID]: (state, action) => produce(state, (draft) => {
      draft.id = action.payload;
    }),
    [CHANGE_PASSWORD]: (state, action) => produce(state, (draft) => {
      draft.password = action.payload;
    }),
  },
  initialState,
);

export default login;
