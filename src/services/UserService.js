
/**
 * Auth Service
 */
import axios from 'axios';
import { config } from '../config';

const UserService = {
  getToken: function(code) {
    return axios({
      method: 'post',
      url: `${config.API_URL}/token`,
      data: {
        code: code
      }
    })
  }
}

export default UserService
