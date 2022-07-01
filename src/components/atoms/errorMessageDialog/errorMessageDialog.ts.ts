import { ResponseErrorCode } from '../../../common/types';

export const errorMessageDialog = (message: ResponseErrorCode): string | undefined => {
  let errorMessage;
  if (message === 'err001' || message === 'err007' || message === 'err017') {
    errorMessage = 'Invalid credentials';
  }
  if (message === 'err006' || message === 'err003') {
    errorMessage = 'User does not exist';
  }
  if (message === 'err008') {
    errorMessage = 'User already activated';
  }
  if (message === 'err005') {
    errorMessage = 'Invite has already been sent to that email';
  }

  if (message === 'err004' || message === 'err009') {
    errorMessage = 'Access denied, you are not authorized!';
  }

  if (message === 'err018') {
    errorMessage = 'Role not found';
  }
  if (message === 'oops, something went wrong') {
    errorMessage = message;
  }
  return errorMessage;
};

export default errorMessageDialog;
