import EnvelopeService from '../../services/EnvelopeService';
import { setEnvelopeStatus, getErrors } from "./actionCreators";

export const sendEnvelope = (state, history, token) => dispatch => {
    EnvelopeService.sendEnvelope({data: state, token: token}).then(res => {
        if(res.data.status) {
            dispatch(setEnvelopeStatus(res.data))
        } 
    }).catch(error => {
        if (error.response.data) {
            dispatch(getErrors({
                envelopeError: error.response.data.error
            }));
        }
    })
}