import AuthService from '../../services/AuthService';
import { setCurrentUser, registerSuccess, logoutUser, getErrors } from "./actionCreators";

/**
 * Login user action
 */
export const loginUser = (state, history) => dispatch => {
  AuthService.auth().then(res => {
    console.log('Authentication callback', res)
  }).catch(err => {
    console.log("err", err)
  })
  // AuthService.login('feyyaz@test.com', '1234').then(resp => {
  //   if (resp.data.success) {
  //     console.log(resp.data)
  //     dispatch(setCurrentUser(resp.data.profile));
  //     AuthService.saveToken(resp.data.token);
  //     history.push('/');
  //   }
  // }).catch(error => {
  //   if (error.response.data) {
  //     dispatch(getErrors({
  //       loginError: error.response.data.error
  //     }));
  //   }
  // });
}

/**
 * Logout action
 */
export const logout = (history) => dispatch => {
  AuthService.logout();
  dispatch(logoutUser());
  history.push('/')
  window.location.reload();
}

/**
 * Register user action
 */
export const registerUser = (data, history) => dispatch => {
  AuthService.register(data).then(resp => {
    if (resp.data.success) {
      dispatch(registerSuccess());
      history.push('/login');
    }
  }).catch(error => {
    if (error.response.data) {
      dispatch(getErrors({
        registerError: error.response.data.error
      }));
    }
  });
}
