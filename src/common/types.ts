//@Interfaces
export interface Response<T> {
  statusCode: number;
  httpStatus: ResponseStatusCode;
  error: string | null;
  data?: T;
}

//@Types
export type User = {
  username: string;
  password: string;
};

export type UserLoginData = {
  user: {
    username: 'admin';
    email: 'admin@admin.com';
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
