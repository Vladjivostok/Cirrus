const LOGIN_URL = '/login';
const REGISTER_URL = '/registration';
const REQUEST_PASSWORD_RECOVERY_URL = '/forgot-password';
const REFRESH_TOKEN_URL = 'refresh';
const UPLOAD_FILE_URL = '/users/files/upload';
const INVITE_USER_URL = '/admin/user-invitation';
const PASSWORD_CHANGE_URL = 'password-recovery';
const GET_USER_URL = '/users/me';
const GET_ORGANIZATIONS_URL = '/users/my/organizations';

const roles = {
  user: 'ROLE_USER',
  admin: 'ROLE_ADMIN'
};

export {
  LOGIN_URL,
  REFRESH_TOKEN_URL,
  REGISTER_URL,
  INVITE_USER_URL,
  REQUEST_PASSWORD_RECOVERY_URL,
  UPLOAD_FILE_URL,
  GET_USER_URL,
  roles,
  GET_ORGANIZATIONS_URL,
  PASSWORD_CHANGE_URL
};
