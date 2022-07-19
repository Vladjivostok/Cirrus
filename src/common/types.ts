export type User = {
  username: string;
  password: string;
  email?: string;
  verificationToken?: string;
};

export type UserEmail = {
  email: string;
};

export type FileContent = {
  id: number;
  name: string;
  fileSize: number;
  createdAt: number[];
  appUserId: number;
  fileType: 'CODE' | 'STANDARD';
};

export type OnClickSvgProp = {
  onClick?: React.MouseEventHandler<SVGSVGElement> | undefined;
};

export type FolderIconProps = {
  onClick: (id: number | undefined) => void;
  title?: string;
  id?: number | undefined;
  className?: string;
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

export type GetUserResponse = {
  email: string;
  id: number | null;
  roles: [];
  username: string;
};

export type Organization = {
  organization: {
    id: number;
    name: string;
  };
  permission: string;
};

export type OrganizationResponse = {
  userOrganizations: Organization[];
};

export type ErrorForUpload = 'file-invalid-type' | 'file-too-large';

export const ErrorsForUpload: Record<string, ErrorForUpload> = {
  invalidType: 'file-invalid-type',
  tooBig: 'file-too-large'
};

export type ResponseErrorCode =
  | ''
  | 'err001'
  | 'err003'
  | 'err004'
  | 'err005'
  | 'err006'
  | 'err007'
  | 'err008'
  | 'err009'
  | 'err015'
  | 'err016'
  | 'err017'
  | 'err018'
  | 'err019'
  | 'err100'
  | 'err101'
  | 'err102'
  | 'err103'
  | 'err104'
  | 'err105'
  | 'err106'
  | 'err107';

export type GetFilesResponse = {
  content: FileContent[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: 1;
  empty: boolean;
};
