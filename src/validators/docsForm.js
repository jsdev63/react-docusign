import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';
import { REQUIRED } from "./messages";

export default function validateInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = REQUIRED;
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = REQUIRED;
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = REQUIRED;
  }

  if (Validator.isEmpty(data.phoneNumber)) {
    errors.phoneNumber = REQUIRED;
  }
  
  if (Validator.isEmpty(data.address)) {
    errors.address = REQUIRED;
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = REQUIRED;
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = REQUIRED;
  }



  return {
    errors,
    isValid: isEmpty(errors)
  }
}
