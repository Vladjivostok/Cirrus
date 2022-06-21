import { ResponseErrorCode } from '../../../common/types';

export const errorMessageDialog = (message: ResponseErrorCode): string => {
  let errorMessage = '';
  if (message === 'err001' || message === 'err003' || message === 'err007') {
    errorMessage = 'Incorrect username or password';
  }
  return errorMessage;
};

export default errorMessageDialog;
