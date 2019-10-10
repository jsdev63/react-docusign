import { SET_USER_TOKEN } from "../actions/types";

const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_TOKEN:
      return action.payload;
    default:
      return state;
  }
}

export default user;
