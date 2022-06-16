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

//@Enums
export enum ResponseErrorCode {
  'USER_NOT_FOUND' = 'err001',
  'NOT_LOGGED_IN' = 'err002',
  USER_WITH_THAT_ID_DOES_NOT_EXIST = 'err003',
  NOT_AUTHORIZED = 'err004',
  INVITE_ALREADY_SENT_TO_THAT_EMAIL = 'err005',
  INVITATION_TOKEN_NOT_VALID = 'err006',
  USER_NOT_VERIFIED = 'err007'
}
