import { toast } from 'react-toastify';
import { ResponseErrorCode } from './types';

import errorMessageDialog from '../components/atoms/errorMessageDialog/errorMessageDialog.ts';

import * as Yup from 'yup';

export const errorToast = (message: ResponseErrorCode) => {
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

export const yupValidation = {
  yupEmail: Yup.string().trim().email('Invalid email format').required('Email required'),
  yupUsername: Yup.string().trim().required('Username required'),
  yupPassword: Yup.string().trim().required('Password required!'),
  yupPasswordCreation: Yup.string()
    .required('Password required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      'Must contain at least 10 Characters, 1 Number, Symbol(@$!%*?&), Lowercase and Uppercase'
    ),

  yupConfirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password required')
};

export const truncateString = (stringValue: string | undefined, checkValue: number) => {
  if (stringValue != undefined && stringValue.length > checkValue)
    stringValue = stringValue.substr(0, checkValue - 1) + '...';

  return stringValue;
};

export const truncateFileDate = (date: number[] | string) => {
  date = `${date[2]}.${date[1].toString().length === 1 ? '0' + date[1] : date[1]}.${date[0]} / ${
    date[3]
  }:${date[4].toString().length === 1 ? '0' + date[4] : date[4]}`.toString();
  return date;
};

export const convertSizeToMB = (size: number) => {
  return (size / 1048576).toFixed(2) + ' MB';
};

export const removeExtension = (stringWithExtension: string) => {
  stringWithExtension = `${stringWithExtension.replace(/\.[^/.]+$/, '')}`;

  if (stringWithExtension.length > 29) {
    stringWithExtension = stringWithExtension.substr(0, 29) + '...';
  }

  return stringWithExtension;
};

export const folderTitleMaxLength = 15;
