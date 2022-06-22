import { toast } from 'react-toastify';
import errorMessageDialog from '../components/atoms/errorMessageDialog/errorMessageDialog.ts';
import { ResponseErrorCode } from './types';

export const notifyAboutError = (message: ResponseErrorCode) =>
  toast.error(errorMessageDialog(message), {
    autoClose: 1500,
    bodyStyle: { height: '3.5rem', fontSize: '1rem' }
  });
