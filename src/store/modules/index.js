import { combineReducers } from 'redux';

import register from './register';
import login from './login';
import user from './user';
import userMenu from './usermenu';

export default combineReducers({
  login,
  register,
  user,
  userMenu,
});
