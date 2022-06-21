import { ResponseErrorCode } from '../types';

export const errorMessageDialog = (message: ResponseErrorCode) => {
  if (message === 'err001' || message === 'err003' || message === 'err007') {
    return message;
  }
};

export default errorMessageDialog;
