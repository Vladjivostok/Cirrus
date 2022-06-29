import { toast } from 'react-toastify';
import errorMessageDialog from '../components/atoms/errorMessageDialog/errorMessageDialog.ts';
import { ResponseErrorCode } from './types';

export const errorToast = (message: ResponseErrorCode) => {
  if (message == undefined || message == '') {
    message = 'oops, something went wrong';
  }
  toast.error(errorMessageDialog(message), {
    autoClose: 1500,
    bodyStyle: { height: '3.5rem', fontSize: '1rem' }
  });
};

export const successToast = (message: string) =>
  toast.success(message, {
    theme: 'colored',
    position: 'top-center',
    bodyStyle: { height: '3.5rem', fontSize: '1.2rem' }
  });
