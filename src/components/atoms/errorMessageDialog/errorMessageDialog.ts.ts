import { ResponseErrorCode } from '../../../common/types';

export const errorMessageDialog = (message: ResponseErrorCode): string | undefined => {
  let errorMessage;
  if (message === 'err001' || message === 'err007' || message === 'err017') {
    errorMessage = 'Invalid credentials';
  }

  if (message === 'err006' || message === 'err003') {
    errorMessage = 'User does not exist';
  }

  if (message === 'err005') {
    errorMessage = 'Invite has already been sent to that email';
  }

  if (message === 'err008') {
    errorMessage = 'User already activated';
  }

  if (message === 'err004' || message === 'err009' || message === 'err015') {
    errorMessage = 'Access denied, you are not authorized!';
  }

  if (
    message === 'err016' ||
    message === 'err101' ||
    message === 'err102' ||
    message === 'err104' ||
    message === 'err105'
  ) {
    errorMessage = 'Oops, something went wrong';
  }

  if (message === 'err018') {
    errorMessage = 'Role not found';
  }

  if (message === 'err019') {
    errorMessage = 'Username already taken';
  }

  if (message === 'err100') {
    errorMessage = 'File not found';
  }

  if (message === 'err103') {
    errorMessage = 'The type of file isnt supported';
  }

  if (message === 'err106') {
    errorMessage = 'File with this name already exist, rename the file and try again';
  }

  if (message == undefined || message == '' || message == null) {
    errorMessage = 'Oops, something went wrong, try again later';
  }
  return errorMessage;
};

export default errorMessageDialog;
