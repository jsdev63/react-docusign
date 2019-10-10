import { SET_EVELOPE_STATUS, GET_ERRORS, SET_USER_TOKEN } from "./types";

export function setEnvelopeStatus(envelope) {
  return {
    type: SET_EVELOPE_STATUS,
    payload: envelope
  }
}

export function getErrors(errors) {
  return {
    type: GET_ERRORS,
    payload: errors
  }
}

export function setUserToken(token) {
  return {
    type: SET_USER_TOKEN,
    payload: token
  }
}
