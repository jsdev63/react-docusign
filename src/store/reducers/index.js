import { combineReducers } from "redux";
import envelope from './envelope';
import errors from './errors';

export default combineReducers({
  envelope,
  errors
})
