import { combineReducers } from "redux";
import envelope from './envelope';
import token from './token';
import errors from './errors';

export default combineReducers({
  token,
  envelope,
  errors
})
