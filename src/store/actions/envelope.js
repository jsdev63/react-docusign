import EnvelopeService from '../../services/EnvelopeService';

export const sendEnvelope = (state, history) => dispatch => {
  EnvelopeService.sendEnvelope(state).then(res => {
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