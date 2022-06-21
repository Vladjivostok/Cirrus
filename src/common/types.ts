//@Interfaces
export interface Response<T> {
  message?: ResponseErrorCode | null;
  data?: T;
}

export interface User {
  username: string;
  password: string;
}

//@Types
export type UserLoginDataResponse = {
  userId: number;
  accessToken: string;
};

export type ResponseErrorCode = 'err001' | 'err007' | 'err003' | '';
