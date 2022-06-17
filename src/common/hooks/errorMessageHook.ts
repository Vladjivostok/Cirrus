import { ResponseErrorCode } from '../types';

export const errorMessageDialog = (message: ResponseErrorCode): string => {
  if (message === 'err001' || message === 'err003' || message === 'err007') {
    alert('Incorrect username or password');
  }
  return message;
};

export default errorMessageDialog;
