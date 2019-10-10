
/**
 * Auth Service
 */
import axios from 'axios';
import { config } from './../config';


const EnvelopeService = {
  sendEnvelope: function(data) {
    return axios.post(config.API_URL + '/sendEnvelope', { ...data });
  },
}

export default EnvelopeService
