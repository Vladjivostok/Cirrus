import axios from 'axios';
import { INVITE_USER_URL, REFRESH_TOKEN_URL } from '../common/constants';

import LocalStorageService from './localStorageService';

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL
});

const protectedRoutes = [
  `${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}`,
  `${process.env.REACT_APP_BASE_API_URL}/${INVITE_USER_URL}`
];

instance.interceptors.request.use(
  function (config) {
    let token;
    const user = LocalStorageService.getItem('user');

    const filteredRoute = protectedRoutes.find(
      (route) => route === `${process.env.REACT_APP_BASE_API_URL}/${config.url}`
    );

    if (typeof user === 'string') {
      token = JSON.parse(user).accessToken;
    }

    if (token && config.headers && filteredRoute?.length) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (!token || !config.headers || filteredRoute === undefined) {
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
    const originalConfig = err.config;
    if (
      originalConfig.url !== `${process.env.REACT_APP_BASE_API_URL}/${REFRESH_TOKEN_URL}` &&
      err.response &&
      err.response.status === 401 &&
      !originalConfig._retry
    ) {
      originalConfig._retry = true;

      try {
        const response = await instance.get(`/${REFRESH_TOKEN_URL}`);
        const { accessToken } = response.data;
        LocalStorageService.setItem({
          key: 'user',
          value: JSON.stringify({ accessToken: accessToken })
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
