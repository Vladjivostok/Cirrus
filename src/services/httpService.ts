import axios from 'axios';
import {
  GET_ORGANIZATIONS_URL,
  GET_USER_URL,
  INVITE_USER_URL,
  REFRESH_TOKEN_URL,
  UPLOAD_FILE_URL
} from '../common/constants';

import LocalStorageService from './localStorageService';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
});

const protectedRoutes = [
  `${process.env.REACT_APP_BASE_API_URL}${REFRESH_TOKEN_URL}`,
  `${process.env.REACT_APP_BASE_API_URL}${INVITE_USER_URL}`,
  `${process.env.REACT_APP_BASE_API_URL}${GET_USER_URL}`,
  `${process.env.REACT_APP_BASE_API_URL}${GET_ORGANIZATIONS_URL}`,
  `${process.env.REACT_APP_BASE_API_URL}${UPLOAD_FILE_URL}`,
  `${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}`
];

instance.interceptors.request.use(
  function (config) {
    const user = LocalStorageService.getItem('user');
    let refreshToken;
    let accessToken;

    const filteredRoute = protectedRoutes.find(
      (route) => route === `${process.env.REACT_APP_BASE_API_URL}${config.url}`
    );

    if (typeof user === 'string') {
      refreshToken = JSON.parse(user).refreshToken;
      accessToken = JSON.parse(user).accessToken;
    }

    if (
      refreshToken &&
      config.headers &&
      filteredRoute === `${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}`
    ) {
      config.headers['Authorization'] = `Bearer ${refreshToken}`;
    }

    if (
      accessToken &&
      config.headers &&
      filteredRoute !== `${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}`
    ) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    if ((!refreshToken && !accessToken) || !config.headers || filteredRoute === undefined) {
      config.headers = {};
    }

    return config;
  },
  async function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const user = LocalStorageService.getItem('user');
    const originalConfig = err.config;

    if (
      originalConfig.url !== `${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}` &&
      err.response &&
      err.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      try {
        let refreshToken;
        if (typeof user === 'string') {
          refreshToken = JSON.parse(user).refreshToken;
        }
        const response = await instance.get(`/${REFRESH_TOKEN_URL}`);
        const { accessToken } = response.data;
        LocalStorageService.setItem({
          key: 'user',
          value: JSON.stringify({ refreshToken, accessToken: accessToken })
        });

        return instance(originalConfig);
      } catch (_err) {
        if (!err) {
          Promise.reject(_err);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
