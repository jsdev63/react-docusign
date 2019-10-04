
/**
 * Auth Service
 */
import axios from 'axios';
import { config } from './../config';

const { API_URL } = config;

const EnvelopeService = {
  sendEnvelope: function(data) {
    return axios.post(API_URL + '/sendEnvelope', { ...data });
  },
}

export default EnvelopeService
