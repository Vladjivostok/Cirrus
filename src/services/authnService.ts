import httpService from './httpService';

import { User, UserLoginDataResponse, UserEmail, GetUserResponse } from '../common/types';
import {
  GET_USER_URL,
  INVITE_USER_URL,
  LOGIN_URL,
  PASSWORD_CHANGE_URL,
  REGISTER_URL,
  REQUEST_PASSWORD_RECOVERY_URL
} from '../common/constants';

import { Role } from '../common/types';

import { AxiosResponse } from 'axios';

type InviteUserDataProps = {
  email: string;
  role: Role;
};

type ChangePasswordProps = {
  username: string;
  password: string;
  confirmPassword: string;
};

export const AuthnService = {
  login: async (userData: User): Promise<UserLoginDataResponse> => {
    const response = await httpService.post(LOGIN_URL, userData);
    return response.data;
  },
  register: async (userData: User): Promise<AxiosResponse> => {
    const response = await httpService.post(REGISTER_URL, userData);
    return response;
  },

  inviteUser: async (userData: InviteUserDataProps): Promise<AxiosResponse> => {
    const response = await httpService.post(INVITE_USER_URL, userData);
    return response;
  },
  requestPasswordRecovery: async (userData: UserEmail): Promise<AxiosResponse> => {
    const response = await httpService.post(REQUEST_PASSWORD_RECOVERY_URL, userData);

    return response;
  },

  changePassword: async (userData: ChangePasswordProps): Promise<AxiosResponse> => {
    const response = await httpService.post(PASSWORD_CHANGE_URL, userData);
    return response;
  },
  getUser: async (): Promise<GetUserResponse> => {
    const response = await httpService.get(`${GET_USER_URL}`);
    return await response.data;
  }
};
