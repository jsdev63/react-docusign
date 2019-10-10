import { combineReducers } from "redux";
import envelope from './envelope';
import user from './user';
import errors from './errors';

export default combineReducers({
  user,
  envelope,
  errors
})
