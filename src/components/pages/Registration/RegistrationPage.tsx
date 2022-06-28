import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthnService } from '../../../services/authnService';

import * as Yup from 'yup';
import { useFormik, FormikErrors, FormikTouched } from 'formik';

import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import FormErrorMessage from '../../atoms/errorMessage/FormErrorMessage';
import { Hide, Show } from '../../atoms/icons/password/PasswordIcon';
import logo from './../../../assets/Cirrus.png';
import { confirmNotification, notifyAboutError } from '../../../common/utility';

import '../../../common/styles/loginAndRegistration.css';
import { AxiosError } from 'axios';

const RegistrationScheme = Yup.object().shape({
  email: Yup.string().trim().email('Invalid email format').required('Email required'),
  username: Yup.string().trim().required('Username required'),
  password: Yup.string()
    .required('Password required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
      'Must contain at least 10 Characters, 1 Number, Symbol(@$!%*?&), Lowercase and Uppercase'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password required')
});

const RegistrationPage: React.FC = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const togglePassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const toggleIcon = () => {
    if (!toggleShowPassword) {
      return <Hide onClick={togglePassword}></Hide>;
    } else if (toggleShowPassword) {
      return <Show onClick={togglePassword}></Show>;
    }
  };

  interface FormValues {
    email: string | undefined;
    username: string | undefined;
    password: string | undefined;
    confirmPassword?: string | undefined;
  }

  const errorMessage = (
    errors: FormikErrors<FormValues>,
    touched: FormikTouched<FormValues>,
    inputType: 'email' | 'username' | 'password' | 'confirmPassword'
  ) => {
    if (touched[inputType]) {
      return <FormErrorMessage>{errors[inputType]}</FormErrorMessage>;
    }
  };

  const { token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: RegistrationScheme,
    onSubmit: async (values: {
      email: string;
      username: string;
      password: string;
      confirmPassword: string;
      token?: string;
    }) => {
      formik.setSubmitting(true);
      values.token = token;
      try {
        const response = await AuthnService.register(values);
        if (response.status == 201) {
          navigate('/login');
          confirmNotification('Successfully Registered!');
        }
      } catch (error) {
        let errCode = '';

        if (error instanceof AxiosError) {
          errCode = error.response?.data.message;
        }
        notifyAboutError(errCode);
      }
      formik.resetForm();
      setToggleShowPassword(false);
      toggleIcon();
    }
  });

  return (
    <div className="loginAndRegistrationPage">
      <form className="loginAndRegistrationForms" onSubmit={formik.handleSubmit}>
        <img className="cirrusLogo" src={logo} alt="Cirrus logo missing" />
        <div className="inputWrapper">
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {errorMessage(formik.errors, formik.touched, 'email')}
        </div>
        <div className="inputWrapper">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {errorMessage(formik.errors, formik.touched, 'username')}
        </div>
        <div className="inputWrapper">
          <Input
            name="password"
            placeholder="Password"
            type={toggleShowPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {errorMessage(formik.errors, formik.touched, 'password')}
          {toggleIcon()}
        </div>
        <div className="inputWrapper">
          <Input
            name="confirmPassword"
            placeholder="Confirm password"
            type={toggleShowPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {errorMessage(formik.errors, formik.touched, 'confirmPassword')}
          {toggleIcon()}
        </div>
        <Button type="submit" disabled={formik.isSubmitting} label="Register" />
      </form>
    </div>
  );
};

export default RegistrationPage;
