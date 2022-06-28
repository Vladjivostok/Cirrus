import httpService from './httpService';

import { User, UserLoginDataResponse } from '../common/types';
import { LOGIN_URL, REGISTER_URL } from '../common/constants';
import { AxiosResponse } from 'axios';

export const AuthnService = {
  login: async (userData: User): Promise<UserLoginDataResponse> => {
    const response = await httpService.post(LOGIN_URL, userData);
    return response.data;
  },
  register: async (userData: User): Promise<AxiosResponse> => {
    const response = await httpService.post(REGISTER_URL, userData);
    return response;
  }
};
