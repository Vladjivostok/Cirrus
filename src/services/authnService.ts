import httpService from './httpService';

import { User, UserLoginDataResponse, UserEmail } from '../common/types';
import {
  INVITE_USER_URL,
  LOGIN_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_RECOVERY_URL
} from '../common/constants';

import { AxiosResponse } from 'axios';

export const AuthnService = {
  login: async (userData: User): Promise<UserLoginDataResponse> => {
    const response = await httpService.post(LOGIN_URL, userData);
    return response.data;
  },
  register: async (userData: User): Promise<AxiosResponse> => {
    const response = await httpService.post(REGISTER_URL, userData);
    return response;
  },

  inviteUser: async (userData: { email: string; role: string }): Promise<AxiosResponse> => {
    const response = await httpService.post(INVITE_USER_URL, userData);
    return response;
  },
  requestPasswordRecovery: async (userData: UserEmail): Promise<AxiosResponse> => {
    const response = await httpService.post(REQUEST_PASSWORD_RECOVERY_URL, userData);
    return response;
  }
};
