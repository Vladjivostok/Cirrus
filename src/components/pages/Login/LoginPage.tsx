import React, { useState, useEffect } from 'react';

import { User } from '../../../common/types';
import { login, reset } from '../../../store/redux/auth/authSlice';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useFormik, FormikErrors, FormikTouched } from 'formik';

import logo from '../../../../src/assets/Cirrus.png';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import FormErrorMessage from '../../atoms/errorMessage/FormErrorMessage';
import { Hide, Show } from '../../atoms/icons/password/PasswordIcon';

import { notifyAboutError } from '../../../common/utility';

import './loginPage.css';

const LoginScheme = Yup.object().shape({
  username: Yup.string().trim().required('Username required!'),
  password: Yup.string().trim().required('Password required!')
});

const LoginPage: React.FC = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);
  const togglePassword = () => {
    setToggleShowPassword(!toggleShowPassword);
  };

  const { message, isError, user, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      notifyAboutError(message);
    }
    dispatch(reset());
  }, [isError, dispatch]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: LoginScheme,
    onSubmit: async (values: User) => {
      formik.setSubmitting(true);
      await dispatch(login(values));
      formik.resetForm();
      setToggleShowPassword(false);
      toggleIcon();
    }
  });

  interface FormValues {
    username: string | undefined;
    password: string | undefined;
  }

  const errorMessage = (
    errors: FormikErrors<FormValues>,
    touched: FormikTouched<FormValues>,
    inputType: 'username' | 'password'
  ) => {
    if (touched.username && inputType === 'username') {
      return <FormErrorMessage>{errors.username}</FormErrorMessage>;
    } else if (touched.password && inputType === 'password') {
      return <FormErrorMessage>{errors.password}</FormErrorMessage>;
    }
  };
  const toggleIcon = () => {
    if (!toggleShowPassword) {
      return <Hide onClick={togglePassword}></Hide>;
    } else if (toggleShowPassword) {
      return <Show onClick={togglePassword}></Show>;
    }
  };

  useEffect(() => {
    if (user?.accessToken && !isLoading && !isError) {
      navigate('/dashboard');
    }
  }, [user?.accessToken]);

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={formik.handleSubmit}>
        <img src={logo} alt="Cirrus logo missing" />
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

        <Button type="submit" disabled={formik.isSubmitting} label="Login" />
      </form>
    </div>
  );
};

export default LoginPage;
