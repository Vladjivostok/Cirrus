import { ResponseErrorCode } from '../../../common/types';

export const errorMessageDialog = (message: ResponseErrorCode): string => {
  let errorMessage = '';
  if (message === 'err001' || message === 'err007' || message === 'err017') {
    errorMessage = 'Invalid credentials';
  }
  if (message === 'err006' || message === 'err003') {
    errorMessage = 'User does not exist';
  }
  if (message === 'err008') {
    errorMessage = 'User already activated';
  }
  return errorMessage;
};

export default errorMessageDialog;
