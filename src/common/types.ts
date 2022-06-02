//@Interfaces
export interface Response<T> {
  statusCode: ResponseStatusCode;
  error: string | null;
  data?: T;
}

//@Types
export interface User {
  username: string;
  password: string;
}

export type UserLoginDataResponse = {
  user: {
    username: string;
    email: string;
    accessToken: string | null;
    refreshToken: string | null;
  };
};

//@Enums
export enum ResponseStatusCode {
  //200
  ok = 200,

  //300

  //400
  Forbidden = 403,

  //500
  Unauthorized = 500
}
