export interface User {
  username: string;
  password: string;
  email?: string;
  verificationToken?: string;
}

export interface UserEmail {
  email: string;
}

//@Types

export type OnClickSvgProp = {
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
  title?: string;
};

export type UserRegisterDataResponse = {
  userId: number;
  username: string;
  email: string;
};

export type UserLoginDataResponse =
  | {
      id: number;
      accessToken: string;
      refreshToken: string;
    }
  | { message: ResponseErrorCode };

export type ReduxUser = { id: number; accessToken: string } | null | Record<string, string>;

export type StorageItem = {
  key: string;
  value: string;
};

export type OptionObjectProp = {
  label: string;
  value: string;
};

export type Role = 'ROLE_ADMIN' | 'ROLE_USER';

export type ResponseErrorCode =
  | 'err001'
  | 'err007'
  | 'err003'
  | 'err006'
  | 'err008'
  | 'err017'
  | string;
