export interface User {
  username: string;
  password: string;
}

//@Types

export type OnClickSvgProp = {
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
  title?: string;
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

export type ResponseErrorCode = 'err001' | 'err007' | 'err003' | string;
