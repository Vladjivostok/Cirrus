import { toast } from 'react-toastify';
import { ResponseErrorCode } from './types';

import errorMessageDialog from '../components/atoms/errorMessageDialog/errorMessageDialog.ts';

import * as Yup from 'yup';
import { AxiosError } from 'axios';

export const errorToast = (message: ResponseErrorCode) => {
  toast.error(errorMessageDialog(message), {
    autoClose: 1500,
    bodyStyle: { height: '3.5rem', fontSize: '1rem' }
  });
};

export const successToast = (message: string) =>
  toast.success(message, {
    autoClose: 2500,
    theme: 'light',
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

export const getCurrentDateAndTime = () => {
  return new Date();
};

const AddZero = (num: number) => {
  return num >= 0 && num < 10 ? '0' + num : num + '';
};

export const transformDateAndTime = (date: Date, showSeconds: boolean) => {
  return [
    [AddZero(date.getDate()), AddZero(date.getMonth() + 1), date.getFullYear()].join('/'),
    `${AddZero(date.getHours())}:${AddZero(date.getMinutes())}${
      showSeconds ? ':' + AddZero(date.getSeconds()) : ''
    }`
  ].join(' / ');
};

export const convertSizeToMB = (size: number) => {
  if (size < 10000) {
    return (size / 1024).toFixed(2) + ' KB';
  }
  return (size / 1048576).toFixed(2) + ' MB';
};

export const folderTitleMaxLength = 15;

export const breakEmail = (email: string | undefined) => {
  let splitEmail: string[] | undefined;
  if (email != undefined && email.length > 15) {
    splitEmail = email.split('@');
    return splitEmail[0] + '\n@' + splitEmail[1];
  }
  return email;
};

export const showToastError = (error: AxiosError) => {
  let errCode: ResponseErrorCode = '';

  if (error instanceof AxiosError) {
    errCode = error.response?.data.message;
  }
  errorToast(errCode);
};

export const runCommandTooltip = 'Execute Function';
