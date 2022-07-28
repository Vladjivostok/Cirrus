import React, { useState, useEffect } from 'react';

import { User } from '../../../common/types';
import { login, reset } from '../../../store/redux/auth/authSlice';

import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import logo from '../../../../src/assets/Cirrus.png';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import FormErrorMessage from '../../atoms/errorMessage/FormErrorMessage';

import '../../../common/styles/formPages.css';
import { Hide, Show } from '../../atoms/icons/password/PasswordIcon';

import { errorToast } from '../../../common/utility';
import { yupValidation } from '../../../common/utility';
import 'react-toastify/dist/ReactToastify.css';
import '../../../common/styles/formPages.css';
import BreadCrumbs from '../../atoms/breadCrumbs/BreadCrumbs';

const LoginScheme = Yup.object().shape({
  username: yupValidation.yupUsername,
  password: yupValidation.yupPassword
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
      errorToast(message);
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

  const toggleIcon = () => {
    if (!toggleShowPassword) {
      return <Hide onClick={togglePassword}></Hide>;
    } else if (toggleShowPassword) {
      return <Show onClick={togglePassword}></Show>;
    }
  };

  const forgotPassword = () => {
    navigate('/forgot-password');
  };

  useEffect(() => {
    if (user?.accessToken && !isLoading && !isError) {
      navigate('/dashboard', { replace: true });
    }
  }, [user?.accessToken]);

  return (
    <div className="formPage">
      <form className="form" onSubmit={formik.handleSubmit}>
        <img className="cirrusLogo" src={logo} alt="Cirrus logo missing" />
        <div className="inputWrapper">
          <Input
            name="username"
            placeholder="Username"
            type="text"
            value={formik.values.username}
            onChange={formik.handleChange}
            inputWrapperClassname="inputWrapper-label--login"
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="username" />
        </div>
        <div className="inputWrapper">
          <Input
            name="password"
            placeholder="Password"
            type={toggleShowPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            inputWrapperClassname="inputWrapper-label--login"
          />
          <FormErrorMessage errors={formik.errors} touched={formik.touched} inputType="password" />
          {toggleIcon()}
        </div>
        <div className="buttonWrapper">
          <Button
            type="button"
            className="button invert"
            disabled={formik.isSubmitting}
            label="Forgot password?"
            onClick={forgotPassword}
          />
          <Button type="submit" className="button" disabled={formik.isSubmitting} label="Login" />
        </div>
      </form>
      <BreadCrumbs />
    </div>
  );
};

export default LoginPage;
