import httpService from './httpService';

import { User, UserLoginDataResponse, Response } from '../common/types';
import { LOGIN_URL } from '../common/constants';

export const LoginService = {
  login: async (userData: User): Promise<Response<UserLoginDataResponse>> => {
    const response = await httpService.post(LOGIN_URL, userData);
    return response.data;
  }
};
