
/**
 * Auth Service
 */
import axios from 'axios';
import { config } from '../config';
const {
  API_URL, ClientID, RedirectURL, APP_URL
} = config[process.env.NODE_ENV];
console.log(API_URL, ClientID, RedirectURL )
const AuthService = {
  auth: function(email, password) {
    const authURL  =  `https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=${ClientID}&state=a39fh23hnf23&redirect_uri=${RedirectURL}`
    return axios.get(API_URL + '/auth', { email: email, password: password });
  },
  login: function(email, password) {
    return axios.post(API_URL + '/auth', { email: email, password: password });
  },
  register: function(data) {
    return axios.post(API_URL + '/register', { data });
  },
  getProfile: function() {
    return axios.get(API_URL + '/profile', { headers: this.authHeader() });
  },
  logout: function () {
    localStorage.removeItem('token');
  },
  getToken: function() {
    return localStorage.getItem('token');
  },
  saveToken: function(token) {
    localStorage.setItem('token', token);
  },
  authHeader: function () {
    return { Authorization: this.getToken() }
  }
}

export default AuthService
