import React from 'react';
import { FormikErrors, FormikTouched } from 'formik';

import './formErrorMessage.css';

interface FormValues {
  email: string | undefined;
  username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
}

interface FormErrorMessageProps {
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  inputType: 'email' | 'username' | 'password' | 'confirmPassword';
}

const FormErrorMessage: React.FC<FormErrorMessageProps> = ({ errors, touched, inputType }) => {
  if (touched[inputType]) {
    return <div className="errorMsg">{errors[inputType]}</div>;
  }
  return <></>;
};

export default FormErrorMessage;
