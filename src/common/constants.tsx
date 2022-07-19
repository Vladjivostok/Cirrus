const LOGIN_URL = '/login';
const REGISTER_URL = '/registration';
const REQUEST_PASSWORD_RECOVERY_URL = '/forgot-password';
const REFRESH_TOKEN_URL = 'refresh';
const UPLOAD_FILE_URL = '/users/files/upload';
const INVITE_USER_URL = '/admin/user-invitation';
const GET_ORGANIZATION_FILES_URL = '/users/files';

const PASSWORD_CHANGE_URL = '/password-recovery';
const GET_USER_URL = '/users/me';
const GET_ORGANIZATIONS_URL = '/organizations';

const roles = {
  user: 'ROLE_USER',
  admin: 'ROLE_ADMIN'
};

const columns = [
  {
    field: 'file',
    headerName: 'File',
    flex: 1,
    sortable: false
  },
  {
    field: 'creationDate',
    headerName: 'Creation date',
    flex: 1,
    sortable: false
  },
  {
    field: 'fileSize',
    headerName: 'File size',
    flex: 1,
    sortable: false
  }
];

export {
  LOGIN_URL,
  REFRESH_TOKEN_URL,
  REGISTER_URL,
  INVITE_USER_URL,
  REQUEST_PASSWORD_RECOVERY_URL,
  UPLOAD_FILE_URL,
  GET_USER_URL,
  GET_ORGANIZATION_FILES_URL,
  roles,
  columns,
  GET_ORGANIZATIONS_URL,
  PASSWORD_CHANGE_URL
};
