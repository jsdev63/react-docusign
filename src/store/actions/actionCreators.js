import { SET_EVELOPE_STATUS, GET_ERRORS } from "./types";

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
