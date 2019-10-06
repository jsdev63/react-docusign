import { SET_EVELOPE_STATUS } from "../actions/types";

const envelope = (state = {}, action) => {
  switch (action.type) {
    case SET_EVELOPE_STATUS:
      return action.payload;
    default:
      return state;
  }
}

export default envelope;
