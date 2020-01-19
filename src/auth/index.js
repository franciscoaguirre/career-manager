import axios from 'axios';

import API_URL from '../constants';

const USERS_URL = `${API_URL}/users`;
const LOGIN_URL = `${USERS_URL}/sign_in`;
const SIGNOUT_URL = `${USERS_URL}/sign_out`;

export default {
  login(credentials) {
    return axios.post(LOGIN_URL, {
      user: credentials,
    }).then((response) => {
      localStorage.setItem(
        'authToken',
        response.headers.authorization.substring(7),
      );
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
    });
  },
  signup(credentials) {
    return axios.post(USERS_URL, {
      user: credentials,
    });
  },
  signOut() {
    return axios.delete(SIGNOUT_URL, {
      headers: this.getAuthHeader(),
    }).then(() => {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common.Authorization;
    });
  },
  isAuthenticated() {
    return !!localStorage.getItem('authToken');
  },
  getAuthHeader() {
    return {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    };
  },
};
